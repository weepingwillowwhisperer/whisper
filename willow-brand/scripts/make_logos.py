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
