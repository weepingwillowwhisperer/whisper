# KDP Writer App Pre-Push Report

## Summary

- Files scanned: 64
- App/HTML candidates found: 10
- Possible secret findings: 8
- Missing local HTML/CSS references: 0
- Large files over 20 MB: 0

## Git Status

```text
?? domain-organization-prompt.txt
?? domain-organization/
?? kdp-writer-pre-push-review/
?? kdp_writer_pre_push_check.py
?? marketplace-product-organization/
?? organize_domains.py
?? organize_payhip_etsy_products.py
```

## App / HTML Candidate Files

- `kdp_writer_pre_push_check.py` | score: 6 | kdp, writer
- `.claude/worktrees/recursing-gauss-dc1519/app/page.tsx` | score: 5 | writer, writing, book, editor, format
- `lib/data.ts` | score: 4 | writing, book, editor, format
- `.claude/worktrees/recursing-gauss-dc1519/app/layout.tsx` | score: 3 | book, author, html
- `app/layout.tsx` | score: 3 | book, author, html
- `app/page.tsx` | score: 3 | writer, book, format
- `.claude/worktrees/recursing-gauss-dc1519/package.json` | score: 2 | deployment/config file
- `QUICKSTART.md` | score: 2 | editor, format
- `domain-organization-prompt.txt` | score: 2 | writing, book
- `package.json` | score: 2 | deployment/config file

## Possible Secrets or Credentials

- `QUICKSTART.md` | signals: secret, stripe
- `BUILD_SUMMARY.md` | signals: stripe
- `package-lock.json` | signals: token, stripe
- `package.json` | signals: stripe
- `DEPLOYMENT.md` | signals: secret, stripe
- `app/api/checkout/route.ts` | signals: secret, stripe
- `.claude/worktrees/recursing-gauss-dc1519/package-lock.json` | signals: token
- `components/CartDrawer.tsx` | signals: stripe

## Missing Local References

- No missing local HTML/CSS references detected.

## Large Files

- No large files over 20 MB detected.

## Recommended Push Order

1. Review possible secret findings.
2. Review missing local references.
3. Confirm the app name, routes, and visible wording.
4. Commit only the KDP writer app files and required shared assets.
5. Push to a branch first, not directly to main.
