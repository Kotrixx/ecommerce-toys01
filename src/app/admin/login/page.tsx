'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.access_token)
      router.push('/admin/productos')
    } else {
      alert('Credenciales inválidas')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-400 px-4">
      <div className="bg-white rounded-2xl shadow-2xl flex max-w-5xl w-full overflow-hidden">
        {/* Ilustración izquierda */}
        <div className="w-1/2 bg-white hidden md:flex items-center justify-center p-6">
          <img src="/img/login-rocket.svg" alt="Login" className="max-h-96" />
        </div>

        {/* Formulario login */}
        <div className="w-full md:w-1/2 bg-zinc-900 text-white p-10 space-y-6">
          <div className="flex items-center justify-center mb-4">
            <img src="/img/logo3_1.png" className="h-12" alt="Logo" />
          </div>
          <h2 className="text-xl font-semibold text-center">Accede a tu cuenta</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-md bg-white text-black outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              className="w-full px-4 py-3 rounded-md bg-white text-black outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-black text-green-400 border border-green-400 py-3 rounded-md font-semibold hover:bg-green-600 hover:text-white transition shadow-[0_0_15px_rgba(0,255,0,0.4)]"
            >
              Log in
            </button>
          </form>

          <div className="text-sm text-gray-300 space-y-1">
            <p>¿Olvidaste tu contraseña? <a href="#" className="underline text-purple-300">Recupérala aquí</a></p>
            <p>¿No tienes una cuenta? <a href="#" className="underline text-purple-300">Regístrate aquí</a></p>
            <p className="text-xs text-gray-400 mt-4">Respetamos la privacidad de tus datos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
