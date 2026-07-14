#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path

import easyocr


ROOT = Path(__file__).resolve().parent
DATA_FILE = ROOT / "src" / "app" / "data" / "mock-products.ts"
OUTPUT_FILE = ROOT / "src" / "app" / "data" / "product-rich-content.generated.ts"
ASSET_DIR = ROOT / "src" / "assets" / "GIM_Nextgen_2026"


@dataclass
class ProductSeed:
    id: str
    name: str
    category: str
    short_description: str
    feature_bullets: list[str]
    key_features: list[dict[str, str]]
    applications: list[str]
    image_path: str


HEADING_KEYWORDS = {
    "description",
    "feature",
    "features",
    "main features",
    "components",
    "component",
    "specification",
    "specifications",
    "reference",
    "references",
    "what this sensor measures",
    "measurements",
    "applications",
    "application",
}

SPEC_PREFIXES = (
    "sensor type",
    "measurement",
    "material",
    "dimension",
    "weight",
    "display",
    "power",
    "battery",
    "operating system",
    "working temp",
    "operation temp",
    "tablet pc application",
    "probe type",
    "signal cable",
    "memory",
    "usb",
    "bluetooth",
    "interface",
)


def remove_source_suffix(image_name: str) -> str:
    return image_name.replace("-clean-white", "").replace("-crop", "").replace("-clean", "")


def extract_array_block(text: str, marker: str) -> str:
    marker_index = text.index(marker)
    start = marker_index + len(marker) - 1 if marker.rstrip().endswith("[") else text.index("[", marker_index + len(marker))
    depth = 0
    for index in range(start, len(text)):
        char = text[index]
        if char == "[":
            depth += 1
        elif char == "]":
            depth -= 1
            if depth == 0:
                return text[start + 1:index]
    raise ValueError(f"Unable to extract array block for {marker}")


def split_top_level_objects(block: str) -> list[str]:
    objects: list[str] = []
    depth = 0
    in_string = False
    start = -1
    previous = ""

    for index, char in enumerate(block):
        if char == "'" and previous != "\\":
            in_string = not in_string
        if in_string:
            previous = char
            continue
        if char == "{":
            if depth == 0:
                start = index
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0 and start != -1:
                objects.append(block[start:index + 1])
        previous = char

    return objects


def extract_string(block: str, field: str) -> str:
    match = re.search(rf"{field}: '([^']*)'", block, re.S)
    return match.group(1) if match else ""


def extract_string_array(block: str, field: str) -> list[str]:
    match = re.search(rf"{field}: \[(.*?)\]", block, re.S)
    if not match:
        return []
    return re.findall(r"'([^']*)'", match.group(1))


def extract_key_features(block: str) -> list[dict[str, str]]:
    match = re.search(r"keyFeatures: \[(.*?)\],\n", block, re.S)
    if not match:
        return []
    features = []
    for title, description in re.findall(r"\{ title: '([^']*)', description: '([^']*)' \}", match.group(1)):
        features.append({"title": title, "description": description})
    return features


def parse_products() -> tuple[dict[str, str], list[ProductSeed]]:
    text = DATA_FILE.read_text()
    category_block = extract_array_block(text, "export const PRODUCT_CATEGORIES: ProductCategory[] = [")
    product_block = extract_array_block(text, "export const PRODUCTS: Product[] = [")

    categories: dict[str, str] = {}
    for block in split_top_level_objects(category_block):
        category_id = extract_string(block, "id")
        if category_id:
            categories[category_id] = extract_string(block, "title")

    products: list[ProductSeed] = []
    for block in split_top_level_objects(product_block):
        product_id = extract_string(block, "id")
        name = extract_string(block, "name")
        category = extract_string(block, "category")
        short_description = extract_string(block, "shortDescription")
        image_path_match = re.search(r"images: \['([^']+)'\]", block)
        image_path = image_path_match.group(1) if image_path_match else ""
        products.append(
            ProductSeed(
                id=product_id,
                name=name,
                category=category,
                short_description=short_description,
                feature_bullets=extract_string_array(block, "featureBullets"),
                key_features=extract_key_features(block),
                applications=extract_string_array(block, "applications"),
                image_path=image_path,
            )
        )

    return categories, products


def clean_text(value: str) -> str:
    value = value.replace("|", "I")
    value = value.replace("Cateway", "Gateway")
    value = value.replace("loT", "IoT")
    value = value.replace("AII", "All")
    value = value.replace("scamless", "seamless")
    value = value.replace("locations_", "locations.")
    value = value.replace("projects_", "projects,")
    value = value.replace("Ptiooo", "Pt1000")
    value = value.replace("Whcatstone", "Wheatstone")
    value = value.replace("Whoatstone", "Wheatstone")
    value = value.replace("Potentiomcter", "Potentiometer")
    value = value.replace("strcutres", "structures")
    value = value.replace("accurato", "accurate")
    value = value.replace("betwocn", "between")
    value = value.replace("stahility", "stability")
    value = value.replace("sensibilicy", "sensitivity")
    value = value.replace("mexsurement", "measurement")
    value = value.replace("FTOm", "from")
    value = value.replace("N-microsecond", "measurement")
    value = value.replace("FastIslow", "Fast/Slow")
    value = value.replace("AIC-weighting", "A/C-weighting")
    value = value.replace("LIO", "L10")
    value = value.replace("LSO", "L50")
    value = value.replace("L9o", "L90")
    value = value.replace("deg C", "deg C")
    value = value.replace("A mode, B mode, AB mode", "A mode, B mode, AB mode")
    value = value.replace(";", ",")
    value = value.replace(" :", ":")
    value = value.replace(" .", ".")
    value = value.replace(" ,", ",")
    value = re.sub(r"\s+", " ", value).strip(" -")
    return value


def merge_ocr_lines(results: list[list]) -> list[str]:
    rows = []
    for box, text, _confidence in results:
        cleaned = clean_text(text)
        if not cleaned:
            continue
        xs = [point[0] for point in box]
        ys = [point[1] for point in box]
        rows.append((sum(ys) / len(ys), min(xs), cleaned))

    rows.sort(key=lambda item: (item[0], item[1]))
    merged: list[dict[str, object]] = []

    for y, x, text in rows:
        if not merged or abs(y - merged[-1]["y"]) > 14:
            merged.append({"y": y, "parts": [(x, text)]})
        else:
            merged[-1]["parts"].append((x, text))

    lines: list[str] = []
    for row in merged:
        parts = " ".join(text for _x, text in sorted(row["parts"]))  # type: ignore[index]
        parts = clean_text(parts)
        if parts and parts not in lines:
            lines.append(parts)
    return lines


def normalized(value: str) -> str:
    return re.sub(r"[^a-z0-9 ]+", "", value.lower()).strip()


def looks_like_heading(line: str) -> bool:
    norm = normalized(line)
    if not norm:
        return False
    if norm in HEADING_KEYWORDS or norm.startswith("supports up to"):
        return True
    if line.endswith(":"):
        return False
    if line.count(":") > 1 or line.count(".") > 1:
        return False
    words = line.replace("-", " ").replace("/", " ").split()
    if not 1 < len(words) <= 6:
        return False
    if any(char.isdigit() for char in line):
        return False
    title_like = sum(1 for word in words if word[:1].isupper() or word.isupper())
    return title_like >= max(2, len(words) - 1)


def looks_usable_bullet(line: str) -> bool:
    alpha_count = sum(1 for char in line if char.isalpha())
    return len(line) > 8 and alpha_count >= 6 and alpha_count / max(len(line), 1) > 0.55


def is_spec_heading(norm: str) -> bool:
    return any(norm.startswith(prefix) for prefix in SPEC_PREFIXES)


def drop_noise_lines(lines: list[str], product: ProductSeed) -> list[str]:
    ignored_prefixes = (
        "all move solutions devices share",
        "all move solutions sensors share",
        "all move solutions products share",
        "common foundation of precision",
        "precision reliability",
        "reliability and seamless integration",
    )
    filtered: list[str] = []
    product_name = normalized(product.name)

    for line in lines:
        norm = normalized(line)
        if not norm:
            continue
        if norm == product_name and filtered:
            continue
        if any(norm.startswith(prefix) for prefix in ignored_prefixes):
            continue
        filtered.append(line)

    return filtered


def parse_ocr_content(product: ProductSeed, category_title: str, reader: easyocr.Reader) -> dict:
    source_name = remove_source_suffix(Path(product.image_path).name)
    source_path = ASSET_DIR / source_name
    lines = merge_ocr_lines(reader.readtext(str(source_path), detail=1, paragraph=False))
    lines = drop_noise_lines(lines, product)

    if not lines:
        return {
            "label": category_title,
            "headline": product.name,
            "overview": product.short_description,
            "highlights": product.feature_bullets,
            "sections": product.key_features,
            "measurementHeading": "Typical applications",
            "measurements": product.applications,
        }

    description_index = next((i for i, line in enumerate(lines) if normalized(line) == "description"), None)
    heading_indexes = [i for i, line in enumerate(lines) if looks_like_heading(line)]
    first_heading_after_description = next((i for i in heading_indexes if description_index is not None and i > description_index), None)

    if description_index is not None:
        overview_lines = lines[description_index + 1:first_heading_after_description or len(lines)]
    else:
        start_index = 2 if len(lines) > 2 else 1
        overview_lines = lines[start_index:]
        if heading_indexes:
            overview_lines = overview_lines[:max(0, heading_indexes[0] - start_index)]

    overview_lines = [line for line in overview_lines if normalized(line) != normalized(product.name)]

    sections: list[tuple[str, list[str]]] = []
    current_heading = ""
    current_lines: list[str] = []
    start_blocks_at = first_heading_after_description if first_heading_after_description is not None else (heading_indexes[0] if heading_indexes else len(lines))

    for line in lines[start_blocks_at:]:
        if looks_like_heading(line):
            if current_heading or current_lines:
                sections.append((current_heading, current_lines))
            current_heading = line
            current_lines = []
        else:
            current_lines.append(line)
    if current_heading or current_lines:
        sections.append((current_heading, current_lines))

    highlights: list[str] = []
    interface_heading = ""
    interface_bullets: list[str] = []
    measurement_heading = ""
    measurements: list[str] = []
    rich_sections: list[dict[str, str]] = []

    for heading, body in sections:
        norm = normalized(heading)
        joined = " ".join(body)

        if norm in {"feature", "features", "main features", "component", "components"}:
            highlights.extend(item for item in body if len(item) > 8)
            continue

        if norm.startswith("supports up to"):
            interface_heading = heading
            interface_bullets = body
            continue

        if norm in {"what this sensor measures", "measurements", "applications", "application"}:
            measurement_heading = heading
            measurements = body
            continue

        if norm in {"specification", "specifications", "reference", "references"} or is_spec_heading(norm):
            continue

        if body:
            rich_sections.append(
                {
                    "title": heading,
                    "description": clean_text(joined),
                }
            )

    if not 2 <= len(highlights) <= 8 or not all(looks_usable_bullet(item) for item in highlights):
        highlights = product.feature_bullets

    if interface_bullets and (len(interface_bullets) > 10 or not all(looks_usable_bullet(item) for item in interface_bullets)):
        interface_heading = ""
        interface_bullets = []

    if not rich_sections:
        rich_sections = product.key_features

    if not measurements or len(measurements) > 5 or not all(looks_usable_bullet(item) for item in measurements):
        measurements = product.applications
        measurement_heading = "Typical applications"

    overview = clean_text(" ".join(overview_lines)) or product.short_description

    payload = {
        "label": category_title,
        "overview": overview,
        "highlights": highlights,
        "sections": rich_sections,
        "measurementHeading": measurement_heading,
        "measurements": measurements,
    }

    if interface_heading and interface_bullets:
        payload["interfaceHeading"] = interface_heading
        payload["interfaceBullets"] = interface_bullets

    return payload


def write_output(content: dict[str, dict]) -> None:
    serialized = json.dumps(content, indent=2, ensure_ascii=True)
    ts = (
        "import type { ProductRichContent } from '../models/product.model';\n\n"
        "export const GENERATED_PRODUCT_RICH_CONTENT: Record<string, ProductRichContent> = "
        f"{serialized} as Record<string, ProductRichContent>;\n"
    )
    OUTPUT_FILE.write_text(ts)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate structured product rich content from OCR output.")
    parser.add_argument("--include-custom", action="store_true", help="Also generate entries for products that already have explicit richContent.")
    args = parser.parse_args()

    categories, products = parse_products()
    reader = easyocr.Reader(["en"], gpu=False, verbose=False)
    generated: dict[str, dict] = {}

    custom_rich_ids = {"communication-node"}
    for product in products:
        if product.id in custom_rich_ids and not args.include_custom:
            continue
        category_title = categories.get(product.category, "Product overview")
        generated[product.id] = parse_ocr_content(product, category_title, reader)

    write_output(generated)
    print(f"Generated rich content for {len(generated)} products -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
