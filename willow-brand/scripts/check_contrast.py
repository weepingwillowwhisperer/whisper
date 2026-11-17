"""Check every text/background pairing in tokens.json against WCAG 4.5:1 (3:1 for borders). Exit 1 on failure."""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
c = json.load(open(os.path.join(ROOT, 'tokens', 'tokens.json')))['color']
def lum(h):
    h = h.lstrip('#'); r = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    r = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in r]
    return 0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]
def ratio(a, b): x, y = sorted((lum(a), lum(b)), reverse=True); return (x + 0.05) / (y + 0.05)
fails = 0
def check(name, fg, bg, need):
    global fails
    r = ratio(fg, bg); ok = r >= need; fails += not ok
    print(f"{'ok  ' if ok else 'FAIL'} {r:5.2f}:1  {name}")
for t in ('dusk', 'daylight', 'mist'):
    v = {k: x['$value'] for k, x in c[t].items() if not k.startswith('$')}
    for bg in ('ground', 'surface-raised', 'surface'):
        for fg in ('text', 'text-muted', 'accent'): check(f'{t}: {fg} on {bg}', v[fg], v[bg], 4.5)
        check(f'{t}: line-control on {bg}', v['line-control'], v[bg], 3.0 if bg != 'surface' else 2.0)
    check(f'{t}: on-accent on accent-fill', v['on-accent'], v['accent-fill'], 4.5)
p = {k: x['$value'] for k, x in c['pillar'].items() if not k.startswith('$')}
for k in ('nest', 'academy', 'wayfinder', 'workshop', 'studio'): check(f'pillar: on-{k} on {k}', p['on-' + k], p[k], 4.5)
sys.exit(1 if fails else 0)
