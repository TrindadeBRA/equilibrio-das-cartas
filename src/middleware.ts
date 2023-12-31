import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {

  let cookieMail = request.cookies.get('email')
  let cookieJwt = request.cookies.get('jwt')
  let cookieUserId = request.cookies.get('user_id')
  let cookieFirstName = request.cookies.get('first_name')
  let cookieLastName = request.cookies.get('last_name')
  let cookieBirth = request.cookies.get('date_of_birth')
  let cookieAvatar = request.cookies.get('avatar_url')

  if (!cookieMail || !cookieJwt || !cookieUserId) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const absoluteUrl = new URL('/', baseUrl);
    return NextResponse.redirect(absoluteUrl.href);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/jogar-tarot/:path*', '/dashboard/:path*', '/carta-sorteada/:path*', '/meu-perfil/:path*', '/historico-de-cartas/:path*', '/tokens/:path*']  ,
}
