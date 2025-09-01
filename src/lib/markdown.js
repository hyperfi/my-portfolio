import { marked } from 'marked'
import katex from 'katex'
import { sanitizeHTML } from './sanitize'

// Preprocess LaTeX ($...$ and $$...$$) with KaTeX, then run through marked
function renderMath(md) {
  if (!md) return md

  // 1) Extract fenced code blocks to avoid processing math inside them
  const codeBlocks = []
  md = md.replace(/```[\s\S]*?```/g, (m) => {
    codeBlocks.push(m)
    return `@@CODE_BLOCK_${codeBlocks.length - 1}@@`
  })

  // 2) Extract inline code
  const inlineCodes = []
  md = md.replace(/`[^`]*`/g, (m) => {
    inlineCodes.push(m)
    return `@@INLINE_CODE_${inlineCodes.length - 1}@@`
  })

  // 3) Block math: $$...$$ (multiline)
  md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_m, expr) => {
    try {
      return katex.renderToString(expr.trim(), { displayMode: true, throwOnError: false })
    } catch {
      return _m // fallback to original text on error
    }
  })

  // 4) Inline math: $...$ (no newlines)
  md = replaceInlineDollarMath(md)

  // 5) Restore inline code and code blocks
  md = md.replace(/@@INLINE_CODE_(\d+)@@/g, (_m, i) => inlineCodes[Number(i)] || _m)
  md = md.replace(/@@CODE_BLOCK_(\d+)@@/g, (_m, i) => codeBlocks[Number(i)] || _m)

  return md
}

function replaceInlineDollarMath(text) {
  let out = ''
  let i = 0
  const n = text.length
  while (i < n) {
    const ch = text[i]
    if (ch === '$') {
      // If escaped like \$, keep literal
      if (i > 0 && text[i - 1] === '\\') {
        out += '$'
        i += 1
        continue
      }
      // If followed by whitespace or end, treat as literal
      if (i + 1 >= n || /\s/.test(text[i + 1])) {
        out += '$'
        i += 1
        continue
      }
      // Find closing unescaped $
      let j = i + 1
      let found = -1
      while (j < n) {
        if (text[j] === '$' && text[j - 1] !== '\\') {
          found = j
          break
        }
        // stop at newline to avoid overly-greedy across paragraphs
        if (text[j] === '\n') break
        j += 1
      }
      if (found !== -1) {
        const expr = text.slice(i + 1, found)
        try {
          out += katex.renderToString(expr.trim(), { displayMode: false, throwOnError: false })
        } catch {
          out += text.slice(i, found + 1) // fallback to original
        }
        i = found + 1
        continue
      } else {
        out += '$'
        i += 1
        continue
      }
    }
    out += ch
    i += 1
  }
  return out
}

export function renderMarkdownToSafeHtml(md) {
  const withMath = renderMath(md || '')
  const html = marked.parse(withMath)
  return sanitizeHTML(html)
}

