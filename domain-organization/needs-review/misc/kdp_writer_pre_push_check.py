from pathlib import Path
import re
import csv
import subprocess
from collections import defaultdict

ROOT = Path.cwd()
OUT = ROOT / "kdp-writer-pre-push-review"
OUT.mkdir(exist_ok=True)

EXCLUDE_DIRS = {
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    ".vercel",
    ".netlify",
    "__pycache__",
    "domain-organization",
    "marketplace-product-organization",
    "kdp-writer-pre-push-review",
}

APP_HINTS = [
    "kdp",
    "writer",
    "writing",
    "manuscript",
    "book",
    "book-builder",
    "kindle",
    "author",
    "html",
    "editor",
    "format",
    "formatter",
]

SECRET_HINTS = [
    "api_key",
    "apikey",
    "secret",
    "token",
    "password",
    "private_key",
    "client_secret",
    "access_key",
    "aws_",
    "stripe",
    "paypal",
    "openai",
]

TEXT_EXTS = {
    ".html", ".css", ".js", ".jsx", ".ts", ".tsx",
    ".json", ".md", ".txt", ".yml", ".yaml", ".env"
}

REFERENCE_RE = re.compile(
    r"""(?:src|href)=["']([^"']+)["']|url\(["']?([^"')]+)["']?\)""",
    re.IGNORECASE
)

def should_scan(path):
    if not path.is_file():
        return False

    rel_parts = path.relative_to(ROOT).parts

    if any(part in EXCLUDE_DIRS for part in rel_parts):
        return False

    return True

def safe_read(path):
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""

def score_app_relevance(path):
    rel = str(path.relative_to(ROOT)).lower()
    text = safe_read(path).lower()[:30000] if path.suffix.lower() in TEXT_EXTS else ""
    haystack = rel + "\n" + text

    score = 0
    matched = []

    for hint in APP_HINTS:
        if hint in rel:
            score += 3
            matched.append(hint)
        elif hint in text:
            score += 1
            matched.append(hint)

    if path.suffix.lower() == ".html":
        score += 2
        matched.append("html file")

    if path.name.lower() in {"package.json", "vite.config.js", "vite.config.ts", "netlify.toml", "vercel.json"}:
        score += 2
        matched.append("deployment/config file")

    return score, list(dict.fromkeys(matched))

def detect_possible_secrets(path):
    text = safe_read(path)
    lower = text.lower()
    hits = []

    for hint in SECRET_HINTS:
        if hint in lower:
            hits.append(hint)

    suspicious_patterns = [
        r"sk-[A-Za-z0-9_\-]{20,}",
        r"pk_live_[A-Za-z0-9]{20,}",
        r"sk_live_[A-Za-z0-9]{20,}",
        r"AKIA[0-9A-Z]{16}",
    ]

    for pattern in suspicious_patterns:
        if re.search(pattern, text):
            hits.append(f"pattern:{pattern}")

    return list(dict.fromkeys(hits))

def find_local_references(path):
    refs = []
    text = safe_read(path)

    for match in REFERENCE_RE.findall(text):
        ref = next((m for m in match if m), "").strip()

        if not ref:
            continue

        if ref.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:", "{{")):
            continue

        refs.append(ref)

    return refs

def ref_exists(source_path, ref):
    clean = ref.split("?")[0].split("#")[0].lstrip("/")

    if not clean:
        return True

    local = (source_path.parent / clean).resolve()
    root = (ROOT / clean).resolve()

    return local.exists() or root.exists()

def run_git_status():
    try:
        result = subprocess.run(
            ["git", "status", "--short"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False
        )
        return result.stdout.strip()
    except Exception as e:
        return f"Could not read git status: {e}"

def main():
    all_files = [p for p in ROOT.rglob("*") if should_scan(p)]

    app_candidates = []
    secret_findings = []
    missing_refs = []
    large_files = []

    for path in all_files:
        score, matched = score_app_relevance(path)

        if score >= 2:
            app_candidates.append({
                "path": str(path.relative_to(ROOT)),
                "file_type": path.suffix.lower() or "no extension",
                "score": score,
                "matched_signals": ", ".join(matched),
            })

        if path.suffix.lower() in TEXT_EXTS:
            secrets = detect_possible_secrets(path)
            if secrets:
                secret_findings.append({
                    "path": str(path.relative_to(ROOT)),
                    "signals": ", ".join(secrets),
                })

        if path.suffix.lower() in {".html", ".css"}:
            for ref in find_local_references(path):
                if not ref_exists(path, ref):
                    missing_refs.append({
                        "source_file": str(path.relative_to(ROOT)),
                        "missing_reference": ref,
                    })

        try:
            size_mb = path.stat().st_size / (1024 * 1024)
            if size_mb > 20:
                large_files.append({
                    "path": str(path.relative_to(ROOT)),
                    "size_mb": round(size_mb, 2),
                })
        except Exception:
            pass

    manifest_csv = OUT / "kdp-writer-app-candidates.csv"
    with manifest_csv.open("w", newline="", encoding="utf-8") as f:
        fieldnames = ["path", "file_type", "score", "matched_signals"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(sorted(app_candidates, key=lambda r: (-r["score"], r["path"])))

    report = OUT / "kdp-writer-pre-push-report.md"
    git_status = run_git_status()

    with report.open("w", encoding="utf-8") as f:
        f.write("# KDP Writer App Pre-Push Report\n\n")

        f.write("## Summary\n\n")
        f.write(f"- Files scanned: {len(all_files)}\n")
        f.write(f"- App/HTML candidates found: {len(app_candidates)}\n")
        f.write(f"- Possible secret findings: {len(secret_findings)}\n")
        f.write(f"- Missing local HTML/CSS references: {len(missing_refs)}\n")
        f.write(f"- Large files over 20 MB: {len(large_files)}\n\n")

        f.write("## Git Status\n\n")
        f.write("```text\n")
        f.write(git_status or "Working tree appears clean.")
        f.write("\n```\n\n")

        f.write("## App / HTML Candidate Files\n\n")
        if app_candidates:
            for item in sorted(app_candidates, key=lambda r: (-r["score"], r["path"])):
                f.write(f"- `{item['path']}` | score: {item['score']} | {item['matched_signals']}\n")
        else:
            f.write("- No likely KDP writer app files found.\n")
        f.write("\n")

        f.write("## Possible Secrets or Credentials\n\n")
        if secret_findings:
            for item in secret_findings:
                f.write(f"- `{item['path']}` | signals: {item['signals']}\n")
        else:
            f.write("- No obvious credential signals found.\n")
        f.write("\n")

        f.write("## Missing Local References\n\n")
        if missing_refs:
            for item in missing_refs:
                f.write(f"- `{item['source_file']}` references missing file `{item['missing_reference']}`\n")
        else:
            f.write("- No missing local HTML/CSS references detected.\n")
        f.write("\n")

        f.write("## Large Files\n\n")
        if large_files:
            for item in large_files:
                f.write(f"- `{item['path']}` | {item['size_mb']} MB\n")
        else:
            f.write("- No large files over 20 MB detected.\n")
        f.write("\n")

        f.write("## Recommended Push Order\n\n")
        f.write("1. Review possible secret findings.\n")
        f.write("2. Review missing local references.\n")
        f.write("3. Confirm the app name, routes, and visible wording.\n")
        f.write("4. Commit only the KDP writer app files and required shared assets.\n")
        f.write("5. Push to a branch first, not directly to main.\n")

    print("")
    print("KDP writer pre-push check complete.")
    print(f"Report:   {report}")
    print(f"Manifest: {manifest_csv}")
    print("")
    print("Review the report before running git add / commit / push.")

if __name__ == "__main__":
    main()
