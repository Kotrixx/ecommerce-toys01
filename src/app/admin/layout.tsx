// src/app/admin/layout.tsx
import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold tracking-wide">🛒 Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="block hover:text-pink-400">Dashboard</Link>
          <Link href="/admin/productos" className="block hover:text-pink-400">Productos</Link>
          <Link href="/admin/categorias" className="block hover:text-pink-400">Categorías</Link>
          <Link href="/admin/preventas" className="block hover:text-pink-400">Preventas</Link>
          <Link href="/admin/usuarios" className="block hover:text-pink-400">Usuarios</Link>
        </nav>
        <div className="p-4 text-xs text-zinc-500">© 2025 LuchitoGames</div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
