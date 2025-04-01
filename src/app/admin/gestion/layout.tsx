// src/app/admin/dashboard/layout.tsx
import { ReactNode } from 'react'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
