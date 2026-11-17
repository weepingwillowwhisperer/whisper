"""Generate tokens/tokens.css and tokens/tailwind.preset.js from tokens/tokens.json, and copy the skill into
.claude/skills and .agents/skills (real copies, so Windows checkouts work). Run after editing the JSON or the skill."""
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = json.load(open(os.path.join(ROOT, 'tokens', 'tokens.json')))
c = T['color']; strip = lambda d: {k: v['$value'] for k, v in d.items() if not k.startswith('$')}
themes = {k: strip(c[k]) for k in ('dusk', 'daylight', 'mist')}; pillar = strip(c['pillar'])
fonts = {k: v['$value'] for k, v in T['font'].items() if not k.startswith('$')}
def stack(v): return ', '.join(f'"{f}"' if ' ' in f else f for f in v)
def block(sel, d, pre=''): return sel + ' {\n' + ''.join(f'  --{pre}{k}: {v};\n' for k, v in d.items()) + '}\n'
css = ['/* Willow visual identity v2. GENERATED from tokens.json by scripts/build_tokens.py. Do not edit by hand. */\n',
       '@import url("https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;600&family=Newsreader:ital,opsz,wght@0,6..72,400..500;1,6..72,400&family=Cormorant+Garamond:wght@300;400&family=IBM+Plex+Mono:wght@400;500&display=swap");\n\n',
       block(':root, [data-theme="daylight"]', themes['daylight']), '\n', block('[data-theme="dusk"]', themes['dusk']), '\n', block('[data-theme="mist"]', themes['mist']), '\n']
root = {f'pillar-{k}': v for k, v in pillar.items()}
root.update({f'font-{k}': stack(v) for k, v in fonts.items()})
root.update({f'space-{k}': v['$value'] for k, v in T['space'].items() if not k.startswith('$')})
root.update({f'radius-{k}': v['$value'] for k, v in T['radius'].items() if not k.startswith('$')})
css.append(block(':root', root))
css.append('''
body { margin: 0; background: var(--ground); color: var(--text); font-family: var(--font-sans); font-size: 17px; line-height: 1.65; letter-spacing: .02em; -webkit-font-smoothing: antialiased; }
h1, h2, h3 { font-family: var(--font-display); font-weight: 400; }
:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
''')
open(os.path.join(ROOT, 'tokens', 'tokens.css'), 'w').write(''.join(css))
tw = {'colors': {'ground': 'var(--ground)', 'surface': 'var(--surface)', 'surface-raised': 'var(--surface-raised)', 'text': 'var(--text)',
                 'text-muted': 'var(--text-muted)', 'accent': 'var(--accent)', 'accent-fill': 'var(--accent-fill)', 'on-accent': 'var(--on-accent)',
                 'line': 'var(--line)', 'line-control': 'var(--line-control)', 'pillar': {k: f'var(--pillar-{k})' for k in pillar}},
      'fontFamily': {k: v for k, v in fonts.items()},
      'borderRadius': {'sm': '4px', 'md': '10px', 'pill': '999px'}}
open(os.path.join(ROOT, 'tokens', 'tailwind.preset.js'), 'w').write(
    '// Willow visual identity v2. GENERATED from tokens.json. Use with tokens.css loaded.\n'
    '// tailwind.config.js:  module.exports = { presets: [require("./willow-brand/tokens/tailwind.preset.js")] }\n'
    'module.exports = { theme: { extend: ' + json.dumps(tw, indent=2) + ' } };\n')
import shutil
src = os.path.join(ROOT, 'skills', 'willow-visual-identity', 'SKILL.md')
for d in ('.claude', '.agents'):
    dst = os.path.join(ROOT, d, 'skills', 'willow-visual-identity'); os.makedirs(dst, exist_ok=True)
    shutil.copyfile(src, os.path.join(dst, 'SKILL.md'))
print('wrote tokens.css, tailwind.preset.js and skill copies')
