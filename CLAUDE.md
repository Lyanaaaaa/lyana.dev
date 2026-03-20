# CLAUDE.md — lyana-software-engineer

## Stack
- Next.js 14.2 (App Router), React 18, TypeScript, Tailwind CSS 3.4
- Deployed on Vercel (Linux, case-sensitive filesystem)

## Design Token System

Border-radius values are centralized in `tailwind.config.js` under `borderRadius`. Never hardcode `rounded-lg`, `rounded-xl`, etc. in components — use the token classes instead.

| Token class | Mobile | Desktop |
|-------------|--------|---------|
| `glass-card` | `rounded-card-sm` | `rounded-card` |
| `card-image` | `rounded-card-inner-sm` | `rounded-card-inner` |
| `card-tag` | `rounded-card-tag-sm` | `rounded-card-tag` |
| `card-button` | `rounded-card-tag-sm` | `rounded-card-tag` |
| `card-icon` | `rounded-card-inner-sm` | `rounded-card-inner` |

## Animation System

| Class | Use for |
|-------|---------|
| `animate-fade-in-up/down/left/right` | Section entrance (paused until `animate-visible`) |
| `animate-scale-in` | Card pop-in |
| `animate-stagger-in` + `data-stagger={i}` | Per-element scroll stagger via `useStaggerAnimation` hook |
| `fade-out-down`, `scale-out` | Exit animations (menu close, etc.) |

Scroll animations require `useScrollAnimation()` on the section container. For per-card stagger, use `useStaggerAnimation(delay)` on the grid container.

## Gotchas

| Symptom | Cause | Fix |
|---------|-------|-----|
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
