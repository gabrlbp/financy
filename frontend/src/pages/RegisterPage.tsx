import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client/react'
import LogIn from 'lucide-react/dist/esm/icons/log-in'
import Mail from 'lucide-react/dist/esm/icons/mail'
import User from 'lucide-react/dist/esm/icons/user'
import { registerSchema } from '@/lib/validators'
import { REGISTER_MUTATION } from '@/graphql/mutations/auth'
import { useAuthStore } from '@/stores/auth'
import { useFormValidation } from '@/hooks/useFormValidation'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { Button } from '@/components/ui/Button'
import type { AuthPayload } from '@/types/auth'

export function RegisterPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const { form, errors, setField, validate } = useFormValidation({ name: '', email: '', password: '' })
  const [serverError, setServerError] = useState('')

  const [register, { loading }] = useMutation<{ register: AuthPayload }>(REGISTER_MUTATION)

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setServerError('')

    const result = validate(registerSchema)
    if (!result) return

    try {
      const { data } = await register({ variables: { input: result } })
      if (data) {
        setAuth(data.register.token, data.register.user)
        navigate('/')
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Erro ao criar conta')
    }
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Criar conta</h1>
        <p className="mt-1 text-sm text-gray-500">Comece a controlar suas finanças ainda hoje</p>
      </div>

      {serverError ? (
        <div className="mb-4 rounded-lg bg-danger-light p-3 text-sm text-danger">
          {serverError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nome completo"
          icon={User}
          placeholder="Seu nome completo"
          value={form.name}
          onChange={(e) => setField('name', e.target.value)}
          error={errors.name}
        />
        <Input
          label="E-mail"
          icon={Mail}
          type="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={(e) => setField('email', e.target.value)}
          error={errors.email}
        />
        <PasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          value={form.password}
          onChange={(e) => setField('password', e.target.value)}
          error={errors.password}
          infoText='A senha deve ter no mínimo 8 caracteres'
        />
        <Button type="submit" fullWidth loading={loading}>
          Cadastrar
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6 text-center text-sm text-gray-500 border-t-2 border-gray-200 dark:border-white/10">
        <div className='grow border-t-2 border-gray-300'></div>
        <div>ou</div>
        <div className='grow border-t-2 border-gray-300'></div>
      </div>

      <p className="my-6 text-center text-md text-gray-500">
        Já tem uma conta?
      </p>
      <Button type="button" variant='secondary' icon={LogIn} fullWidth>
        <Link to="/login">
          Fazer login
        </Link>
      </Button>
    </>
  )
}
