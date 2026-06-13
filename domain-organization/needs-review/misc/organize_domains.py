from pathlib import Path
import csv
import hashlib
import re
import shutil
from collections import defaultdict

ROOT = Path.cwd()
OUT = ROOT / "domain-organization"

DOMAIN_FOLDERS = {
    "weepingwillowwhisperer.com": OUT / "weepingwillowwhisperer.com",
    "studio-domain": OUT / "studio-domain",
    "shop-domain": OUT / "shop-domain",
    "resources-domain": OUT / "resources-domain",
    "shared-admin": OUT / "shared-admin",
    "needs-review": OUT / "needs-review",
}

EXCLUDE_DIRS = {
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    ".astro",
    ".vercel",
    ".netlify",
    "__pycache__",
    "domain-organization",
}

TEXT_EXTS = {
    ".txt", ".md", ".mdx", ".html", ".css", ".js", ".jsx", ".ts", ".tsx",
    ".json", ".yml", ".yaml", ".toml", ".csv", ".xml", ".svg"
}

ASSET_EXTS = {
    ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".pdf", ".docx",
    ".pptx", ".xlsx", ".ai", ".psd", ".eps"
}

TECH_FILES = {
    "package.json",
    "vite.config.js",
    "vite.config.ts",
    "next.config.js",
    "next.config.mjs",
    "astro.config.mjs",
    "netlify.toml",
    "vercel.json",
    "wrangler.toml",
}

KEYWORDS = {
    "weepingwillowwhisperer.com": [
        "weeping willow whisperer", "willow", "founder", "about", "homepage",
        "home page", "neurodivergent", "ms", "multiple sclerosis",
        "cognitive support", "support system", "lived experience",
        "brand philosophy", "essay", "essays", "recognition over reinvention",
        "emotional support", "burnout", "overwhelm", "sensory", "nervous system"
    ],
    "studio-domain": [
        "studio", "creative services", "portfolio", "client", "case study",
        "case studies", "brand identity", "branding", "copywriting",
        "design package", "strategy", "consulting", "services", "service page",
        "handoff", "process", "creative direction"
    ],
    "shop-domain": [
        "shop", "apparel", "shirt", "t-shirt", "tee", "hoodie", "sweatshirt",
        "mockup", "product description", "collection", "slogan", "awareness",
        "printify", "shopify", "storefront", "size guide", "shipping",
        "returns", "merch", "merchandise"
    ],
    "resources-domain": [
        "pdf", "workbook", "worksheet", "guide", "toolkit", "digital product",
        "download", "bundle", "companion", "lead magnet", "opt-in", "opt in",
        "gumroad", "sales page", "launch copy", "paid download", "resource"
    ],
    "shared-admin": [
        "admin", "draft", "raw", "notes", "strategy", "archive", "old",
        "backup", "copy", "duplicate", "config", "todo", "wip", "unfinished",
        "private", "internal"
    ],
}

CATEGORY_KEYWORDS = {
    "homepage": ["home", "homepage", "index"],
    "about": ["about", "founder", "story"],
    "services": ["service", "services", "consulting", "copywriting", "branding"],
    "products": ["product", "shop", "listing", "description"],
    "pdfs": ["pdf", "workbook", "worksheet", "guide", "toolkit"],
    "apparel-collections": ["apparel", "shirt", "tee", "hoodie", "mockup", "collection"],
    "brand-assets": ["logo", "brand", "identity", "font", "palette", "visual"],
    "legal-policy": ["privacy", "terms", "return", "shipping", "policy"],
    "launch-materials": ["launch", "sales", "campaign", "opt-in", "lead magnet"],
    "archive": ["archive", "old", "backup", "draft", "copy"],
}

REFERENCE_RE = re.compile(
    r"""(?:src|href)=["']([^"']+)["']|url\(["']?([^"')]+)["']?\)|!\[[^\]]*\]\(([^)]+)\)""",
    re.IGNORECASE
)

def safe_read_text(path):
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""

def file_hash(path):
    h = hashlib.sha256()
    try:
        with path.open("rb") as f:
            for chunk in iter(lambda: f.read(1024 * 1024), b""):
                h.update(chunk)
        return h.hexdigest()
    except Exception:
        return ""

def scan_files():
    files = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue

        rel_parts = path.relative_to(ROOT).parts
        if any(part in EXCLUDE_DIRS for part in rel_parts):
            continue

        files.append(path)
    return files

def score_file(path):
    rel = str(path.relative_to(ROOT)).lower()
    name = path.name.lower()
    ext = path.suffix.lower()
    text = safe_read_text(path).lower() if ext in TEXT_EXTS else ""
    haystack = f"{rel}\n{name}\n{text[:20000]}"

    scores = {}
    reasons = {}

    for domain, words in KEYWORDS.items():
        score = 0
        matched = []
        for word in words:
            if word in haystack:
                score += 3 if word in rel or word in name else 1
                matched.append(word)
        scores[domain] = score
        reasons[domain] = matched[:8]

    # Strong file-type hints
    if ext == ".pdf":
        scores["resources-domain"] += 2
        reasons["resources-domain"].append("pdf file")

    if ext in {".psd", ".ai", ".eps"}:
        scores["studio-domain"] += 2
        reasons["studio-domain"].append("design source file")

    if any(x in rel for x in ["mockup", "shirt", "tee", "hoodie", "printify", "shopify"]):
        scores["shop-domain"] += 4
        reasons["shop-domain"].append("commerce/apparel path")

    if path.name in TECH_FILES or ext in {".env", ".toml"}:
        scores["shared-admin"] += 4
        reasons["shared-admin"].append("technical/config file")

    best_domain = max(scores, key=scores.get)
    best_score = scores[best_domain]

    sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    second_score = sorted_scores[1][1]

    if best_score == 0:
        return "needs-review", "low", "No clear domain keywords found"

    if best_score == second_score and best_score > 0:
        return "needs-review", "low", "Multiple possible domain matches"

    if best_score >= 6:
        confidence = "high"
    elif best_score >= 3:
        confidence = "medium"
    else:
        confidence = "low"

    reason = ", ".join(dict.fromkeys(reasons[best_domain])) or "Best keyword/path match"
    return best_domain, confidence, reason

def infer_category(path):
    rel = str(path.relative_to(ROOT)).lower()
    ext = path.suffix.lower()

    if ext == ".pdf":
        return "pdfs"

    for category, words in CATEGORY_KEYWORDS.items():
        if any(word in rel for word in words):
            return category

    if path.name in TECH_FILES:
        return "technical"

    return "misc"

def infer_purpose(path):
    rel = str(path.relative_to(ROOT)).lower()
    ext = path.suffix.lower()

    if path.name in TECH_FILES:
        return "technical config / deployment note"
    if ext == ".pdf":
        return "downloadable PDF or document export"
    if ext in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}:
        return "image or visual asset"
    if ext in {".md", ".mdx", ".txt"}:
        return "copy, notes, or content draft"
    if ext in {".html", ".css", ".js", ".jsx", ".ts", ".tsx"}:
        return "website source file"
    if ext in {".docx", ".pptx", ".xlsx"}:
        return "office document or client-facing file"
    if any(x in rel for x in ["mockup", "shirt", "tee", "hoodie"]):
        return "apparel or product asset"
    return "general project file"

def copy_file(path, domain, category):
    rel = path.relative_to(ROOT)

    # Preserve path, but group inside a category folder.
    dest = DOMAIN_FOLDERS[domain] / category / rel

    dest.parent.mkdir(parents=True, exist_ok=True)

    if dest.exists():
        stem = dest.stem
        suffix = dest.suffix
        counter = 1
        while dest.exists():
            dest = dest.with_name(f"{stem}__copy{counter}{suffix}")
            counter += 1

    shutil.copy2(path, dest)
    return dest

def find_missing_references(files):
    existing = {str(p.relative_to(ROOT)) for p in files}
    existing_names = {p.name for p in files}
    missing = []

    for path in files:
        if path.suffix.lower() not in TEXT_EXTS:
            continue

        text = safe_read_text(path)
        for match in REFERENCE_RE.findall(text):
            ref = next((m for m in match if m), "").strip()
            if not ref:
                continue
            if ref.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:")):
                continue

            ref_clean = ref.split("?")[0].split("#")[0].lstrip("/")
            if not ref_clean:
                continue

            possible = (path.parent / ref_clean).resolve()
            root_possible = (ROOT / ref_clean).resolve()

            if not possible.exists() and not root_possible.exists() and Path(ref_clean).name not in existing_names:
                missing.append({
                    "referenced_in": str(path.relative_to(ROOT)),
                    "missing_reference": ref
                })

    return missing

def write_manifests(rows, duplicates, missing_refs, tech_notes):
    OUT.mkdir(exist_ok=True)

    csv_path = OUT / "domain-assignment-manifest.csv"
    md_path = OUT / "domain-assignment-manifest.md"

    with csv_path.open("w", newline="", encoding="utf-8") as f:
        fieldnames = [
            "original_path",
            "file_type",
            "inferred_purpose",
            "assigned_domain_folder",
            "category",
            "confidence",
            "reason",
            "copied_to",
            "notes_for_review",
        ]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    totals = defaultdict(int)
    for row in rows:
        totals[row["assigned_domain_folder"]] += 1

    with md_path.open("w", encoding="utf-8") as f:
        f.write("# Domain Assignment Manifest\n\n")

        f.write("## Summary\n\n")
        f.write(f"- Total files scanned: {len(rows)}\n")
        for domain in DOMAIN_FOLDERS:
            f.write(f"- {domain}: {totals[domain]}\n")
        f.write(f"- Files needing review: {totals['needs-review']}\n")
        f.write(f"- Duplicate groups found: {len(duplicates)}\n")
        f.write(f"- Missing referenced assets found: {len(missing_refs)}\n\n")

        f.write("## Technical domain notes\n\n")
        if tech_notes:
            for note in tech_notes:
                f.write(f"- `{note}`\n")
        else:
            f.write("- No common technical config files found.\n")
        f.write("\n")

        f.write("## Files needing review\n\n")
        review_rows = [r for r in rows if r["assigned_domain_folder"] == "needs-review" or r["confidence"] == "low"]
        if review_rows:
            for r in review_rows:
                f.write(f"- `{r['original_path']}` → `{r['assigned_domain_folder']}` | confidence: {r['confidence']} | {r['reason']}\n")
        else:
            f.write("- None.\n")
        f.write("\n")

        f.write("## Duplicate or likely copied files\n\n")
        if duplicates:
            for digest, paths in duplicates.items():
                f.write(f"- Duplicate group `{digest[:12]}`:\n")
                for p in paths:
                    f.write(f"  - `{p}`\n")
        else:
            f.write("- No exact duplicates found by SHA-256.\n")
        f.write("\n")

        f.write("## Missing referenced assets\n\n")
        if missing_refs:
            for item in missing_refs:
                f.write(f"- `{item['referenced_in']}` references missing asset `{item['missing_reference']}`\n")
        else:
            f.write("- No missing referenced local assets detected.\n")
        f.write("\n")

        f.write("## Full file inventory\n\n")
        for r in rows:
            f.write(f"### `{r['original_path']}`\n\n")
            f.write(f"- Type: `{r['file_type']}`\n")
            f.write(f"- Purpose: {r['inferred_purpose']}\n")
            f.write(f"- Assigned folder: `{r['assigned_domain_folder']}`\n")
            f.write(f"- Category: `{r['category']}`\n")
            f.write(f"- Confidence: {r['confidence']}\n")
            f.write(f"- Reason: {r['reason']}\n")
            f.write(f"- Copied to: `{r['copied_to']}`\n")
            if r["notes_for_review"]:
                f.write(f"- Notes: {r['notes_for_review']}\n")
            f.write("\n")

    return csv_path, md_path

def main():
    for folder in DOMAIN_FOLDERS.values():
        folder.mkdir(parents=True, exist_ok=True)

    files = scan_files()
    rows = []
    hashes = defaultdict(list)
    tech_notes = []

    for path in files:
        digest = file_hash(path)
        if digest:
            hashes[digest].append(str(path.relative_to(ROOT)))

        domain, confidence, reason = score_file(path)
        category = infer_category(path)
        purpose = infer_purpose(path)
        copied_to = copy_file(path, domain, category)

        notes = ""
        if domain == "needs-review":
            notes = "Manual review recommended before publishing."
        elif confidence == "low":
            notes = "Low-confidence assignment; review before publishing."

        if path.name in TECH_FILES:
            tech_notes.append(str(path.relative_to(ROOT)))

        rows.append({
            "original_path": str(path.relative_to(ROOT)),
            "file_type": path.suffix.lower() or "no extension",
            "inferred_purpose": purpose,
            "assigned_domain_folder": domain,
            "category": category,
            "confidence": confidence,
            "reason": reason,
            "copied_to": str(copied_to.relative_to(ROOT)),
            "notes_for_review": notes,
        })

    duplicates = {h: ps for h, ps in hashes.items() if len(ps) > 1}
    missing_refs = find_missing_references(files)

    csv_path, md_path = write_manifests(rows, duplicates, missing_refs, tech_notes)

    totals = defaultdict(int)
    for row in rows:
        totals[row["assigned_domain_folder"]] += 1

    print("\nDomain organization complete.")
    print(f"Scanned: {len(rows)} files")
    print("")
    for domain in DOMAIN_FOLDERS:
        print(f"{domain}: {totals[domain]}")
    print("")
    print(f"Manifest CSV: {csv_path}")
    print(f"Manifest MD:  {md_path}")
    print(f"Duplicate groups: {len(duplicates)}")
    print(f"Missing referenced assets: {len(missing_refs)}")
    print("\nOriginal files were left untouched. Copies were placed in /domain-organization/.")

if __name__ == "__main__":
    main()
