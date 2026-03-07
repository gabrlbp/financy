import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Loader2 from 'lucide-react/dist/esm/icons/loader-2'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import { CategoryStats } from '@/components/categories/CategoryStats'
import { CategoryGrid } from '@/components/categories/CategoryGrid'
import { CategoryModal } from '@/components/categories/CategoryModal'
import { Modal } from '@/components/ui/Modal'
import { useCategories } from '@/hooks/useCategories'
import { DELETE_CATEGORY_MUTATION } from '@/graphql/mutations/categories'
import type { Category } from '@/types'
import { useCategoryAnalytics } from '@/hooks/useCategoryAnalytics'

export function CategoriesPage() {
  const { items, total, skip, take, loading, setPage, refetch } = useCategories()
  const { mostUsed, totalTransactions } = useCategoryAnalytics(items)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  const [deleteCategory, { loading: deleting }] = useMutation(DELETE_CATEGORY_MUTATION)

  function handleEdit(category: Category) {
    setEditingCategory(category)
    setModalOpen(true)
  }

  function handleNew() {
    setEditingCategory(null)
    setModalOpen(true)
  }

  async function handleDelete() {
    if (!deletingCategory) return
    try {
      await deleteCategory({ variables: { id: deletingCategory.id } })
      setDeletingCategory(null)
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
          <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
          <p className="text-sm text-gray-500">Organize suas transações por categorias</p>
        </div>
        <Button icon={Plus} onClick={handleNew}>
          Nova categoria
        </Button>
      </div>

      <CategoryStats
        totalCategories={total}
        totalTransactions={totalTransactions}
        mostUsed={mostUsed || null}
      />

      <CategoryGrid
        categories={items}
        onEdit={handleEdit}
        onDelete={setDeletingCategory}
      />

      <Pagination total={total} skip={skip} take={take} onPageChange={setPage} />

      <CategoryModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingCategory(null)
        }}
        category={editingCategory}
        onSuccess={handleSuccess}
      />

      <Modal
        open={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        title="Excluir categoria"
        subtitle="Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita."
      >
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={() => setDeletingCategory(null)}
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
