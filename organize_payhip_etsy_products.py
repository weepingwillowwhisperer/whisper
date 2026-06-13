from pathlib import Path
import csv
import hashlib
import re
import shutil
from collections import defaultdict

ROOT = Path.cwd()
OUT = ROOT / "marketplace-product-organization"

PAYHIP = OUT / "payhip"
ETSY = OUT / "etsy"
REVIEW = OUT / "needs-review"

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
    "marketplace-product-organization",
}

TEXT_EXTS = {
    ".txt", ".md", ".mdx", ".html", ".css", ".js", ".jsx",
    ".ts", ".tsx", ".json", ".yml", ".yaml", ".csv", ".xml", ".svg"
}

PRODUCT_EXTS = {
    ".pdf", ".docx", ".pptx", ".xlsx", ".png", ".jpg", ".jpeg",
    ".webp", ".gif", ".svg", ".ai", ".psd", ".eps", ".txt",
    ".md", ".mdx", ".csv"
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

PRODUCT_KEYWORDS = [
    "product",
    "products",
    "listing",
    "listings",
    "download",
    "digital product",
    "digital-products",
    "pdf",
    "workbook",
    "worksheet",
    "guide",
    "toolkit",
    "bundle",
    "companion",
    "template",
    "planner",
    "journal",
    "checklist",
    "lead magnet",
    "opt-in",
    "resource",
    "resources",
    "sales page",
    "launch",
    "payhip",
    "etsy",
    "gumroad",
    "shop",
    "shopify",
    "storefront",
    "printify",
    "apparel",
    "shirt",
    "t-shirt",
    "tee",
    "hoodie",
    "sweatshirt",
    "mockup",
    "collection",
    "awareness",
    "merch",
    "merchandise",
]

NON_PRODUCT_HINTS = [
    "privacy policy",
    "terms of service",
    "cookie policy",
    "invoice",
    "receipt",
    "tax",
    "bank",
    "password",
    "credentials",
]

GENERIC_DIRS = {
    "domain-organization",
    "resources-domain",
    "shop-domain",
    "shared-admin",
    "needs-review",
    "assets",
    "asset",
    "images",
    "image",
    "img",
    "files",
    "file",
    "exports",
    "export",
    "pdf",
    "pdfs",
    "product",
    "products",
    "shop",
    "resources",
    "content",
    "copy",
    "draft",
    "drafts",
    "misc",
    "raw",
    "notes",
    "mockup",
    "mockups",
    "listing",
    "listings",
    "downloads",
    "download",
    "digital-products",
    "digital_product",
    "payhip",
    "etsy",
    "source-files",
}

def safe_read_text(path):
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""

def sha256(path):
    h = hashlib.sha256()
    try:
        with path.open("rb") as f:
            for chunk in iter(lambda: f.read(1024 * 1024), b""):
                h.update(chunk)
        return h.hexdigest()
    except Exception:
        return ""

def sanitize_slug(value):
    value = value.lower().strip()
    value = re.sub(r"\.[a-z0-9]+$", "", value)
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value)
    return value.strip("-") or "unnamed-product"

def title_from_slug(slug):
    return " ".join(word.capitalize() for word in slug.split("-"))

def should_scan_path(path):
    rel_parts = path.relative_to(ROOT).parts

    if any(part in EXCLUDE_DIRS for part in rel_parts):
        return False

    # Allow only useful prior organization folders if they exist.
    if rel_parts and rel_parts[0] == "domain-organization":
        if len(rel_parts) < 2:
            return False
        if rel_parts[1] not in {"resources-domain", "shop-domain"}:
            return False

    return True

def scan_files():
    files = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if not should_scan_path(path):
            continue
        files.append(path)
    return files

def product_score(path):
    rel = str(path.relative_to(ROOT)).lower()
    name = path.name.lower()
    ext = path.suffix.lower()

    if path.name in TECH_FILES:
        return 0, ["technical file"]

    if ext not in PRODUCT_EXTS:
        return 0, ["unsupported product file type"]

    text = safe_read_text(path).lower()[:50000] if ext in TEXT_EXTS else ""
    haystack_name = f"{rel}\n{name}"
    haystack_all = f"{haystack_name}\n{text}"

    for hint in NON_PRODUCT_HINTS:
        if hint in haystack_all:
            return 0, [f"non-product hint: {hint}"]

    score = 0
    matched = []

    for keyword in PRODUCT_KEYWORDS:
        if keyword in haystack_name:
            score += 3
            matched.append(keyword)
        elif keyword in text:
            score += 1
            matched.append(keyword)

    if "domain-organization/resources-domain" in rel:
        score += 6
        matched.append("previously assigned to resources-domain")

    if "domain-organization/shop-domain" in rel:
        score += 6
        matched.append("previously assigned to shop-domain")

    if ext == ".pdf":
        score += 2
        matched.append("pdf file")

    if ext in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"} and any(
        word in rel for word in ["mockup", "product", "shop", "etsy", "payhip", "listing", "apparel", "cover"]
    ):
        score += 2
        matched.append("product image or mockup")

    if ext in {".ai", ".psd", ".eps"} and any(
        word in rel for word in ["product", "mockup", "shirt", "tee", "hoodie", "apparel", "printify"]
    ):
        score += 2
        matched.append("design source asset")

    return score, list(dict.fromkeys(matched))

def infer_product_slug(path):
    rel = path.relative_to(ROOT)
    clean_parts = [sanitize_slug(part) for part in rel.parts[:-1]]
    candidates = [
        part for part in clean_parts
        if part and part not in GENERIC_DIRS and len(part) > 2
    ]

    if candidates:
        candidate = candidates[-1]
    else:
        candidate = sanitize_slug(path.stem)

    if candidate in GENERIC_DIRS or len(candidate) < 3:
        candidate = sanitize_slug(path.stem)

    return candidate

def infer_product_type(files):
    joined = " ".join(str(p.relative_to(ROOT)).lower() for p in files)

    if any(word in joined for word in ["shirt", "t-shirt", "tee", "hoodie", "sweatshirt", "apparel", "mockup", "printify"]):
        return "apparel / awareness product"

    if any(word in joined for word in ["pdf", "workbook", "worksheet", "guide", "toolkit", "planner", "journal", "checklist"]):
        return "digital download"

    if any(word in joined for word in ["bundle", "collection"]):
        return "bundle or collection"

    return "product"

def confidence_from_score(score):
    if score >= 8:
        return "high"
    if score >= 4:
        return "medium"
    return "low"

def copy_file_to_platform(path, platform_dir, product_slug):
    rel = path.relative_to(ROOT)

    safe_parts = [sanitize_slug(part) for part in rel.parts]
    filename = safe_parts[-1]

    # Put extension back if sanitizing removed it.
    original_ext = path.suffix.lower()
    if original_ext and not filename.endswith(original_ext):
        filename = f"{filename}{original_ext}"

    dest = platform_dir / product_slug / "source-files" / Path(*safe_parts[:-1]) / filename
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

def write_listing_template(platform, platform_dir, product_slug, product_type, files):
    product_name = title_from_slug(product_slug)
    folder = platform_dir / product_slug
    folder.mkdir(parents=True, exist_ok=True)

    source_list = "\n".join(f"- {str(p.relative_to(ROOT))}" for p in files)

    if platform == "payhip":
        body = f"""# {product_name}

Platform: Payhip
Status: Draft
Product type: {product_type}

## Source files included

{source_list}

## Listing fields to complete

Product title:
{product_name}

Short description:


Full description:


What is included:


Who this is for:


Price:


Cover image / preview images:


Download file notes:


License / usage terms:


Refund note:


Tags / keywords:


## Publishing notes

- Review file names before upload.
- Confirm the final deliverable is included.
- Confirm preview images are clean and marketplace-ready.
- Do not publish until pricing, description, and file permissions are reviewed.
"""
    else:
        body = f"""# {product_name}

Platform: Etsy
Status: Draft
Product type: {product_type}

## Source files included

{source_list}

## Listing fields to complete

Listing title:
{product_name}

Short description:


Full description:


What is included:


Who this is for:


Materials / format:


Price:


Preview images / mockups:


Personalization note, if any:


Digital download or physical product note:


Tags / keywords:


## Publishing notes

- Review title, tags, category, price, and delivery format inside Etsy before publishing.
- Confirm whether this listing is digital, physical, or made-to-order.
- Confirm preview images are clear and do not expose full paid content.
- Do not publish until all marketplace fields are reviewed.
"""

    (folder / "listing-draft.md").write_text(body, encoding="utf-8")

def write_source_index(platform_dir, product_slug, files):
    folder = platform_dir / product_slug
    lines = [f"# Source Files for {title_from_slug(product_slug)}", ""]
    for p in files:
        lines.append(f"- `{str(p.relative_to(ROOT))}`")
    lines.append("")
    (folder / "SOURCE_FILES.md").write_text("\n".join(lines), encoding="utf-8")

def main():
    PAYHIP.mkdir(parents=True, exist_ok=True)
    ETSY.mkdir(parents=True, exist_ok=True)
    REVIEW.mkdir(parents=True, exist_ok=True)

    all_files = scan_files()

    # Deduplicate identical files, preferring originals over prior copied organization folders.
    hash_to_paths = defaultdict(list)
    unhashed = []

    for path in all_files:
        digest = sha256(path)
        if digest:
            hash_to_paths[digest].append(path)
        else:
            unhashed.append(path)

    unique_files = []
    duplicate_groups = {}

    for digest, paths in hash_to_paths.items():
        paths_sorted = sorted(
            paths,
            key=lambda p: (
                str(p.relative_to(ROOT)).startswith("domain-organization"),
                len(str(p.relative_to(ROOT)))
            )
        )
        unique_files.append(paths_sorted[0])
        if len(paths_sorted) > 1:
            duplicate_groups[digest] = paths_sorted

    unique_files.extend(unhashed)

    product_files = []
    rejected_files = []

    for path in unique_files:
        score, matched = product_score(path)
        if score >= 2:
            product_files.append((path, score, matched))
        else:
            rejected_files.append((path, score, matched))

    grouped = defaultdict(list)
    metadata = {}

    for path, score, matched in product_files:
        slug = infer_product_slug(path)
        grouped[slug].append(path)
        metadata[str(path)] = {
            "score": score,
            "matched": matched,
            "confidence": confidence_from_score(score),
        }

    manifest_rows = []
    product_index_rows = []

    for slug, files in sorted(grouped.items()):
        product_type = infer_product_type(files)

        write_listing_template("payhip", PAYHIP, slug, product_type, files)
        write_listing_template("etsy", ETSY, slug, product_type, files)
        write_source_index(PAYHIP, slug, files)
        write_source_index(ETSY, slug, files)

        payhip_files = []
        etsy_files = []

        for path in files:
            copied_payhip = copy_file_to_platform(path, PAYHIP, slug)
            copied_etsy = copy_file_to_platform(path, ETSY, slug)

            payhip_files.append(copied_payhip)
            etsy_files.append(copied_etsy)

            meta = metadata[str(path)]

            for platform, copied_to in [
                ("payhip", copied_payhip),
                ("etsy", copied_etsy),
            ]:
                manifest_rows.append({
                    "product_slug": slug,
                    "product_name": title_from_slug(slug),
                    "product_type": product_type,
                    "platform": platform,
                    "original_path": str(path.relative_to(ROOT)),
                    "file_type": path.suffix.lower() or "no extension",
                    "copied_to": str(copied_to.relative_to(ROOT)),
                    "confidence": meta["confidence"],
                    "matched_signals": ", ".join(meta["matched"]),
                    "notes": "Review before publishing." if meta["confidence"] == "low" else "",
                })

        product_index_rows.append({
            "product_slug": slug,
            "product_name": title_from_slug(slug),
            "product_type": product_type,
            "source_file_count": len(files),
            "payhip_folder": str((PAYHIP / slug).relative_to(ROOT)),
            "etsy_folder": str((ETSY / slug).relative_to(ROOT)),
            "status": "packet created for both Payhip and Etsy",
        })

    # Save rejected low-signal product candidates for review.
    review_path = REVIEW / "not-treated-as-products.md"
    review_lines = [
        "# Files Not Treated as Products",
        "",
        "These files did not meet the product-detection threshold.",
        "Review this list if you expected something to be included.",
        "",
    ]

    for path, score, matched in sorted(rejected_files, key=lambda item: str(item[0])):
        review_lines.append(f"- `{str(path.relative_to(ROOT))}` | score: {score} | signals: {', '.join(matched)}")

    review_path.write_text("\n".join(review_lines), encoding="utf-8")

    # Write CSV manifests.
    manifest_csv = OUT / "product-marketplace-manifest.csv"
    with manifest_csv.open("w", newline="", encoding="utf-8") as f:
        fieldnames = [
            "product_slug",
            "product_name",
            "product_type",
            "platform",
            "original_path",
            "file_type",
            "copied_to",
            "confidence",
            "matched_signals",
            "notes",
        ]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(manifest_rows)

    product_index_csv = OUT / "product-index.csv"
    with product_index_csv.open("w", newline="", encoding="utf-8") as f:
        fieldnames = [
            "product_slug",
            "product_name",
            "product_type",
            "source_file_count",
            "payhip_folder",
            "etsy_folder",
            "status",
        ]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(product_index_rows)

    # Write Markdown manifest.
    manifest_md = OUT / "product-marketplace-manifest.md"
    with manifest_md.open("w", encoding="utf-8") as f:
        f.write("# Product Marketplace Manifest\n\n")
        f.write("Every detected product has been copied into both a Payhip packet and an Etsy packet.\n\n")

        f.write("## Summary\n\n")
        f.write(f"- Total files scanned: {len(all_files)}\n")
        f.write(f"- Unique files after duplicate filtering: {len(unique_files)}\n")
        f.write(f"- Product files detected: {len(product_files)}\n")
        f.write(f"- Products created: {len(grouped)}\n")
        f.write(f"- Payhip product folders: {len(grouped)}\n")
        f.write(f"- Etsy product folders: {len(grouped)}\n")
        f.write(f"- Duplicate file groups skipped: {len(duplicate_groups)}\n")
        f.write(f"- Review list: `{str(review_path.relative_to(ROOT))}`\n\n")

        f.write("## Product Index\n\n")
        for row in product_index_rows:
            f.write(f"### {row['product_name']}\n\n")
            f.write(f"- Product type: {row['product_type']}\n")
            f.write(f"- Source file count: {row['source_file_count']}\n")
            f.write(f"- Payhip folder: `{row['payhip_folder']}`\n")
            f.write(f"- Etsy folder: `{row['etsy_folder']}`\n")
            f.write(f"- Status: {row['status']}\n\n")

        f.write("## Duplicate Groups\n\n")
        if duplicate_groups:
            for digest, paths in duplicate_groups.items():
                f.write(f"- Duplicate group `{digest[:12]}`:\n")
                for p in paths:
                    f.write(f"  - `{str(p.relative_to(ROOT))}`\n")
        else:
            f.write("- No exact duplicate groups found.\n")
        f.write("\n")

        f.write("## Notes\n\n")
        f.write("- Originals were left untouched.\n")
        f.write("- This script prepares marketplace packets only. It does not upload, publish, deploy, or connect accounts.\n")
        f.write("- Review low-confidence files and listing drafts before publishing.\n")

    # Write upload checklists.
    (OUT / "payhip-upload-checklist.md").write_text("""# Payhip Upload Checklist

For each product folder:

- Review `listing-draft.md`.
- Confirm the final product file is present.
- Confirm cover image or preview image is present.
- Set price.
- Add description.
- Add tags / keywords.
- Confirm license or usage terms.
- Confirm refund note.
- Publish only after final review.
""", encoding="utf-8")

    (OUT / "etsy-upload-checklist.md").write_text("""# Etsy Upload Checklist

For each product folder:

- Review `listing-draft.md`.
- Confirm whether the item is digital, physical, or made-to-order.
- Confirm preview images / mockups are present.
- Set price.
- Add listing description.
- Add tags / keywords.
- Confirm category and delivery format inside Etsy.
- Confirm no full paid content is exposed in preview images.
- Publish only after final review.
""", encoding="utf-8")

    print("")
    print("Payhip + Etsy product organization complete.")
    print(f"Scanned files: {len(all_files)}")
    print(f"Products created: {len(grouped)}")
    print(f"Payhip folders: {len(grouped)}")
    print(f"Etsy folders: {len(grouped)}")
    print("")
    print(f"Main manifest: {manifest_md}")
    print(f"CSV manifest:  {manifest_csv}")
    print(f"Product index: {product_index_csv}")
    print("")
    print("Original files were left untouched.")
    print("Each detected product now has both a Payhip packet and an Etsy packet.")

if __name__ == "__main__":
    main()
