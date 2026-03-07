import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Loader2 from 'lucide-react/dist/esm/icons/loader-2'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import { TransactionFilters } from '@/components/transactions/TransactionFilters'
import { TransactionTable } from '@/components/transactions/TransactionTable'
import { TransactionModal } from '@/components/transactions/TransactionModal'
import { Modal } from '@/components/ui/Modal'
import { useTransactions } from '@/hooks/useTransactions'
import { DELETE_TRANSACTION_MUTATION } from '@/graphql/mutations/transactions'
import type { Transaction } from '@/types'
import { Card } from '@/components/ui/Card'

export function TransactionsPage() {
  const { items, total, skip, take, loading, filters, setFilters, setPage, refetch } =
    useTransactions()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null)

  const [deleteTransaction, { loading: deleting }] = useMutation(DELETE_TRANSACTION_MUTATION)

  function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction)
    setModalOpen(true)
  }

  function handleNew() {
    setEditingTransaction(null)
    setModalOpen(true)
  }

  async function handleDelete() {
    if (!deletingTransaction) return
    try {
      await deleteTransaction({ variables: { id: deletingTransaction.id } })
      setDeletingTransaction(null)
      refetch()
    } catch {
      // Error handled by Apollo error link
    }
  }

  function handleSuccess() {
    refetch()
  }

  if (loading && items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
          <p className="text-sm text-gray-500">Gerencie todas as suas transações financeiras</p>
        </div>
        <Button icon={Plus} onClick={handleNew}>
          Nova transação
        </Button>
      </div>

      <Card className='px-5 py-6'>
        <TransactionFilters filters={filters} onFilterChange={setFilters} />
      </Card>


      <Card>
        <TransactionTable
          transactions={items}
          onEdit={handleEdit}
          onDelete={setDeletingTransaction}
          />

        <Pagination total={total} skip={skip} take={take} onPageChange={setPage} />
      </Card>

      <TransactionModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingTransaction(null)
        }}
        transaction={editingTransaction}
        onSuccess={handleSuccess}
      />

      <Modal
        open={!!deletingTransaction}
        onClose={() => setDeletingTransaction(null)}
        title="Excluir transação"
        subtitle="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
      >
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={() => setDeletingTransaction(null)}
            fullWidth
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete} loading={deleting} fullWidth>
            Excluir
          </Button>
        </div>
      </Modal>
    </div>
  )
}
