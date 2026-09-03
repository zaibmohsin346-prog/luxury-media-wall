# Build prompt — Media Wall Studio

A single reusable prompt that reproduces this website. It describes the site
**as built**, not the original brief, so the output lands where this one ended
up rather than where it started.

To reuse it for a different client, change the **Brand** block and swap the
photographs. Everything else generalises.

---

## The prompt

> Build a complete, production-ready marketing website for a luxury interior
> design studio that designs and installs custom media walls and TV feature
> walls. It must look like an architectural design practice, not a contractor.
>
> ### Stack — read this first, it constrains everything
>
> Static **HTML, hand-written CSS and vanilla JavaScript**. No React, no
> Tailwind build, no TypeScript, no bundler, no npm install, no CDN
> dependencies. The whole site must run by opening `index.html` and deploy by
> uploading a folder. Assume the machine has no Node.js.
>
> Write the CSS by hand but name utility classes the way Tailwind does
> (`grid`, `flex`, `items-center`, `gap-6`, `text-center`) so the markup could
> later move onto a real Tailwind build untouched. Keep a small utility layer
> and lean on component classes for everything bespoke.
>
> All content — every image path, all copy, phone number, project data —
> lives in one config file so nothing needs hunting through markup.
>
> ### Brand
>
> - Name: **Media Wall Studio**, Dubai, UAE
> - Phone / WhatsApp: **+971 56 752 2656** (`https://wa.me/971567522656`)
> - Palette: ink `#111111`, charcoal `#171717`, taupe `#8A8176`,
>   champagne `#C6A66B`, ivory `#F5F2EC`
> - Type: **Playfair Display** for headings, **Inter** for everything else
> - Champagne is an accent only. Thin gold hairlines, never gold fills.
>
> ### Voice
>
> Confident and specific, never salesy. Write like a studio that knows its
> trade: "so nobody can blame anybody else when a joint does not line up",
> "the parts of the job nobody notices when they are done properly". Name real
> materials — Calacatta, travertine, fluted oak, backlit onyx, brass inlay.
> No exclamation marks, no "elevate your space".
>
> ### Sections, in order
>
> 1. **Hero** — full-bleed, muted looping video on desktop only, still image
>    everywhere else. Headline rises line by line. Stat strip along the bottom.
> 2. **Marquee** — scrolling capability strip, pauses on hover.
> 3. **About** — studio statement, two columns, stat grid.
> 4. **Projects** — nine cards, nine *different* photographs, portrait 4:5.
>    Hover zooms the image, darkens it, draws a gold rule and fades in the
>    description, material tags and a CTA.
> 5. **Project modal** — full specification: location, materials, design style,
>    lighting, custom features, and a WhatsApp button pre-filled with that
>    project's name.
> 6. **Before / after** — three drag-to-compare sliders, mouse, touch and
>    keyboard.
> 7. **Services** — six cards, minimal line icons, ink panel wipes up on hover.
> 8. **Why choose us** — four numbered points beside a large image.
> 9. **Process** — six steps on a dark ground, gold progress bar draws on scroll.
> 10. **Configurator** — interactive wall builder: six finishes and five
>     toggleable features (LED, floating cabinet, tall storage, fireplace, open
>     shelving), composed from CSS layers using real material photography as
>     fills.
> 11. **Materials** — ten swatches, detail on hover.
> 12. **Detail gallery** — masonry of tight close-ups: veining, LED, shadow
>     gaps, cable routes.
> 13. **Video** — click-to-play film with a loading indicator.
> 14. **Testimonials** — three, serif, restrained.
> 15. **CTA band** — dark, architectural background image.
> 16. **Contact** — enquiry form.
> 17. **Signature sign-off** — the studio name in script, drawing itself on scroll.
> 18. **Footer** + floating WhatsApp button.
>
> ### Behaviour
>
> - **Enquiry form has no backend.** It validates, then opens WhatsApp with the
>   whole enquiry pre-formatted — name, phone, email, location, wall type, size,
>   message. Nothing to host, nothing lost.
> - **Every project has its own URL** (`#project-07`). Opening one pushes a
>   history entry so the phone back gesture closes the modal. Arriving on a
>   shared link opens that project. Handle a link pasted while the site is
>   already open too — a fragment change does not reload the page.
> - **Share buttons** in each project modal and above the footer, using
>   `navigator.share` where it exists, falling back to copying the link. Add an
>   explicit WhatsApp button; that is how enquiries actually travel in the UAE.
> - Sticky header: transparent over the hero, dark glass once scrolled, hides
>   on scroll down and returns on scroll up. Full-screen mobile drawer with
>   staggered links.
> - Scroll reveals via `IntersectionObserver`, not a library.
>
> ### Rules I want you to hold to
>
> - **Touch devices cannot hover.** Anything revealed on hover must be visible
>   by default under `@media (hover: none)`.
> - **Scope reveal styles to a `.js` class** set by an inline script, so no
>   content disappears if scripting fails.
> - **Disable every animation under `prefers-reduced-motion`.**
> - Focus-visible rings, a skip link, a focus trap in the modal, ARIA on the
>   sliders, alt text on every image.
> - **Ship three widths per photograph** (480 / 900 / 1400) and write accurate
>   `sizes`. Cap grid thumbnails at the 900 file — serving a 1400 file into a
>   400px card only punishes high-DPI phones.
> - Lazy-load everything below the fold; preload the hero at high priority.
> - No horizontal overflow at any width. Verify at 375, 768 and 1440.
>
> ### SEO
>
> Title, meta description, canonical, Open Graph and Twitter cards, favicon,
> `HomeAndConstructionBusiness` JSON-LD with services and opening hours,
> `robots.txt` and `sitemap.xml`. Target: media wall Dubai, TV wall Dubai,
> custom media wall UAE, marble media wall, floating TV unit Dubai.
>
> ### Finally
>
> Verify it in a browser before you tell me it is done: every breakpoint, the
> modal, the sliders, the configurator, form validation, and that no image is
> broken. Tell me what you could not verify.

---

## Optional follow-up prompts

Each of these was a separate step here. They work better asked after the site
exists than bundled into the first prompt.

**Image CDN**
> Route every image through ImageKit with automatic AVIF/WebP and on-the-fly
> resizing, behind a single config value so blanking it falls back to the local
> files. Keep the local copies as a rollback. Hard-code the hero rather than
> rewriting it at runtime — it is preloaded, and rewriting it downloads it twice.

**Photographic before/after frames**
> I have no "before" photos. Derive each one from its finished photograph using
> ImageKit's `e-edit` so the room, floor, lighting and camera angle match
> exactly. Use short prompts — long ones do worse. Then update the card copy to
> match the new images.

**Drawn signature**
> Add the studio name in script, drawing itself on scroll. Parse the font once
> at build time and freeze the path into the source — do not fetch and parse a
> font in the browser on every page load. Use `pathLength="1"` so the dash
> animation needs no `getTotalLength()` call.

**Deploy**
> Build a clean `dist/` containing only the website — no config, build scripts
> or source masters. Add cache and security headers. Write a script that sets
> the canonical, Open Graph, JSON-LD and sitemap URLs to my real domain in one
> command, leaving third-party URLs untouched.

---

## What made the difference

Patterns worth carrying to the next build:

- **Naming the constraints up front** ("no Node, no bundler, deploys as a
  folder") shaped every later decision. Stating the stack you *cannot* use
  matters more than the one you can.
- **Asking for verification as part of the work**, not as a follow-up. "Tell me
  what you could not verify" surfaces gaps instead of hiding them.
- **Giving voice examples rather than adjectives.** One real sentence beats
  three paragraphs of "premium, sophisticated, elegant".
- **Stating the anti-goals.** "Must not look like a contractor site" did more
  work than any positive description.
