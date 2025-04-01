import './styles/globals.css'
import type { Metadata } from 'next'
import LayoutWrapper from '@/components/LayoutWrapper'

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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
