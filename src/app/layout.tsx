import './styles/globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingSocials from '@/components/FloatingSocials'
import CountdownBanner from '@/components/CountdownBanner'

export const metadata: Metadata = {
  title: 'OneStore',
  description: 'Ecommerce de videojuegos y juguetes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <Navbar />
        <CountdownBanner />
        {children}
        <Footer />
        <FloatingSocials />
      </body>
    </html>
  )
}
