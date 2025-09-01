import fs from 'fs/promises'
import path from 'path'

const CROSSREF_BASE = 'https://api.crossref.org/works'

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

function sanitize(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function readCvTextPaths() {
  const repoRoot = process.cwd()
  const txtPath = path.resolve(repoRoot, 'data', 'cv_text.txt')
  return { txtPath }
}

async function readCvText() {
  const { txtPath } = readCvTextPaths()
  const raw = await fs.readFile(txtPath, 'utf8')
  return raw.replace(/\r\n?/g, '\n')
}

function extractPublicationBlocks(cv) {
  const lines = cv.split('\n').map(l => l.trim())
  const startPub = lines.findIndex(l => /research\s+publications/i.test(l))
  if (startPub === -1) return { journal: [], conference: [] }
  const afterPub = lines.slice(startPub + 1)

  // Find Journal Articles
  const jIdx = afterPub.findIndex(l => /journal\s+articles?/i.test(l))
  const cIdx = afterPub.findIndex(l => /conference\s+proceedings/i.test(l))
  let journal = []
  let conference = []
  if (jIdx !== -1) {
    const jLines = afterPub.slice(jIdx + 1, cIdx !== -1 ? cIdx : undefined)
    journal = jLines
  }
  if (cIdx !== -1) {
    const cLines = afterPub.slice(cIdx + 1)
    conference = cLines
  }
  return { journal, conference }
}

function groupNumberedItems(lines) {
  const items = []
  let cur = []
  const isStart = (l) => /^\d+(\.|\))?\s*/.test(l) || /^\d+\S/.test(l)
  for (const l of lines) {
    if (!l) continue
    if (isStart(l)) {
      if (cur.length) items.push(cur.join(' '))
      cur = [l.replace(/^\d+(\.|\))?\s*/, '')]
    } else {
      cur.push(l)
    }
  }
  if (cur.length) items.push(cur.join(' '))
  // cleanup odd linebreak issues like split nuclide mass numbers
  return items.map(t => sanitize(t.replace(/\b(\d{3})(\s+)([A-Z][a-z]?)\b/g, '$1$3')))
}

function extractTitleCandidate(text) {
  // Prefer quoted content
  const m = text.match(/[“"]([^”"]+)[”"]/)
  if (m) return sanitize(m[1])
  // Fallback: up to first period if it's long
  const idx = text.indexOf('.')
  if (idx > 30) return sanitize(text.slice(0, idx))
  return sanitize(text)
}

async function crossrefLookup(title) {
  try {
    const url = `${CROSSREF_BASE}?rows=1&query.bibliographic=${encodeURIComponent(title)}`
    const res = await fetch(url, { headers: { 'User-Agent': 'nuclear-portfolio/1.0 (mailto:example@example.com)' } })
    if (!res.ok) return null
    const json = await res.json()
    const it = json?.message?.items?.[0]
    if (!it) return null
    const doi = it.DOI || null
    const link = doi ? `https://doi.org/${doi}` : (it.URL || null)
    const year = it['issued']?.['date-parts']?.[0]?.[0] || null
    const journal = Array.isArray(it['container-title']) ? it['container-title'][0] : it['container-title']
    const officialTitle = Array.isArray(it.title) ? it.title[0] : it.title
    return { doi, url: link, year, journal, title: officialTitle || title }
  } catch (e) {
    return null
  }
}

async function enrichWithDois(list) {
  const out = []
  for (const raw of list) {
    const titleCand = extractTitleCandidate(raw)
    let meta = await crossrefLookup(titleCand)
    // Rate limiting courtesy
    await sleep(300)
    if (!meta) meta = { title: titleCand, doi: null, url: null, year: null, journal: null }
    out.push({ raw, ...meta })
  }
  return out
}

async function main() {
  const cv = await readCvText()
  const { journal, conference } = extractPublicationBlocks(cv)
  const journalItems = groupNumberedItems(journal)
  const confItems = groupNumberedItems(conference)

  const journalEnriched = await enrichWithDois(journalItems)
  const confEnriched = await enrichWithDois(confItems)

  const payload = {
    generatedAt: new Date().toISOString(),
    journal_articles: journalEnriched,
    conference_proceedings: confEnriched,
  }

  const outDir1 = path.resolve(process.cwd(), 'data')
  const outDir2 = path.resolve(process.cwd(), 'src', 'data')
  await fs.mkdir(outDir1, { recursive: true })
  await fs.mkdir(outDir2, { recursive: true })
  await fs.writeFile(path.join(outDir1, 'publications.json'), JSON.stringify(payload, null, 2), 'utf8')
  await fs.writeFile(path.join(outDir2, 'publications.json'), JSON.stringify(payload, null, 2), 'utf8')
  console.log(`[build-publications] Wrote ${path.join('data', 'publications.json')} and ${path.join('src','data','publications.json')}`)
  console.log(`[build-publications] Journal items: ${journalEnriched.length}, Conference items: ${confEnriched.length}`)
}

main().catch(e => { console.error('[build-publications] Failed:', e); process.exit(1) })

