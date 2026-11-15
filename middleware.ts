
import { createHmac, timingSafeEqual } from 'node:crypto'
import { next } from '@vercel/functions'

const COOKIE_NAME = 'pkg_admin_session'

export const config = {
    runtime: 'nodejs',
    matcher: ['/admin', '/admin/:path*'],
}

export default function middleware(request: Request) {
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!secret) {
    return new Response('Admin authentication is not configured.', {
      status: 503,
    })
  }

  const cookieHeader = request.headers.get('cookie') || ''
  const cookie = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))

  if (cookie) {
    const token = cookie.slice(COOKIE_NAME.length + 1)
    const [payload, signature, extra] = token.split('.')

    if (payload && signature && !extra) {
      try {
        const expected = createHmac('sha256', secret)
          .update(payload)
          .digest()

        const actual = Buffer.from(signature, 'base64url')

        if (
          actual.length === expected.length &&
          timingSafeEqual(actual, expected)
        ) {
          const session = JSON.parse(
            Buffer.from(payload, 'base64url').toString('utf8'),
          )

          if (
            typeof session.exp === 'number' &&
            session.exp > Math.floor(Date.now() / 1000)
          ) {
            return next()
          }
        }
      } catch {
        // Invalid session: redirect to login.
      }
    }
  }

  return Response.redirect(
    new URL('/admin-login', request.url),
    302,
  )
}
