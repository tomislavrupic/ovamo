# OVAMO first preview — design

Date: 21 October 2026

## Intent and authorized scope

Tomislav is developing a complete identity and connected business system for his sister's existing Croatian importer, wholesaler and retailer, Classic Shop. Its assortment includes drinks, snacks, souvenirs and tobacco; its shops operate in Split and Zadar and aim to expand nationally. Tomislav selected the OVAMO visual concept and directed the project to `tomislavrupic/ovamo`, with a GitHub.io preview.

The current milestone is a complete, attractive, interactive design preview and documented production architecture. It must be useful for review with the company while honestly separating proposed experience from active commercial operations.

## Hosting boundary

GitHub Pages provides static hosting and expressly disallows running a live ecommerce business. This deployment is a project demonstration, visibly labelled as such. It collects no customer data, takes no payments, does not send orders, and does not expose private operations. The production backend, commerce hosting and actual business connections remain a subsequent integration phase. The source repository remains the project's home.

## Visual design

- Cream `#FFF5E7`, plum `#342638`, persimmon `#F47850`.
- Heavy, rounded OVAMO wordmark and two offset tile shapes around a circular opening.
- Spacious editorial layout, oversized type, a generated storefront visualization, original simple product illustrations, restrained motion and clear focus indicators.
- Croatian default; complete English mode for the visible interface.
- Responsive desktop/tablet/mobile layout; reduced-motion preferences respected.

## Visitor journeys

1. Home introduces the brand and everyday/gift assortment with strong typography and a store visualization.
2. Shop preview supports category filtering, accent-insensitive search, adding/removing products, quantities and a persistent local demo basket. All prices and products are clearly illustrative; no checkout or personal-data fields.
3. Stores show the two user-confirmed cities. The UI must not fabricate addresses, hours or a real store count. A schematic coastal illustration is explicitly not a precise map.
4. Wholesale preview demonstrates complete packs, partner pricing and a local quote basket without collecting business identities or sending an order.
5. An explicitly public operations demo shows synthetic overview/inventory/AI suggestions. No simulated login, no implied security and no real operational data. Suggested actions are preview-only.
6. Project details explain what works now and what production integration will require.

## Data and behavior

Products and pricing are integer-cent demo records. Every item has a stable identifier, bilingual copy, pack size, illustrative stock, illustration type and category. Cart quantities are individual units. Quantity constraints and malformed local storage must be handled safely. Wholesale quantities are complete packs and prices are labelled per unit. Currency is EUR. Local storage retains only selected demo product IDs/quantities and language, with a clear reset option.

Use native modules and browser APIs; no framework dependency is required for this stage. Avoid root-relative assets to support the GitHub Pages project prefix. No third-party analytics, external font dependency, live model call or embedded map is necessary.

## Verification

Meaningful unit tests cover cent arithmetic, cart normalization, quantity caps, deletion, malformed/unavailable storage, wholesale pack constraints and search. Syntax checks cover all modules. Visual and interaction review covers desktop/mobile, language switching, navigation, dialog dismissal/focus, catalog filtering, basket persistence, wholesale steps and operations demo. Verify remote files and the published URL after deployment.

## Outstanding production decisions

Current POS/ERP/accountant, SKU export, actual store records, VAT/import/excise statuses, payment-provider acceptance, shipping/returns, stock authority and synchronization guarantees, real B2B contracts, authentication/roles, GDPR retention and processor terms, support ownership, and trademark/domain clearance. The existing Belgian Ovamo food business is an observed naming collision requiring assessment.
