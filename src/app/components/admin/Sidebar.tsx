'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
  { href: '/admin/gestion/dashboard', label: 'Dashboard' },

  { section: 'Gestión de Productos' },
  { href: '/admin/gestion/productos', label: 'Productos' },
  { href: '/admin/gestion/categorias', label: 'Categorías' },
  { href: '/admin/gestion/franquicias', label: 'Franquicias' },
  { href: '/admin/gestion/marcas', label: 'Marcas' },

  { section: 'Otros' },
  { href: '/admin/gestion/preventas', label: 'Preventas' },
  { href: '/admin/usuarios', label: 'Usuarios' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-zinc-900 text-white flex flex-col">
      <div className="p-5 text-xl font-bold tracking-wide">🛒 Admin Panel</div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link, i) =>
          link.section ? (
            <div key={i} className="mt-6 mb-2 text-xs uppercase text-zinc-400 tracking-wide">
              {link.section}
            </div>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'block px-3 py-2 rounded hover:bg-zinc-800 transition',
                pathname.startsWith(link.href) && 'bg-pink-600 text-white font-semibold'
              )}
            >
              {link.label}
            </Link>
          )
        )}
      </nav>

      <div className="p-4 text-xs text-zinc-500">© 2025 LuchitoGames</div>
    </aside>
  )
}
