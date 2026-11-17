# willow-brand

The single source of truth for how **Weeping Willow Whisperer LLC**, **Willow** (Willow Nest, Willow Academy, Willow Wayfinder, Willow Workshop, Willow Studio) and **Whisper** (WhisperPosters.com) look: logos, colours, fonts and the rules for using them. Version 2, locked 17 November 2026.

It is written for people and for AI agents. Every coding agent that opens a project containing this folder reads the brief automatically:

| Agent | Reads |
| --- | --- |
| Codex, Cursor, GitHub Copilot, Windsurf, Devin, Aider, Zed and most others | `AGENTS.md` |
| Claude Code | `CLAUDE.md` (imports `AGENTS.md`) and the skill in `.claude/skills/` |
| Gemini CLI | `GEMINI.md` (imports `AGENTS.md`) |

## Use it in another project

Add it once, as a submodule, from the project's root:

```
git submodule add https://github.com/weepingwillowwhisperer/willow-brand.git willow-brand
```

Then put this line at the top of that project's own `AGENTS.md` (create the file if it has none):

```
All visual and written work follows willow-brand/AGENTS.md. Use willow-brand/tokens/tokens.css and the files in willow-brand/logos/; never hard-code brand colours or redraw logos.
```

To pull a brand update into a project later: `git submodule update --remote willow-brand`.

## For agents that don't read code

ChatGPT, Gemini in the browser, Canva and similar tools can't see this repository. Paste `AGENTS.md` into their custom instructions or project knowledge, and paste it again whenever the brand changes.

## Change the brand

1. Edit `tokens/tokens.json`, and update `skills/willow-visual-identity/SKILL.md` and `AGENTS.md` to match.
2. Run `python3 scripts/build_tokens.py` (regenerates the CSS, the Tailwind preset and the skill copies).
3. Run `python3 scripts/check_contrast.py` (fails if any text drops below 4.5:1).
4. Commit. Projects pick it up with `git submodule update --remote`.

The scripts need Python 3 and `pip install fonttools uharfbuzz` (plus `cairosvg` for PNG logos, `reportlab` for PDFs).

## Rights

Logos and brand rules © Weeping Willow Whisperer LLC. All rights reserved. The fonts are not included: Cormorant Garamond, Newsreader, Atkinson Hyperlegible Next and IBM Plex Mono are free under the SIL Open Font License and are downloaded by the scripts from Google Fonts.
