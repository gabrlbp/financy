import { useState } from 'react'
import { z, type ZodType } from 'zod'

export function useFormValidation<T>(initialValues: T) {
  const [form, setForm] = useState(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  function setField(field: keyof T, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate<S extends ZodType>(schema: S): z.infer<S> | null {
    const parseData = form
    const result = schema.safeParse(parseData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof T, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof T
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      }
      setErrors(fieldErrors)

      return null
    }

    setErrors({})

    return result.data as z.infer<S>
  }

  function clearErrors() {
    setErrors({})
  }

  return {
    form,
    errors,
    setField,
    setForm,
    validate,
    clearErrors,
  }
}
