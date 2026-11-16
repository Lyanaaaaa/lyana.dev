# Changelog

Notable changes to lyana.dev, newest first. Grouped by release date.

## [2026-11-16] Portfolio revamp: trust-first content and a calmer UI

### Content
- Every claim on the site and resume now matches the git history of the projects it names: "co-built" for Dourr, named features for Autorentic, nothing unmeasured (removed "99% uptime", "high traffic"), pre-launch work labelled as such.
- New project cards: Autorentic tenant app (Flutter), the AI UX-audit multi-agent pipeline, and Loupe (findings ledger). Removed the two stock-photo cards.
- Hero: "I ship products, and prove they work." with a concrete summary of current work.
- About rewritten to lead with the current role; chemical engineering framed through two concrete habits (mass balance, control loops). "What you can hand me" list.
- New one-page resume (`public/lyana-resume.pdf`, source `scripts/resume.html`) consistent with the site's dates and titles; personal phone number removed from the public PDF.
- Removed school grades, filler stats ("100% self-taught", "Always learning") and an unused file of sample case studies.

### Design
- Full visual revamp: deep-space backdrop per section (starfield, nebula, planets, skyline), Sora / Inter / Caveat type, hero video.
- Experience rebuilt as a CV layout: date column, highlight tiles with status (Live, In store review, Internal tool, Pre-launch), education always visible.
- Skills: the orbit now shows a real product's stack; product chips switch it and filter the skill grid.
- Icons are bare glyphs everywhere (no tiles, borders or glows); social links are named links.
- Skyline fades into the background, with no horizon line or water band between sections.
- Hero video is silent with no on-screen controls; reduced-motion visitors get the still poster.

### Fixes
- Project descriptions no longer cut off on phones.
- Orbit labels stay upright when switching products.
- Mobile menu no longer closes itself when reopened quickly.
