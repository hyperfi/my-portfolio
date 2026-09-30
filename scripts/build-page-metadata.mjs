import { readFile, mkdir, writeFile } from 'node:fs/promises'

const pages = JSON.parse(await readFile('src/data/page-meta.json', 'utf8'))
const source = await readFile('dist/index.html', 'utf8')
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
for (const [route, meta] of Object.entries(pages)) {
  const canonical = `https://www.dr-abhishek.com${route}`
  let html = source.replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
  for (const [attribute, key, value] of [
    ['name', 'description', meta.description], ['property', 'og:title', meta.title],
    ['property', 'og:description', meta.description], ['property', 'og:url', canonical]
  ]) html = html.replace(new RegExp(`(<meta ${attribute}="${key}" content=")[^"]*(")`), `$1${escape(value)}$2`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
  const directory = route === '/' ? 'dist' : `dist${route}`
  await mkdir(directory, { recursive: true })
  await writeFile(`${directory}/index.html`, html)
}
console.log('[build-page-metadata] Wrote route-specific metadata for all three pages.')
