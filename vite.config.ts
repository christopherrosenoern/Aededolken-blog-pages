import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import contentCollections from '@content-collections/vite'

const githubPages = process.env.GITHUB_PAGES === 'true'
const base = githubPages
  ? process.env.PAGES_BASE_PATH || '/Aededolken-blog-pages/'
  : '/'

const config = defineConfig({
  base,
  define: {
    'import.meta.env.VITE_GITHUB_PAGES': JSON.stringify(githubPages),
  },
  plugins: [
    contentCollections(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    !githubPages && netlify(),
    tanstackStart({
      router: { basepath: base },
      prerender: {
        enabled: githubPages,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
        filter: ({ path }) => {
          const routePath = path.startsWith(base) ? `/${path.slice(base.length)}` : path
          return routePath === '/' || routePath.startsWith('/dinners/')
        },
      },
    }),
    viteReact(),
  ],
})

export default config
