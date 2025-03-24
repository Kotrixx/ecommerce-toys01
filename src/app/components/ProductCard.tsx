import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
  id: number
  nombre: string
  precio: number
  oferta?: number
  rating: number
  imagen: string // nombre del archivo (ej. goku.jpg)
}

export default function ProductCard({ id, nombre, precio, oferta = 0, rating, imagen }: ProductCardProps) {
  const precioOriginal = oferta > 0 ? ((100 / (100 - oferta)) * precio).toFixed(2) : null

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        {oferta > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            {oferta}% OFF
          </span>
        )}
        <Image
          src={`/img/productos/${imagen}`}
          alt={nombre}
          width={400}
          height={360}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h5 className="font-semibold text-lg mb-1">{nombre}</h5>
        <div className="text-yellow-500 text-sm mb-2">⭐ {rating}</div>
        <div className="mb-2">
          {precioOriginal && (
            <p className="line-through text-red-500 text-sm">S/. {precioOriginal}</p>
          )}
          <p className="text-lg font-bold">S/. {precio.toFixed(2)}</p>
        </div>
        <Link
          href={`/oferta/agregar/${id}`}
          className="inline-block mt-2 px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition"
        >
          Agregar Descuento
        </Link>
      </div>
    </div>
  )
}
