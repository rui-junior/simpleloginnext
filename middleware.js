import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export default async function middleware(req, res) {

  const token = req.cookies.has('token')
  
  if(!token){

    return NextResponse.redirect(new URL('/', req.url));

  }

}

export const config = {
  matcher: '/user/:path*',
}