import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API

  let cookieMail = request.cookies.get('email')
  console.log("cookieMail", cookieMail) // => { name: 'nextjs', value: 'fast', Path: '/' }
  let cookieJwt = request.cookies.get('jwt')
  console.log("cookieJwt", cookieJwt) // => { name: 'nextjs', value: 'fast', Path: '/' }

  const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]


  if (!cookieJwt) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Defina NEXT_PUBLIC_BASE_URL em suas variáveis de ambiente
    const absoluteUrl = new URL('/', baseUrl);
    return NextResponse.redirect(absoluteUrl.href);
  }
 
  // Setting cookies on the response using the `ResponseCookies` API
  // const response = NextResponse.next()

  // Retorne uma instância de NextResponse com código de status 200 (ou outro código de status apropriado)
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/jogar-tarot/:path*', '/dashboard/:path*', '/carta-sorteada/:path*', '/meu-perfil/:path*', '/historico-de-cartas/:path*', '/tokens/:path*']
,}
