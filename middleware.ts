import { NextResponse } from 'next/server'

export function middleware() {
  return new Response('Offline for now, might be back later :)', { status: 503 })
}

export const config = {
  matcher: '/((?!_next|favicon.ico).*)',
}