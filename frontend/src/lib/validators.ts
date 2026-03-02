import { z } from 'zod/v4'

export const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

export const transactionSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  amount: z.number().positive('O valor deve ser positivo'),
  type: z.enum(['INCOME', 'EXPENSE']),
  date: z.string().min(1, 'Data é obrigatória'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
})

export const categorySchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  icon: z.string().min(1, 'Ícone é obrigatório'),
  color: z.string().min(1, 'Cor é obrigatória'),
})

export const profileSchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
})

export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type TransactionData = z.infer<typeof transactionSchema>
export type CategoryData = z.infer<typeof categorySchema>
export type ProfileData = z.infer<typeof profileSchema>
