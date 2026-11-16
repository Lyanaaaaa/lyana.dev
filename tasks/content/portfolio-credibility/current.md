<!--LLM-CONTEXT
Status: ✅ Revamp live on lyana-dev.vercel.app 2026-11-16; polish items open
Domain: content
Gotchas (critical; full list in ## Gotchas below):
  - Every ownership claim must survive `git log -i --author=lyana` on the source repo
  - Membership platform is NOT live; Autorentic tenant app is NOT in either store yet
Related: tasks/ui/responsive-design/current.md, tasks/ui/animations/current.md (pre-revamp, partly stale)
Last updated: 2026-11-16
-->

# Content: Portfolio credibility (site copy, projects, resume)

## Quick Start (read this first in next session)

**Where we are:** site copy, project cards, Experience, About, Skills and the resume were rewritten so a CTO checking git finds every claim true. Live on lyana-dev.vercel.app since 2026-11-16. Vercel's production branch is `main`, not `master`: release by pushing `master`, then fast-forwarding `main` (see `CLAUDE.md` Stack).
**Next action:** pick from Next Steps below; the top two are copy/polish on the Skills section and the house-style clean-up list.
**Re-run the review:** paste `docs/portfolio-review-prompt.md` into a fresh session in this repo.
**Success looks like:** a reviewer can open any claim on the site, run `git log` on the named repo, and find it accurate.

## Overview

The portfolio (lyana.dev) is shown to clients, CTOs, technical assessors and recruiters. The revamp's rule is precise ownership over big claims: "co-built" beats "built from scratch" when the history shows a co-author, and an unmeasured number is removed rather than softened.

## Ownership facts (measured 2026-11-10 from git)

Re-measure before changing any claim; these decay as the repos grow.

| Project | Repo | Lyana's share | What she owns (what the site may claim) | Not hers (don't claim) |
|---|---|---|---|---|
| Dourr (live) | `~/Herd/dourr` | ~748 of 1,865 commits; main frontend author (`frontend/src` 422 vs Syafiq 245) | Co-built from day one; wrote first backend + frontend code (2026-02-04) after Syafiq's blueprint (2026-02-03); property, user, inquiry (WhatsApp handoff), Trust Score/badges; some tenancy UI, agreement PDF, Shariah late-payment terms | Payments (Curlec/2C2P adapters), MyDigital ID, CI/CD, k6 load tests, most of the 50 Playwright specs, `blog-mcp`/`blog-runner` |
| Autorentic web (live SaaS) | `~/Herd/autorentic` | ~81 of 4,851 commits (since 2025-04-15) | Monthly consolidated invoices, RM 5 invoice minimum, tax ID fields + audit trail, landlord ticket access, 11 email templates, 4-phase design-system rebuild, `app-ux-audit` + `posthog-uiux-intelligence` skills | "Built end to end", MyInvois e-invoicing, 2C2P collection |
| Autorentic tenant app (Flutter) | `~/Herd/autorentic-mobile` | 21 of 78 commits (2026-10-12 → 10-26) | Tenant UI prototype → 28 screens, multi-bill payment, in-app agreement signing, Bahasa Melayu (720 keys), motion system, QA seeder + UAT plan | Flutter base, Patrol tests, Firebase push, PostHog, release signing, store work |
| AI UX-audit pipeline | `~/Herd/autorentic` (`.claude/workflows/app-ux-audit.js`, `scripts/audit/`) | Authored (2026-11-03 → 06) | Parallel analyst agents + a cheaper verifier model refuting each finding; pilot: 14 findings, 11 verified, 0 refuted, 2 duplicates | — |
| Loupe | `~/Herd/loupe` | 5 of 5 | Findings ledger: schema-checked imports, PII rejection, no action without metric/baseline/re-measure date. It never calls an AI model | — |

User-supplied facts (2026-11-16): Workshop Management System = first release in 6 days, then part-time maintenance to Jan 2026. Membership Management System = independent side project, scoped A–Z, **not live**, payments sandbox-only. The old "Management Platform, 1.5 years" entry was this same side work and was dropped.

## Key decisions

- **No unverified metrics.** Removed "99% uptime" (reads as ~7 h downtime/month to an engineer), "high traffic", "100% self-taught", "Always learning", SPM grades, stock-photo project cards, and the unused `data/projects.ts` sample case studies.
- **Private work offers verification:** project cards without a link say "Private codebase · walkthrough on request".
- **Moonman AI (events-agency bid, presented 2026-11-04) is left off the public site** until the client decides.
- **Resume** (`scripts/resume.html` → `public/lyana-resume.pdf`) carries no phone number and must match the site's dates and titles.
- **No Claude/Claude Code attribution** in commits, PRs or files (user, 2026-11-16). History from here is clean; 2fc1261 on `master` keeps its old trailer because removing it means force-pushing `master`.

## Gotchas

| Symptom | Cause | Fix |
|---|---|---|
| Two "live product" counts disagree (About vs Skills) | Counts derived from different fields | Both read `stackInProduction.filter(status === 'live')` in `data/skills.ts` |
| A reviewer finds a claim the git log contradicts | Copy written from memory, not history | Re-measure with the table's commands before editing copy |

## Files

| File | Holds |
|---|---|
| `data/experience.ts` | Roles, highlight tiles, `statusLabel`/`statusDot` |
| `data/portfolioProjects.ts` | Project cards |
| `data/skills.ts` | Skills, `stackInProduction` (product → stack), `coreStack` |
| `scripts/resume.html` | Resume source (A4, one page) |
| `docs/portfolio-review-prompt.md` | Reusable multi-reader review prompt |

## Next Steps

### Copy & polish
- [ ] 🟡 Replace the "Better Projects Ahead…" card under Skills with a plain CTA ("Have a project? Let's talk →")
- [ ] 🟡 Add the portfolio's own URL to the resume header (not found in the repo)
- [ ] 🟡 Hero typewriter + cursor ignore reduced motion; add `aria-label` on the eyebrow, `aria-hidden` on the cursor
- [ ] 🟡 Mobile menu overlay: no `role="dialog"`/`aria-modal` or focus trap (Escape now closes it)

### Deferred / accepted
- [ ] 🟡 House-style clean-up offered 2026-11-16, not yet chosen: drop `// 01. ABOUT ME` mono eyebrows; bigger stat numbers without icons; fact cards without outlines; solid colour instead of gradient accent words; fewer glass-blur surfaces (49 measured)
- [ ] 🟡 Add Moonman AI work once the bid outcome is known
