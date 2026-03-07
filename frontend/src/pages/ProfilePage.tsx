import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client/react'
import LogOut from 'lucide-react/dist/esm/icons/log-out'
import Mail from 'lucide-react/dist/esm/icons/mail'
import UserRound from 'lucide-react/dist/esm/icons/user-round'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/auth'
import { profileSchema } from '@/lib/validators'

export function ProfilePage() {
  const navigate = useNavigate()
  const apolloClient = useApolloClient()
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)

  const [name, setName] = useState(user?.name || '')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.SubmitEvent) {
    e.preventDefault()
    setError('')
    setSaved(false)

    const result = profileSchema.safeParse({ name })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    if (user) {
      setUser({ ...user, name: result.data.name })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  function handleLogout() {
    logout()
    apolloClient.clearStore()
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Card className='p-8'>
        <div className="mb-6 flex flex-col items-center gap-3">
          <Avatar name={user.name} size="lg" />
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className='border-t border-gray-200 my-8'></div>

        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Nome completo"
            icon={UserRound}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error}
          />

          <Input
            label="E-mail"
            icon={Mail}
            value={user.email}
            disabled
          />
          <p className="text-xs text-gray-400 -mt-3 mb-8">O e-mail não pode ser alterado</p>

          <Button type="submit" fullWidth>
            {saved ? 'Salvo!' : 'Salvar alterações'}
          </Button>
        </form>

        <Button className='mt-4' variant="secondary" icon={LogOut} iconColor='#E54444' onClick={handleLogout} fullWidth>
          Sair da conta
        </Button>
      </Card>
    </div>
  )
}
