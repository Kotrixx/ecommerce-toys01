'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { API } from '@/lib/api'
import fetchData from '@/lib/fetchData'

export default function NuevoProducto() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    stock: 0,  // Valor predeterminado para stock
    oferta: '',
    category_id: '',
    franchise_id: '',
    brand_id: '',
  })
  const [imagenes, setImagenes] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // Datos de las opciones
  const [categories, setCategories] = useState<any[]>([])
  const [franchises, setFranchises] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem('token') || ''
        const categoriesData = await fetchData(API.CATEGORIAS_ALL, token)
        const franchisesData = await fetchData(API.FRANQUICIAS_TODO, token)
        const brandsData = await fetchData(API.MARCAS_ALL, token)

        setCategories(categoriesData)
        setFranchises(franchisesData)
        setBrands(brandsData)
      } catch (error) {
        setError('Error al cargar las opciones')
      }
    }
    fetchOptions()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    const token = localStorage.getItem('token')
    const formData = new FormData()

    formData.append('name', form.nombre)
    formData.append('price', form.precio)
    formData.append('stock', form.stock.toString())  // Asegúrate de que stock sea un número entero, convertido a string
    formData.append('category_id', form.category_id)
    formData.append('franchise_id', form.franchise_id)
    formData.append('brand_id', form.brand_id)
    formData.append('is_offer', (Number(form.oferta) > 0).toString())
    formData.append(
      'offer_price',
      form.oferta && form.oferta !== '' // Enviar offer_price solo si oferta es válida
        ? (parseFloat(form.precio) * (1 - Number(form.oferta) / 100)).toFixed(2)
        : ''  // Si no hay oferta, no enviar offer_price
    )
    imagenes.forEach((img) => formData.append('images', img))

    try {
      const res = await fetch(API.PRODUCTS, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/gestion/productos')
        }, 1500)
      } else {
        const errorText = await res.text()
        throw new Error(errorText)
      }
    } catch (err) {
      console.error(err)
      setError('No se pudo crear el producto. Verifica los datos o la conexión.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 4)
      setImagenes(selectedFiles)
    }
  }

  return (
    <div className="bg-white text-gray-900 rounded p-6 max-w-2xl mx-auto mt-8 shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Agregar producto</h1>

      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          ✅ Producto creado exitosamente
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Nombre</label>
          <input
            type="text"
            placeholder="Nombre del producto"
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-900"
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Precio</label>
          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-900"
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Oferta (%)</label>
          <input
            type="number"
            placeholder="Oferta (%)"
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-900"
            onChange={(e) => setForm({ ...form, oferta: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Stock</label>
          <input
            type="number"
            placeholder="Stock"
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-900"
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
          />
        </div>

        {/* Selección de categoría, franquicia y marca */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Categoría</label>
          <select
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-900"
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Franquicia</label>
          <select
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-900"
            onChange={(e) => setForm({ ...form, franchise_id: e.target.value })}
            required
          >
            <option value="">Selecciona una franquicia</option>
            {franchises.map((franchise) => (
              <option key={franchise.id} value={franchise.id}>
                {franchise.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Marca</label>
          <select
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-900"
            onChange={(e) => setForm({ ...form, brand_id: e.target.value })}
            required
          >
            <option value="">Selecciona una marca</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Imágenes</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="w-full"
            onChange={handleImageChange}
            required
          />
          <p className="text-sm text-gray-500">Puedes subir hasta 4 imágenes.</p>
        </div>

        {imagenes.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {imagenes.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt={`preview-${i}`}
                className="rounded object-cover h-32 w-full"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? 'bg-pink-300' : 'bg-pink-600 hover:bg-pink-700'
          } text-white px-4 py-2 rounded transition`}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  )
}
