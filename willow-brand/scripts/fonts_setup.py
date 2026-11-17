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
