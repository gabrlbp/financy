import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client/react'
import { Mail, UserRoundPlus } from 'lucide-react'
import { loginSchema, type LoginData } from '@/lib/validators'
import { LOGIN_MUTATION } from '@/graphql/mutations/auth'
import { useAuthStore } from '@/stores/auth'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { Button } from '@/components/ui/Button'
import type { AuthPayload } from '@/types'

export function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({})
  const [serverError, setServerError] = useState('')

  const [login, { loading }] = useMutation<{ login: AuthPayload }>(LOGIN_MUTATION)

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setServerError('')

    const result = loginSchema.safeParse(form)

    if (!result.success) {
      const fieldErrors: typeof errors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginData
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})

    try {
      const { data } = await login({ variables: { input: result.data } })
      if (data) {
        setAuth(data.login.token, data.login.user)
        navigate('/')
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Erro ao fazer login')
    }
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Fazer login</h1>
        <p className="mt-1 text-sm text-gray-500">Entre na sua conta para continuar</p>
      </div>

      {serverError && (
        <div className="mb-4 rounded-lg bg-danger-light p-3 text-sm text-danger">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-mail"
          icon={Mail}
          type="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <PasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />
        <Button type="submit" fullWidth loading={loading}>
          Entrar
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6 text-center text-sm text-gray-500 border-t-2 border-gray-200 dark:border-white/10">
        <div className='grow border-t-2 border-gray-300'></div>
        <div>ou</div>
        <div className='grow border-t-2 border-gray-300'></div>
      </div>

      <p className="my-6 text-center text-md text-gray-500">
        Ainda não tem uma conta?
      </p>
      <Button type="button" variant='secondary' icon={UserRoundPlus} fullWidth>
        <Link to="/cadastro">
          Criar conta
        </Link>
      </Button>
    </>
  )
}
