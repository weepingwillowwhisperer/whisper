#!/bin/sh
# Refresh this folder from github.com/weepingwillowwhisperer/willow-brand. Run from the project root.
set -e
TMP=$(mktemp -d)
git clone --depth 1 https://github.com/weepingwillowwhisperer/willow-brand "$TMP"
rm -rf willow-brand/AGENTS.md willow-brand/README.md willow-brand/tokens willow-brand/logos willow-brand/scripts willow-brand/skills
cp -R "$TMP/AGENTS.md" "$TMP/README.md" "$TMP/tokens" "$TMP/logos" "$TMP/scripts" "$TMP/skills" willow-brand/
mkdir -p .claude/skills/willow-visual-identity .agents/skills/willow-visual-identity
cp "$TMP/skills/willow-visual-identity/SKILL.md" .claude/skills/willow-visual-identity/SKILL.md
cp "$TMP/skills/willow-visual-identity/SKILL.md" .agents/skills/willow-visual-identity/SKILL.md
git -C "$TMP" rev-parse --short HEAD > willow-brand/VERSION
rm -rf "$TMP"
echo "willow-brand updated to $(cat willow-brand/VERSION)"
