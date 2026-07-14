# Brochures Directory

This folder stores the brochure PDFs used by the downloads page:

1. **gim-product-catalogue.pdf** - Product portfolio, capabilities, services, and industries
2. **monitoring-platform.pdf** - Monitoring stack, workflow, alerts, and delivery model
3. **case-studies.pdf** - Representative tunnel, rail, dam, and construction use cases
4. **products/\<product-id>.pdf** - Product-specific brochures with the cleaned product image and structured product content

## Refreshing the brochures

Run `python3 create_pdfs.py` from the project root to regenerate both the shared brochures and the per-product brochure files from the current site content.
