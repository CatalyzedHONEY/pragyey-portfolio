
import { createHmac, timingSafeEqual } from 'node:crypto'

const COOKIE_NAME = 'pkg_admin_session'
const SESSION_DURATION = 8 * 60 * 60

function response(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  })
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (
      request.method === 'GET' &&
      url.searchParams.get('action') === 'logout'
    ) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/admin-login',
          'Cache-Control': 'no-store',
          'Set-Cookie':
            `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
        },
      })
    }

    if (request.method !== 'POST') {
      return response({ error: 'Method not allowed.' }, 405)
    }

    if (request.headers.get('origin') !== url.origin) {
      return response({ error: 'Invalid request origin.' }, 403)
    }

    const password = process.env.ADMIN_PASSWORD
    const secret = process.env.ADMIN_SESSION_SECRET

    if (!password || !secret || secret.length < 32) {
      return response({ error: 'Authentication is not configured.' }, 503)
    }

    const contentLength = Number(
      request.headers.get('content-length') || 0,
    )

    if (contentLength > 4096) {
      return response({ error: 'Request too large.' }, 413)
    }

    let parsed: unknown

    try {
      parsed = await request.json()
    } catch {
      return response({ error: 'Invalid request.' }, 400)
    }

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('password' in parsed)
    ) {
      return response({ error: 'Invalid password.' }, 401)
    }

    const submittedPassword = parsed.password

    if (typeof submittedPassword !== 'string') {
      return response({ error: 'Invalid password.' }, 401)
    }

    const submitted = createHmac('sha256', secret)
      .update(submittedPassword)
      .digest()

    const expected = createHmac('sha256', secret)
      .update(password)
      .digest()

    if (!timingSafeEqual(submitted, expected)) {
      return response({ error: 'Incorrect password.' }, 401)
    }

    const payload = Buffer.from(
      JSON.stringify({
        exp: Math.floor(Date.now() / 1000) + SESSION_DURATION,
      }),
    ).toString('base64url')

    const signature = createHmac('sha256', secret)
      .update(payload)
      .digest('base64url')

    const token = `${payload}.${signature}`

    return response(
      { success: true },
      200,
      {
        'Set-Cookie':
          `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DURATION}`,
      },
    )
  },
}
