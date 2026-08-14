# Blog

A blog about AI, AI security, testing AI systems, and using AI in QA automation. Built with [Astro](https://astro.build), hosted on GitHub Pages.

## Stack

- **Astro** (content collections + MDX) for the site itself
- **Tailwind CSS + daisyUI** for styling and the theme system (light/dark/dracula/cyberpunk/etc., switchable in the header)
- **GitHub Actions → GitHub Pages** for hosting/deployment

## Site structure

The site follows a profile-first layout (inspired by [Astro Academia](https://github.com/maiobarbero/astro_academia)), remapped for a topical blog instead of an academic CV:

- **Home** (`/`) — profile section (name/bio/links) and recent articles
- **Articles** (`/articles`, `/articles/<slug>`) — full chronological article listing and individual posts
- **About** (`/about`) — bio + background timeline, currently placeholder content

Categories (`/categories`, `/categories/<category>`) exist in the codebase but are hidden from navigation and the homepage for now — there aren't enough posts yet to make browsing by topic useful. To bring it back: re-add the `{ href: '/categories', label: 'Categories' }` entry in `src/layouts/BaseLayout.astro`'s `navLinks`, and the category grid section (commented out) in `src/pages/index.astro`.

### Customizing

- `src/data/site.ts` — your name, tagline, bio, avatar, email, and social links. `email` shows as a button on Home/About; `social` (GitHub/LinkedIn/X) renders as icon links in the footer on every page, via `src/components/SocialIcons.astro`
- `src/data/categories.ts` — category labels/descriptions shown in the category grid — keep the `key`s in sync with `src/content/config.ts`
- `src/data/themes.ts` — the daisyUI theme list offered in the header theme picker, and the default theme — keep in sync with `daisyui.themes` in `tailwind.config.mjs`
- `src/pages/about.astro` — replace the placeholder `timeline` array with your own background
- `public/images/avatar.jpg` — profile picture shown on Home and About; update `site.avatar` in `site.ts` to swap it
- `public/images/logo-b.jpg` — header logo, referenced by `src/components/Logo.astro`

## Getting started (step by step)

### 1. Install prerequisites

You need **Node.js 20+** and **npm**.

Check what you have:

```bash
node -v
npm -v
```

If you don't have Node installed, get it from [nodejs.org](https://nodejs.org) (LTS version) or via a version manager like `nvm`:

```bash
nvm install 20
nvm use 20
```

### 2. Unzip the project

```bash
unzip blog.zip
cd blog
```

### 3. Install dependencies

```bash
npm install
```

This installs Astro, the MDX/Tailwind/sitemap integrations, and TypeScript tooling defined in `package.json`.

### 4. Run the dev server

```bash
npm run dev
```

Astro starts a local dev server, by default at:

```
http://localhost:4321
```

Open that URL in your browser — you should see the profile-style homepage (placeholder name/bio, category grid, and an empty "recent articles" section, since the only seed post is a draft). The dev server hot-reloads on every file change.

### 5. Try creating a post

```bash
npm run new-post -- "My First Post" --category ai-security
```

This scaffolds `src/content/ai-security/my-first-post.mdx` with valid frontmatter (`draft: true`). Edit it, save, and it'll show up in the dev server automatically (drafts still render at `npm run dev` time — they're excluded from listing pages and the final build only via `sortPosts.ts`).

### 6. Type-check and build for production

```bash
npm run build
```

This runs `astro check` (type-checking, including your content frontmatter against the Zod schema in `src/content/config.ts`) and then `astro build`, producing static output in `dist/`.

### 7. Preview the production build locally

```bash
npm run preview
```

Serves the `dist/` folder exactly as it will be deployed — useful for catching issues that only show up in the built version (broken `base` path, etc.).

### 8. Before deploying to GitHub Pages

This site deploys to the custom domain `bogiloco.dev` via GitHub Pages, so `astro.config.mjs` has no `base` path — `site` is set to `https://bogiloco.dev` and `public/CNAME` points GitHub Pages at that domain.

Then, on GitHub:

1. Push this project to a new GitHub repository.
2. Go to **Settings → Pages → Source**, select **GitHub Actions**.
3. Go to **Settings → Pages → Custom domain**, enter `bogiloco.dev`, and add the corresponding DNS records at your registrar (an `A`/`ALIAS` record to GitHub Pages' IPs, or a `CNAME` record if using a subdomain).
4. Push to `main` (or run the workflow manually from the Actions tab) — `.github/workflows/deploy.yml` will build and deploy automatically.

### Troubleshooting

| Problem | Fix |
|---|---|
| `npm install` fails on Node version | Make sure you're on Node 20+ (`node -v`) |
| Port 4321 already in use | `npm run dev -- --port 4322` |
| Post doesn't show on homepage | Check `draft: false` is set once you want it published/counted |
| Build fails on frontmatter | Compare against `src/content/config.ts` schema — a required field is likely missing or mistyped |
| 404s on GitHub Pages after deploy | Check DNS propagation and that `public/CNAME` still contains `bogiloco.dev` |

## Creating a new post

```bash
npm run new-post -- "My Post Title" --category ai-security
```

Valid categories: `ai`, `ai-security`, `testing-ai`, `qa-automation`, `notes`.

This scaffolds `src/content/<category>/<slug>.mdx` with valid frontmatter and `draft: true`.

## Publishing workflow

1. Draft the post by hand → `draft: true`
2. Fact-check and verify any code examples
3. Edit for style/SEO
4. Review, set `draft: false`
5. Merge to `main` → GitHub Actions builds and deploys automatically

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | local dev server |
| `npm run build` | type-check + build to `dist/` |
| `npm run preview` | preview the production build locally |
| `npm run new-post -- "Title" --category <cat>` | scaffold a new post |
| `npm run check-links` | validate outbound links in published posts |

## Repo structure

```
.github/workflows/       # CI/CD (deploy.yml)
src/content/              # blog posts, one folder per category
src/data/                  # site.ts (profile), categories.ts, themes.ts
src/components/             # Astro components (Callout, CodeBlock, PostCard, ThemePicker, Newsletter)
src/layouts/                  # BaseLayout, PostLayout
src/pages/                     # routes (index, articles/, categories/, about)
src/utils/                      # readingTime, sortPosts helpers
scripts/                         # new-post.mjs, check-links.mjs
```
