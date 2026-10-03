import { Link } from '@tanstack/react-router'

import { MONTHS, dinners, years } from '@/lib/dinners'

export default function Sidebar() {
  const hosts = [...new Set(dinners.map((d) => d.host))].sort()
  return (
    <aside className="sidebar">
      <div className="side-box">
        <h4>About the club</h4>
        <p>
          <b>Ædedolken</b> er en madklub udover det sædvanlige. Én middag om måneden på skift med skiftende tema, drinks og dresscode.
        </p>
      </div>

      {years.map((year) => (
        <div className="side-box" key={year}>
          <h4>Archive {year}</h4>
          <div className="month-grid">
            {MONTHS.map((name, i) => {
              const d = dinners.find((x) => x.year === year && x.month === i + 1)
              return d ? (
                <Link
                  key={name}
                  to="/dinners/$slug"
                  params={{ slug: d.slug }}
                  className="month on"
                  title={`${d.theme} – host: ${d.host}`}
                >
                  {name.slice(0, 3)}
                </Link>
              ) : (
                <span key={name} className="month off">
                  {name.slice(0, 3)}
                </span>
              )
            })}
          </div>
        </div>
      ))}

      <div className="side-box">
        <h4>The hosts</h4>
        <ul className="host-list">
          {hosts.map((h) => (
            <li key={h}>
              » {h} ({dinners.filter((d) => d.host === h).length})
            </li>
          ))}
        </ul>
      </div>

      <div className="side-box center">
        <h4>Dinners served</h4>
        <div className="counter">
          {String(dinners.length).padStart(6, '0').split('').map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </div>

      <div className="badges">
        <span className="badge b1">MADE WITH ♥ &amp; BUTTER</span>
        <span className="badge b2">VALID BÉARNAISE</span>
        <span className="badge b3">BEST VIEWED HUNGRY</span>
      </div>
    </aside>
  )
}
