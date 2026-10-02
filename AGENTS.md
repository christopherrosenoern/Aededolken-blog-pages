# AGENTS.md

Website for the food club **Ædedolken**: a retro (00s-style) blog with one post per monthly dinner. TanStack Start + Content Collections, with Netlify and static GitHub Pages builds. No database – content lives in Markdown.

## Structure

```
content/dinners/YYYY-MM.md   One file per dinner (frontmatter: month, year, host, theme, menu, drinks, photos, quotes)
content-collections.ts       Zod schema for dinners; transform adds `slug` (YYYY-MM) and `monthName`
public/img/                  Dinner photos (use `cdn()` for Netlify CDN or build-time WebP images)
src/lib/dinners.ts           Sorted dinners (newest first), years, findDinner(), cdn() image helper
src/components/DinnerPost.tsx  Renders one dinner post – section order is a product requirement:
                             header (month/year/host/theme) → menu → wines & drinks → photos → (recap) → quotes
src/components/Sidebar.tsx   About box, 12-month archive grid per year, hosts, "dinners served" counter, 88×31 badges
src/routes/__root.tsx        Site shell: masthead, nav buttons, CSS ticker, two-column layout, footer
src/routes/index.tsx         Front page: all dinners as full posts, newest first
src/routes/dinners.$slug.tsx Single dinner permalink with older/newer pager
src/styles.css               All retro styling (plain CSS classes, CSS vars in :root)
```

## Conventions

- Styling is plain semantic CSS classes in `styles.css` (not Tailwind utilities) to keep the hand-made 00s look consistent. Palette: wine red, gold, cream.
- Keep the post section order intact when editing `DinnerPost`.
- Never reference `public/img` originals directly – use `cdn(src, width)`.
- UI copy is in English.
- `pnpm build:pages` prerenders the homepage and every linked dinner into `dist/client`, optimizes photos, and verifies local URLs. Pages builds live under `/Aededolken-blog-pages/`; set `PAGES_BASE_PATH` to override this.
