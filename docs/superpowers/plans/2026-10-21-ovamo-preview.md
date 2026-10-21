# OVAMO Preview Implementation Plan

> For agentic workers: implement the bounded tasks below and verify their interfaces before publication.

**Goal:** Deliver a polished bilingual OVAMO identity and non-transactional shop/system demonstration in the user's GitHub repository.

**Architecture:** Buildless HTML/CSS/native JavaScript modules. Shared static demo data and tested pure cart functions feed the consumer catalog, wholesale preview and public operations demo. GitHub Pages hosts the preview; production services are documented separately.

**Tech Stack:** HTML5, CSS, browser ES modules, Node.js built-in tests, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-21-ovamo-preview-design.md`

## Global constraints

- The deployed site is visibly a design demonstration; no live transactions or personal-data submission.
- Only synthetic product, price, inventory and operational data.
- No fabricated street addresses, opening hours or testimonials.
- All prices use integer euro cents; wholesale quantities use complete packs.
- Croatian default and an English interface.
- Relative paths, no private credentials, no third-party tracking.
- Respect reduced motion, responsive layouts and keyboard controls.

## Review focus

1. Malformed or unavailable browser storage must not prevent use.
2. Cart quantities must not exceed stock or become fractional/negative.
3. Wholesale rounding must remain explicit and totals correct.
4. The public operations preview must not resemble a protected live admin account.
5. Mobile navigation/dialogs must remain reachable and dismissible.

## Tasks

- [x] **1. Domain data and behavior:** create `src/data.js`, `src/store.js` and meaningful tests in `tests/store.test.js`. Observe failure before implementation, then pass the suite.
- [x] **2. Identity and imagery:** create logo/favicon SVG assets, optimized storefront visualization and `docs/brand-direction.md`. Keep the selected OVAMO palette and concept provenance.
- [x] **3. Website and interactions:** create `index.html`, `styles/main.css`, `src/app.js` and `src/illustrations.js`. Add home, shop, location, wholesale and project journeys, bilingual copy and accessible dialogs. Consume shared data/cart interfaces.
- [x] **4. Systems documentation:** preserve researched business requirements and primary sources in `docs/business-research.md` and document production service boundaries in `docs/production-architecture.md`.
- [ ] **5. Validate and publish:** run unit/syntax checks, review visual/interaction behavior, fix observed material issues, publish all source and assets to `tomislavrupic/ovamo`, configure Pages, verify the remote result.

## Decisions

- User has selected the visual direction and explicitly requested the repository/Pages implementation. Continue the authorized preview without another design-permission loop.
- Git transport is unavailable in the execution environment; the connected GitHub API will publish reviewed files. The repository was observed empty with write permission.
- GitHub's commerce hosting restriction changes the Pages milestone into an interactive project demonstration. Real commerce/backend deployment remains separate.
