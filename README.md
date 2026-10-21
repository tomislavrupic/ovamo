# OVAMO

An evolving retail identity and interactive system prototype for Classic Shop, Croatia.

**Status: design and software demonstration.** Manufacturer products are proposed assortment additions, alongside fictional OVAMO product concepts. All prices, case packs, stock and operational figures are illustrative. The preview does not accept orders, payments, customer details or login credentials. It is not a live store.

**Live preview:** [tomislavrupic.github.io/ovamo](https://tomislavrupic.github.io/ovamo/)

**App concepts:** [concepts.html](https://tomislavrupic.github.io/ovamo/concepts.html)

**Workflow:** [receiving → transfers → sales → documents](https://tomislavrupic.github.io/ovamo/#kako-radi)

## What this version includes

- Seven generated concept images: a dense catalogue for 2,000+ articles, warehouse receiving, finance/support, mobile staff workflows, the device ecosystem, shop interior and own-label collection.
- A bilingual landing-page explanation of the connected workflow, with the stock arithmetic visible without opening a dialog.
- Twenty demo products, including twelve premium proposals; search, categories, pagination, local demo baskets and full-pack B2B quantities. The company's actual 2,000+ product records have **not** been imported.
- An isolated interactive stock example: receive 10 × 24 units, dispatch 48, accept 48 in the shop, sell 3. Final physical stock is 237. Repeated event IDs do not repeat the movement.
- Explicitly simulated invoice states and three authored customer-support scenarios. No AI, invoice provider or fiscalization service is connected.
- An Open Graph sharing banner with static metadata on both pages. The image URL is public and absolute; no JavaScript execution is required by sharing crawlers.

The current preview runs in a browser. Installed PWA, desktop and mobile applications, real barcode scanning, authentication, offline synchronization and ERP/POS connections remain implementation proposals.

## Direction

- OVAMO is the selected working consumer brand; Classic Shop remains the parent company identity.
- Warm cream, deep plum, persimmon orange and clear, approachable typography.
- Croatian first, with an English visitor mode.
- One visual system for everyday shops, souvenirs, wholesale and internal operations.

## Development

The preview uses native HTML, CSS and JavaScript modules, without a build-time dependency chain.

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`. Node.js 22 or newer is recommended for the verification commands:

```bash
npm test
npm run check
```

## Preview hosting

GitHub Pages is enabled at `https://tomislavrupic.github.io/ovamo/`, publishing the `main` branch root. Relative app assets support the `/ovamo/` project prefix. Sharing metadata intentionally uses absolute public HTTPS URLs. `.nojekyll` disables Jekyll processing.

GitHub Pages is intended here only for the project presentation and non-transactional prototype. [GitHub explicitly disallows running ecommerce businesses on Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). Production commerce will use appropriate hosting, a secure backend and the company's selected Croatian POS/ERP/fiscalization integrations. All source can remain in this repository.

## Documentation

- [Initial design](docs/superpowers/specs/2026-10-21-ovamo-preview-design.md)
- [Implementation plan](docs/superpowers/plans/2026-10-21-ovamo-preview.md)
- [Business and systems research](docs/business-research.md)
- [Brand direction](docs/brand-direction.md)
- [Production architecture](docs/production-architecture.md)
- [Stock, apps and automation blueprint](docs/stock-and-apps-blueprint.md)
- [Company verification and automation research](docs/company-and-automation-research.md)
- [Premium assortment proposals and manufacturer sources](docs/premium-assortment.md)
- [Sharing image and metadata](docs/social-preview.md)

## Commercial readiness

OVAMO is a working brand concept, not a cleared trademark. An existing Belgian food business uses the name. Trademark, domain and social-handle checks are required before commercial adoption. Storefront images are generated concept visualizations, not photographs of confirmed company premises. Actual store addresses, opening hours, product records and business contacts must be supplied and approved before launch.

No secrets, customer data or real operational data belong in the public repository. A browser-side screen or password is not access control.
