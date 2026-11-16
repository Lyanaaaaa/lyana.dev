# Portfolio review prompt

Paste everything below the line into a fresh Claude session opened in `~/Herd/lyana.dev`.
Re-run it whenever you ship something new or before you send the link to a big client.

---

You are reviewing my developer portfolio (this repo) and my resume (`public/lyana-resume.pdf`,
source `scripts/resume.html`) as five different readers, one after another. Each reader decides in
under 60 seconds whether to keep reading, and each one is looking for a reason to say no.

## The readers

1. **CTO / tech lead doing due diligence.** Opens my GitHub, clicks a live product, checks whether
   my claims match the commit history. Hates: vague verbs ("worked on"), inflated ownership,
   numbers with no source, buzzword stacks. Loves: named trade-offs, failure modes I handled,
   tests, CI, observability, how I work inside a team.
2. **Technical assessor / senior engineer interviewer.** Picks one project and imagines asking me
   "walk me through how this works". Flags anything I could not defend for 10 minutes.
3. **Non-technical business owner / founder.** Wants to know: can she ship my thing, on time,
   without me babysitting her? Reads outcomes, not stacks.
4. **Recruiter / HR screener.** Scans for title, years, location, availability, and whether the
   resume and site tell the same story (dates, roles, companies).
5. **Internal IT team at a client.** Will have to live with my code after I leave. Wants
   handover quality: docs, tests, conventions, security, no lock-in.

## Ground truth first (do this before judging any wording)

For every project or role the site or resume mentions, check the source of truth in
`~/Herd/<repo>`:
- `git log -i --author=lyana` versus total commits: what share is mine, and which areas.
- What I actually built (read my feat/fix commits), versus what teammates built.
- Verifiable facts: test counts, CI workflows, live URL, store listing, launch dates.

Every claim on the site must survive a CTO running `git log`. Mark each claim as
**VERIFIED / SOFTEN / REMOVE**. Never invent a metric, a client, or a result. If a number would
help but I have none, tell me which number to go measure and how.

## Then review, per reader

For each reader, give:
- The first 3 things they see and the impression each creates.
- The single biggest reason they would close the tab.
- What would make them reach out today.

## Then check these trust signals

- **Consistency:** resume vs site vs LinkedIn: dates, titles, employers, project names.
- **Ownership language:** "built", "led", "co-built", "owned X within Y". Precise beats big.
- **Specificity:** each bullet names a mechanism (what I built, how, why it was hard) and,
  where true, an outcome.
- **Proof links:** live product, repo, screenshot, store listing, short case study.
- **Junior tells:** school grades, "learning X", "basic", "fundamentals", filler stats
  ("Always learning", "100% self-taught"), stock photos, template watermarks, clichés
  ("Let's build something amazing").
- **Risk signals:** low or unexplained uptime figures, "sandbox-tested" next to "production",
  impossible timelines, contradicting dates.
- **Privacy:** personal phone number or home details in a public PDF.
- **Psychology that stays honest:** lead with the strongest verified proof (primacy), group
  related wins (chunking), show work under real constraints (credibility through specificity),
  a clear single call to action, and a low-friction next step ("reply within 24 hours").

## Output

1. A ranked list of the top 10 fixes, most trust gained per minute of work first.
2. Rewritten copy for every section (hero, about, experience bullets, project cards, contact)
   and a rewritten one-page resume, ready to paste.
3. A list of claims you softened or removed, with the git evidence.
4. What to measure or add next (case study, metric, screenshot) to raise trust further.

Apply the copy changes to `data/*.ts` and the components directly and show me the diff.
Do not change the visual design. Never run `npm run build` while `next dev` is running.
