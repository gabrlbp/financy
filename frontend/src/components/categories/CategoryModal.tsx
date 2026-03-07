import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client/react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { IconPicker } from '@/components/ui/IconPicker'
import { ColorPicker } from '@/components/ui/ColorPicker'
import { categorySchema } from '@/lib/validators'
import { CREATE_CATEGORY_MUTATION, UPDATE_CATEGORY_MUTATION } from '@/graphql/mutations/categories'
import { COLOR_PALETTE } from '@/lib/constants'
import { useFormValidation } from '@/hooks/useFormValidation'
import type { Category } from '@/types/category'

interface CategoryModalProps {
  open: boolean
  onClose: () => void
  category?: Category | null
  onSuccess: () => void
}

const initialForm = {
  title: '',
  description: '',
  icon: 'briefcase',
  color: COLOR_PALETTE[0],
}

export function CategoryModal({ open, onClose, category, onSuccess }: CategoryModalProps) {
  const { form, errors, setField, setForm, validate, clearErrors } = useFormValidation(initialForm)
  const [serverError, setServerError] = useState('')

  const [createCategory, { loading: creating }] = useMutation(CREATE_CATEGORY_MUTATION)
  const [updateCategory, { loading: updating }] = useMutation(UPDATE_CATEGORY_MUTATION)

  const loading = creating || updating

  useEffect(() => {
    if (category) {
      setForm({
        title: category.title,
        description: category.description || '',
        icon: category.icon,
        color: category.color,
      })
    } else {
      setForm(initialForm)
    }
    clearErrors()
    setServerError('')
  }, [category?.id, open])

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setServerError('')

    const data = {
      ...form,
      description: form.description || undefined,
    }

    const result = validate(categorySchema, data)
    if (!result) return

    try {
      const input = {
        title: result.title,
        description: result.description || null,
        icon: result.icon,
        color: result.color,
      }

      if (category) {
        await updateCategory({ variables: { id: category.id, input } })
      } else {
        await createCategory({ variables: { input } })
      }

      onSuccess()
      onClose()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Erro ao salvar categoria')
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={category ? 'Editar categoria' : 'Nova categoria'}
      subtitle={category ? 'Altere os dados da categoria' : 'Organize suas transações com categorias'}
    >
      {serverError ? (
        <div className="mb-4 rounded-lg bg-danger-light p-3 text-sm text-danger">
          {serverError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Título"
          placeholder="Ex: Alimentação"
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
          error={errors.title}
        />

        <Input
          label="Descrição"
          placeholder="Descrição da categoria"
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          infoText='Opcional'
        />

        <IconPicker
          value={form.icon}
          onChange={(icon) => setField('icon', icon)}
        />

        <ColorPicker
          value={form.color}
          onChange={(color) => setField('color', color)}
        />

        <Button className='mt-6' type="submit" fullWidth loading={loading}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
