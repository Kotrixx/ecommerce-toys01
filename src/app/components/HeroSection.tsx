import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="text-center py-16 px-4 bg-gradient-to-r from-slate-900 via-purple-900 to-pink-900 text-white">
      <h2 className="text-4xl font-extrabold mb-4">¡Colecciona tus héroes favoritos!</h2>
      <p className="text-lg mb-6">
        Encuentra figuras de acción de anime, superhéroes, videojuegos y más. ¡Envíos a todo el Perú!
      </p>
      <Link
        href="/categorias"
        className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
      >
        Ver catálogo
      </Link>
    </div>
  )
}
