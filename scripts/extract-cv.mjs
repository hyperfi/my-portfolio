import fs from 'fs/promises'
import path from 'path'
import pdfParse from 'pdf-parse/lib/pdf-parse.js'

function resolveInput(p) {
  if (!p) return path.resolve(process.cwd(), '../CV_Abhishek.pdf')
  return path.isAbsolute(p) ? p : path.resolve(process.cwd(), p)
}

function sanitizeLines(text) {
  return text
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map(l => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

function extractEmail(text) {
  const m = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return m ? m[0] : null
}

function sectionIndices(lines) {
  const headers = [
    /publications?/i,
    /selected publications?/i,
    /research interests?/i,
    /research areas?/i,
    /summary|profile|objective/i,
    /education/i,
    /experience/i,
    /awards|honours|honors/i,
    /projects?/i,
    /skills?/i,
  ]
  return lines
    .map((l, i) => ({ i, l }))
    .filter(({ l }) => headers.some(h => h.test(l)))
    .sort((a, b) => a.i - b.i)
}

function grabBetween(lines, startIdx, nextIdx) {
  const a = startIdx + 1
  const b = nextIdx ?? lines.length
  return lines.slice(a, b)
}

function extractSections(lines) {
  const idx = sectionIndices(lines)
  const get = (re) => {
    const h = idx.find(({ l }) => re.test(l))
    if (!h) return null
    const next = idx.find(x => x.i > h.i)
    return { header: lines[h.i], body: grabBetween(lines, h.i, next?.i) }
  }
  const pubs = get(/selected publications?|publications?/i)
  const interests = get(/research interests?|research areas?/i)
  const summary = get(/summary|profile|objective/i)
  return { pubs, interests, summary }
}

function parsePublications(bodyLines) {
  if (!bodyLines) return []
  const items = []
  for (const line of bodyLines) {
    const m = line.match(/^(\d+\.|•|-)?\s*(.+)$/)
    if (!m) continue
    const text = m[2].trim()
    if (!text) continue
    const year = (text.match(/(19|20)\d{2}/) || [])[0] || null
    items.push({ title: text, journal: null, year, tags: [] })
  }
  return items.slice(0, 5)
}

function parseInterests(bodyLines) {
  if (!bodyLines) return []
  const items = []
  for (const line of bodyLines) {
    const m = line.match(/^(\d+\.|•|-)?\s*(.+)$/)
    if (!m) continue
    const text = m[2].trim()
    if (!text) continue
    items.push(text)
  }
  return items.slice(0, 8)
}

function firstSummary(text, lines, summarySection) {
  if (summarySection?.body?.length) {
    return summarySection.body.join(' ').slice(0, 600)
  }
  const firstIdx = lines.findIndex(l => /education|experience|publications|research interests?/i.test(l))
  const seg = firstIdx > 0 ? lines.slice(0, firstIdx) : lines.slice(0, 20)
  return seg.join(' ').slice(0, 600)
}

async function main() {
  const inputPath = resolveInput(process.argv[2])
  const pdfBuf = await fs.readFile(inputPath)
  const parsed = await pdfParse(pdfBuf)
  const text = parsed.text || ''
  const lines = sanitizeLines(text)
  const { pubs, interests, summary } = extractSections(lines)

  const outDir = path.resolve(process.cwd(), 'data')
  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(path.join(outDir, 'cv_text.txt'), text, 'utf8')

  const email = extractEmail(text)
  const data = {
    name: 'Dr Abhishek',
    email,
    summary: firstSummary(text, lines, summary),
    researchInterests: parseInterests(interests?.body) || [],
    publications: parsePublications(pubs?.body) || [],
    generatedAt: new Date().toISOString(),
    source: inputPath,
  }

  await fs.writeFile(path.join(outDir, 'cv_extracted.json'), JSON.stringify(data, null, 2), 'utf8')
  console.log('[extract-cv] Wrote data/cv_extracted.json with fields:', Object.keys(data))
  if (email) console.log('[extract-cv] Detected email:', email)
}

main().catch(err => {
  console.error('[extract-cv] Failed:', err)
  process.exit(1)
})

