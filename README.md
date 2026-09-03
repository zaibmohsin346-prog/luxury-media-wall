# Media Wall Studio — website

A luxury interior-studio website for a UAE media wall / TV wall business.
Static HTML, CSS and vanilla JavaScript. **No build step, no dependencies,
no npm install.** Double-click `index.html` and it runs.

---

## Running it

**Locally** — just open `index.html` in any browser.

**With a local server** (recommended, matches production exactly):

```bash
powershell -ExecutionPolicy Bypass -File tools/serve.ps1
```

then visit <http://localhost:8765>.

**Publishing** — upload these to your host's web root:

```
index.html
robots.txt
sitemap.xml
assets/
```

`tools/` and `README.md` are development files and do not need uploading.
Works as-is on Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel or any
shared host. There is no server-side code.

---

## Sharing

Two share points, both using the OS share sheet where it exists:

- **In each project modal** - "Share this design"
- **Above the footer** - "Know someone planning a media wall?"

`navigator.share` opens the real share sheet on a phone (WhatsApp, Messages,
Mail). Desktop browsers mostly lack it, so it falls back to copying the link
and showing "Link copied". There is also an explicit WhatsApp button, since
that is how most enquiries actually travel in the UAE - it opens WhatsApp with
the message ready and lets the sender pick a recipient.

**Every project has its own address**, which is what makes sharing worth
anything - you can send one specific wall rather than the homepage:

```
https://your-site/#project-07
```

Opening a project pushes a history entry, so the phone back gesture closes the
modal instead of leaving the site. Arriving on a shared link opens that project
automatically, and pasting a project link while the site is already open works
too (a fragment change does not reload the page, so that case is handled
separately via `hashchange`).

## The video loader

The film streams from ImageKit, so there is a real wait on first play. The
indicator is a thin champagne arc turning inside a faint ring - same hairline
weight and gold as the section rules, card underlines and process bars. It
lives in `assets/css/loader.css`.

**It only appears when it is actually needed.** It waits 250ms before showing -
if the video is ready sooner, nothing flashes, because a spinner that appears
for 100ms is worse than no spinner. It also reappears on `waiting`/`stalled`
if the stream drops mid-playback, and clears on `playing`, `canplay` or
`error`.

Nothing else on the page blocks, so nothing else needs one. A full-page loader
would only delay the largest paint on a site that already renders fast.

## Going live

The site is static, so it deploys by uploading a folder. No Node, no build,
no server runtime.

### 1. Deploy

**Netlify Drop** is the fastest route and needs no account to start:
open <https://app.netlify.com/drop> and drag the **unzipped folder** in.
You get an HTTPS address within about a minute. Cloudflare Pages
(<https://pages.cloudflare.com>) works the same way. For traditional hosting,
upload the same files into `public_html` over FTP.

Upload these, with `index.html` at the top level:

```
index.html   robots.txt   sitemap.xml   _headers
assets/
```

`README.md` and `tools/` are development files - they do not need uploading.

### 2. Set your real URL (do not skip this)

`index.html`, `sitemap.xml` and `robots.txt` ship pointing at
`https://mediawallstudio.ae`. If the site is actually served from a different
address, the canonical tag tells Google the real page lives somewhere else -
and your live site may never rank. Fix all ten references in one command:

```bash
powershell -ExecutionPolicy Bypass -File tools/set-domain.ps1 -Domain "https://your-site.netlify.app"
```

Add `-WhatIf` to preview first. Run it again when you move to a custom domain.
It only rewrites your own URLs - ImageKit, Google Fonts, WhatsApp and
schema.org addresses are left untouched.

Re-upload after running it.

### 3. After it is live

- Submit `sitemap.xml` in Google Search Console
- Create a Google Business Profile - for local searches like
  "media wall Dubai" it does more work than the whole site
- Check the WhatsApp button from a real phone

`_headers` sets caching and basic security headers on Netlify and Cloudflare
Pages; other hosts ignore it harmlessly. HTML always revalidates so redeploys
reach visitors immediately, while CSS and JS cache for an hour - they are not
content-hashed, so they cannot be cached forever.

## File map

```
index.html                  All markup and SEO metadata
assets/css/style.css        Tokens, typography, utilities, header, hero, footer
assets/css/sections.css     Every section component
assets/js/site-config.js    ← ALL CONTENT AND IMAGE PATHS LIVE HERE
assets/js/main.js           Behaviour (modal, sliders, configurator, form)
assets/img/                 Photography at three widths + rendered "before" scenes
assets/video/               Installation film
tools/resize-images.ps1     Regenerates responsive image sizes
tools/serve.ps1             Local preview server
```

**If you only edit one file, edit `assets/js/site-config.js`.** Phone number,
all nine projects, materials, services, process steps, testimonials and every
image path are defined there as plain data.

---

## Changing the phone number

One place — the top of `assets/js/site-config.js`:

```js
const CONTACT = {
  phoneDisplay: '+971 56 752 2656',
  phoneDial:    '+971567522656',
  whatsapp:     'https://wa.me/971567522656',
  ...
};
```

Every header button, hero CTA, WhatsApp link, floating button, footer entry and
project enquiry updates automatically. The `href` values written into the HTML
are only fallbacks for the split second before JavaScript runs — update them
too if you want them to match perfectly with JS disabled.

---

## Replacing photographs

Each photo exists at three widths so phones never download a desktop image:

```
assets/img/project-01-marble-halo-480.jpg     phones
assets/img/project-01-marble-halo-900.jpg     tablets, cards, materials, details
assets/img/project-01-marble-halo-1400.jpg    desktop and the project modal
```

`site-config.js` refers to the **base name without the size suffix**
(`assets/img/project-01-marble-halo`) and the browser picks the right one.

To swap a photo:

1. Drop your full-size image into `assets/img/` using the base name plus `.jpg`,
   e.g. `assets/img/project-01-marble-halo.jpg`
2. Run:
   ```bash
   powershell -ExecutionPolicy Bypass -File tools/resize-images.ps1
   ```
3. Done. The three derivatives are rebuilt and the oversized original is removed
   from the web folder.

Keep your full-resolution masters somewhere outside `assets/img`.

### Which photo is which

| Slot | File base | Shown as |
|---|---|---|
| Hero / OG image | `hero-poster` | Full-screen hero (also `-1800` for large displays) |
| Project 01 | `project-01-marble-halo` | Modern Marble Media Wall |
| Project 02 | `project-02-warm-oak` | Warm Oak Media Wall |
| Project 03 | `project-03-dark-luxury` | Dark Luxury Media Wall + "Why choose us" image |
| Project 04 | `project-04-fluted-travertine` | Fluted Travertine Media Wall + CTA band background |
| Project 05 | `project-05-full-height` | Full-Height Luxury TV Wall |
| Project 06 | `project-06-minimal-light` | Minimal Light Media Wall |
| Project 07 | `project-07-fireplace` | Media Wall With Fireplace |
| Project 08 | `project-08-backlit-onyx` | Backlit Onyx Media Wall |
| Project 09 | `project-09-uae-penthouse` | UAE Penthouse Media Wall |

> **One known duplication.** You supplied exactly nine photographs and there are
> nine project slots, so the hero still image reuses the Project 09 penthouse
> shot. On desktop this is barely seen — the hero plays the video instead — but
> on phones the same picture appears twice. To fix it, drop a tenth photograph
> in as `assets/img/hero-poster.jpg` and run `tools/resize-images.ps1`; nothing
> else needs changing.

The **Materials** and **Details Matter** sections do not use separate files.
They are tight crops of the project photography, framed with CSS. Each entry in
`MATERIALS` and `DETAILS` has `pos` (background-position) and `size`
(background-size) — nudge those numbers to re-frame a crop without touching an
image. For example, to move the "White Marble" swatch further up the slab:

```js
{ name: 'White Marble', src: '...project-01-marble-halo-900.jpg',
  pos: '60% 12%',   // was 60% 24% — lower second number moves the crop up
  size: '300%', ... }
```

---

## The before / after sliders

Both sides are photographic and use the same responsive widths.

The three "before" frames were derived from the finished photographs using
ImageKit's AI edit (`e-edit`), with a deliberately short prompt:

> `empty bare plaster wall with nothing on it, no television, no cabinet,
> no marble, no shelves`

Because they come from the "after" image itself, the room, floor, curtains,
ceiling detail, lighting and camera angle line up exactly — which is what makes
the slider read as one continuous shot rather than two unrelated pictures.
Long, over-specified prompts produced worse results than short ones.

**These are illustrations of the starting condition, not photographs of the
actual site before work began.** Replace them with real survey photos before
using this as a live sales tool. To swap one in: name it
`before-01-plain-wall.jpg`, drop it in `assets/img/`, run
`tools/resize-images.ps1`, and upload the full-size file to ImageKit under
`/media-wall`. Nothing in the code needs touching — `TRANSFORMS` already points
at the base name.

Regenerating a "before" costs ImageKit extension units (650/month on the free
plan) and takes 30–60 seconds, returning intermediate `200` responses with an
`is-intermediate-response: true` header until it is ready — poll, don't assume
the first response is the image.

---

## The video

`assets/video/media-wall-reel.mp4` is used in two places:

- **Hero background** — muted, looping, and only loaded on screens ≥ 1024px
  wide, when the visitor has not asked for reduced motion, and not on a
  data-saver connection. Everyone else gets the still hero image.
- **"Watch the transformation"** — click-to-play with sound and controls.

To use a different film in the video section, drop in a new MP4 and change
`MEDIA.reelVideo` in `site-config.js` (and `data-src` on `#reelVideo` in
`index.html`). Keep it H.264/AAC so it plays everywhere. A poster frame is
already set to `hero-poster-1400.jpg`.

---

## How the enquiry form works

There is **no backend**. On submit the form validates, then opens WhatsApp with
the whole enquiry pre-formatted — name, phone, email, location, wall type, size
and message. Nothing is lost and nothing needs hosting.

If you later want the enquiry emailed as well, the cleanest place to add it is
the submit handler in `assets/js/main.js` (`initForm`), just before the
`window.open(...)` call — post the same values to Formspree, Getform, or your
own endpoint.

---

## ImageKit — LIVE

Every photograph is served through [ImageKit](https://imagekit.io): automatic
AVIF/WebP, on-the-fly resizing, global CDN. Measured against the local JPEGs it
cuts payload by **35–45%**:

| Image | ImageKit (WebP) | Local (JPEG) |
|---|---|---|
| project-01 @900w | 48 KB | 86 KB |
| project-04 @900w | 69 KB | 114 KB |
| hero @1800w | 196 KB | 304 KB |

Configured in `assets/js/site-config.js`:

```js
const IMAGEKIT = {
  urlEndpoint: 'https://ik.imagekit.io/ojutq4xhq',
  folder:      'media-wall',
  transform:   'q-auto,f-auto'
};
```

**Blank the `urlEndpoint` and the whole site instantly falls back to the local
files in `assets/img`** — which are all still present and current. That is your
rollback if ImageKit is ever unavailable or you stop paying for it.

All 17 source files live in `/media-wall`: 10 photographs, 3 AI-derived
"before" frames, and the video. The `imagekit-upload/` staging folder has been
deleted now that everything is up.

**The page makes zero image or video requests to your own origin.** Verified in
the browser: 18 `<img>` elements and 29 CSS background images, all ImageKit,
none broken. Your host only serves `index.html`, two stylesheets and two scripts.

**The video is on ImageKit too.** ImageKit optimises it on delivery —
2.49 MB → **929 KB**, a 63% saving — and it is requested with no `tr=`
parameter, so plain CDN delivery costs no video-processing credits.

Three deliberate exceptions:

- **SVG would stay local** if you ever add one. ImageKit rasterises SVG to
  WebP, which came out *larger* (4.9 KB vs 2.7 KB) and loses vector sharpness,
  so `asset()` skips any `.svg`. (Nothing uses this today — the before/after
  SVGs were replaced by photographs.)
- **The hero is hard-coded** to its ImageKit URL in `index.html` — the `<img>`,
  the `<link rel="preload">`, `og:image`, `twitter:image` and the JSON-LD
  `image`. Rewriting it in JavaScript would download it twice, because the
  preload fires before any script runs.
- **The reel's `poster` is hard-coded** for the same reason: a `poster`
  attribute is fetched immediately regardless of `preload="none"`, so leaving
  it as a local path cost a wasted 235 KB before JS could rewrite it.

> If you change `urlEndpoint`, update those hard-coded URLs in `index.html`
> too — the config value alone will not move them.

### How the URLs are built

One helper (`asset()` in `main.js`) rewrites every path. The width baked into a
local filename becomes the ImageKit `w-` parameter, so responsive behaviour is
identical either way:

```
assets/img/project-01-marble-halo-900.jpg
  -> https://ik.imagekit.io/<id>/media-wall/project-01-marble-halo.jpg?tr=w-900,q-auto,f-auto
```

## AI tooling (MCP servers and agent skills)

This machine has no Node.js, npm or `claude` CLI, so the vendors' installers
(`npx skills add …`, `claude mcp add …`) cannot run here. Everything was
installed from the source repositories directly instead — same files, same
result.

**`.mcp.json`** registers three project-scoped MCP servers:

| Server | Auth |
|---|---|
| `imagekit_devtools` | none (public) |
| `imagekit_api` | OAuth on first connect |
| `supabase` | OAuth on first connect |

**`.claude/skills/`** holds 9 agent skills — 7 from ImageKit (`mcp-preflight`,
`search-docs`, `transformation-builder`, `search-assets`,
`imagekit-sdk-reference`, `imagekit-integrations`, `ai-tasks`) and 2 from
Supabase (`supabase`, `supabase-postgres-best-practices`, the latter with 30+
reference documents).

The skills and `imagekit_devtools` work now. **`imagekit_api` and `supabase`
still need authorising**, and that has to happen in an *interactive* terminal
session — run `/mcp`, select the server, and complete the OAuth flow in the
browser. It cannot be done from a non-interactive session, and no token or
callback URL should ever be pasted into a chat.

Until then: ImageKit docs search and transformation building are available,
but managing your media library and anything Supabase is not.

If you install Node.js 18+ later, the official installers become available and
will manage updates for you:

```bash
npx skills add imagekit-developer/skills --all
npx skills add supabase/agent-skills
```

## The drawn signature

Between the enquiry form and the footer, "Media Wall Studio" draws itself in
champagne script when it scrolls into view.

It started as a request to drop in a React component (`handwriting-svg.tsx`)
that used `framer-motion` + `opentype.js`. This project has no React, no
Tailwind build, no TypeScript and no Node, so that component could not run.
The effect was rebuilt to fit what is here — and it is lighter than the
original either way.

**The key difference: the font is parsed once at build time, not on every page
load.** The original fetched a ~450 KB TTF from `raw.githubusercontent.com`
in the browser and parsed it with opentype.js on every visit. GitHub raw is
not a production CDN, and that is a lot of work for a fixed piece of artwork.

Here the outline was extracted once and frozen into `assets/js/signature.js`:

| | Original component | This implementation |
|---|---|---|
| Runtime dependencies | framer-motion, opentype.js | none |
| Network requests | 1 (450 KB TTF, third-party) | 0 |
| Font parsing | every page load | never |
| Payload | ~450 KB + libraries | 15 KB (~4 KB gzipped) |

**How the animation works.** The `<path>` carries `pathLength="1"`, which
normalises its length to 1 regardless of actual geometry. That means
`stroke-dasharray: 1; stroke-dashoffset: 1 → 0` draws the whole thing with no
`getTotalLength()` call — the animation is pure CSS. It hooks into the same
`IntersectionObserver` every other section uses, and is disabled under
`prefers-reduced-motion` (the mark simply appears complete).

**To change the text or font**, the outline has to be regenerated. Serve the
project locally, put a page in a temp folder that loads `opentype.js` from a
CDN alongside a `.ttf`, and run:

```js
const font = opentype.parse(await fetch('yourfont.ttf').then(r => r.arrayBuffer()));
const p = font.getPath('Your Text', 0, 120, 120);
const b = p.getBoundingBox(), pad = 9.6;
console.log(p.toPathData(0));  // -> SIGNATURE.d
console.log([Math.floor(b.x1-pad), Math.floor(b.y1-pad),
             Math.ceil(b.x2-b.x1+pad*2), Math.ceil(b.y2-b.y1+pad*2)].join(' '));  // -> SIGNATURE.viewBox
```

Paste both into `assets/js/signature.js`, then delete the temp folder — none of
it ships. Precision `0` was chosen deliberately: it renders identically to
precision `2` at this size but is 44% smaller.

Current face is **Great Vibes** (SIL Open Font License, free for commercial
use). Allura and Parisienne were also tried; Great Vibes was the most formal.

## Design system

| Token | Value | Used for |
|---|---|---|
| `--ink` | `#111111` | Dark sections, header glass, footer |
| `--charcoal` | `#171717` | Body text |
| `--champagne` | `#C6A66B` | The single accent — used sparingly |
| `--taupe` | `#8A8176` | Secondary marks |
| `--ivory` | `#F5F2EC` | Page background |

Type is **Playfair Display** for headings and **Inter** for everything else,
loaded from Google Fonts with system fallbacks.

The CSS uses Tailwind's class-naming conventions (`grid`, `flex`,
`items-center`, `gap-6`, `text-center`, …) for its utility layer, but ships that
layer as plain hand-written CSS. That means no CDN, no build, no
flash-of-unstyled-content — and if you later want the real Tailwind, the markup
will already speak its language.

---

## Accessibility and performance notes

- Skip link, focus-visible rings, and a focus trap in the project modal
- Sliders are operable by keyboard (arrow keys, Home, End) and announce their
  position via ARIA
- Every animation is disabled under `prefers-reduced-motion`
- Touch devices get card details revealed by default, since they cannot hover
- Everything below the hero is lazy-loaded; the hero image is preloaded at high priority
- First load on a phone is roughly 400–450 KB (markup, CSS, JS, fonts and the
  hero image). Project photography streams in as you scroll.
- Grid thumbnails top out at the 900px file — a 1400px file for a 400px card
  would only punish high-DPI phones. The full-size image is reserved for the
  project modal, the hero and the large feature images.
