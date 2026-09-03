/* ==========================================================================
   MEDIA WALL STUDIO — Site configuration
   --------------------------------------------------------------------------
   EVERYTHING you are likely to want to change lives in this one file:
   the phone number, every image path, and all project / material copy.
   Edit here and the whole site updates. No other file needs touching.

   IMAGE NAMING CONVENTION
   Each photograph exists at three widths so the browser only downloads
   what it needs:
       assets/img/<name>-480.jpg    phones
       assets/img/<name>-900.jpg    tablets + gallery cards
       assets/img/<name>-1400.jpg   desktop + project modal
   To swap a photograph, drop in replacements at those three widths keeping
   the same file name. Full-resolution masters are kept in /_masters.
   ========================================================================== */

/* ---------------------------------------------------------------- CONTACT */
/* The primary number is the one every call-to-action uses - header, hero,
   floating button, project enquiries. The second is listed wherever someone
   is deliberately looking for contact details (contact section, footer,
   mobile menu) rather than competing with the main action. */
const CONTACT = {
  phoneDisplay:  '+971 56 752 2656',
  phoneDial:     '+971567522656',
  whatsapp:      'https://wa.me/971567522656',

  phoneDisplay2: '+971 56 718 5313',
  phoneDial2:    '+971567185313',
  whatsapp2:     'https://wa.me/971567185313',

  city:          'Dubai',
  country:       'United Arab Emirates',
  email:         'hello@mediawallstudio.ae'
};

/* Pre-filled WhatsApp message for a specific project enquiry */
const waLink = (message) =>
  CONTACT.whatsapp + (message ? '?text=' + encodeURIComponent(message) : '');

/* -------------------------------------------------------------- IMAGEKIT */
/* Leave `urlEndpoint` empty and the site serves the local files in
   assets/img exactly as it does now. Fill it in and every image on the page
   is served through ImageKit instead, with automatic AVIF/WebP and
   on-the-fly resizing — no other change needed anywhere.

   urlEndpoint: from ImageKit dashboard → Developer options → API keys,
                looks like  https://ik.imagekit.io/your_imagekit_id
   folder:      the folder you uploaded the images into, or '' for the root.

   The uploaded file names must match the base names used below WITHOUT the
   size suffix, e.g. upload `project-01-marble-halo.jpg` (full resolution) —
   ImageKit generates the 480/900/1400 variants itself. */
const IMAGEKIT = {
  urlEndpoint: 'https://ik.imagekit.io/ojutq4xhq',
  folder:      'media-wall',  // set to '' if you upload to the root folder
  transform:   'q-auto,f-auto'
};

/* ------------------------------------------------------------------ MEDIA */
const MEDIA = {
  heroPoster: 'assets/img/hero-poster',        // -480 / -900 / -1400 / -1800
  heroVideo:  'assets/video/media-wall-reel.mp4',
  reelVideo:  'assets/video/media-wall-reel.mp4' // "Watch the transformation" section
};

/* --------------------------------------------------------------- PROJECTS */
/* Nine separate projects, nine separate photographs. */
const PROJECTS = [
  {
    n: '01',
    img: 'assets/img/project-01-marble-halo',
    title: 'Modern Marble Media Wall',
    short: 'A book-matched marble slab with a recessed LED halo, floating oak console and lit display shelving.',
    tags: ['Marble', 'Oak', 'LED Halo'],
    location: 'Downtown Dubai, UAE',
    materials: 'Calacatta porcelain slab / Light oak veneer / Black tinted glass',
    style: 'Minimal contemporary',
    lighting: 'Recessed warm-white halo behind the TV recess, linear shelf lighting, floor wash beneath the console',
    features: [
      'Floating console with concealed soft-close storage',
      'Recessed television niche with LED halo',
      'Full cable management inside the wall build-up',
      'Backlit display shelving to the return wall'
    ],
    alt: 'Modern marble media wall with a recessed LED halo around the television and a floating oak console'
  },
  {
    n: '02',
    img: 'assets/img/project-02-warm-oak',
    title: 'Warm Oak Media Wall',
    short: 'Full-height oak joinery framing a marble television panel, with warm linear light washing every edge.',
    tags: ['Natural Oak', 'Marble', 'Linear LED'],
    location: 'Jumeirah, Dubai, UAE',
    materials: 'Natural oak veneer / Statuario porcelain / Bronze-tinted glass fronts',
    style: 'Warm contemporary',
    lighting: 'Concealed cove above the panel, continuous linear LED beneath the console and inside each niche',
    features: [
      'Floor-to-ceiling oak joinery with push-to-open fronts',
      'Marble television panel with shadow-gap detailing',
      'Integrated display niche with stone back panel',
      'Concealed AV rack with ventilated glass doors'
    ],
    alt: 'Warm oak media wall with a marble television panel and continuous concealed LED lighting'
  },
  {
    n: '03',
    img: 'assets/img/project-03-dark-luxury',
    title: 'Dark Luxury Media Wall',
    short: 'Deep brown marble inlaid with brass linework, set against high-gloss walnut cabinetry.',
    tags: ['Dark Marble', 'Brass Inlay', 'Gloss Walnut'],
    location: 'Palm Jumeirah, Dubai, UAE',
    materials: 'Emperador marble / Polished brass inlay / High-gloss walnut',
    style: 'Art-deco contemporary',
    lighting: 'Dramatic grazing light across the stone, warm niche lighting within the walnut units',
    features: [
      'Hand-set brass inlay to a bespoke geometric pattern',
      'High-gloss walnut tall units with integrated lighting',
      'Marble-topped floating console with glass fronts',
      'Concealed equipment bay with IR pass-through'
    ],
    alt: 'Dark luxury media wall in brown marble with brass inlay and high-gloss walnut cabinetry'
  },
  {
    n: '04',
    img: 'assets/img/project-04-fluted-travertine',
    title: 'Fluted Travertine Media Wall',
    short: 'Floor-to-ceiling fluted travertine, grazed by hidden light, with a micro-cement television panel.',
    tags: ['Travertine', 'Fluted Panel', 'Hidden LED'],
    location: 'Al Barari, Dubai, UAE',
    materials: 'Fluted travertine / Micro-cement panel / Bronze and smoked glass',
    style: 'Textural minimalism',
    lighting: 'Hidden perimeter grazing light that rakes across the flutes, plus a halo behind the TV panel',
    features: [
      'Vertical fluted stone across the full wall height',
      'Recessed micro-cement television panel',
      'Bronze-framed floating console with smoked glass',
      'Lit display niches carved into the stone'
    ],
    alt: 'Fluted travertine media wall with hidden grazing light and a bronze floating console'
  },
  {
    n: '05',
    img: 'assets/img/project-05-full-height',
    title: 'Full-Height Luxury TV Wall',
    short: 'Wall-to-wall cabinetry that hides everything, wrapped around a slim marble television panel.',
    tags: ['Full Height', 'Custom Joinery', 'Hidden Storage'],
    location: 'Dubai Hills Estate, UAE',
    materials: 'Light oak veneer / Statuario porcelain / Smoked glass fronts',
    style: 'Architectural minimalism',
    lighting: 'Recessed cove above the marble, continuous under-console LED and interior cabinet lighting',
    features: [
      'Floor-to-ceiling storage on both sides of the television',
      'Slim marble panel with shadow-gap reveal',
      'Ventilated AV bay behind smoked glass',
      'Handleless push-to-open throughout'
    ],
    alt: 'Full-height luxury TV wall with light oak cabinetry either side of a marble television panel'
  },
  {
    n: '06',
    img: 'assets/img/project-06-minimal-light',
    title: 'Minimal Light Media Wall',
    short: 'The quietest scheme in the portfolio: a pale stone panel, a floating console and one soft line of light.',
    tags: ['Minimal', 'Pale Stone', 'Floating Unit'],
    location: 'Business Bay, Dubai, UAE',
    materials: 'Pale marble-effect porcelain / Bleached oak / Bronze glass',
    style: 'Soft minimalism',
    lighting: 'A single concealed cove above the panel and one continuous line beneath the console',
    features: [
      'Slim floating console spanning the full wall',
      'Pale stone panel with a concealed cove above',
      'Integrated side unit with a lit stone niche',
      'Completely handleless, completely cable-free'
    ],
    alt: 'Minimal light media wall with a pale stone panel and a slim floating console'
  },
  {
    n: '07',
    img: 'assets/img/project-07-fireplace',
    title: 'Media Wall With Fireplace',
    short: 'A linear electric fire set into marble, flanked by fluted dark oak and lit glass display cabinets.',
    tags: ['Fireplace', 'Marble', 'Fluted Oak'],
    location: 'Emirates Hills, Dubai, UAE',
    materials: 'Calacatta marble / Fluted dark oak / Bronze-framed glass',
    style: 'Contemporary classic',
    lighting: 'Linear flame effect, lit glass vitrines and a warm wash across the marble',
    features: [
      'Linear electric fireplace with a solid marble hearth shelf',
      'Fluted dark oak panelling across the full run',
      'Bronze-framed glass display cabinets with LED shelving',
      'Concealed ventilation and full cable management'
    ],
    alt: 'Media wall with a linear electric fireplace set into marble, framed by fluted dark oak'
  },
  {
    n: '08',
    img: 'assets/img/project-08-backlit-onyx',
    title: 'Backlit Onyx Media Wall',
    short: 'A translucent onyx slab lit from behind, framed by curved gloss walnut and leather-wrapped drawers.',
    tags: ['Backlit Onyx', 'Walnut', 'Curved Joinery'],
    location: 'DIFC, Dubai, UAE',
    materials: 'Backlit honey onyx / Gloss walnut / Wrapped leather fronts',
    style: 'Warm modern luxury',
    lighting: 'Edge-lit LED panel behind the onyx, track spotlighting and interior vitrine lighting',
    features: [
      'Translucent onyx slab on a dimmable backlit panel',
      'Curved high-gloss walnut tall units with brass reveals',
      'Leather-wrapped drawer fronts with inlaid handles',
      'Fully concealed AV and dimming control'
    ],
    alt: 'Backlit onyx media wall glowing behind the television, framed by curved gloss walnut units'
  },
  {
    n: '09',
    img: 'assets/img/project-09-uae-penthouse',
    title: 'UAE Penthouse Media Wall',
    short: 'A full living-room composition for a high-floor penthouse, balanced against the Dubai skyline.',
    tags: ['Penthouse', 'Onyx', 'Full Fit-Out'],
    location: 'Downtown Dubai penthouse, UAE',
    materials: 'Backlit onyx / Gloss walnut / Leather / Polished marble flooring',
    style: 'Complete living-room fit-out',
    lighting: 'Layered scheme: backlit stone, magnetic track spots, cove lighting and dimmable scene control',
    features: [
      'Full living-room design around the media wall',
      'Curved tall units answering the room geometry',
      'Scene-based lighting control across the whole space',
      'Coordinated stone, joinery and furniture package'
    ],
    alt: 'Penthouse living room with a backlit onyx media wall and the Dubai skyline beyond'
  }
];

/* --------------------------------------------------- BEFORE / AFTER PAIRS */
/* Both sides are now base names (no size suffix) and use the same responsive
   widths as everything else.

   The "before" frames were derived from each finished photograph with
   ImageKit's AI edit (e-edit), so the room, floor, curtains, ceiling detail,
   lighting and camera angle match the "after" exactly — which is what makes
   the slider read as one continuous shot. They are illustrations of the
   starting condition, NOT photographs of the actual site before work began.
   Swap in real survey photos when you have them: same three widths, same
   base-name convention, and nothing else needs changing.                   */
const TRANSFORMS = [
  {
    before: 'assets/img/before-01-plain-wall',
    after:  'assets/img/project-01-marble-halo',
    title:  'Plain Wall to Marble Statement',
    text:   'A blank plastered wall with nothing on it but three downlights, rebuilt as a book-matched marble panel with a floating console and a recessed LED halo.',
    beforeAlt: 'Before: a bare plastered living room wall lit by downlights',
    afterAlt:  'After: a marble media wall with LED halo and floating console'
  },
  {
    before: 'assets/img/before-02-bare-room',
    after:  'assets/img/project-04-fluted-travertine',
    title:  'Bare Wall to Fluted Travertine',
    text:   'An empty wall sitting between two travertine returns, rebuilt as a floor-to-ceiling fluted stone feature with hidden grazing light and a bronze floating unit.',
    beforeAlt: 'Before: an empty plastered wall between travertine returns',
    afterAlt:  'After: a fluted travertine media wall with hidden lighting'
  },
  {
    before: 'assets/img/before-03-empty-wall',
    after:  'assets/img/project-07-fireplace',
    title:  'Empty Wall to Fireplace Feature',
    text:   'A bare wall flanked by dark oak returns, rebuilt as a marble fireplace wall with a linear flame, fluted oak panelling and lit glass display cabinets.',
    beforeAlt: 'Before: a bare plastered wall flanked by dark oak returns',
    afterAlt:  'After: a marble fireplace media wall with fluted oak panelling'
  }
];

/* --------------------------------------------------------------- SERVICES */
/* `flagship: true` renders the dark card. Keep it to one - the whole point is
   that a single card pulls the eye first.
   `img` is a base name; the responsive widths are added automatically.
   `focus` is the object-position for the card crop: these photographs are
   portrait and the card band is landscape, so it decides which slice shows. */
const SERVICES = [
  {
    icon: 'wall', flagship: true,
    label: 'Flagship',
    title: 'Bespoke Media Walls',
    text: 'Measured TV-wall cabinetry, integrated lighting, stone surrounds, concealed storage and finish coordination for the whole room.',
    img: 'assets/img/project-01-marble-halo', focus: '50% 42%',
    cta: 'View media wall service',
    alt: 'Marble media wall with recessed LED halo and floating oak console'
  },
  {
    icon: 'unit',
    label: 'TV Unit Scope',
    title: 'Floating TV Units',
    text: 'Modern floating and fully built-in television units with concealed storage, ventilation and cable routing designed in from the start.',
    img: 'assets/img/project-02-warm-oak', focus: '48% 55%',
    cta: 'View TV unit service',
    alt: 'Warm oak media wall with a long floating television unit'
  },
  {
    icon: 'unit',
    label: 'Kitchen Scope',
    title: 'Kitchen Renovations',
    text: 'Cabinetry, counters, storage, lighting, surfaces and the practical upgrade details, planned around the kitchen you already have.',
    img: 'assets/img/service-kitchen', focus: '50% 45%',
    cta: 'View kitchen service',
    alt: 'Modern kitchen with a marble island, light oak cabinetry and pendant lighting'
  },
  {
    icon: 'storage',
    label: 'Storage Scope',
    title: 'Wardrobes',
    text: 'Sliding or hinged wardrobes, measured interiors, drawers, mirrors, hardware and storage layouts shaped around real wall dimensions.',
    img: 'assets/img/service-wardrobe', focus: '50% 45%',
    cta: 'View wardrobe service',
    alt: 'Walk-in wardrobe in light oak with lit hanging rails, drawers and a full-height mirror'
  },
  {
    icon: 'stone',
    label: 'Stone Scope',
    title: 'Marble & Stone Walls',
    text: 'Luxury marble, porcelain and natural stone finishes, book-matched across the wall and precision-cut around every opening.',
    img: 'assets/img/project-03-dark-luxury', focus: '52% 38%',
    cta: 'View stone service',
    alt: 'Dark brown marble feature wall inlaid with brass linework'
  },
  {
    icon: 'fluted',
    label: 'Panelling Scope',
    title: 'Wood & Fluted Panels',
    text: 'Contemporary veneer, fluted and slatted panelling in any finish, machined to fit the wall rather than cut down on site.',
    img: 'assets/img/project-04-fluted-travertine', focus: '35% 40%',
    cta: 'View panelling service',
    alt: 'Floor-to-ceiling fluted travertine panelling grazed by hidden light'
  },
  {
    icon: 'storage',
    label: 'Joinery Scope',
    title: 'Full-Height Joinery',
    text: 'Full-height wardrobes and custom joinery: measured interiors, drawers, mirrors, hardware and layouts shaped around real wall dimensions.',
    img: 'assets/img/project-05-full-height', focus: '75% 45%',
    cta: 'View joinery service',
    alt: 'Full-height light oak joinery running wall to wall'
  },
  {
    icon: 'led',
    label: 'Lighting Scope',
    title: 'Integrated LED Lighting',
    text: 'Warm ambient and architectural lighting built into the joinery, dimmable and scene-controlled, balanced on site at handover.',
    img: 'assets/img/project-06-minimal-light', focus: '45% 48%',
    cta: 'View lighting service',
    alt: 'Concealed cove and under-console LED lighting on a pale stone wall'
  }
];

/* ---------------------------------------------------------------- PROCESS */
const PROCESS = [
  { n: '01', title: 'Consultation',       text: 'Tell us about your space and requirements. We visit, measure and understand how the room is actually used.' },
  { n: '02', title: 'Design',             text: 'We develop a concept drawn specifically for your room, with elevations and realistic visuals.' },
  { n: '03', title: 'Material Selection', text: 'Choose your marble, wood, stone, lighting and finishes from physical samples, not screenshots.' },
  { n: '04', title: 'Fabrication',        text: 'Your media wall is precision-built in our workshop, dry-assembled and checked before it ever leaves.' },
  { n: '05', title: 'Installation',       text: 'Our team installs everything on site — joinery, stone, lighting, television and cabling.' },
  { n: '06', title: 'Final Reveal',       text: 'Lighting is balanced, surfaces are detailed and your living space becomes a finished statement interior.' }
];

/* -------------------------------------------------------------- MATERIALS */
/* Close-up crops taken from the studio's own project photography.
   `pos` and `size` are CSS background-position / background-size values —
   nudge them to re-frame a swatch without editing any image file.        */
const MATERIALS = [
  { name: 'Natural Oak',     src: 'assets/img/project-02-warm-oak-900.jpg',           pos: '84% 22%', size: '300%', desc: 'Warm, open-grain oak veneer with a soft matt lacquer.',            use: 'Full-height joinery' },
  { name: 'Dark Oak',        src: 'assets/img/project-07-fireplace-900.jpg',          pos: '94% 82%', size: '400%', desc: 'Deep-stained oak with a low-sheen finish that absorbs light.',      use: 'Feature panelling' },
  { name: 'Walnut',          src: 'assets/img/project-03-dark-luxury-900.jpg',        pos: '90% 20%', size: '330%', desc: 'High-gloss walnut with a mirror polish and brass reveals.',         use: 'Tall units' },
  { name: 'White Marble',    src: 'assets/img/project-01-marble-halo-900.jpg',        pos: '60% 24%', size: '300%', desc: 'Book-matched Calacatta with soft grey veining.',                    use: 'TV panel' },
  { name: 'Beige Marble',    src: 'assets/img/project-05-full-height-900.jpg',        pos: '56% 52%', size: '340%', desc: 'Warm beige stone that keeps a room calm and neutral.',              use: 'Console tops' },
  { name: 'Travertine',      src: 'assets/img/project-04-fluted-travertine-900.jpg',  pos: '92% 26%', size: '300%', desc: 'Natural travertine with an honest, open pore structure.',           use: 'Full walls' },
  { name: 'Charcoal Stone',  src: 'assets/img/project-03-dark-luxury-900.jpg',        pos: '52% 34%', size: '360%', desc: 'Dark stone with fine crystalline movement under grazing light.',    use: 'Dramatic schemes' },
  { name: 'Fluted Wood',     src: 'assets/img/project-04-fluted-travertine-900.jpg',  pos: '24% 40%', size: '320%', desc: 'Machined vertical flutes that catch light and add rhythm.',         use: 'Feature walls' },
  { name: 'Matte Black',     src: 'assets/img/project-01-marble-halo-900.jpg',        pos: '52% 80%', size: '420%', desc: 'Matt black glass and lacquer for recessive, quiet detailing.',      use: 'Cabinet fronts' },
  { name: 'Textured Panels', src: 'assets/img/project-08-backlit-onyx-900.jpg',       pos: '52% 30%', size: '300%', desc: 'Translucent backlit stone panels that glow from within.',           use: 'Statement centres' }
];

/* ------------------------------------------------- DETAIL GALLERY (CROPS) */
/* Close-up framings of the same craftsmanship, deliberately cropped tight
   so they read as detail shots rather than repeats of the project cards. */
const DETAILS = [
  { caption: 'Marble veining',      src: 'assets/img/project-01-marble-halo-900.jpg',       pos: '62% 20%', size: '280%', shape: 'tall' },
  { caption: 'LED halo detail',     src: 'assets/img/project-01-marble-halo-900.jpg',       pos: '38% 44%', size: '250%', shape: 'wide' },
  { caption: 'Fluted panel',        src: 'assets/img/project-04-fluted-travertine-900.jpg', pos: '22% 34%', size: '260%', shape: 'tall' },
  { caption: 'Brass inlay',         src: 'assets/img/project-03-dark-luxury-900.jpg',       pos: '56% 36%', size: '260%', shape: 'sq'   },
  { caption: 'Floating cabinet',    src: 'assets/img/project-02-warm-oak-900.jpg',          pos: '44% 74%', size: '240%', shape: 'wide' },
  { caption: 'Wood grain',          src: 'assets/img/project-05-full-height-900.jpg',       pos: '84% 22%', size: '270%', shape: 'tall' },
  { caption: 'Fireplace ribbon',    src: 'assets/img/project-07-fireplace-900.jpg',         pos: '48% 68%', size: '250%', shape: 'wide' },
  { caption: 'Glass display shelf', src: 'assets/img/project-07-fireplace-900.jpg',         pos: '86% 42%', size: '270%', shape: 'tall' },
  { caption: 'Backlit stone',       src: 'assets/img/project-08-backlit-onyx-900.jpg',      pos: '48% 32%', size: '230%', shape: 'sq'   },
  { caption: 'Leather drawer front',src: 'assets/img/project-08-backlit-onyx-900.jpg',      pos: '52% 78%', size: '260%', shape: 'wide' },
  { caption: 'Cable management',    src: 'assets/img/project-06-minimal-light-900.jpg',     pos: '42% 66%', size: '250%', shape: 'tall' },
  { caption: 'Shadow-gap reveal',   src: 'assets/img/project-02-warm-oak-900.jpg',          pos: '70% 34%', size: '280%', shape: 'sq'   }
];

/* ----------------------------------------------------------- CONFIGURATOR */
/* The interactive wall builder. Each finish points at a real material crop
   so the preview shows genuine stone and timber, not a flat colour.      */
/* What each completed project actually contains. The configurator scores the
   visitor's selection against this and shows the closest real build, so the
   preview is always a photograph of delivered work rather than a mock-up.
   `p` is the index in PROJECTS. */
const DESIGN_TRAITS = [
  { p: 0, finish: 'marble',   has: ['led', 'cabinet', 'shelves'] },
  { p: 1, finish: 'wood',     has: ['led', 'cabinet', 'tall'] },
  { p: 2, finish: 'charcoal', has: ['led', 'cabinet', 'tall'] },
  { p: 3, finish: 'fluted',   has: ['led', 'cabinet', 'shelves'] },
  { p: 4, finish: 'beige',    has: ['led', 'cabinet', 'tall'] },
  { p: 5, finish: 'marble',   has: ['led', 'cabinet'] },
  { p: 6, finish: 'marble',   has: ['led', 'cabinet', 'fire', 'shelves', 'tall'] },
  { p: 7, finish: 'stone',    has: ['led', 'cabinet', 'tall', 'shelves'] },
  { p: 8, finish: 'stone',    has: ['led', 'cabinet', 'tall'] }
];

const FINISHES = [
  { id: 'marble',    label: 'Marble',    src: 'assets/img/project-01-marble-halo-900.jpg',       pos: '58% 24%', size: '210%', flute: 0, fallback: '#d8d2c6' },
  { id: 'wood',      label: 'Wood',      src: 'assets/img/project-02-warm-oak-900.jpg',          pos: '82% 26%', size: '230%', flute: 0, fallback: '#9a7f5f' },
  { id: 'fluted',    label: 'Fluted',    src: 'assets/img/project-04-fluted-travertine-900.jpg', pos: '26% 36%', size: '200%', flute: 1, fallback: '#b6a893' },
  { id: 'stone',     label: 'Stone',     src: 'assets/img/project-04-fluted-travertine-900.jpg', pos: '92% 28%', size: '220%', flute: 0, fallback: '#a89a86' },
  { id: 'beige',     label: 'Beige',     src: 'assets/img/project-05-full-height-900.jpg',       pos: '56% 50%', size: '220%', flute: 0, fallback: '#cfc3ad' },
  { id: 'charcoal',  label: 'Charcoal',  src: 'assets/img/project-03-dark-luxury-900.jpg',       pos: '52% 34%', size: '220%', flute: 0, fallback: '#3b332c' }
];

/* --------------------------------------------------------------- QUOTES */
const TESTIMONIALS = [
  {
    text: 'From the first design discussion to the final installation, the entire media wall looks incredibly clean and premium. Every joint lines up.',
    by: 'Dubai Homeowner', meta: 'Downtown Dubai · Marble Media Wall'
  },
  {
    text: 'They measured, drew it properly, and what arrived on site was exactly what we approved. The lighting on the stone is the part everyone comments on.',
    by: 'Villa Owner', meta: 'Al Barari · Fluted Travertine Wall'
  },
  {
    text: 'Our old TV corner was a mess of cables. Now there is not a single wire visible and we have storage we actually use. Worth every dirham.',
    by: 'Apartment Owner', meta: 'Business Bay · Full-Height TV Wall'
  }
];

/* Enquiry form — media wall types offered in the dropdown */
const WALL_TYPES = [
  'Marble Media Wall',
  'Wooden Media Wall',
  'TV Wall',
  'Floating TV Unit',
  'Fireplace Media Wall',
  'Full-Height Media Wall',
  'Other'
];
