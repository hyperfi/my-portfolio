import fs from 'fs/promises'
import path from 'path'

function cleanField(val) {
  if (!val) return '';
  // Normalize spaces
  let cleaned = val.replace(/\s+/g, ' ').trim();
  // Remove capitalization preservation braces (not preceded by lookbehinds for \, ^, or _)
  let prev;
  do {
    prev = cleaned;
    cleaned = cleaned.replace(/(?<![\\^_A-Za-z])\{([^{}]+)\}/g, '$1');
  } while (cleaned !== prev);
  return cleaned;
}

function decodeLatexAccents(str) {
  if (!str) return '';
  return str
    .replace(/\\ifmmode\s+\\u\{a\}\\else\s+\\u\{a\}\\fi\{\}/gi, 'ă')
    .replace(/\\ifmmode\s+\\mbox\{\\c\{t\}\}\\else\s+\\c\{t\}\\fi\{\}/gi, 'ț')
    .replace(/\\ifmmode\s+\\mbox\{\\c\{t\}\}\\else\s+\\c\{t\}\\fi\{\}\\ifmmode\s+\\u\{a\}\\else\s+\\u\{a\}\\fi\{\}/gi, 'ță')
    .replace(/\\ifmmode\s+\\mbox\{\\c\{t\}\}\\else\s+\\c\{t\}\\fi\{\}a/gi, 'ță')
    .replace(/\\ifmmode\s+\\u\{a\}\\else\s+\\u\{a\}\\fi\{\}rginean/gi, 'ărginean')
    .replace(/\\ifmmode\s+\\u\{a\}\\else\s+\\u\{a\}\\fi\{\}linescu/gi, 'ălinescu')
    .replace(/\\ifmmode\s+\\u\{a\}\\else\s+\\u\{a\}\\fi\{\}/gi, 'ă')
    .replace(/\\u\{a\}/gi, 'ă')
    .replace(/\\c\{t\}/gi, 'ț')
    .replace(/\\c\{s\}/gi, 'ș')
    .replace(/\\v\{c\}/gi, 'č')
    .replace(/\\v\{s\}/gi, 'š')
    .replace(/\\v\{z\}/gi, 'ž')
    .replace(/\\"u/gi, 'ü')
    .replace(/\\"U/gi, 'Ü')
    .replace(/\\"a/gi, 'ä')
    .replace(/\\"A/gi, 'Ä')
    .replace(/\\"o/gi, 'ö')
    .replace(/\\"O/gi, 'Ö')
    .replace(/\\'/gi, '')
    .replace(/\\`/gi, '')
    .replace(/\\~/gi, '')
    .replace(/\\^/gi, '')
    .replace(/\{\\([a-zA-Z])\}/g, '$1')
    .replace(/\{\}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeAuthorName(name) {
  name = name.trim();
  if (name.includes(',')) {
    const parts = name.split(',').map(p => p.trim());
    if (parts.length === 2) {
      return `${parts[1]} ${parts[0]}`;
    }
  }
  return name;
}

function parseAuthors(authorField) {
  if (!authorField) return '';
  const decoded = decodeLatexAccents(authorField);
  const authors = decoded.split(/\s+and\s+/gi).map(normalizeAuthorName);
  
  if (authors.length === 0) return '';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
  
  return authors.slice(0, -1).join(', ') + ', and ' + authors[authors.length - 1];
}

function parseBibtex(bibContent) {
  const entries = [];
  let index = 0;
  const n = bibContent.length;

  while (index < n) {
    const atIndex = bibContent.indexOf('@', index);
    if (atIndex === -1) break;

    const openBraceIndex = bibContent.indexOf('{', atIndex);
    if (openBraceIndex === -1) {
      index = atIndex + 1;
      continue;
    }

    const entryType = bibContent.slice(atIndex + 1, openBraceIndex).trim().toLowerCase();
    const commaIndex = bibContent.indexOf(',', openBraceIndex);
    if (commaIndex === -1 || commaIndex > bibContent.indexOf('}', openBraceIndex)) {
      index = openBraceIndex + 1;
      continue;
    }
    const entryKey = bibContent.slice(openBraceIndex + 1, commaIndex).trim();

    let braceCount = 1;
    let pos = openBraceIndex + 1;
    let entryBody = '';
    while (pos < n && braceCount > 0) {
      const char = bibContent[pos];
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
      }
      if (braceCount > 0) {
        entryBody += char;
      }
      pos++;
    }

    if (braceCount === 0) {
      const fields = parseFields(entryBody.slice(entryKey.length + 1));
      entries.push({
        type: entryType,
        key: entryKey,
        fields: fields
      });
      index = pos;
    } else {
      index = openBraceIndex + 1;
    }
  }
  return entries;
}

function parseFields(body) {
  const fields = {};
  let pos = 0;
  const n = body.length;

  while (pos < n) {
    const eqIdx = body.indexOf('=', pos);
    if (eqIdx === -1) break;

    const fieldName = body.slice(pos, eqIdx).trim().toLowerCase();
    if (!fieldName) {
      pos = eqIdx + 1;
      continue;
    }

    let valueStart = eqIdx + 1;
    while (valueStart < n && /\s/.test(body[valueStart])) {
      valueStart++;
    }

    if (valueStart >= n) break;

    let value = '';
    let nextPos = valueStart;

    if (body[valueStart] === '{') {
      let depth = 1;
      let i = valueStart + 1;
      while (i < n && depth > 0) {
        if (body[i] === '{') depth++;
        else if (body[i] === '}') depth--;
        if (depth > 0) {
          value += body[i];
        }
        i++;
      }
      nextPos = i;
    } else if (body[valueStart] === '"') {
      let i = valueStart + 1;
      while (i < n) {
        if (body[i] === '"' && body[i - 1] !== '\\') {
          break;
        }
        value += body[i];
        i++;
      }
      nextPos = i + 1;
    } else {
      let i = valueStart;
      while (i < n && body[i] !== ',' && body[i] !== '\n' && body[i] !== '\r') {
        value += body[i];
        i++;
      }
      value = value.trim();
      nextPos = i;
    }

    fields[fieldName] = cleanField(value);

    pos = nextPos;
    while (pos < n && (body[pos] === ',' || /\s/.test(body[pos]))) {
      pos++;
    }
  }

  return fields;
}

async function main() {
  const bibPath = path.resolve(process.cwd(), 'own-bib.bib');
  console.log(`Reading from ${bibPath}...`);
  const content = await fs.readFile(bibPath, 'utf8');
  const entries = parseBibtex(content);
  
  const journalArticles = [];
  const conferenceProceedings = [];
  const preprints = [];

  for (const entry of entries) {
    const f = entry.fields;
    const author = parseAuthors(f.author);
    const title = decodeLatexAccents(f.title);
    const journal = decodeLatexAccents(f.journal || f.booktitle || '');
    const year = parseInt(f.year) || null;
    const doi = f.doi || null;
    const url = f.url || (doi ? `https://doi.org/${doi.replace(/^https?:\/\/doi\.org\//, '')}` : null);
    const pages = f.pages || null;
    const volume = f.volume || null;
    const number = f.number || null;
    const abstract = f.abstract ? decodeLatexAccents(f.abstract) : null;
    const eprint = f.eprint || null;
    const archiveprefix = f.archiveprefix || null;
    
    const paper = {
      key: entry.key,
      title,
      author,
      journal,
      year,
      volume,
      number,
      pages,
      doi,
      url,
      abstract,
      eprint,
      archiveprefix
    };

    if (entry.type === 'article') {
      journalArticles.push(paper);
    } else if (entry.type === 'inproceedings') {
      conferenceProceedings.push(paper);
    } else {
      preprints.push(paper);
    }
  }

  // Sort them by year descending
  const sortByYear = (a, b) => (b.year || 0) - (a.year || 0);
  journalArticles.sort(sortByYear);
  conferenceProceedings.sort(sortByYear);
  preprints.sort(sortByYear);

  const payload = {
    generatedAt: new Date().toISOString(),
    journal_articles: journalArticles,
    conference_proceedings: conferenceProceedings,
    preprints: preprints
  };

  const outDir1 = path.resolve(process.cwd(), 'data');
  const outDir2 = path.resolve(process.cwd(), 'src', 'data');
  
  await fs.mkdir(outDir1, { recursive: true });
  await fs.mkdir(outDir2, { recursive: true });
  
  await fs.writeFile(path.join(outDir1, 'publications.json'), JSON.stringify(payload, null, 2), 'utf8');
  await fs.writeFile(path.join(outDir2, 'publications.json'), JSON.stringify(payload, null, 2), 'utf8');

  console.log(`[build-publications] Successfully compiled own-bib.bib!`);
  console.log(`- Journal articles: ${journalArticles.length}`);
  console.log(`- Conference proceedings: ${conferenceProceedings.length}`);
  console.log(`- Preprints: ${preprints.length}`);
}

main().catch(e => {
  console.error('Error running parse-bib:', e);
  process.exit(1);
});
