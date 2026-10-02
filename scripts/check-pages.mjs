import assert from 'node:assert/strict'
import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const output = 'dist/client'
const base = process.env.PAGES_BASE_PATH || '/Aededolken-blog-pages/'
const dinnerFiles = (await readdir('content/dinners')).filter((file) => file.endsWith('.md'))
const pages = [
  'index.html',
  ...dinnerFiles.map((file) => `dinners/${file.replace(/\.md$/, '')}/index.html`),
]

for (const page of pages) {
  const html = await readFile(join(output, page), 'utf8')
  assert.match(html, /Ædedolken/, `${page} must render the blog`)
  assert.doesNotMatch(html, /\/\.netlify\/images/, `${page} must use static photos`)

  const urls = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1])
  for (const match of html.matchAll(/\bsrcSet="([^"]+)"/gi)) {
    urls.push(...match[1].split(',').map((entry) => entry.trim().split(/\s+/)[0]))
  }

  for (const url of urls) {
    if (/^(https?:|data:|mailto:|#)/.test(url)) continue
    assert.ok(url.startsWith(base), `${page}: URL escapes the Pages base: ${url}`)
    const path = decodeURIComponent(url.slice(base.length).split(/[?#]/)[0])
    let file = join(output, path)
    const info = await stat(file).catch(() => null)
    if (info?.isDirectory()) file = join(file, 'index.html')
    assert.ok((await stat(file).catch(() => null))?.isFile(), `${page}: missing file for ${url}`)
  }
}

console.log(`Verified ${pages.length} static pages and their links, scripts, styles and photos.`)
