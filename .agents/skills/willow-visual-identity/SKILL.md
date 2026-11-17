---
name: willow-visual-identity
description: Apply Willow's locked logos, colours and fonts to anything made for Weeping Willow Whisperer LLC, the Willow pillars or Whisper posters, including PDFs, docs, slides, sites, social posts and Canva.
---

# Willow visual identity (v2, locked 17 November 2026)

Use this for EVERY visual or written output made for Candan's businesses: PDF guides and workbooks, documents, decks, web pages, social posts, Canva designs, Etsy images, posters, letterhead. It replaces every earlier palette and font list in the project files (Cream #E6DCD0 / Deep Brown #1A0C09, Bone White #F8F6F4 / Charcoal Ash #2D2D2D, the pastel pillar accents, Inter, Jost, Fraunces). If an older file disagrees with this skill, this skill wins; mention the conflict in one line.

Live references (open them when building in those surfaces):
- Design system "Willow Dusk": https://claude.ai/artifact/EQ2eBG5NAPER1L7tzUnQiQ (tokens, brand book, components). When making a Design, Slides or Dashboard artifact, use this as the design system.
- Logo canvas "Willow logos": https://claude.ai/artifact/JJzMphq6BeVcKQ3nAWFy1K

## 1. Brand architecture and names

| Level | Name in use | Mark | Where |
| --- | --- | --- | --- |
| Company | Weeping Willow Whisperer LLC (registered legal name, with "-er") | Stacked three-line lockup, one-line lockup, three-W seal | Letterhead, invoices, contracts, legal footers, About pages |
| Umbrella brand | Willow | WILLOW wordmark, W mark | Website, PDF covers, social, everything public |
| Pillars | Willow Nest, Willow Academy, Willow Wayfinder, Willow Workshop, Willow Studio | WILLOW over a hairline over the pillar name | Pillar pages, product covers, listings |
| Awareness posters | Whisper, at WhisperPosters.com | (whisper) and the poster sign-off | Posters about neurodiversity, WhisperPosters.com |

- Write the legal name exactly: Weeping Willow Whisperer LLC. Public copy says "Willow"; the legal name appears as a small caption (footer, imprint), never as a headline.
- Pillar names are always "Willow" + pillar: "Willow Nest", never "Nest by Willow".
- Domain for Willow footers: weepingwillowwhisperer.ai. Whisper uses whisperposters.com.

## 2. Logos

Get the files by running the generator in section 7 (it draws them as outlines from the fonts, byte-identical to the approved set). Each mark comes as `-dark.svg` (Bark #2B2926, for light grounds) and `-light.svg` (Moon #EDEAE3, for dark grounds). Convert to PNG with cairosvg when a tool needs raster (Canva, Etsy, ReportLab `drawImage`).

| File | Use | Minimum size |
| --- | --- | --- |
| `willow-wordmark` | Primary Willow logo, 240px wide and up | 240px / 40mm |
| `willow-wordmark-small` | Heavier, wider-spaced cut for 120–240px | 120px / 24mm |
| `willow-w-mark` | Favicon, app icon, avatar, product corners | 16px |
| `willow-nest`, `-academy`, `-wayfinder`, `-workshop`, `-studio` | Pillar lockups | 160px wide |
| `wwwllc-stacked` | Company primary (three Ws aligned, LLC beside) | 200px wide |
| `wwwllc-line` | Company one-line, footers and letterhead | 260px wide |
| `wwwllc-seal` | Three stacked Ws: stamps, document corners, wax-seal style marks | 32px tall |
| `whisper` | (whisper) for WhisperPosters.com | 120px wide |
| `whisper-signoff` | (whisper) + whisperposters.com, poster bottom-right corner | 200px wide |

Rules:
- Clear space around every mark = the height of the capital W. Nothing enters it.
- Only two colours: Bark on light grounds, Moon on dark grounds. On a pillar depth (section 3), use that depth's text colour.
- Never redraw, retype, italicise, bold, outline, stretch, recolour, add shadows, or place over busy photography. Never set the logo in a live font when the SVG is available.
- Placement: top-left or bottom-right, small. The logo is a signature, not a headline. On posters, the Whisper sign-off sits bottom-right.
- The W mark replaces the wordmark below 120px; it never sits beside the wordmark.

## 3. Colour

One willow in three lights. No pure black, no pure white, no yellow, no gradients, no shadows.

### Dusk (dark, arrival)
Ground Ink #1D1F1C · raised Night #272A26 · surface Moss #343B32 · text Moon #EDEAE3 · muted text Ash #C9C4BB · accent Sprig #A6B0A0 (links, labels, primary button with Ink text) · decorative Sage #7D8A76 (never body text) · hairline #3E453B · control border #7D8A76
Use for: covers, hero sections, social posts, WhisperPosters.com, anything read in one line.

### Daylight (light, reading)
Ground Bone #F7F4EF · raised #FBF9F6 · surface Linen #ECE7DF · text Bark #2B2926 · muted text #5C5852 · accent Willow Deep #4E5947 · primary button Willow #5F6B58 with Bone text · hairline Stone #D3CCC2 · control border #857D71
Use for: PDF interiors, guides, workbooks, articles, documents, letterhead, checkout, print.

### Mist (low contrast, optional)
Ground Mist #D8D8CF · raised Haze #E0E0D9 · surface Fog #CDCDC3 · text Loam #3F413A · muted text Reed #51544C · accent and button Willow Deep #4E5947 with Haze text · hairline #BDBDB2 · control border #72726A
Use for: an optional reading mode on the site and "soft print" editions. Offered, never the default.

### Proportions
About 60% ground, 20% surface, the rest text. One accent moment per view; one primary button per view. Long reading always goes to Daylight (light text on dark tires many readers).

### Pillar depths (how the pillars are told apart)
The pillars are one willow ink in five depths, pale to deep, always in this order. A depth is a GROUND (cover, header band, section panel, tag chip), never a text colour. Always pair it with the numeral and name, e.g. "III · Wayfinder".

| | Pillar | Depth | Text on it |
| --- | --- | --- | --- |
| I | Nest | #D2DBCA | Bark #2B2926 |
| II | Academy | #AFB8A7 | Bark #2B2926 |
| III | Wayfinder | #8D9686 | Bark #2B2926 (15px / 11pt or larger) |
| IV | Workshop | #4E5547 | Moon #EDEAE3 |
| V | Studio | #2F3628 | Moon #EDEAE3 |

One depth per surface. A product cover takes its pillar's depth; its interior pages are Daylight. Nest on Bone and Studio on Ink need a hairline edge. Whisper has no depth.

## 4. Typography

| Role | Font | Use |
| --- | --- | --- |
| Mark | Cormorant Garamond | Logos and cover titles only, 40px / 30pt and up. Never for reading. |
| Voice | Newsreader | Headings, titles, the one-sentence lede. Upright, weight 400. Italic only for one short pull quote per view. |
| Reading | Atkinson Hyperlegible Next | All body text, buttons, labels, forms, captions. Covers Turkish fully, including İ. |
| Data | IBM Plex Mono | SKUs, footers, page numbers, metadata, pillar names in lockups. |

All four are free (SIL OFL), on Google Fonts; Atkinson Hyperlegible Next is also in Adobe Fonts. Fallback stacks: Newsreader → Georgia, serif; Atkinson Hyperlegible Next → system-ui, sans-serif; IBM Plex Mono → Menlo, monospace.

Scale (screen px / print pt):
- Display 72px / 40pt, line height 1.0 · Headline 44px / 26pt, 1.1 · Title 28px / 18pt, 1.2 · Lede 21px / 14pt, 1.5, muted colour
- Body 17px / 12pt minimum, line height 1.65, letter spacing +0.02em · Small 15px / 10pt · Label 13px / 9pt, uppercase, tracked 0.1em, weight 600, five words max · Meta (mono) 13px / 8.5pt
- Nothing below 13px on screen or 8.5pt in print.

Reading rules (from dyslexia and autism readability research): left-aligned, ragged right, never justified; lines of 55–70 characters; emphasis with weight 600, never italic or underline (underline means a link); sentence case for headings and buttons; generous paragraph spacing; single reading column.

## 5. Layout and shape
- Spacing steps 4, 8, 12, 16, 24, 32, 48, 64, 96px. Sections 96px apart on desktop, 64px on mobile. Page margins in print: at least 20mm.
- Radii: buttons pill, cards 10px, inputs and tags 4px, images and full-bleed sections 0.
- No shadows, gradients, glows, textures, emoji or stock icons. Depth comes from stepping ground → raised → surface. Icons, if needed: thin outline, 1.5px stroke, muted colour.
- Motion: opt-in, fades of 200–300ms max, none under prefers-reduced-motion.
- Status colours (error, success) are not part of the palette yet: pair any needed one with a word or icon.

## 6. Recipes by medium

**PDF (ReportLab).** Run section 7's `fonts_setup.py`, then register the static files:
```python
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
for n in ["Willow-Body-Regular","Willow-Body-SemiBold","Willow-Display-Regular","Willow-Display-Italic","Willow-Mark-Light","Willow-Mono-Regular"]:
    pdfmetrics.registerFont(TTFont(n, f"willow-fonts/{n}.ttf"))
```
Cover: the pillar depth (or Ink for non-pillar products) with the pillar lockup or wordmark top-left and the title in Willow-Display. Interior: Bone page, Bark text in Willow-Body-Regular 12pt / leading 19.8pt, headings in Willow-Display, footer in Willow-Mono 8.5pt Muted: "Weeping Willow Whisperer LLC · weepingwillowwhisperer.ai · SKU". Logos: render the SVG to a 600 dpi PNG with cairosvg, or draw with svglib.

**Web / HTML.**
```css
@import url("https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;600&family=Newsreader:ital,opsz,wght@0,6..72,400..500;1,6..72,400&family=IBM+Plex+Mono:wght@400;500&display=swap");
:root, [data-theme="daylight"] { --ground:#F7F4EF; --surface-raised:#FBF9F6; --surface:#ECE7DF; --text:#2B2926; --text-muted:#5C5852; --accent:#4E5947; --accent-fill:#5F6B58; --on-accent:#F7F4EF; --line:#D3CCC2; --line-control:#857D71; --focus:#4E5947; }
[data-theme="dusk"] { --ground:#1D1F1C; --surface-raised:#272A26; --surface:#343B32; --text:#EDEAE3; --text-muted:#C9C4BB; --accent:#A6B0A0; --accent-fill:#A6B0A0; --on-accent:#1D1F1C; --line:#3E453B; --line-control:#7D8A76; --focus:#A6B0A0; }
[data-theme="mist"] { --ground:#D8D8CF; --surface-raised:#E0E0D9; --surface:#CDCDC3; --text:#3F413A; --text-muted:#51544C; --accent:#4E5947; --accent-fill:#4E5947; --on-accent:#E0E0D9; --line:#BDBDB2; --line-control:#72726A; --focus:#3F413A; }
:root { --pillar-nest:#D2DBCA; --pillar-academy:#AFB8A7; --pillar-wayfinder:#8D9686; --pillar-workshop:#4E5547; --pillar-studio:#2F3628;
  --font-display:"Newsreader",Georgia,serif; --font-sans:"Atkinson Hyperlegible Next",system-ui,sans-serif; --font-mono:"IBM Plex Mono",Menlo,monospace; }
body { background:var(--ground); color:var(--text); font:400 17px/1.65 var(--font-sans); letter-spacing:.02em; }
:focus-visible { outline:2px solid var(--focus); outline-offset:2px; }
```
Reading pages offer a visible Dusk / Daylight / Mist switch. Logos inline as SVG with `role="img"` and an `aria-label`.

**Design, Slides, Dashboard artifacts.** Use the Willow Dusk design system (link above); Dusk for title slides and covers, Daylight for content-heavy slides.

**Canva.** Brand kit colours: the hexes above (group: Dusk, Daylight, Mist, Pillar depths). Upload the static TTFs from `fonts_setup.py` if a family is missing in Canva. Upload logo PNGs, not live text. Canva drafts still need a manual check against this skill.

**Word / Google Docs.** Headings Newsreader, body Atkinson Hyperlegible Next 12pt, line spacing 1.5 or more, page colour Bone where the format allows, footer in IBM Plex Mono.

**Posters (Whisper).** Dusk or Daylight ground, one line in Newsreader set large, one or two sentences of supporting text in Atkinson Hyperlegible Next, and the `whisper-signoff` mark bottom-right. No pillar depth, no Willow wordmark.

**Social posts.** Dusk ground by default; one line in Newsreader; W mark or wordmark small in a corner; pillar posts may use the pillar depth as the ground.

## 7. Scripts

Both need `pip install fonttools uharfbuzz` (add `cairosvg` for PNGs, `reportlab` for PDFs; use `--break-system-packages` in the sandbox). They download fonts from github.com/google/fonts. Write each script to a file and run it.

`make_logos.py` (python3 make_logos.py OUT_DIR → 26 SVGs):
```python
"""Draw every Willow logo as outlined SVG. Usage: python3 make_logos.py OUT_DIR
Needs: pip install fonttools uharfbuzz ; fonts fetched from github.com/google/fonts (OFL)."""
import sys, os, io, functools, urllib.request
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
OUT = sys.argv[1] if len(sys.argv) > 1 else 'willow-logos'
FD = os.path.join(OUT, '_fonts'); os.makedirs(FD, exist_ok=True)
RAW = 'https://raw.githubusercontent.com/google/fonts/main/ofl/'
SRC = {'CG': 'cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf',
       'NR': 'newsreader/Newsreader%5Bopsz,wght%5D.ttf',
       'PM': 'ibmplexmono/IBMPlexMono-Regular.ttf',
       'PMM': 'ibmplexmono/IBMPlexMono-Medium.ttf'}
def path(k):
    p = os.path.join(FD, k + '.ttf')
    if not os.path.exists(p): urllib.request.urlretrieve(RAW + SRC[k], p)
    return p
@functools.lru_cache(None)
def load(k, axes):
    f = TTFont(path(k))
    if 'fvar' in f and axes: f = instantiateVariableFont(f, dict(axes))
    b = io.BytesIO(); f.save(b); d = b.getvalue()
    return TTFont(io.BytesIO(d)), d
def text(k, axes, s, size, track=0.0, x=0, y=0):
    tt, data = load(k, tuple(sorted(axes.items())))
    upm = tt['head'].unitsPerEm; font = hb.Font(hb.Face(data))
    buf = hb.Buffer(); buf.add_str(s); buf.guess_segment_properties(); hb.shape(font, buf, {'kern': True})
    gs = tt.getGlyphSet(); order = tt.getGlyphOrder(); sc = size / upm; cx = 0
    pen = SVGPathPen(gs); bp = BoundsPen(gs); n = len(buf.glyph_infos)
    for i, (inf, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        t = (sc, 0, 0, -sc, x + (cx + pos.x_offset) * sc, y - pos.y_offset * sc)
        g = gs[order[inf.codepoint]]; g.draw(TransformPen(pen, t)); g.draw(TransformPen(bp, t))
        cx += pos.x_advance + (track * upm if i < n - 1 else 0)
    return pen.getCommands(), cx * sc, bp.bounds
COLORS = {'dark': '#2b2926', 'light': '#edeae3'}   # Bark on light grounds, Moon on dark grounds
def save(name, parts, w, h):
    body = ''.join(f'<path d="{d}"/>' for d in parts)
    for tag, fill in COLORS.items():
        with open(os.path.join(OUT, f'{name}-{tag}.svg'), 'w') as f:
            f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" width="{w:.0f}" height="{h:.0f}"><g fill="{fill}">{body}</g></svg>')
def rect(x, y, w, h): return f'M{x:.2f} {y:.2f}h{w:.2f}v{h:.2f}h{-w:.2f}z'
S = 100; cap = 0.625 * S; pad = cap            # clear space = cap height of W
CG4 = {'wght': 400}; NR4 = {'wght': 400, 'opsz': 72}
# Willow wordmark: regular (>=240px wide) and small cut (<240px)
for nm, wg, tr in (('willow-wordmark', 400, 0.14), ('willow-wordmark-small', 600, 0.2)):
    d, w, _ = text('CG', {'wght': wg}, 'WILLOW', S, tr, pad, pad + cap); save(nm, [d], w + 2 * pad, cap + 2 * pad)
# W mark (favicon, avatar)
d, _, b = text('CG', {'wght': 600}, 'W', S); bw = b[2] - b[0]; side = bw * 1.12
d, _, _ = text('CG', {'wght': 600}, 'W', S, 0, (side - bw) / 2 - b[0], (side + cap) / 2); save('willow-w-mark', [d], side, side)
# Pillar lockups: WILLOW / hairline / PILLAR
for p in ('NEST', 'ACADEMY', 'WAYFINDER', 'WORKSHOP', 'STUDIO'):
    d1, w1, _ = text('CG', CG4, 'WILLOW', S, 0.14, pad, pad + cap)
    ry = pad + cap * 1.42; hair = 1.2; ps = S * 0.30; pc = 0.698 * ps
    d2, w2, _ = text('PMM', {}, p, ps, 0.32, pad, ry + hair + cap * 0.42 + pc)
    save('willow-' + p.lower(), [d1, rect(pad, ry, w1, hair), d2], max(w1, w2) + 2 * pad, ry + hair + cap * 0.42 + pc + pad)
# Weeping Willow Whisperer LLC: stacked (three Ws aligned), one line, seal
lead = cap * 1.9; parts = []; mw = 0
for i, l in enumerate(['WEEPING', 'WILLOW', 'WHISPERER']):
    d, w, _ = text('CG', CG4, l, S, 0.14, pad, pad + cap + i * lead); parts.append(d); mw = max(mw, w)
base = pad + cap + 2 * lead; ls = S * 0.36
d, wl, _ = text('PM', {}, 'LLC', ls, 0.2, pad + mw + cap * 0.45, base); parts.append(d)
save('wwwllc-stacked', parts, mw + cap * 0.45 + wl + 2 * pad, base + pad)
d, w, _ = text('CG', CG4, 'WEEPING WILLOW WHISPERER', S, 0.12, pad, pad + cap)
d2, w2, _ = text('PM', {}, 'LLC', ls, 0.2, pad + w + cap * 0.45, pad + cap)
save('wwwllc-line', [d, d2], w + cap * 0.45 + w2 + 2 * pad, cap + 2 * pad)
parts = []
for i in range(3):
    d, ww, _ = text('CG', {'wght': 500}, 'W', S, 0, pad, pad + cap + i * cap * 1.18); parts.append(d)
save('wwwllc-seal', parts, ww + 2 * pad, cap + 2 * cap * 1.18 + 2 * pad)
# Whisper: (whisper) and the poster sign-off
_, _, b = text('NR', NR4, '(whisper)', S, 0.01)
d, _, _ = text('NR', NR4, '(whisper)', S, 0.01, pad - b[0], pad - b[1])
save('whisper', [d], b[2] - b[0] + 2 * pad, b[3] - b[1] + 2 * pad)
d, w, _ = text('NR', NR4, '(whisper)', S, 0.01, pad, pad + S * 0.75)
dd, wd, _ = text('PM', {}, 'whisperposters.com', S * 0.22, 0.06, pad, pad + S * 1.30)
save('whisper-signoff', [d, dd], max(w, wd) + 2 * pad, pad + S * 1.30 + pad)
print('wrote', len([f for f in os.listdir(OUT) if f.endswith('.svg')]), 'SVGs to', OUT)
```

`fonts_setup.py` (python3 fonts_setup.py OUT_DIR → static TTFs for ReportLab, Word, Canva):
```python
"""Fetch Willow's four OFL font families and write static TTFs for tools that can't read variable fonts
(ReportLab, Word, Canva uploads). Usage: python3 fonts_setup.py OUT_DIR"""
import os, sys, urllib.request
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
OUT = sys.argv[1] if len(sys.argv) > 1 else 'willow-fonts'; os.makedirs(OUT, exist_ok=True)
RAW = 'https://raw.githubusercontent.com/google/fonts/main/ofl/'
AT = 'atkinsonhyperlegiblenext/AtkinsonHyperlegibleNext%5Bwght%5D.ttf'
NR = 'newsreader/Newsreader%5Bopsz,wght%5D.ttf'
NRI = 'newsreader/Newsreader-Italic%5Bopsz,wght%5D.ttf'
CG = 'cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf'
STATIC = {  # file name: (source, axes)
    'Willow-Body-Regular': (AT, {'wght': 400}), 'Willow-Body-SemiBold': (AT, {'wght': 600}),
    'Willow-Display-Regular': (NR, {'wght': 400, 'opsz': 36}), 'Willow-Display-Medium': (NR, {'wght': 500, 'opsz': 36}),
    'Willow-Display-Italic': (NRI, {'wght': 400, 'opsz': 36}),
    'Willow-Mark-Light': (CG, {'wght': 300}), 'Willow-Mark-Regular': (CG, {'wght': 400}),
    'Willow-Mono-Regular': ('ibmplexmono/IBMPlexMono-Regular.ttf', {}), 'Willow-Mono-Medium': ('ibmplexmono/IBMPlexMono-Medium.ttf', {}),
}
cache = {}
for name, (src, axes) in STATIC.items():
    if src not in cache:
        p = os.path.join(OUT, '_src_' + src.split('/')[-1].replace('%5B', '[').replace('%5D', ']'))
        if not os.path.exists(p): urllib.request.urlretrieve(RAW + src, p)
        cache[src] = p
    f = TTFont(cache[src])
    if 'fvar' in f: f = instantiateVariableFont(f, axes, updateFontNames=False)
    f.save(os.path.join(OUT, name + '.ttf'))
print('static fonts in', OUT)
```

## 8. Before delivering anything
- The right name: Weeping Willow Whisperer LLC in legal lines; Willow in public copy; "Willow Nest" form for pillars; Whisper only for posters.
- Logo is the generated SVG/PNG, in Bark or Moon only, with clear space, at or above its minimum size.
- Only palette colours; no pure black, pure white or yellow; one accent moment per view.
- Pillar depth used as a ground with its numeral and name, never as text colour.
- Body text Atkinson Hyperlegible Next at 17px / 12pt or larger, left-aligned, 55–70 character lines, no italic body text.
- Text contrast at least 4.5:1 (all pairings above already pass).
- Copy follows Willow's voice rules (calm, precise, no wellness or hype vocabulary) as set in the willow-brand-guide skill.
