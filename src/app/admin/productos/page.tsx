'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Producto = {
  id: string
  nombre: string
  precio: number
  oferta: number
  imagen: string
}

export default function ListaProductos() {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:8000/products', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProductos)
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link href="/admin/productos/new" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">
          + Agregar producto
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((p) => (
          <div key={p.id} className="bg-white rounded shadow p-4 space-y-2">
            <img src={p.imagen} className="w-full h-48 object-cover rounded" alt={p.nombre} />
            <h3 className="text-lg font-bold">{p.nombre}</h3>
            <p className="text-gray-700">S/ {p.precio.toFixed(2)}</p>
            {p.oferta > 0 && <p className="text-sm text-pink-600 font-medium">{p.oferta}% OFF</p>}
            <div className="flex gap-2 mt-2">
              <Link href={`/admin/productos/${p.id}/edit`} className="text-blue-500 hover:underline text-sm">Editar</Link>
              <button className="text-red-500 hover:underline text-sm">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
