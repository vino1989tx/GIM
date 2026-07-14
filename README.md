# GIM Nextgen - Corporate Website Concept

This workspace contains an Angular-based UI/UX concept for **GIM Nextgen – Geotechnical Instrument Makers**.

## Structure

- `src/app/pages/` – Page-level standalone components (Home, About, Solutions, Products, etc.)
- `src/app/shared/components/` – Shared layout components (header, footer)
- `src/app/data/` – Static dummy data for products and categories
- `src/app/models/` – Type definitions for product and category data

## Running locally

Install dependencies:

```bash
npm install
```

Serve the app:

```bash
npm start
```

Then open http://localhost:4200

## Notes

- The app is intentionally brochure-focused, not an ecommerce platform.
- Product data is stored in `src/app/data/mock-products.ts`.
- Routing is defined in `src/app/app.routes.ts`.
- Styles are in SCSS and follow an industrial/technical theme.
