# OVAMO

An evolving retail identity and interactive system prototype for Classic Shop, Croatia.

**Status: design and software demonstration.** Products, prices, stock and operational figures in the preview are illustrative. The preview does not accept orders, payments, customer details or login credentials. It is not a live store.

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

The GitHub Pages project URL is `https://tomislavrupic.github.io/ovamo/` once Pages is enabled for the repository. Publish from the `main` branch root. Relative asset paths support the `/ovamo/` project prefix. `.nojekyll` disables Jekyll processing.

GitHub Pages is intended here only for the project presentation and non-transactional prototype. [GitHub explicitly disallows running ecommerce businesses on Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). Production commerce will use appropriate hosting, a secure backend and the company's selected Croatian POS/ERP/fiscalization integrations. All source can remain in this repository.

## Documentation

- [Initial design](docs/superpowers/specs/2026-10-21-ovamo-preview-design.md)
- [Implementation plan](docs/superpowers/plans/2026-10-21-ovamo-preview.md)
- [Business and systems research](docs/business-research.md)
- [Brand direction](docs/brand-direction.md)
- [Production architecture](docs/production-architecture.md)

## Commercial readiness

OVAMO is a working brand concept, not a cleared trademark. An existing Belgian food business uses the name. Trademark, domain and social-handle checks are required before commercial adoption. Storefront images are generated concept visualizations, not photographs of confirmed company premises. Actual store addresses, opening hours, product records and business contacts must be supplied and approved before launch.

No secrets, customer data or real operational data belong in the public repository. A browser-side screen or password is not access control.
