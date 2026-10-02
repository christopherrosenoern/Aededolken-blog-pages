import { allDinners, type Dinner } from 'content-collections'

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** All dinners, newest first. */
export const dinners: Dinner[] = [...allDinners].sort(
  (a, b) => b.year - a.year || b.month - a.month,
)

export const years = [...new Set(dinners.map((d) => d.year))]

export function findDinner(slug: string) {
  return dinners.find((d) => d.slug === slug)
}

/** Resize photos via Netlify, or use build-time WebP images on GitHub Pages. */
export function cdn(src: string, width: number) {
  if (import.meta.env.VITE_GITHUB_PAGES) {
    const image = src.replace(/^\/img\//, '').replace(/\.[^.]+$/, '')
    return `${import.meta.env.BASE_URL}img/optimized/${image}-${width}.webp`
  }
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp`
}
