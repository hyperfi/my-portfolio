import { mkdir, writeFile } from 'node:fs/promises'

const workerSource = `const wantsHtml = (request) =>
  request.method === 'GET' && (request.headers.get('accept') || '').includes('text/html')

export default {
  async fetch(request, env) {
    if (!env.ASSETS) {
      return new Response('Static asset binding unavailable', { status: 503 })
    }

    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404 || !wantsHtml(request)) return response

    const url = new URL(request.url)
    url.pathname = '/index.html'
    return env.ASSETS.fetch(new Request(url, request))
  }
}
`

await mkdir('dist/server', { recursive: true })
await writeFile('dist/server/index.js', workerSource)
