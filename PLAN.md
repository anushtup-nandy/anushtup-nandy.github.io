# Portfolio Overhaul Plan

> **Author:** Anushtup Nandy · **Date:** 2026-06-16
> **Goal:** Move the site from "clean but undercommitted" to a distinctive, personal-brand-driven portfolio with a first-class blog — without over-engineering it.
>
> **Status (2026-06-16): ALL PHASES SHIPPED.** Migrated to Astro 5 + Tailwind 4. `astro check` and `astro build` both green; all routes serve 200. See §8 for build/deploy + authoring.

---

## 8. Build, Deploy & Authoring (post-implementation)

**Local:**
```bash
npm install
npm run dev      # local dev server
npm run build    # static output → dist/
npm run preview  # serve the production build
npm run check    # astro check (types + diagnostics)
```

**Deploy:** Output is fully static in `dist/`. Point your host's build command at `npm run build` and publish dir at `dist`:
- **Netlify/Vercel/Cloudflare Pages:** build `npm run build`, output `dist`. Zero extra config.
- **GitHub Pages:** use the `withastro/action` workflow (or push `dist/`).
- ⚠️ **Set the real domain** in `astro.config.mjs` → `site` (currently `https://anushtupnandy.com`). It drives canonical URLs, sitemap, RSS, and OG image absolute paths.

**Writing a new post:** drop a Markdown file in `src/content/blog/`. Frontmatter schema (enforced by `src/content.config.ts`):
```yaml
---
title: "..."
description: "..."
pubDate: 2026-06-16
category: "Control & Planning"   # | Sim2Real | Paper Notes | Builds | Career
cover: "/images/optional.png"     # optional
tags: ["MPC", "QP"]               # optional
draft: false                      # optional; true hides from build/index/RSS
---
```
Markdown supports **LaTeX** (`$inline$`, `$$display$$` via KaTeX) and **syntax-highlighted code** (Shiki, dual light/dark theme) out of the box. Reading time and prev/next are automatic.

**Project structure:**
- `src/data/` — projects, publications, experience, site config (edit content here, not in markup).
- `src/components/` — section components + `Hero` (canvas trajectory) + `SectionDivider` (trajectory motif).
- `src/layouts/` — `BaseLayout` (head/SEO/JSON-LD/theme/scripts), `BlogPost`.
- `src/styles/global.css` — design system (tokens, mono metadata, lattice, trajectory, prose).
- `public/` — `images/`, `pdfs/`, `favicon.svg` (committed static assets).

---

## 1. Current State (Honest Audit)

The site is a **single static `index.html`** (~880 lines) + `css/styles.css` (~860 lines) + `js/scripts.js` (~130 lines), styled with Tailwind-via-CDN plus a hand-rolled CSS design system.

**What's already good — keep it:**
- The **warm editorial palette** (beige/gold, `--accent: #d4b876`) with **Playfair Display + Crimson Text** serif fonts is genuinely uncommon for a robotics engineer. Most peers ship blue-on-black. This is a real differentiator and the foundation we should *amplify*, not replace.
- Solid component vocabulary: timeline, filterable bento grid, competency cards, reveal-on-scroll.
- Dark/light theming via CSS variables is clean and correct.

**What's holding it back:**
- **Branding is generic-by-omission.** No logo/motif, no tagline that sticks, no consistent voice. "AN" in the corner is the only mark. Nothing visually says *robotics / motion planning / control theory* — the content does, but the design doesn't.
- **No blog.** This is the single biggest gap for personal branding and SEO.
- The hero is a stock two-column "headshot + paragraph" — the most common portfolio layout that exists.

**Concrete defects (fix regardless of redesign):**
| # | Issue | Location | Impact |
|---|-------|----------|--------|
| D1 | Duplicate `</main>` closing tag | `index.html:864` and `:878` | Invalid HTML |
| D2 | `images/haptic.png` referenced but file is `Haptic.png` | `index.html:577` | **Broken image on case-sensitive hosting** (Netlify/Linux) |
| D3 | Leftover dark-blue `rgba(5, 7, 17, ...)` values | `styles.css:96`, `:692` | Clashes with warm palette |
| D4 | Violet gradients (`rgba(139,92,246)`) + `.text-violet-400` | `styles.css:407,455,499`; `index.html:283,331…` | Inconsistent with gold accent |
| D5 | Tailwind via CDN | `index.html:12` | Not production-grade; ships ~3MB JIT runtime, FOUC risk |
| D6 | Pervasive inline `style="..."` | throughout `index.html` | Hard to maintain, no theming leverage |
| D7 | Copyright "2025" | `index.html:869` | Stale |
| D8 | No favicon, OG tags, JSON-LD, sitemap | `<head>` | Poor link previews + SEO |
| D9 | Scroll handlers unthrottled; no `prefers-reduced-motion` | `scripts.js` | Jank + a11y |

---

## 2. Brand Direction

**Positioning statement (the one sentence the whole site should radiate):**
> *Anushtup Nandy — I give robots the mathematical intuition to move through hard, high-stakes spaces. First-principles math → hardware that ships.*

### 2.1 Visual Identity — "The Engineering Journal × The Lab Notebook"

Keep the editorial serif soul; graft on a **computational signature** so the design itself reads as robotics/control. Three motifs, used sparingly and consistently:

1. **Trajectory / phase-space lines.** A signature thin gold spline (think A* path, MPC rollout, or a damped oscillation curve) as a recurring graphic element: under section titles, behind the hero, as section dividers. This is *your* motif — nobody else's portfolio has your trajectory.
2. **Monospace technical metadata.** Introduce one monospace face (e.g. **JetBrains Mono** or **IBM Plex Mono**) strictly for "instrument readout" text: dates, tech tags, coordinates, equation snippets, code. Serif for prose, mono for data. This contrast *is* the brand.
3. **Lattice / grid backdrop.** A faint dotted or grid texture (configuration-space lattice) on section backgrounds at very low opacity — subtle, never loud.

**Recommended type system:**
- Display/headings: **Playfair Display** (keep) — or test **Fraunces** for more character.
- Body prose: **Crimson Text** (keep) — excellent for long-form blog reading.
- Technical/mono: **JetBrains Mono** (new) — tags, dates, code, equations.

**Palette:** Keep the warm dark/light system. Tighten it:
- Promote a single, slightly more saturated gold for interactive states.
- **Remove all violet and dark-blue leftovers** (D3, D4) — one accent, applied with discipline.
- Add a secondary "blueprint" tint (muted slate/teal) *only* for the trajectory motif and code blocks, so technical artifacts feel distinct from prose.

### 2.2 Signature Hero (replace the stock layout)

Options, in order of recommendation:

- **A — Animated trajectory hero (recommended).** Name + positioning statement over a live `<canvas>` rendering a slow path-planning/MPC trajectory (an A* expansion, RRT* tree growing, or a pendulum phase portrait). ~80 lines of vanilla JS, no library, respects `prefers-reduced-motion` (falls back to a static SVG). High wow-factor, on-brand, cheap.
- **B — Interactive equation/terminal.** A typewriter cycling through "I work on: `MPC` · `SAC` · `RRT*` · `SLAM`…" with a monospace prompt. Lower effort, less unique.
- **C — Refined static.** Keep two-column but add the trajectory motif + mono metadata strip (location, current role, "open to collaborations"). Lowest effort.

---

## 3. The Blog — Architecture Decision

This is the main structural choice. The current site has **no build step**, which is a virtue worth protecting (deploy = `git push`). Three viable paths:

### Option 1 — Static Site Generator (Astro) — **Recommended**
Migrate to **Astro**. Posts authored as **Markdown/MDX**; Astro renders to static HTML at build time, supports the existing CSS/JS verbatim, and ships *zero JS by default* (faster than today's Tailwind-CDN setup).
- **Pros:** Write posts in Markdown, automatic post lists/tags/RSS, syntax-highlighted code blocks, KaTeX for equations (critical for your control-theory content), image optimization, great SEO. Component reuse for nav/footer.
- **Cons:** Introduces Node + a build step + a `package.json`. ~1 day migration.
- **Why it's the right call:** Your blog *will* contain LaTeX and code. Hand-maintaining that in raw HTML is exactly the technical debt your own engineering principles warn against. Astro keeps the output static and dependency-light at runtime.

### Option 2 — No-build Markdown (marked.js + KaTeX at runtime)
Keep the static setup. A `posts/` dir of `.md` files + a `posts.json` manifest; a small client renderer (`marked` + `highlight.js` + KaTeX) fetches and renders on the fly.
- **Pros:** Zero build, stays pure-static, write in Markdown.
- **Cons:** Client-side rendering hurts SEO (crawlers see empty shells), slower first paint, more fragile. Acceptable as an interim step.

### Option 3 — Hand-written HTML pages
One `blog/post-slug.html` per post from a shared template.
- **Pros:** Trivial, no deps. **Cons:** Doesn't scale, no Markdown, manual everything. Not recommended beyond 2–3 posts.

**Recommendation:** **Option 1 (Astro).** If you want to ship branding changes *this week* without touching tooling, do Option 2 as a bridge and migrate to Astro later — the Markdown posts carry over unchanged.

### Blog structure (content)
- **`/blog`** index: card list with cover, title, date (mono), reading time, tags. Filterable by tag, reuse the existing filter UI.
- **Post page:** generous serif column (~68ch), mono code blocks with copy button, KaTeX equations, footnotes, prev/next nav, and a "Cite this" / share row.
- **Suggested launch categories matched to your brand:** `Control & Planning` (MPC, RRT*, LQR derivations), `Sim2Real` (domain gap war stories), `Paper Notes` (deep reads of SOTA), `Builds` (hardware logs — fin, Delta, hopper), `Career` (the India deep-tech move — you already have strong material in the timeline break).
- **RSS feed** + **JSON-LD `BlogPosting`** per post.

---

## 4. Information Architecture

Proposed nav: **About · Experience · Projects · Writing · Publications · Contact**
("Writing" reads more personal/branded than "Blog".)

- Add a compact **footer with RSS, email, GitHub, LinkedIn, Google Scholar**.
- Consider splitting the now-large Projects grid into its own route once Astro is in; the homepage shows ~6 featured, "View all →" goes to `/projects`.

---

## 5. Phased Execution

Phased so each step is independently shippable and verifiable.

**Phase 0 — Defect sweep & cleanup (no visual change).** Fix D1–D9. Single commit per CLAUDE.md "pre-work" rule (dead code, the duplicate `</main>`, image-case bug, stale year, remove violet/blue leftovers, add meta/OG/favicon). *Verify:* HTML validates, all images load, Lighthouse SEO ↑.

**Phase 1 — Brand foundation.** Introduce JetBrains Mono; consolidate accent; extract worst inline styles into classes; add the trajectory-line section-divider motif + faint lattice backdrop. *Verify:* visual diff on every section, both themes, mobile.

**Phase 2 — Signature hero.** Implement Hero Option A (canvas trajectory + reduced-motion fallback). *Verify:* 60fps on mid hardware, static fallback works, no CLS.

**Phase 3 — Blog infrastructure.** Stand up Astro (or Option 2 bridge); migrate existing sections into Astro components; build `/blog` index + post template with KaTeX + code highlighting + RSS. *Verify:* `npm run build` clean, post renders math + code, RSS validates, SEO meta present.

**Phase 4 — Content & polish.** Author 2–3 launch posts (one technical derivation, one build log, one career/opinion). Final a11y pass (`prefers-reduced-motion`, focus states, contrast AA), throttle scroll handlers, Lighthouse ≥95 across the board.

---

## 6. Decisions (locked 2026-06-16)

1. **Blog tooling → Astro.** Markdown/MDX posts, KaTeX, code highlighting, RSS; static output, `git push` to deploy.
2. **Hero → Option A, animated trajectory canvas.** Vanilla JS, `prefers-reduced-motion` → static SVG fallback.
3. **First ship → Branding first (Phases 0–2), blog next (Phases 3–4).** Visible payoff early; Astro migration follows.
4. **Display type:** TBD during Phase 1 — keep Playfair as default, A/B against Fraunces before committing.

**Resulting execution order:** Phase 0 → 1 → 2 ship as the static site (no tooling change yet). Phase 3 introduces Astro and migrates the now-branded sections into components, so the redesign is locked in *before* the build step lands — lower risk.

---

## 7. Out of Scope (explicitly, for now)
- CMS / admin UI (Markdown-in-git is enough).
- Comments (use a `mailto`/social CTA, or add Giscus later).
- Analytics beyond a privacy-friendly counter (e.g. Plausible) if desired.
- Backend of any kind — site stays fully static.
