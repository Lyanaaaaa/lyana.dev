# CLAUDE.md — lyana-software-engineer

## Stack
- Next.js 14.2 (App Router), React 18, TypeScript, Tailwind CSS 3.4
- Deployed on Vercel (Linux, case-sensitive filesystem). **Production branch is `main`**: a push to `master` only builds a Preview. Release = push `master`, then fast-forward `main` to it. Commits must carry the GitHub-linked author (repo-local `user.email` is the `users.noreply.github.com` address) or Vercel fails the deploy

## Design Token System

Border-radius values are centralized in `tailwind.config.js` under `borderRadius`. Never hardcode `rounded-lg`, `rounded-xl`, etc. in components — use the token classes instead.

| Token class | Mobile | Desktop |
|-------------|--------|---------|
| `glass-card` | `rounded-card-sm` | `rounded-card` |
| `card-image` | `rounded-card-inner-sm` | `rounded-card-inner` |
| `card-tag` | `rounded-card-tag-sm` | `rounded-card-tag` (pill) |
| `card-button`, `btn-*`, `glass-input` | `rounded-button` | `rounded-button` |
| `card-icon` | `rounded-card-inner-sm` | `rounded-card-inner` |

## Visual System (2026-11 revamp, modelled on aakashgugilla.is-a.dev)

- Palette: `ink` (#05010f deep-space bg) + violet `primary`. Fonts: `font-display` Sora (headings), `font-sans` Inter, `font-hand` Caveat (notes/quotes), `font-mono` JetBrains Mono (`.eyebrow` labels like `// 01. ABOUT ME`).
- **Icons are bare glyphs** (2026-11-16, Lyana's call: boxed icons read as AI-generated). `.icon-chip`, `.icon-btn`, `.circle-btn` draw no tile, border or glow; never wrap an icon in a filled or outlined square/circle. Social links are icon + name, not icon-only buttons.
- Skills orbit has a job: the planet names a product, the orbiting logos are its stack (`stackInProduction` in `data/skills.ts`, default `coreStack`), and the product chips below switch it and filter the grid. The orbit ring and its items are re-keyed together on switch; keying only the items leaves their counter-rotation out of phase (tilted labels). Its `skills` names must match `skills[].name` exactly, and only list tech Lyana touched in that codebase.
- Every section renders `<SpaceBackdrop variant=...>` (`components/space/`): canvas starfield, CSS nebula, optional planet/skyline, hero globe. It edge-fades top/bottom so sections stack without seams; canvases pause off-screen and respect reduced motion.
- Site facts (links, email, location, hero video) live in `data/profile.ts`; skills in `data/skills.ts`; project filter groups in `data/portfolioProjects.ts`.
- Hero video: set `profile.heroVideo` to a `/resources/*.mp4` path; empty = `heroPoster` photo with Ken Burns zoom.
- **Content claims must survive `git log`.** Reviewers check commit history: say "co-built" / "built the UI for" where others share the repo (Dourr, Autorentic, autorentic-mobile in `~/Herd/`), no unmeasured numbers (uptime, traffic), and label pre-launch work as such. Site copy and resume must tell the same story (dates, titles).
- Resume source is `scripts/resume.html` (A4, one page); render it to `public/lyana-resume.pdf` with Playwright `page.pdf({ format: 'A4', preferCSSPageSize: true })`. Keep the personal phone number off the public PDF.
- Contact form is `mailto:` (site is `output: 'export'`, no server).
- Hero video is silent with no on-screen controls (sound toggle and pause button removed 2026-11-16 at Lyana's request: they cluttered the hero). Reduced-motion visitors get the paused poster instead. `hooks/useHeroSound.ts`, `lib/sound.ts` and `components/ui/SoundToggle.tsx` are unwired; never re-enable sound without a mute control. Rebuild the clip with `BED=start:end:until scripts/make-hero-loop.sh <clip>`.
- Projects is a pinned horizontal gallery on `lg` + tall screens without reduced motion (1:1 scroll→translate in `ProjectsSection.tsx`); elsewhere a native snap strip. Never put `overflow: hidden` on an ancestor of `#projects`, or `position: sticky` breaks.

## Animation System

| Class | Use for |
|-------|---------|
| `animate-fade-in-up/down/left/right` | Section entrance (paused until `animate-visible`) |
| `animate-scale-in` | Card pop-in |
| `animate-stagger-in` + `data-stagger={i}` | Per-element scroll stagger via `useStaggerAnimation` hook |
| `fade-out-down`, `scale-out` | Exit animations (menu close, etc.) |

Scroll animations require `useScrollAnimation()` on the section container, on an element whose `className` never changes: the hook adds `animate-visible` via `classList`, and a React className rewrite (e.g. a `pinned ? … : …` swap) silently drops it, leaving the section at opacity 0. For per-card stagger, use `useStaggerAnimation(delay)` on the grid container.

## Gotchas

| Symptom | Cause | Fix |
|---------|-------|-----|
| Horizontal lines/bands across About, Contact, footer | Skyline had a 1.5px horizon rect, a water band and a dark overlay starting at 55% | Skyline is faded by a container mask (`SKYLINE_FADE`); never add a hard-edged rect or a tint whose first stop is opaque |
| `next lint` / `npm run build` print "ESLint: Invalid Options" | ESLint 9 can't read the legacy `.eslintrc` | Lint is not running; verify with `npx tsc --noEmit -p .` |
| Dev site loads with no styles, `/_next/static/*` 404 | `npm run build` ran while `next dev` was running and overwrote `.next` | Never build while dev runs (`ps aux \| grep "next dev"`); fix: stop dev, `rm -rf .next`, restart |
| Tailwind CSS not processed on Vercel | `Postcss.config.js` wrong case | Must be `postcss.config.js` (lowercase) |
| `contentVisibility: auto` hides cards on mobile | Browser miscalculates off-screen | Use `contain: layout style` instead |
| `animation-direction: reverse` doesn't animate exit | Browser sees no visual delta from current state | Use explicit exit keyframes (`fade-out-down`, `scale-out`) |
| `fixed inset-0` overlay offset when scrolled | `backdrop-blur` creates new stacking context | Move overlay outside the blurred container |
| Mobile menu state bugs with two booleans | Impossible state combos | Use union type: `'closed' \| 'open' \| 'closing'` |
| Gradient text cropped on mobile | `white-space: nowrap` overflows viewport | `normal` on mobile, `nowrap` on `md:` |
| Next.js `Image src` without leading `/` | Relative path breaks on non-root routes | Always use `/resources/...` not `resources/...` |
| `Link href="/"` jumps instead of smooth scroll | Client-side navigation resets scroll | Use `window.scrollTo({ top: 0, behavior: 'smooth' })` |
| `phrases` array in component body causes useEffect churn | New reference each render | Move constant arrays outside component |

## Patterns

### Filter Tabs (consolidated)
```tsx
const handleFilter = useCallback((filter: FilterType) => () => setActiveFilter(filter), [])

{(['all', 'frontend', 'backend'] as const).map((filter) => (
  <button key={filter} onClick={handleFilter(filter)} className={`filter-tab ${...}`}>
    {filter.charAt(0).toUpperCase() + filter.slice(1)}
  </button>
))}
```

### Mobile Center / Desktop Left
```tsx
// Container
<div className="text-center md:text-left">
  // Flex children
  <div className="flex justify-center md:justify-start">
  // Constrained text
  <p className="max-w-2xl mx-auto md:mx-0">
  // Exception: keep bullets left-aligned
  <ul className="text-left">
```
