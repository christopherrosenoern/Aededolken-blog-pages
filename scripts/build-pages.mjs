import { execFileSync } from 'node:child_process'
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

// Keep the normal Netlify build available; this command produces static Pages files.
execFileSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, GITHUB_PAGES: 'true' },
})

const photos = await readdir('public/img', { recursive: true })
for (const photo of photos.filter((name) => /\.(png|jpe?g|webp)$/i.test(name))) {
  for (const width of [600, 1000, 1600]) {
    const output = join(
      'dist/client/img/optimized',
      `${photo.replace(/\.[^.]+$/, '')}-${width}.webp`,
    )
    await mkdir(dirname(output), { recursive: true })
    await sharp(join('public/img', photo))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(output)
  }
}

await writeFile('dist/client/.nojekyll', '')
execFileSync(process.execPath, ['scripts/check-pages.mjs'], {
  stdio: 'inherit',
})
