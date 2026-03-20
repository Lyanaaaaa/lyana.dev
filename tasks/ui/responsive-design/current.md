# UI Overhaul: Design Tokens, Responsive Cards, Mobile UX & Animations

<!--LLM-CONTEXT
Status: Complete
Key files: tailwind.config.js, app/globals.css, hooks/useStaggerAnimation.ts, components/Navbar.tsx
Last updated: 2026-03-20
Related: tasks/ui/animations/current.md
-->

## Overview
Comprehensive UI overhaul introducing a design token system for border-radius, responsive card styling, mobile-first layout alignment, staggered scroll animations, and mobile menu close animation.

---

## Completed (2026-03-20): Design Token System

### Border Radius Tokens (`tailwind.config.js`)
| Token | Value | Purpose |
|-------|-------|---------|
| `card` | `3rem` | Card containers (desktop) |
| `card-sm` | `2rem` | Card containers (mobile) |
| `card-inner` | `2rem` | Inner elements: images, icons (desktop) |
| `card-inner-sm` | `2rem` | Inner elements (mobile) |
| `card-tag` | `1.5rem` | Tags, buttons, inputs (desktop) |
| `card-tag-sm` | `2rem` | Tags, buttons, inputs (mobile) |

### Reusable CSS Classes (`globals.css`)
| Class | Mobile | Desktop (`md:`) |
|-------|--------|-----------------|
| `.glass-card` | `rounded-card-sm px-5 py-10` | `rounded-card px-8 py-12` |
| `.glass-input` | `rounded-card-tag-sm px-4 py-3` | `rounded-card-tag px-6 py-4` |
| `.card-image` | `rounded-card-inner-sm` | `rounded-card-inner` |
| `.card-tag` | `rounded-card-tag-sm px-3 py-1 text-xs` | `rounded-card-tag px-4 py-1.5 text-sm` |
| `.card-button` | `rounded-card-tag-sm` | `rounded-card-tag` |
| `.card-icon` | `rounded-card-inner-sm` | `rounded-card-inner` |
| `.filter-tabs` | `grid grid-cols-2 gap-3` | `flex gap-4` |
| `.filter-tab` | `px-5 py-3 text-sm` | `px-6 py-2 text-base` |

---

## Completed (2026-03-20): Mobile Responsiveness

### Changes
- **Hero**: `text-center md:text-left` with centered CTAs and subtitle on mobile
- **Experience**: Centered card headers on mobile, `text-left` retained for bullet lists
- **Projects**: Centered section header, card content, tags, and action buttons on mobile
- **Filter tabs**: `grid-cols-3` override for 3-tab layouts (Projects), default `grid-cols-2` for 4-tab (TechStack)
- **Gradient text**: `white-space: normal` + `word-break: break-word` on mobile, `nowrap` on desktop
- **Hero heading**: `min-h-[11rem] md:min-h-0` to prevent layout shift from typing animation

### Components Updated
All 9 component files migrated from hardcoded `rounded-lg/xl/md` to design token classes.

---

## Completed (2026-03-20): Stagger Scroll Animation

### New Hook: `hooks/useStaggerAnimation.ts`
- Observes each child with `data-stagger={index}` individually via IntersectionObserver
- Applies `animationDelay = index * baseDelay` dynamically on viewport entry
- Cards animate one-by-one on mobile (single column) vs batch on desktop (multi-column)
- `observer.unobserve(el)` after trigger prevents re-animation

### New CSS Class: `.animate-stagger-in`
- Uses `fade-in-up` keyframe, `0.6s ease-out`, paused until `.animate-visible` added

### Usage
```tsx
const gridRef = useStaggerAnimation(150) // 150ms between cards

<div ref={gridRef} className="grid ...">
  {items.map((item, i) => (
    <div data-stagger={i} className="animate-stagger-in">...</div>
  ))}
</div>
```

Applied to: **WhatIDo**, **ProjectsSection**

---

## Completed (2026-03-20): Mobile Menu Close Animation

### State Machine
Replaced `boolean` flags with `MenuState = 'closed' | 'open' | 'closing'` union type.

### Exit Animation Sequence
| Element | Animation | Timing |
|---------|-----------|--------|
| Nav links | `fade-out-down` | Reverse stagger (bottom exits first) |
| Contact button | `fade-out-down` | Immediate |
| Avatar | `scale-out` | Immediate |
| Close button | `scale-out` | 0.25s |
| Backdrop | `fade-out-down` | 0.45s (last to exit) |

### New Keyframes
- `@keyframes fade-out-down` — opacity 1→0, translateY 0→20px
- `@keyframes scale-out` — opacity 1→0, scale 1→0.9

### Fix: Overlay Stacking Context
Moved overlay from inside `max-w-6xl` container to direct child of `<nav>`, fixing scroll-position-dependent rendering bug caused by `backdrop-blur-lg` creating a new stacking context.

---

## Completed (2026-03-20): Avatar Update
- Replaced `public/resources/avatar.png` with new photo (`avatar.jpg`)
- Updated all references in Navbar to `.jpg`
- Fixed missing leading `/` in Image `src` paths

---

## Completed (2026-03-20): Code Review Fixes
- Moved `phrases` array outside Hero component (was causing useEffect churn)
- Fixed typo: "collabolation" → "collaboration" in Contact.tsx
- Fixed malformed CSS: missing space in gradient values
- Removed duplicate `.badge-glass`, unused imports, dead code (simplifier)
- Consolidated filter handlers into single curried `handleFilter` (TechStack, ProjectsSection)

---

## Gotchas

| Issue | Cause | Fix |
|-------|-------|-----|
| `contentVisibility: auto` hides cards on mobile | Browser miscalculates off-screen elements | Removed, use `contain: layout style` instead |
| `animation-direction: reverse` with `forwards` doesn't animate | Browser sees no visual change from current state | Use explicit exit keyframes instead |
| `fixed inset-0` overlay offset when scrolled | `backdrop-blur` on parent creates new stacking context | Move overlay outside the blurred container |
| Typing animation shifts layout on mobile | Different phrase lengths cause different line counts | Set `min-h` on heading for worst-case wrapping |
| `gradient-text` cropped on mobile | `white-space: nowrap` overflows viewport | Responsive: `normal` on mobile, `nowrap` on desktop |

---

## Architecture Decisions

1. **Design tokens > hardcoded values**: Single source of truth in `tailwind.config.js`. Changing `card: '3rem'` updates every card site-wide.
2. **Mobile-first responsive classes**: Default values target mobile, `md:` breakpoint adds desktop enhancements.
3. **State machine for menu**: `MenuState` union prevents impossible states vs dual booleans.
4. **Per-element IntersectionObserver**: `useStaggerAnimation` observes each card individually for true scroll-triggered staggering on mobile.
5. **Reusable CSS classes over inline styles**: `.card-tag`, `.card-button`, `.filter-tabs` eliminate duplicated inline styles across components.

---

## Files Modified

```
tailwind.config.js           -- Design token definitions
app/globals.css               -- Reusable classes, responsive variants, new keyframes
hooks/useStaggerAnimation.ts  -- NEW: Per-element scroll stagger hook
components/Navbar.tsx         -- Menu state machine, close animation, avatar fix
components/Hero.tsx           -- Mobile centering, min-h fix, phrases optimization
components/Contact.tsx        -- Typo fix, dead code cleanup
components/Experience.tsx     -- Mobile centering, dead div removal
components/ProjectsSection.tsx -- Stagger animation, mobile centering, filter consolidation
components/TechStack.tsx      -- Filter consolidation, dead code removal
components/WhatIDo.tsx        -- Stagger animation
components/ProjectCard.tsx    -- card-tag class adoption
components/Skills.tsx         -- card-tag class adoption
components/Overview.tsx       -- Responsive padding
```

---

## Next Steps
- [ ] Fix "View My Tech Stack" Overview card (has `cursor-pointer` but no click handler)
- [ ] Add `aria-hidden="true"` to decorative Lucide icons
- [ ] Remove unused components (Skills.tsx, ProjectCard.tsx, Overview.tsx) if confirmed dead
- [ ] Re-enable Contact form when endpoint is ready

---

**Status**: Complete
**Last Updated**: 2026-03-20
