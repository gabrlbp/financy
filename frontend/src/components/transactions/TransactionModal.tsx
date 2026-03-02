import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Toggle } from '@/components/ui/Toggle'
import { transactionSchema, type TransactionData } from '@/lib/validators'
import { CREATE_TRANSACTION_MUTATION, UPDATE_TRANSACTION_MUTATION } from '@/graphql/mutations/transactions'
import { CATEGORIES_QUERY } from '@/graphql/queries/categories'
import type { Transaction, TransactionType, Category, PaginatedResponse } from '@/types'

interface TransactionModalProps {
  open: boolean
  onClose: () => void
  transaction?: Transaction | null
  onSuccess: () => void
}

export function TransactionModal({ open, onClose, transaction, onSuccess }: TransactionModalProps) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'EXPENSE' as TransactionType,
    date: new Date().toISOString().split('T')[0],
    categoryId: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof TransactionData, string>>>({})
  const [serverError, setServerError] = useState('')

  const { data: categoriesData } = useQuery<{ categories: PaginatedResponse<Category> }>(
    CATEGORIES_QUERY,
    { variables: { pagination: { take: 100 } } },
  )

  const [createTransaction, { loading: creating }] = useMutation(CREATE_TRANSACTION_MUTATION)
  const [updateTransaction, { loading: updating }] = useMutation(UPDATE_TRANSACTION_MUTATION)

  const loading = creating || updating

  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        amount: String(transaction.amount),
        type: transaction.type,
        date: new Date(transaction.date).toISOString().split('T')[0],
        categoryId: transaction.category?.id || '',
      })
    } else {
      setForm({
        description: '',
        amount: '',
        type: 'EXPENSE',
        date: new Date().toISOString().split('T')[0],
        categoryId: '',
      })
    }
    setErrors({})
    setServerError('')
  }, [transaction, open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError('')

    const parsed = {
      ...form,
      amount: parseFloat(form.amount) || 0,
    }

    const result = transactionSchema.safeParse(parsed)
    if (!result.success) {
      const fieldErrors: typeof errors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof TransactionData
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})

    try {
      const input = {
        description: result.data.description,
        amount: result.data.amount,
        type: result.data.type,
        date: result.data.date,
        categoryId: result.data.categoryId,
      }

      if (transaction) {
        await updateTransaction({ variables: { id: transaction.id, input } })
      } else {
        await createTransaction({ variables: { input } })
      }

      onSuccess()
      onClose()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Erro ao salvar transação')
    }
  }

  const categoryOptions = (categoriesData?.categories.items || []).map((c) => ({
    value: c.id,
    label: c.title,
  }))

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={transaction ? 'Editar transação' : 'Nova transação'}
      subtitle={transaction ? 'Altere os dados da transação' : 'Registre sua despesa ou receita'}
    >
      {serverError && (
        <div className="mb-4 rounded-lg bg-danger-light p-3 text-sm text-danger">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Toggle value={form.type} onChange={(type) => setForm({ ...form, type })} />

        <Input
          label="Descrição"
          placeholder="Ex: Almoço, Salário..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          error={errors.description}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Data"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            error={errors.date}
          />
          <Input
            label="Valor"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            error={errors.amount}
          />
        </div>

        <Select
          label="Categoria"
          placeholder="Selecione uma categoria"
          options={categoryOptions}
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          error={errors.categoryId}
        />

        <Button className='mt-6' type="submit" fullWidth loading={loading}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
