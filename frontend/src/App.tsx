import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { TransactionsPage } from '@/pages/TransactionsPage'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { useAuthStore } from '@/stores/auth'

function AuthRedirect({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token)
  if (token) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AuthRedirect>
              <AuthLayout />
            </AuthRedirect>
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transacoes" element={<TransactionsPage />} />
            <Route path="/categorias" element={<CategoriesPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
