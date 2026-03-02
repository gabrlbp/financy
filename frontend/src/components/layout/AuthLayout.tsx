import { Outlet } from 'react-router-dom'
import logo from '@/assets/logo.svg'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="Financy" className="h-8" />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
