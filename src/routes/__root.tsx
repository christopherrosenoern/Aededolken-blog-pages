import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'

import Sidebar from '@/components/Sidebar'
import { dinners } from '@/lib/dinners'
import '../styles.css'

const siteName = 'Ædedolken – the food club'
const siteDescription =
  'Ædedolken is a food club with one dinner every month. Menus, wines, photos and quotes from every dinner.'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'icon', href: `${import.meta.env.BASE_URL}favicon.ico` }],
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const latest = dinners[0]
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="page">
          <header className="masthead">
            <Link to="/" className="logo">
              Ædedolken
            </Link>
            <p className="tagline">» one dinner every month since forever «</p>
          </header>
          <nav className="navbar">
            <Link to="/" activeOptions={{ exact: true }}>
              Home
            </Link>
            {latest && (
              <Link to="/dinners/$slug" params={{ slug: latest.slug }}>
                Latest dinner
              </Link>
            )}
          </nav>
          <div className="ticker" aria-hidden="true">
            <span>
              {latest
                ? `*** Latest: ${latest.monthName} ${latest.year} at ${latest.host}'s – ${latest.theme} *** Remember to bring wine *** `
                : '*** Welcome to Ædedolken *** '}
              Who's hosting next month? ***
            </span>
          </div>
          <div className="layout">
            <main className="content">{children}</main>
            <Sidebar />
          </div>
          <footer className="site-foot">
            © {new Date().getFullYear()} Ædedolken · Best viewed at 1024×768 with a
            full stomach
          </footer>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
