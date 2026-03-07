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
import { useFormValidation } from '@/hooks/useFormValidation'
import type { Transaction } from '@/types/transaction'
import type { Category } from '@/types/category'
import type { PaginatedResponse } from '@/types/pagination'

interface TransactionModalProps {
  open: boolean
  onClose: () => void
  transaction?: Transaction | null
  onSuccess: () => void
}

const initialForm: TransactionData = {
  description: '',
  amount: 0,
  type: 'EXPENSE',
  date: new Date().toISOString(),
  categoryId: '',
}

export function TransactionModal({ open, onClose, transaction, onSuccess }: TransactionModalProps) {
  const { form, errors, setField, setForm, validate, clearErrors } = useFormValidation(initialForm)
  const [serverError, setServerError] = useState('')

  const { data: categoriesData } = useQuery<{ categories: PaginatedResponse<Category> }>(
    CATEGORIES_QUERY,
    { variables: { pagination: { take: 100 } } },
  )

  const [createTransaction, { loading: creating }] = useMutation(CREATE_TRANSACTION_MUTATION)
  const [updateTransaction, { loading: updating }] = useMutation(UPDATE_TRANSACTION_MUTATION)

  const loading = creating || updating

  //TODO: tentar alterar para usar uma função apenas ou entao alterar o if pelo menos para nao usar o else
  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        date: new Date(transaction.date).toISOString(),
        categoryId: transaction.category?.id || '',
      })
    } else {
      setForm(initialForm)
    }
    clearErrors()
    setServerError('')
  }, [transaction, open])

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setServerError('')

    const result = validate(transactionSchema)
    if (!result) return

    try {
      const input = {
        description: result.description,
        amount: result.amount,
        type: result.type,
        date: result.date,
        categoryId: result.categoryId,
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
        <Toggle value={form.type} onChange={(type) => setField('type', type)} />

        <Input
          label="Descrição"
          placeholder="Ex: Almoço, Salário..."
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          error={errors.description}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Data"
            type="date"
            value={form.date}
            onChange={(e) => setField('date', e.target.value)}
            error={errors.date}
          />
          <Input
            label="Valor"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            value={form.amount}
            onChange={(e) => setField('amount', Number(e.target.value))}
            error={errors.amount}
          />
        </div>

        <Select
          label="Categoria"
          placeholder="Selecione uma categoria"
          options={categoryOptions}
          value={form.categoryId}
          onChange={(e) => setField('categoryId', e.target.value)}
          error={errors.categoryId}
        />

        <Button className='mt-6' type="submit" fullWidth loading={loading}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
