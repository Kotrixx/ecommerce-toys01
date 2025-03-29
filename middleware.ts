// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname

  console.log('⚡ Middleware ejecutado en ruta:', pathname)
  console.log('🔐 Token presente:', !!token)

  const isProtected = pathname.startsWith('/admin')

  if (isProtected && !token) {
    console.log('⛔ Redirigiendo a /admin/login')
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
