#!/usr/bin/env python3
from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image as PlatypusImage,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parent
DATA_FILE = ROOT / "src" / "app" / "data" / "mock-products.ts"
BROCHURE_DIR = ROOT / "src" / "assets" / "brochures"
PRODUCT_BROCHURE_DIR = BROCHURE_DIR / "products"
GENERATED_ON = datetime.now().strftime("%B %d, %Y")


@dataclass
class ProductBrochure:
    id: str
    name: str
    category_title: str
    short_description: str
    feature_bullets: list[str]
    key_features: list[dict[str, str]]
    applications: list[str]
    specifications: list[tuple[str, str]]
    image_path: str
    rich_content: dict[str, object] | None


styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    "BrochureTitle",
    parent=styles["Heading1"],
    fontSize=24,
    leading=30,
    textColor=colors.HexColor("#17324D"),
    alignment=TA_CENTER,
    spaceAfter=14,
)
subtitle_style = ParagraphStyle(
    "BrochureSubtitle",
    parent=styles["Heading2"],
    fontSize=12,
    leading=18,
    textColor=colors.HexColor("#325A84"),
    alignment=TA_CENTER,
    spaceAfter=22,
)
section_style = ParagraphStyle(
    "SectionHeading",
    parent=styles["Heading2"],
    fontSize=14,
    leading=18,
    textColor=colors.HexColor("#1E5A8A"),
    spaceBefore=8,
    spaceAfter=10,
)
body_style = ParagraphStyle(
    "BrochureBody",
    parent=styles["BodyText"],
    fontSize=10.5,
    leading=15,
    textColor=colors.HexColor("#24384F"),
    spaceAfter=10,
)
note_style = ParagraphStyle(
    "BrochureNote",
    parent=styles["BodyText"],
    fontSize=9.5,
    leading=13,
    textColor=colors.HexColor("#566B80"),
    alignment=TA_CENTER,
    spaceAfter=6,
)


def document(path: Path, title: str) -> SimpleDocTemplate:
    return SimpleDocTemplate(
        str(path),
        pagesize=letter,
        rightMargin=0.75 * inch,
        leftMargin=0.75 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch,
        title=title,
        author="GIM Nextgen",
    )


def normalize_copy(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("_", " ")).strip()


def bullet_list(items: list[str]) -> Paragraph:
    lines = "<br/>".join(f"&bull; {escape(normalize_copy(item))}" for item in items if item.strip())
    return Paragraph(lines or "&bull; GIM Nextgen monitoring support", body_style)


def category_table(rows: list[tuple[str, str]]) -> Table:
    table_rows = [["Category", "Focus"]] + [[name, focus] for name, focus in rows]
    table = Table(table_rows, colWidths=[2.2 * inch, 4.05 * inch])
    table.setStyle(shared_table_style())
    return table


def specifications_table(rows: list[tuple[str, str]]) -> Table:
    table_rows = [["Specification", "Value"]] + [[label, value] for label, value in rows]
    table = Table(table_rows, colWidths=[2.2 * inch, 4.05 * inch])
    table.setStyle(shared_table_style())
    return table


def shared_table_style() -> TableStyle:
    return TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#17324D")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#F4F8FC")),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#F4F8FC"), colors.white]),
            ("TEXTCOLOR", (0, 1), (-1, -1), colors.HexColor("#24384F")),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D3E0EB")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 7),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ]
    )


def product_image(image_path: str) -> PlatypusImage | None:
    resolved = ROOT / "src" / image_path.lstrip("/")
    if not resolved.exists():
        return None

    image = PlatypusImage(str(resolved))
    max_width = 4.4 * inch
    max_height = 2.8 * inch
    width_scale = max_width / image.drawWidth
    height_scale = max_height / image.drawHeight
    scale = min(width_scale, height_scale, 1)
    image.drawWidth *= scale
    image.drawHeight *= scale
    image.hAlign = "CENTER"
    return image


def footer(story: list[object]) -> None:
    story.extend(
        [
            Spacer(1, 0.18 * inch),
            Paragraph("Contact: info@gim-nextgen.com | +91 98765 43210 | Mumbai, India", note_style),
            Paragraph(f"Updated brochure generated on {GENERATED_ON}", note_style),
        ]
    )


def extract_array_block(text: str, marker: str) -> str:
    marker_index = text.index(marker)
    start = marker_index + len(marker) - 1
    depth = 0
    in_string = False
    previous = ""

    for index in range(start, len(text)):
        char = text[index]
        if char == "'" and previous != "\\":
            in_string = not in_string
        elif not in_string:
            if char == "[":
                depth += 1
            elif char == "]":
                depth -= 1
                if depth == 0:
                    return text[start + 1:index]
        previous = char

    raise ValueError(f"Unable to extract array block for {marker}")


def extract_value_block(block: str, field: str, opener: str) -> str:
    field_index = block.find(f"{field}:")
    if field_index == -1:
        return ""

    closer = "]" if opener == "[" else "}"
    start = block.find(opener, field_index)
    if start == -1:
        return ""

    depth = 0
    in_string = False
    previous = ""
    for index in range(start, len(block)):
        char = block[index]
        if char == "'" and previous != "\\":
            in_string = not in_string
        elif not in_string:
            if char == opener:
                depth += 1
            elif char == closer:
                depth -= 1
                if depth == 0:
                    return block[start + 1:index]
        previous = char

    return ""


def split_top_level_objects(block: str) -> list[str]:
    objects: list[str] = []
    depth = 0
    in_string = False
    start = -1
    previous = ""

    for index, char in enumerate(block):
        if char == "'" and previous != "\\":
            in_string = not in_string
        elif not in_string:
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
    array_block = extract_value_block(block, field, "[")
    if not array_block:
        return []
    return [value for value in re.findall(r"'([^']*)'", array_block) if value.strip()]


def extract_title_description_pairs(block: str, field: str) -> list[dict[str, str]]:
    array_block = extract_value_block(block, field, "[")
    if not array_block:
        return []
    return [
        {"title": title, "description": description}
        for title, description in re.findall(r"\{ title: '([^']*)', description: '([^']*)' \}", array_block)
    ]


def extract_label_value_pairs(block: str, field: str) -> list[tuple[str, str]]:
    array_block = extract_value_block(block, field, "[")
    if not array_block:
        return []
    return re.findall(r"\{ label: '([^']*)', value: '([^']*)' \}", array_block)


def extract_rich_content(block: str) -> dict[str, object] | None:
    rich_block = extract_value_block(block, "richContent", "{")
    if not rich_block:
        return None

    sections = extract_title_description_pairs(rich_block, "sections")
    return {
        "overview": extract_string(rich_block, "overview"),
        "highlights": extract_string_array(rich_block, "highlights"),
        "interfaceHeading": extract_string(rich_block, "interfaceHeading"),
        "interfaceBullets": extract_string_array(rich_block, "interfaceBullets"),
        "sections": sections,
        "measurementHeading": extract_string(rich_block, "measurementHeading"),
        "measurements": extract_string_array(rich_block, "measurements"),
    }


def parse_products() -> list[ProductBrochure]:
    text = DATA_FILE.read_text()
    category_block = extract_array_block(text, "export const PRODUCT_CATEGORIES: ProductCategory[] = [")
    product_block = extract_array_block(text, "export const PRODUCTS: Product[] = [")

    categories: dict[str, str] = {}
    for block in split_top_level_objects(category_block):
        category_id = extract_string(block, "id")
        if category_id:
            categories[category_id] = extract_string(block, "title")

    products: list[ProductBrochure] = []
    for block in split_top_level_objects(product_block):
        product_id = extract_string(block, "id")
        category_id = extract_string(block, "category")
        image_paths = extract_string_array(block, "images")
        products.append(
            ProductBrochure(
                id=product_id,
                name=extract_string(block, "name"),
                category_title=categories.get(category_id, "Product overview"),
                short_description=extract_string(block, "shortDescription"),
                feature_bullets=extract_string_array(block, "featureBullets"),
                key_features=extract_title_description_pairs(block, "keyFeatures"),
                applications=extract_string_array(block, "applications"),
                specifications=extract_label_value_pairs(block, "specifications"),
                image_path=image_paths[0] if image_paths else "",
                rich_content=extract_rich_content(block),
            )
        )

    return products


def build_product_catalogue() -> None:
    story: list[object] = [
        Paragraph("GIM Nextgen Product Catalogue", title_style),
        Paragraph(
            "Instrumentation, gateways, and engineering support for geotechnical and structural monitoring.",
            subtitle_style,
        ),
        Paragraph(
            "GIM Nextgen helps project teams deploy reliable monitoring systems across tunnels, dams, rail corridors, "
            "construction sites, and critical infrastructure. This catalogue reflects the current website content and "
            "summarizes our product families, service scope, and typical deployment environments.",
            body_style,
        ),
        Paragraph("Why teams choose GIM Nextgen", section_style),
        bullet_list(
            [
                "Engineering-grade hardware designed for harsh civil and mining environments.",
                "Integrated remote monitoring from field sensor to cloud dashboard.",
                "Global support network with delivery, commissioning, and lifecycle support.",
                "Practical solutions focused on risk reduction and faster decision-making.",
            ]
        ),
        Paragraph("Product portfolio overview", section_style),
        category_table(
            [
                ("Connectivity &amp; Gateways", "Edge communications for sensor networks and remote visibility."),
                ("Tilt &amp; Inclinometer Systems", "Angle, alignment, slope, and excavation movement monitoring."),
                ("Strain &amp; Load Monitoring", "Stress, strain, and load measurement in critical assets."),
                ("Displacement &amp; Settlement", "Movement tracking for cracks, joints, and settlement points."),
                ("Vibration &amp; Environmental", "Dynamic sensing for vibration, acceleration, and site conditions."),
                ("Survey Targets &amp; Markers", "Reference points for deformation and structural movement surveys."),
            ]
        ),
        PageBreak(),
        Paragraph("Core capabilities", section_style),
        bullet_list(
            [
                "Real-time monitoring with early warning visibility on critical assets.",
                "Custom instrumentation and housings for demanding operating conditions.",
                "Engineering survey support for structural health and ground movement programs.",
                "Cloud-ready connectivity using LoRaWAN, LTE, Wi-Fi, and other project-specific backhaul options.",
            ]
        ),
        Paragraph("Featured solution areas", section_style),
        bullet_list(
            [
                "Communication nodes for digitizing legacy analog sensors and transmitting readings remotely.",
                "LoRaWAN gateways that act as the site backbone for large distributed monitoring networks.",
                "Wireless and portable tilt systems for slopes, dams, buildings, and excavation works.",
                "In-place inclinometers, casings, and readout systems for long-term displacement monitoring.",
            ]
        ),
        Paragraph("Services that support deployment", section_style),
        bullet_list(
            [
                "Site surveys and geotechnical assessments to guide instrument selection.",
                "System integration, commissioning, and control-room connectivity.",
                "Remote monitoring, analytics support, and long-term maintenance planning.",
                "Training and project handover for field teams and stakeholders.",
            ]
        ),
        Paragraph("Typical projects", section_style),
        bullet_list(
            [
                "Metro and rail corridors requiring alignment, settlement, and vibration monitoring.",
                "Tunnel excavation programs that need convergence and deformation tracking.",
                "Dam safety projects with seepage, pressure, and movement instrumentation.",
                "Construction risk management during piling, excavation, and structural staging.",
            ]
        ),
    ]
    footer(story)
    document(BROCHURE_DIR / "gim-product-catalogue.pdf", "GIM Nextgen Product Catalogue").build(story)


def build_monitoring_platform() -> None:
    story: list[object] = [
        Paragraph("Real-time Monitoring Platform", title_style),
        Paragraph(
            "A connected ecosystem for collecting, transmitting, visualizing, and acting on field data.",
            subtitle_style,
        ),
        Paragraph(
            "The GIM Nextgen monitoring platform combines rugged field instruments, reliable communications, and cloud "
            "dashboards so teams can interpret site conditions quickly and respond before small issues escalate.",
            body_style,
        ),
        Paragraph("Platform stack", section_style),
        category_table(
            [
                ("Sensors &amp; Devices", "Field instrumentation for tilt, strain, displacement, pressure, and environment."),
                ("Gateways &amp; Comms", "LoRaWAN, cellular, Wi-Fi, and redundant paths for dependable transport."),
                ("Cloud Dashboard", "Remote visualization, alert review, trend analysis, and reporting."),
                ("Project Workflow", "Installation, threshold setup, operator training, and ongoing support."),
            ]
        ),
        Paragraph("What the platform enables", section_style),
        bullet_list(
            [
                "24/7 visibility into instrumentation data from distributed sites.",
                "Threshold-based alarms and event notifications for faster intervention.",
                "Trend analysis and reporting to support compliance and stakeholder reviews.",
                "Remote access for project, safety, and operations teams across locations.",
            ]
        ),
        Paragraph("Field-to-dashboard workflow", section_style),
        bullet_list(
            [
                "Sensors capture changes in movement, load, vibration, or environmental conditions.",
                "Edge devices buffer readings and package them for secure transmission.",
                "Gateways forward site data to the cloud using the best available backhaul.",
                "Dashboards surface alarms, history, and exportable reports for decision-makers.",
            ]
        ),
        PageBreak(),
        Paragraph("Operational benefits", section_style),
        bullet_list(
            [
                "Early warnings reduce the likelihood of unplanned failures and emergency response.",
                "Unified visibility simplifies communication between contractors, consultants, and owners.",
                "Cloud reporting shortens the path from measurement collection to compliance-ready outputs.",
                "Scalable architecture supports both temporary construction monitoring and long-term asset programs.",
            ]
        ),
        Paragraph("Support and delivery model", section_style),
        bullet_list(
            [
                "Turnkey commissioning from procurement through final handover.",
                "Threshold planning and dashboard configuration aligned to project risk criteria.",
                "Training for field staff on sensor handling, interpretation, and maintenance.",
                "Ongoing support for diagnostics, analytics, and network health monitoring.",
            ]
        ),
        Paragraph("Best-fit applications", section_style),
        bullet_list(
            [
                "Tunnel, excavation, and retaining-wall deformation programs.",
                "Dam safety and pore-pressure monitoring networks.",
                "Rail and metro corridors with settlement, cant, and vibration requirements.",
                "Construction sites that need centralized risk monitoring across multiple work fronts.",
            ]
        ),
    ]
    footer(story)
    document(BROCHURE_DIR / "monitoring-platform.pdf", "Real-time Monitoring Platform").build(story)


def case_study_block(title: str, challenge: str, solution: str, outcome: str) -> list[Paragraph]:
    return [
        Paragraph(title, section_style),
        Paragraph(f"<b>Challenge:</b> {escape(challenge)}", body_style),
        Paragraph(f"<b>Solution:</b> {escape(solution)}", body_style),
        Paragraph(f"<b>Outcome:</b> {escape(outcome)}", body_style),
    ]


def build_case_studies() -> None:
    story: list[object] = [
        Paragraph("Project Case Studies", title_style),
        Paragraph(
            "Representative applications for tunnels, rail, dams, and construction support programs.",
            subtitle_style,
        ),
        Paragraph(
            "These summaries mirror the sectors highlighted across the site and show how GIM Nextgen solutions are "
            "positioned for real-world monitoring challenges.",
            body_style,
        ),
    ]

    story.extend(
        case_study_block(
            "Tunnel convergence monitoring",
            "Excavation teams needed continuous visibility into deformation while advancing through variable ground conditions.",
            "Wireless tilt and displacement instrumentation was paired with a gateway and cloud dashboard for live convergence review.",
            "Engineers received earlier warning of movement trends and validated lining performance throughout excavation stages.",
        )
    )
    story.extend(
        case_study_block(
            "Rail track stability monitoring",
            "A rail corridor required close tracking of settlement and cant to maintain safe operations during nearby works.",
            "Settlement markers, tilt instrumentation, and automated reporting created a clear picture of vertical and lateral movement.",
            "The operator gained faster review cycles and better evidence for maintenance and possession planning.",
        )
    )
    story.extend(
        case_study_block(
            "Dam safety instrumentation",
            "The owner needed a practical way to review pore pressure, seepage indicators, and long-term structural movement.",
            "Piezometers, deformation sensors, and remote dashboards were organized into a single monitoring workflow.",
            "Annual safety reviews were supported by cleaner trend history, alarm management, and easier reporting access.",
        )
    )
    story.append(PageBreak())
    story.extend(
        case_study_block(
            "Construction support during excavation and piling",
            "Contractors required quick feedback to manage risk while sequencing heavy temporary works.",
            "A site-wide mix of displacement, vibration, and environmental sensors was integrated with real-time alerts.",
            "Project teams responded faster to threshold events and maintained a clearer audit trail during critical activities.",
        )
    )
    story.extend(
        [
            Paragraph("Industries served", section_style),
            bullet_list(
                [
                    "Rail and metro infrastructure.",
                    "Tunnels and underground works.",
                    "Dams, reservoirs, and water-retaining assets.",
                    "Buildings, excavation support systems, and major construction sites.",
                ]
            ),
            Paragraph("Delivery approach", section_style),
            bullet_list(
                [
                    "Instrumentation selection based on project risk and site conditions.",
                    "Installation and commissioning support with practical handover guidance.",
                    "Remote data review workflows for owners, consultants, and contractors.",
                    "Scalable support from single-site deployments to larger monitoring portfolios.",
                ]
            ),
        ]
    )
    footer(story)
    document(BROCHURE_DIR / "case-studies.pdf", "Project Case Studies").build(story)


def build_product_brochure(product: ProductBrochure) -> None:
    rich = product.rich_content or {}
    overview = normalize_copy(str(rich.get("overview") or product.short_description))
    highlights = [normalize_copy(item) for item in (rich.get("highlights") or product.feature_bullets)]
    sections = rich.get("sections") or product.key_features
    interface_heading = normalize_copy(str(rich.get("interfaceHeading") or ""))
    interface_bullets = [normalize_copy(item) for item in (rich.get("interfaceBullets") or [])]
    measurement_heading = normalize_copy(str(rich.get("measurementHeading") or "Typical applications"))
    measurements = [normalize_copy(item) for item in (rich.get("measurements") or product.applications)]

    story: list[object] = [
        Paragraph(escape(product.name), title_style),
        Paragraph(f"{escape(product.category_title)} | Product brochure", subtitle_style),
    ]

    image = product_image(product.image_path)
    if image is not None:
        story.extend([image, Spacer(1, 0.18 * inch)])

    story.extend(
        [
            Paragraph(escape(overview), body_style),
            Paragraph("Key benefits", section_style),
            bullet_list(highlights),
        ]
    )

    if interface_bullets:
        story.extend(
            [
                Paragraph(escape(interface_heading or "Supported interfaces"), section_style),
                bullet_list(interface_bullets),
            ]
        )

    if sections:
        story.append(Paragraph("Engineering highlights", section_style))
        for section in sections:
            title = normalize_copy(str(section["title"]))
            description = normalize_copy(str(section["description"]))
            story.append(Paragraph(f"<b>{escape(title)}:</b> {escape(description)}", body_style))

    if measurements:
        story.extend(
            [
                Paragraph(escape(measurement_heading), section_style),
                bullet_list(measurements),
            ]
        )

    if product.specifications:
        story.extend(
            [
                Paragraph("Technical specifications", section_style),
                specifications_table(
                    [(normalize_copy(label), normalize_copy(value)) for label, value in product.specifications]
                ),
            ]
        )

    footer(story)
    document(PRODUCT_BROCHURE_DIR / f"{product.id}.pdf", product.name).build(story)


def build_product_brochures() -> None:
    for product in parse_products():
        build_product_brochure(product)


def main() -> None:
    BROCHURE_DIR.mkdir(parents=True, exist_ok=True)
    PRODUCT_BROCHURE_DIR.mkdir(parents=True, exist_ok=True)
    build_product_catalogue()
    build_monitoring_platform()
    build_case_studies()
    build_product_brochures()
    print(f"Brochures regenerated in {BROCHURE_DIR}")


if __name__ == "__main__":
    main()
