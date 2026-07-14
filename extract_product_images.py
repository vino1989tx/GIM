#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path

import cv2
import easyocr
import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parent
ASSET_DIR = ROOT / "src" / "assets" / "GIM_Nextgen_2026"
DATA_FILE = ROOT / "src" / "app" / "data" / "mock-products.ts"
IMAGE_PATTERN = re.compile(r"images: \['(/assets/GIM_Nextgen_2026/[^']+\.jpg)'\]")


def product_image_names() -> list[str]:
    names: list[str] = []
    for match in IMAGE_PATTERN.findall(DATA_FILE.read_text()):
        name = Path(match).name
        if "clean-white" not in name and "crop" not in name and name not in names:
            names.append(name)
    return names


def integral_sum(ii: np.ndarray, x1: int, y1: int, x2: int, y2: int) -> int:
    return int(ii[y2, x2] - ii[y1, x2] - ii[y2, x1] + ii[y1, x1])


def best_product_window(image_path: Path, reader: easyocr.Reader) -> tuple[Image.Image, tuple[int, int, int, int]]:
    image = cv2.imread(str(image_path))
    if image is None:
        raise FileNotFoundError(image_path)

    height, width = image.shape[:2]
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    diff = np.linalg.norm(rgb.astype(np.int16) - 255, axis=2)
    non_white = (diff > 20).astype("uint8")
    text_mask = np.zeros((height, width), dtype="uint8")

    ocr_boxes: list[tuple[int, int, int, int]] = []
    for result in reader.readtext(str(image_path), detail=1, paragraph=False):
        box = result[0]
        xs = [int(point[0]) for point in box]
        ys = [int(point[1]) for point in box]
        x1 = max(0, min(xs) - 12)
        y1 = max(0, min(ys) - 10)
        x2 = min(width, max(xs) + 12)
        y2 = min(height, max(ys) + 10)
        text_mask[y1:y2, x1:x2] = 1
        ocr_boxes.append((x1, y1, x2, y2))

    non_white_integral = cv2.integral(non_white)
    text_integral = cv2.integral(text_mask)
    best: tuple[float, int, int, int, int] | None = None
    sizes = [
        (int(width * 0.50), int(height * 0.28)),
        (int(width * 0.56), int(height * 0.32)),
        (int(width * 0.62), int(height * 0.36)),
    ]

    for window_width, window_height in sizes:
        step_x = max(18, window_width // 10)
        step_y = max(18, window_height // 10)

        for x1 in range(0, width - window_width + 1, step_x):
            for y1 in range(0, height - window_height + 1, step_y):
                x2 = x1 + window_width
                y2 = y1 + window_height
                visible_pixels = integral_sum(non_white_integral, x1, y1, x2, y2)
                text_pixels = integral_sum(text_integral, x1, y1, x2, y2)
                score = visible_pixels - (text_pixels * 6.0) + ((x1 / width) * 150) + ((y1 / height) * 80)

                if best is None or score > best[0]:
                    best = (score, x1, y1, x2, y2)

    if best is None:
        raise RuntimeError(f"Unable to compute crop window for {image_path.name}")

    _, x1, y1, x2, y2 = best
    crop = rgb[y1:y2, x1:x2].copy()

    # Remove OCR-detected text inside the crop by painting it white.
    for box_x1, box_y1, box_x2, box_y2 in ocr_boxes:
        inter_x1 = max(x1, box_x1)
        inter_y1 = max(y1, box_y1)
        inter_x2 = min(x2, box_x2)
        inter_y2 = min(y2, box_y2)
        if inter_x1 < inter_x2 and inter_y1 < inter_y2:
            crop[inter_y1 - y1:inter_y2 - y1, inter_x1 - x1:inter_x2 - x1] = 255

    return Image.fromarray(crop), (x1, y1, x2, y2)


def generate_clean_images(overwrite: bool = False) -> None:
    reader = easyocr.Reader(["en"], gpu=False, verbose=False)

    for name in product_image_names():
        source = ASSET_DIR / name
        target = ASSET_DIR / f"{source.stem}-clean-white.jpg"
        if target.exists() and not overwrite:
            continue

        crop, box = best_product_window(source, reader)
        crop.save(target, quality=92)
        print(f"{source.name} -> {target.name} box={box}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate product-only cropped images from datasheet assets.")
    parser.add_argument("--overwrite", action="store_true", help="Regenerate output files even if they already exist.")
    args = parser.parse_args()
    generate_clean_images(overwrite=args.overwrite)


if __name__ == "__main__":
    main()
