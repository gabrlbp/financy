import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import { Avatar } from '@/components/ui/Avatar'
import logo from '@/assets/logo.svg'

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/transacoes', label: 'Transações' },
  { to: '/categorias', label: 'Categorias' },
]

export function Navbar() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <img src={logo} alt="Financy" className="h-7" />
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-brand' : 'text-gray-600 hover:text-gray-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <button
          onClick={() => navigate('/perfil')}
          className="cursor-pointer"
        >
          {user && <Avatar name={user.name} size="sm" />}
        </button>
      </div>
    </nav>
  )
}
