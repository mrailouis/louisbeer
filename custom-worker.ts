const TYPING_HOST = 'typing.louisbeer.net'
const INTERNAL_TYPING_PREFIX = '/typing'

function isTypingAssetPath(pathname: string) {
  return pathname.startsWith('/_next') || pathname === '/favicon.ico'
}

function rewriteRequest(request: Request, pathname: string) {
  const url = new URL(request.url)
  url.pathname = pathname
  return new Request(url, request)
}

// @ts-expect-error .open-next/worker.js is generated at build time
import { default as nextHandler } from './.open-next/worker.js'
// @ts-expect-error .open-next/worker.js is generated at build time
export { DOQueueHandler, DOShardedTagCache } from './.open-next/worker.js'

const worker = {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url)
    const host = request.headers.get('host')?.split(':')[0] ?? ''

    if (host === TYPING_HOST && !isTypingAssetPath(url.pathname)) {
      const pathname =
        url.pathname === '/'
          ? INTERNAL_TYPING_PREFIX
          : `${INTERNAL_TYPING_PREFIX}${url.pathname}`
      return nextHandler.fetch(rewriteRequest(request, pathname), env, ctx)
    }

    if (host !== TYPING_HOST && (url.pathname === '/typing' || url.pathname.startsWith('/typing/'))) {
      url.pathname = '/'
      url.search = ''
      return Response.redirect(url, 307)
    }

    return nextHandler.fetch(request, env, ctx)
  },
}

export default worker
