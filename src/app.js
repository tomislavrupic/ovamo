import { products, categories, stores, demoNotice } from './data.js?v=20261021-2';
import { addToCart, setQuantity, cartSummary, filterProducts, loadCart, saveCart, formatMoney } from './store.js?v=20261021-2';
import { productIllustration } from './illustrations.js?v=20261021-2';
import { createStockDemo, applyStockEvent } from './stock-demo.js?v=20261021-2';
import { stockSteps, renderStockPanel, renderSupportPanel } from './stock-ui.js?v=20261021-2';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const repository = 'https://github.com/tomislavrupic/ovamo';
let storage;
try { storage = window.localStorage; } catch { /* The demo also works with storage disabled. */ }
let language = 'hr';
try { if (storage?.getItem('ovamo-language') === 'en') language = 'en'; } catch { /* Use Croatian. */ }
let cart = loadCart(storage);
let wholesaleCart = [];
let category = 'all';
let searchQuery = '';
let catalogPage = 0;
const cataloguePageSize = 12;
let activeCity = 'split';
let activeOps = 'overview';
let activeQuestion = 'stock';
let stockState = createStockDemo();
let supportQuestion = 'order';
let quoteVisible = false;
let toastTimer;
const dialogTriggers = new WeakMap();
const copy = (hr, en) => language === 'hr' ? hr : en;
const money = (cents) => formatMoney(cents, language);
const nameOf = (product) => escapeHTML(product.name[language]);
const productById = new Map(products.map((product) => [product.id, product]));

// Croatian source copy lives in index.html, keeping the first paint readable without JS.
// Only trusted, authored strings (including intentional <br> tags) become HTML here.
const english = {
  skip: 'Skip to content',
  previewBar: 'OVAMO — a retail concept. Retail purchases are not available yet.',
  aboutPreview: 'About the project',
  navShop: 'Explore the collection',
  navStores: 'Our places',
  navPartners: 'For partners',
  navConcepts: 'Apps',
  navWorkflow: 'How it works',
  heroEyebrow: 'YOUR LITTLE HAPPY PLACE',
  heroTitle1: 'Little things.',
  heroTitle2: 'Better days.',
  heroDescription: 'A little treat for your break. Something refreshing for the road. A memory to take home. Find it all in one little place — ovamo.',
  explore: 'Take a little look',
  findUs: 'Find our places',
  brandGuideDownload: 'Download visual identity (PDF)',
  heroFootnote: 'From the coast, for your everyday.',
  sticker: 'Hello.<br>Come in.',
  imageCaption: 'Store concept visualisation',
  ribbonDrinks: 'A little refreshment.',
  ribbonSnacks: 'A little treat.',
  ribbonSouvenirs: 'A little memory.',
  ribbonGifts: 'For someone special.',
  catalogEyebrow: 'LITTLE FINDS. LOTS OF JOY.',
  catalogTitle: 'For your everyday plans.',
  catalogAside: 'A walk by the sea, a break at work<br>or a gift for no particular reason.',
  catalogDemo: '20 DEMO ITEMS · Premium assortment proposals and OVAMO concepts. Prices, case packs and stock are fictional. The real 2,000+ item catalogue has not been imported.',
  catalogBottom: 'Good days start with little things.',
  storyEyebrow: 'ROOTED HERE. OPEN TO EVERYONE.',
  storyTitle: 'It feels good<br>to have your own place.',
  storyBody: 'A familiar smile. Your favourite little thing. Something new that catches your eye. We imagine OVAMO as part of your day — easy, cheerful and always close by.',
  storyLink: 'Discover where our story begins',
  identityOfferEyebrow: 'OVAMO / VISUAL IDENTITY',
  identityOfferTitle: 'A visual identity<br>for your stores.',
  identityOfferIntro: 'A logo, colours and guidelines that connect your stores, packaging and digital channels. A complete package prepared for Classic Shop d.o.o.',
  identityScopeLogo: 'Logo and its variations',
  identityScopePalette: 'Colour palette and typography',
  identityScopeGuide: '18-page brand guidelines',
  identityScopeTemplates: 'Icons and editable templates',
  identityScopeFiles: 'SVG vectors and PNG files',
  identityScopeRefinement: 'One final refinement round',
  identityGuideNote: '18 pages · in Croatian',
  identityOfferFor: 'OFFER FOR CLASSIC SHOP D.O.O.',
  identityOfferPrice: '€2,000',
  identityOfferOnce: 'One-time payment · complete identity package',
  identityOfferPay: 'Pay with Stripe',
  identityCheckoutNote: 'Opens the Stripe payment page in a new tab.',
  identityOfferHandover: 'We deliver the final package directly after payment is confirmed and the agreed final refinements are completed.',
  storesEyebrow: 'OUR STORY STARTS ON THE COAST.',
  storesTitle: 'See you around town.',
  storesAside: 'Split and Zadar.<br>Our story is just beginning.',
  mapLabel: 'LITTLE PLACES. HAPPY MEETINGS.',
  mapNote: 'Regional illustration, not a navigation map.',
  locationNotice: 'Confirmed addresses, opening hours and the collection at each shop will appear here. These details are awaiting company confirmation.',
  partnerEyebrow: 'FOR PEOPLE WHO MAKE GOOD DAYS.',
  partnerTitle: 'A good partner.<br>Every day.',
  partnerBody: 'For shops, souvenir stores and hosts. We imagine simpler wholesale: a clear collection, the packs you need and easy repeat ordering.',
  partnerButton: 'Try the B2B concept',
  partnerNote: 'A demonstration. No registration or order submission.',
  previewPack: 'Your pack sizes',
  previewStock: 'Stock overview',
  previewAvailable: 'Everything in one place',
  previewRepeat: 'Repeat your selection',
  opsEyebrow: 'THE IDEA BEHIND THE SHOP',
  opsTitle: 'A connected business. A clearer view.',
  opsDescription: 'Try receiving, transferring and selling stock, plus invoice and customer-support simulations.',
  opsButton: 'Open the system demo',
  conceptEyebrow: 'OVAMO ON EVERY SCREEN',
  conceptTitle: '2,000+ articles.<br>A clear next step.',
  conceptBody: 'Concepts for the office, warehouse and shop floor. Fast search, scanning, locations and tasks that need your decision.',
  conceptButton: 'Explore the app concepts',
  conceptNote: 'Visual concepts · illustrative data · applications are planned',
  workflowEyebrow: 'HOW THE CONNECTED SYSTEM WOULD WORK',
  workflowTitle: 'From delivery<br>to a completed sale.',
  workflowIntro: 'One product catalogue for 2,000+ articles. Every receipt, transfer and sale connects to the same stock records, with a clear task for each person.',
  workflow1Title: 'Receive and scan',
  workflow1Body: 'Open the supplier delivery, scan the barcode and confirm the cartons, units and actual quantity. Record lots, expiry dates and any shortages.',
  workflow1Role: 'Warehouse · mobile or scanner',
  workflow2Title: 'Transfer and accept',
  workflow2Body: 'Choose the destination shop and dispatch the goods. Stock stays “in transit” until the receiving shop confirms its actual delivery.',
  workflow2Role: 'Warehouse → shop · both confirm',
  workflow3Title: 'Sell or fulfil',
  workflow3Body: 'A completed POS sale deducts units from that shop. Web and B2B orders reserve stock first; dispatch or collection records the physical exit.',
  workflow3Role: 'POS · webshop · wholesale',
  workflow4Title: 'Invoice and reconcile',
  workflow4Body: 'The agreed business event starts invoicing through the connected ERP/provider. Track the document, fiscal acknowledgement and payment separately.',
  workflow4Role: 'Finance · automated queue + review',
  workflowExampleTitle: 'The same 240 units, from start to finish.',
  workflowExampleBody: 'Illustrative example: 10 cartons × 24 units. Transfers change the location; selling 3 units leaves 237 in the business.',
  workflowColEvent: 'Confirmed event',
  workflowColWarehouse: 'Warehouse',
  workflowColTransit: 'In transit',
  workflowColShop: 'Shop',
  workflowColTotal: 'Physical total',
  workflowRow1: 'Receive 10 × 24',
  workflowRow2: 'Dispatch 48',
  workflowRow3: 'Shop accepts 48',
  workflowRow4: 'POS sells 3',
  workflowRule: 'A repeated message must not deduct stock twice. An invoice retry must not create a second sale.',
  workflowAiTag: 'AI ASSISTS',
  workflowAiTitle: 'Less routine work. Clear exceptions.',
  workflowAiBody: 'AI can prepare document entries, flag unusual stock and draft customer replies from verified information. People confirm receipt quantities, corrections and refunds.',
  workflowDeviceTag: 'ONE SYSTEM, DIFFERENT SCREENS',
  workflowDeviceTitle: 'The office sees the whole picture.',
  workflowDeviceBody: 'Desktop: a searchable catalogue, bulk updates and location stock. Mobile: scan, receive, transfer and count. Managers see shortages, pending tasks and integration failures.',
  workflowTry: 'Try the stock workflow',
  workflowStatus: 'Available here: an interactive stock simulation. Planned: live scanning, ERP/POS connections, invoicing and AI support.',
  footerMessage: 'Whenever you need a little something.',
  footerCredit: 'Brand concept for Classic Shop · 2026.',
  resetDemo: 'Reset the demo',
  footerDisclaimer: 'The catalogue, inventory and apps use sample data. The demo catalogue does not accept orders. The visual identity is purchased separately through Stripe.',
  cartTitle: 'Your little collection.',
  wholesaleTitle: 'Your next top-up.',
  wholesaleDescription: 'Try choosing full packs and reviewing a sample quotation. Prices are illustrative, not a commercial offer. Nothing is submitted.',
  operationsHeading: 'overview',
  publicDemo: 'PUBLIC DEMO · SAMPLE DATA',
  projectTitle: 'An idea taking shape.',
};
const translatedElements = $$('[data-i18n]').map((element) => ({ element, key: element.dataset.i18n, hr: element.innerHTML }));

function translatePage() {
  document.documentElement.lang = language;
  document.title = copy('ovamo — Male stvari. Dobar dan.', 'ovamo — Little things. Better days.');
  translatedElements.forEach(({ element, key, hr }) => { element.innerHTML = language === 'en' ? english[key] ?? hr : hr; });
  $('#language-current').textContent = language.toUpperCase();
  $('#language-next').textContent = language === 'hr' ? 'EN' : 'HR';
  $('#language-toggle').setAttribute('aria-label', copy('Switch to English', 'Prebaci na hrvatski'));
  $('.brand').setAttribute('aria-label', copy('ovamo — naslovnica', 'ovamo — home'));
  $('#primary-nav').setAttribute('aria-label', copy('Glavna navigacija', 'Main navigation'));
  $('#category-filters').setAttribute('aria-label', copy('Kategorije proizvoda', 'Product categories'));
  $('#catalog-pagination').setAttribute('aria-label', copy('Stranice demo kataloga', 'Demo catalogue pages'));
  $('#product-search').placeholder = copy('Što tražiš?', 'What are you looking for?');
  $('#product-search').setAttribute('aria-label', copy('Pretraži demo proizvode', 'Search demo products'));
  $('.coastal-map').setAttribute('aria-label', copy('Shematski prikaz Splita i Zadra', 'Illustrative map of Split and Zadar'));
  $('.city-tabs').setAttribute('aria-label', copy('Gradovi', 'Cities'));
  $('.store-photo').alt = copy('Koncept OVAMO trgovine u toplom kamenom ambijentu', 'OVAMO store concept on a warm limestone street');
  $('.back-top').setAttribute('aria-label', copy('Na vrh', 'Back to top'));
  $('#ops-nav').setAttribute('aria-label', copy('Demo sustava', 'System demo'));
  $$('[data-close]').forEach((button) => button.setAttribute('aria-label', copy('Zatvori', 'Close')));
  updateMenuLabel();
  renderFilters();
  renderProducts();
  renderCity();
  renderCart();
  renderWholesale();
  renderOperations();
  renderProject();
}

function renderFilters() {
  $('#category-filters').innerHTML = categories.map((item) => `<button type="button" class="filter-chip ${item.id === category ? 'active' : ''}" data-filter="${item.id}" aria-pressed="${item.id === category}">${escapeHTML(item.name[language])}</button>`).join('');
}

function renderProducts() {
  const matches = filterProducts(products, { category, query: searchQuery });
  const pageCount = Math.ceil(matches.length / cataloguePageSize);
  catalogPage = Math.min(catalogPage, Math.max(0, pageCount - 1));
  const visible = matches.slice(catalogPage * cataloguePageSize, (catalogPage + 1) * cataloguePageSize);
  $('#product-grid').innerHTML = matches.length ? visible.map((product) => {
    const categoryName = categories.find((item) => item.id === product.category).name[language];
    return `<article class="product-card">
      <div class="product-visual" style="--product-bg:${product.color}45">
        <span class="product-badge">${escapeHTML(product.badge[language])}</span>
        ${productIllustration(product)}
        <button type="button" class="add-button" data-add="${product.id}" aria-label="${copy('Dodaj u demo košaricu', 'Add to demo basket')}: ${nameOf(product)}">${icon('plus')}</button>
      </div>
      <div class="product-info"><div><h3>${nameOf(product)}</h3><p>${escapeHTML(categoryName)}</p></div><span class="product-price"><small>DEMO</small>${money(product.priceCents)}</span></div>
      <p class="product-provenance">${product.provenance === 'manufacturer' ? `${copy('Ilustracija kategorije', 'Category illustration')} · <a href="${escapeHTML(product.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${copy('Proizvođač i izvor', 'Manufacturer and source')}: ${nameOf(product)}">${copy('Proizvođač', 'Manufacturer')} ↗</a>` : copy('OVAMO · koncept proizvoda', 'OVAMO · product concept')}</p>
    </article>`;
  }).join('') : `<div class="empty-state"><p>${copy('Za ovaj izbor još nema sitnica. Pokušaj s drugim pojmom.', 'No little finds for this selection. Try another search.')}</p><button type="button" class="button button-outline" data-action="clear-filters">${copy('Prikaži sve proizvode', 'Show all products')}</button></div>`;
  $('#catalog-pagination').innerHTML = matches.length ? `<span class="catalog-page-status">${catalogPage * cataloguePageSize + 1}–${Math.min((catalogPage + 1) * cataloguePageSize, matches.length)} / ${matches.length} ${copy('demo artikala', 'demo items')}</span>${pageCount > 1 ? `<div><button type="button" data-catalog-page="${catalogPage - 1}" ${catalogPage === 0 ? 'disabled' : ''}>← ${copy('Prethodna', 'Previous')}</button><span>${catalogPage + 1} / ${pageCount}</span><button type="button" data-catalog-page="${catalogPage + 1}" ${catalogPage === pageCount - 1 ? 'disabled' : ''}>${copy('Sljedeća', 'Next')} →</button></div>` : ''}` : '';
}

function renderCity() {
  const store = stores.find((item) => item.id === activeCity);
  $('#city-detail').setAttribute('aria-labelledby', `city-tab-${activeCity}`);
  $$('[data-city]').forEach((button) => {
    const selected = button.dataset.city === activeCity;
    button.classList.toggle('active', selected);
    if (button.getAttribute('role') === 'tab') {
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    } else button.setAttribute('aria-pressed', String(selected));
  });
  $('#city-detail').innerHTML = `<p class="city-kicker">${copy('POGLAVLJE NAŠE PRIČE', 'A CHAPTER IN OUR STORY')}</p><h3 class="city-title">${escapeHTML(store.city)}<span class="accent">.</span></h3><p class="city-copy">${activeCity === 'split'
    ? copy('Za jutra u pokretu, male pauze i đir po gradu. Ovdje zamišljamo tvoj svakodnevni OVAMO.', 'For mornings on the move, little breaks and a stroll around town. Here is where we imagine your everyday OVAMO.')
    : copy('Za šetnju uz more i male stvari koje dan čine ljepšim. Drugo poglavlje iste, vedre priče.', 'For a walk by the sea and the little things that brighten a day. Another chapter of the same cheerful story.')}</p>`;
}

function quantityControl(id, quantity, scope, disabled = false) {
  const label = nameOf(productById.get(id));
  return `<div class="quantity-control"><button type="button" data-${scope}-change="${id}" data-step="-1" aria-label="${copy('Smanji količinu', 'Decrease quantity')}: ${label}" ${quantity === 0 ? 'disabled' : ''}>${icon('minus')}</button><output aria-label="${copy('Količina', 'Quantity')}: ${label}">${quantity}</output><button type="button" data-${scope}-change="${id}" data-step="1" aria-label="${copy('Povećaj količinu', 'Increase quantity')}: ${label}" ${disabled ? 'disabled' : ''}>${icon('plus')}</button></div>`;
}

function renderCart() {
  const summary = cartSummary(cart);
  $('#cart-count').textContent = summary.count;
  $('[data-action="cart"]').setAttribute('aria-label', `${copy('Otvori demo košaricu', 'Open demo basket')} (${summary.count})`);
  if (!summary.lines.length) {
    $('#cart-content').innerHTML = `<div class="cart-empty">${icon('bag')}<h3>${copy('Ima mjesta za nešto dobro.', 'Room for something lovely.')}</h3><p>${copy('Odaberi sitnicu iz demo kataloga i isprobaj košaricu.', 'Choose a little something from the demo collection to try the basket.')}</p><button type="button" class="button button-plum" data-action="browse">${copy('Zaviri u ponudu', 'Explore the collection')}${icon('arrow')}</button></div><p class="notice-box">${escapeHTML(demoNotice[language])}</p>`;
    return;
  }
  $('#cart-content').innerHTML = summary.lines.map(({ product, quantity, lineTotalCents }) => `<div class="cart-item">
    <div class="cart-item-art" style="background:${product.color}45">${productIllustration(product)}</div>
    <div><h3>${nameOf(product)}</h3>${quantityControl(product.id, quantity, 'cart', quantity >= Math.min(product.stock, 99))}<button type="button" class="remove-item" data-remove="${product.id}" aria-label="${copy('Ukloni', 'Remove')}: ${nameOf(product)}">${copy('Ukloni', 'Remove')}</button></div>
    <span class="cart-item-price">${money(lineTotalCents)}</span>
  </div>`).join('') + `<div class="cart-total"><span>${copy('Demo zbroj', 'Demo total')}</span><strong>${money(summary.totalCents)}</strong></div><div class="notice-box">${copy('Ovo je demonstracija košarice. Nema naplate, poreznog obračuna, dostave ni slanja narudžbe. Tvoj izbor čuva se samo u ovom pregledniku.', 'This is a basket demonstration. There is no payment, tax calculation, delivery or order submission. Your selection is stored only in this browser.')}</div><button type="button" class="button button-plum full-button" data-close="cart-dialog">${copy('Nastavi istraživati', 'Keep exploring')}${icon('arrow')}</button>`;
}

function renderWholesale() {
  const summary = cartSummary(wholesaleCart, products, 'wholesale');
  wholesaleCart = summary.lines.map(({ product, quantity }) => ({ id: product.id, quantity }));
  const packs = summary.lines.reduce((sum, line) => sum + line.packCount, 0);
  $('#wholesale-content').innerHTML = `<div class="table-scroll"><table class="wholesale-table"><thead><tr><th>${copy('Proizvod / pakiranje', 'Product / pack')}</th><th>${copy('Demo cijena / kom', 'Demo price / unit')}</th><th>${copy('Broj pakiranja', 'Packs')}</th><th>${copy('Demo zbroj', 'Demo total')}</th></tr></thead><tbody>${products.map((product) => {
    const line = summary.lines.find((item) => item.product.id === product.id);
    const packCount = line?.packCount ?? 0;
    return `<tr><td>${nameOf(product)}<small>${product.packSize} ${copy('kom u pakiranju', 'units per pack')}</small></td><td>${money(product.wholesalePriceCents)}</td><td>${quantityControl(product.id, packCount, 'pack', (packCount + 1) * product.packSize > Math.min(product.stock, 99))}</td><td>${money(line?.lineTotalCents ?? 0)}</td></tr>`;
  }).join('')}</tbody></table></div><div class="wholesale-summary"><div>${packs} ${copy('pakiranja', 'packs')} · ${summary.count} ${copy('komada', 'units')}<strong>${money(summary.totalCents)}</strong></div><button type="button" class="button button-plum" data-action="quote" ${packs ? '' : 'disabled'}>${copy('Prikaži demo sažetak', 'View demo summary')}${icon('arrow')}</button></div><p class="ops-footnote">${copy('Ogledne jedinične cijene, bez poreznog obračuna. Količina se mijenja po punom pakiranju. Ograničenje demonstracije: najviše 99 komada po proizvodu, zaokruženo na puna pakiranja.', 'Illustrative unit prices, with no tax calculation. Quantities change by full packs. Demo limit: up to 99 units per product, rounded down to complete packs.')}</p>${quoteVisible && packs ? `<div class="quote-result" role="status"><strong>${copy('Tvoj demo izbor je spreman za pregled.', 'Your demo selection is ready to review.')}</strong><br>${summary.lines.map(({ product, packCount, quantity }) => `${nameOf(product)}: ${packCount} × ${product.packSize} = ${quantity} ${copy('kom', 'units')}`).join('<br>')}<br><strong>${copy('Ništa nije poslano. U stvarnom sustavu slijedili bi potvrda partnera, uvjeti i provjera raspoloživosti.', 'Nothing has been submitted. A production system would next validate the partner, terms and available stock.')}</strong></div>` : ''}`;
}

const opsTabs = [
  { id: 'overview', icon: 'grid', hr: 'Pregled', en: 'Overview' },
  { id: 'inventory', icon: 'box', hr: 'Zalihe', en: 'Inventory' },
  { id: 'movements', icon: 'arrow', hr: 'Ulaz / izlaz', en: 'Stock flow' },
  { id: 'support', icon: 'bag', hr: 'Podrška', en: 'Support' },
  { id: 'ai', icon: 'spark', hr: 'AI asistent', en: 'AI assistant' },
  { id: 'roadmap', icon: 'arrow', hr: 'Sljedeći koraci', en: 'Next steps' },
];
const lowStock = () => products.filter((product) => product.stock < product.packSize * 8);

function renderOperations() {
  $('#ops-nav').innerHTML = opsTabs.map((tab) => `<button type="button" data-ops="${tab.id}" class="${activeOps === tab.id ? 'active' : ''}" ${activeOps === tab.id ? 'aria-current="page"' : ''}>${icon(tab.icon)}${tab[language]}</button>`).join('') + `<p class="ops-nav-note">${copy('Javni koncept sustava.<br>Svi poslovni brojevi su izmišljeni. Nema pristupa stvarnom poslovanju.', 'Public system concept.<br>All business numbers are fictional. There is no access to real operations.')}</p>`;
  const content = $('#ops-content');
  if (activeOps === 'overview') {
    const stock = products.reduce((sum, product) => sum + product.stock, 0);
    const chart = [38, 52, 43, 65, 59, 87, 72];
    const days = copy(['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    content.innerHTML = `<h3>${copy('Sve na jednom mjestu.', 'Everything in one place.')}</h3><p class="ops-subtitle">${copy('OGLEDNI PODACI · Primjer zajedničkog pregleda poslovanja. Ovo nisu podaci Classic Shopa.', 'SAMPLE DATA · A shared business overview concept. This is not Classic Shop business data.')}</p><div class="metric-grid"><div class="metric-card"><span>${copy('Proizvodi u demu', 'Demo products')}</span><strong>${products.length}</strong><small>${copy('4 kategorije', '4 categories')}</small></div><div class="metric-card"><span>${copy('Ogledna zaliha', 'Sample inventory')}</span><strong>${stock}</strong><small>${copy('komada, zbirni demo', 'units, combined demo')}</small></div><div class="metric-card"><span>${copy('Provjeri zalihu', 'Review stock')}</span><strong>${lowStock().length}</strong><small>${copy('ispod 8 punih pakiranja', 'below 8 full packs')}</small></div></div><div class="ops-chart"><div class="chart-title"><strong>${copy('Primjer tjednog prometa', 'Example weekly sales')}</strong><span>${copy('broj artikala · izmišljeno', 'units · fictional')}</span></div><div class="chart-bars" role="img" aria-label="${copy('Izmišljeni dnevni broj prodanih artikala', 'Fictional daily units sold')}: ${chart.map((value, index) => `${days[index]} ${value}`).join(', ')}">${chart.map((value, index) => `<div class="chart-column"><span class="${index === 5 ? 'accent-bar' : ''}" style="height:${value}%" title="${value}"></span><small>${days[index]}</small></div>`).join('')}</div></div><p class="ops-footnote">${copy('Zalihe dolaze iz oglednog kataloga. Graf je zaseban izmišljeni primjer. Pravi pregled povezivat će poslovnice, skladište i postojeći ERP/POS.', 'Inventory comes from the sample catalogue. The chart is a separate fictional example. A production overview would connect stores, warehouse and the existing ERP/POS.')}</p>`;
  } else if (activeOps === 'inventory') {
    content.innerHTML = `<h3>${copy('Pravi podatak. Pravo vrijeme.', 'The right information, on time.')}</h3><p class="ops-subtitle">${copy('OGLEDNA ZALIHA · Komadi i pakiranja prikazani su odvojeno. Prag za provjeru: manje od 8 punih pakiranja.', 'SAMPLE INVENTORY · Units and packs are shown separately. Review threshold: fewer than 8 full packs.')}</p><div class="table-scroll"><table class="inventory-table"><thead><tr><th>${copy('Proizvod', 'Product')}</th><th>${copy('Komadi', 'Units')}</th><th>${copy('Kom / pak', 'Units / pack')}</th><th>${copy('Puna pakiranja', 'Full packs')}</th><th>${copy('Status', 'Status')}</th></tr></thead><tbody>${products.map((product) => `<tr><td>${nameOf(product)}</td><td>${product.stock}</td><td>${product.packSize}</td><td>${Math.floor(product.stock / product.packSize)}</td><td><span class="stock-status ${product.stock < product.packSize * 8 ? 'low' : ''}">${product.stock < product.packSize * 8 ? copy('Provjeri', 'Review') : copy('U redu', 'OK')}</span></td></tr>`).join('')}</tbody></table></div><p class="ops-footnote">${copy('Demo košarica ne rezervira stvarnu zalihu. U pravom sustavu stanje, rezervacije, LOT i rokovi moraju dolaziti iz provjerenog izvora.', 'The demo basket does not reserve real inventory. In production, stock, reservations, lots and expiry dates must come from a verified source.')}</p>`;
  } else if (activeOps === 'movements') {
    content.innerHTML = renderStockPanel(language, stockState);
  } else if (activeOps === 'support') {
    content.innerHTML = renderSupportPanel(language, supportQuestion);
  } else if (activeOps === 'ai') {
    content.innerHTML = `<h3>${copy('Manje traženja. Više uvida.', 'Less searching. More insight.')}</h3><p class="ops-subtitle">${copy('SIMULACIJA · Primjeri odgovora po unaprijed zadanim pravilima. AI model nije povezan.', 'SIMULATION · Rule-based response examples. No AI model is connected.')}</p><div class="ai-question-grid">${[
      ['stock', 'Što treba provjeriti?', 'What needs a review?'],
      ['mix', 'Kako izgleda asortiman?', 'What is in the collection?'],
      ['next', 'Što prvo automatizirati?', 'What should we automate first?'],
    ].map(([id, hr, en]) => `<button type="button" data-question="${id}" class="${activeQuestion === id ? 'active' : ''}" aria-pressed="${activeQuestion === id}">${copy(hr, en)}</button>`).join('')}</div><div class="ai-result">${aiResponse()}</div>`;
  } else {
    content.innerHTML = `<h3>${copy('Od ideje do poslovanja.', 'From idea to everyday business.')}</h3><p class="ops-subtitle">${copy('Plan razvoja. Samo prvi korak je dio ovog demonstracijskog izdanja.', 'Development roadmap. Only the first stage is part of this demo release.')}</p>${[
      [copy('01', '01'), copy('Sada · identitet i interaktivni koncept', 'Now · identity and interactive concept'), copy('OVAMO izgled, HR/EN stranica, ogledni katalog, košarica i B2B pakiranja.', 'OVAMO identity, HR/EN website, sample collection, basket and B2B packs.')],
      ['02', copy('Temelj · proizvodi i stvarni podaci', 'Foundation · products and real data'), copy('Potvrditi postojeći ERP/POS, poslovnice, artikle, mjerne jedinice, poreze i pravila prodaje.', 'Confirm the existing ERP/POS, stores, products, units, taxes and channel permissions.')],
      ['03', copy('Pokretanje · sigurno povezani kanali', 'Launch · securely connected channels'), copy('Poslužiteljski sustav, odobreni proizvodi za web, partneri, zalihe, računi i plaćanje na prikladnom hostingu.', 'Server backend, approved online products, partner access, inventory, invoices and payments on suitable hosting.')],
      ['04', copy('Automatizacija · AI uz nadzor', 'Automation · AI with oversight'), copy('Sažeci i prijedlozi iz provjerenih podataka. Ljudi odobravaju nabavu, cijene i druge važne promjene.', 'Summaries and suggestions from verified data. People approve purchasing, pricing and other material changes.')],
    ].map(([number, title, body]) => `<div class="roadmap-item"><span class="roadmap-number">${number}</span><div><h4>${title}</h4><p>${body}</p></div></div>`).join('')}`;
  }
}

function aiResponse() {
  let answer;
  if (activeQuestion === 'stock') {
    answer = `<h4>${copy('Artikli za pregled zaliha.', 'Items for a stock review.')}</h4><p>${copy('Prema demo pravilu, pregledaj artikle s manje od 8 punih pakiranja:', 'Under the demo rule, review items with fewer than 8 complete packs:')}</p><ul>${lowStock().map((product) => `<li><strong>${nameOf(product)}</strong> — ${product.stock} ${copy('komada', 'units')}, ${Math.floor(product.stock / product.packSize)} ${copy('punih pakiranja', 'full packs')}.</li>`).join('')}</ul><p>${copy('Prije prijedloga nabave trebaju nam prodaja kroz vrijeme, rok dobave i već naručene količine. Ova simulacija ništa ne naručuje.', 'Before suggesting a purchase, we need sales history, lead times and quantities already on order. This simulation places no orders.')}</p>`;
  } else if (activeQuestion === 'mix') {
    answer = `<h4>${copy('Mali pregled asortimana.', 'A little collection overview.')}</h4><ul>${categories.filter((item) => item.id !== 'all').map((item) => `<li><strong>${escapeHTML(item.name[language])}</strong>: ${products.filter((product) => product.category === item.id).length} ${copy('oglednih artikala', 'sample products')}.</li>`).join('')}</ul><p>${copy('Ovo opisuje strukturu demo kataloga. Bez stvarnih podataka o prodaji i nabavnim troškovima ne možemo zaključiti što je najprodavanije ili najprofitabilnije.', 'This describes the demo catalogue structure. Without actual sales and purchasing costs, we cannot identify bestsellers or the most profitable products.')}</p>`;
  } else {
    answer = `<h4>${copy('Krenimo od pouzdanih podataka.', 'Start with reliable data.')}</h4><ul><li>${copy('Jedan šifrarnik proizvoda s barkodom i odnosom komad–pakiranje.', 'One product catalogue with barcodes and unit-to-pack conversions.')}</li><li>${copy('Dnevni pregled zaliha i iznimaka po poslovnici.', 'A daily view of stock and exceptions at each store.')}</li><li>${copy('Nacrt prijevoda i opisa proizvoda uz provjeru odgovorne osobe.', 'Draft product translations and descriptions for a responsible person to review.')}</li></ul><p>${copy('Narudžbe dobavljačima, promjene cijena i porezni podaci ostaju uz ljudsku potvrdu.', 'Supplier orders, price changes and tax data require human approval.')}</p>`;
  }
  return `${answer}<div class="ai-source">${copy('Izvor: lokalni ogledni katalog i unaprijed napisana pravila. Bez pristupa poslovnim podacima i bez vanjskog AI poziva.', 'Source: the local sample catalogue and authored rules. No access to business data and no external AI request.')}</div>`;
}

function renderProject() {
  $('#project-content').innerHTML = `<div class="project-copy"><p>${copy('<strong>OVAMO</strong> je odabrani smjer za naziv trgovina tvrtke <strong>Classic Shop</strong>. Ovaj prvi koncept spaja vizualni identitet i način na koji bi povezano poslovanje moglo izgledati.', '<strong>OVAMO</strong> is the selected store-brand direction for <strong>Classic Shop</strong>. This first concept brings together the visual identity and a view of how the connected business could work.')}</p><div class="project-chips"><span>HR / EN</span><span>${copy('Demo katalog', 'Demo collection')}</span><span>${copy('B2B pakiranja', 'B2B packs')}</span><span>${copy('Pregled sustava', 'System overview')}</span></div><h3>${copy('Što možeš isprobati?', 'What can you try?')}</h3><p>${copy('Pretraži 20 oglednih artikala, složi demo košaricu, isprobaj B2B pakiranja i prijam–prijenos–prodaju robe. Galerija prikazuje koncepte aplikacija za stvarni katalog od 2.000+ artikala.', 'Search 20 sample items, build a demo basket, try B2B packs and receive–transfer–sell stock. The gallery shows app concepts for the actual 2,000+ article catalogue.')}</p><h3>${copy('Što slijedi?', 'What comes next?')}</h3><p>${copy('Potvrda imena i prava na brend, stvarni artikli i poslovnice, izbor integracije s postojećim ERP/POS sustavom te razvoj sigurnog poslužiteljskog sustava. GitHub Pages služi za ovaj dizajnerski prototip; komercijalnu trgovinu treba objaviti na prikladnom hostingu.', 'Confirm the name and brand rights, real products and stores, choose an integration with the existing ERP/POS and develop a secure server backend. GitHub Pages hosts this design prototype; the commercial store needs suitable hosting.')}</p><h3>${copy('O podacima', 'About the data')}</h3><p>${copy('Proizvodi proizvođača su prijedlozi uvrštenja, a OVAMO proizvodi su koncepti. Cijene u katalogu, pakiranja, zalihe i graf su ogledni. Slike prikazuju zamišljene trgovine i aplikacije. Demo katalog i sustav ne primaju narudžbe, uplate ni osobne podatke. Vizualni identitet ima zasebnu ponudu i vanjsku Stripe stranicu za plaćanje. Preglednik može lokalno pohraniti jezik i demo košaricu; tipka „Resetiraj demo” briše te postavke.', 'Manufacturer products are proposed additions; OVAMO products are concepts. Catalogue prices, case packs, stock and the chart are illustrative. Images show imagined stores and apps. The demo catalogue and system accept no orders, payments or personal details. The visual identity has a separate offer and an external Stripe payment page. Your browser may store the language and demo basket locally; “Reset the demo” clears those preferences.')}</p><p><a href="./concepts.html">${copy('Galerija aplikacija za 2.000+ artikala', 'App concepts for 2,000+ articles')} ↗</a><br><a href="${repository}/blob/main/docs/stock-and-apps-blueprint.md" target="_blank" rel="noopener noreferrer">${copy('Zalihe, aplikacije i automatizacija', 'Stock, apps and automation blueprint')} ↗</a><br><a href="${repository}/blob/main/docs/business-research.md" target="_blank" rel="noopener noreferrer">${copy('Istraživanje poslovanja i propisa', 'Business and regulatory research')} ↗</a><br><a href="${repository}/blob/main/docs/production-architecture.md" target="_blank" rel="noopener noreferrer">${copy('Plan stvarnog sustava', 'Production system plan')} ↗</a><br><a href="${repository}/blob/main/docs/brand-direction.md" target="_blank" rel="noopener noreferrer">${copy('Vizualni smjer i provjera imena', 'Visual direction and name clearance')} ↗</a></p></div>`;
}

function toast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2600);
}

function openDialog(id, trigger) {
  $$('dialog[open]').forEach((dialog) => dialog.close());
  const dialog = document.getElementById(id);
  dialogTriggers.set(dialog, trigger ?? document.activeElement);
  document.body.classList.add('dialog-open');
  dialog.showModal();
  dialog.scrollTop = 0;
}

function renderWithFocus(render, attribute, id, step) {
  render();
  const buttons = $$(`[${attribute}]`);
  const match = buttons.find((button) => button.getAttribute(attribute) === id && (step == null || button.dataset.step === step));
  const fallback = buttons.find((button) => button.getAttribute(attribute) === id && !button.disabled);
  if (match && !match.disabled) match.focus({ preventScroll: true });
  else if (fallback) fallback.focus({ preventScroll: true });
  else if ($('#cart-dialog').open) $('#cart-dialog [data-close]').focus({ preventScroll: true });
}

function updateMenuLabel() {
  const expanded = $('#menu-toggle').getAttribute('aria-expanded') === 'true';
  $('#menu-toggle').setAttribute('aria-label', expanded ? copy('Zatvori izbornik', 'Close menu') : copy('Otvori izbornik', 'Open menu'));
}

function closeMenu() {
  $('#primary-nav').classList.remove('open');
  $('#menu-toggle').setAttribute('aria-expanded', 'false');
  updateMenuLabel();
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  const data = button.dataset;
  if (data.close) { document.getElementById(data.close)?.close(); return; }
  if (data.filter) {
    category = data.filter;
    catalogPage = 0;
    renderWithFocus(renderFilters, 'data-filter', category);
    renderProducts();
  } else if (data.categoryJump) {
    category = data.categoryJump;
    catalogPage = 0;
    searchQuery = '';
    $('#product-search').value = '';
    renderFilters();
    renderProducts();
    $('#ponuda').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  } else if (data.catalogPage !== undefined) {
    const nextPage = Number(data.catalogPage);
    if (!Number.isSafeInteger(nextPage) || nextPage < 0) return;
    catalogPage = nextPage;
    renderProducts();
    $('#ponuda').scrollIntoView({ block: 'start' });
    $('#product-search').focus({ preventScroll: true });
  } else if (data.add) {
    const before = cartSummary(cart).count;
    cart = addToCart(cart, data.add);
    saveCart(storage, cart);
    renderCart();
    toast(cartSummary(cart).count > before ? copy('Dodano u tvoj demo izbor.', 'Added to your demo collection.') : copy('Dosegnuta je najveća demo količina.', 'The demo quantity limit has been reached.'));
  } else if (data.cartChange) {
    const current = cart.find((line) => line.id === data.cartChange)?.quantity ?? 0;
    cart = setQuantity(cart, data.cartChange, current + Number(data.step));
    saveCart(storage, cart);
    renderWithFocus(renderCart, 'data-cart-change', data.cartChange, data.step);
  } else if (data.remove) {
    cart = setQuantity(cart, data.remove, 0);
    saveCart(storage, cart);
    renderWithFocus(renderCart, 'data-remove', data.remove);
  } else if (data.packChange) {
    const product = productById.get(data.packChange);
    const current = wholesaleCart.find((line) => line.id === product.id)?.quantity ?? 0;
    wholesaleCart = setQuantity(wholesaleCart, product.id, Math.max(0, current + Number(data.step) * product.packSize));
    quoteVisible = false;
    renderWithFocus(renderWholesale, 'data-pack-change', product.id, data.step);
  } else if (data.city) {
    activeCity = data.city;
    renderCity();
  } else if (data.ops) {
    activeOps = data.ops;
    renderWithFocus(renderOperations, 'data-ops', activeOps);
  } else if (data.question) {
    activeQuestion = data.question;
    renderWithFocus(renderOperations, 'data-question', activeQuestion);
  } else if (data.stockStep !== undefined) {
    const index = Number(data.stockStep);
    if (!Number.isSafeInteger(index) || index > stockState.events.length || !stockSteps[index]) return;
    const previousState = stockState;
    stockState = applyStockEvent(stockState, stockSteps[index]);
    if (stockState === previousState) {
      $('#stock-feedback').textContent = copy('Isti događaj je već obrađen. Zaliha se nije promijenila.', 'This event was already processed. Stock is unchanged.');
      return;
    }
    renderOperations();
    ($(`#ops-content [data-stock-step="${stockState.events.length}"]`) ?? $('#ops-content [data-stock-replay]'))?.focus({ preventScroll: true });
  } else if (data.stockReplay !== undefined) {
    const lastEvent = stockSteps.find((item) => item.id === data.stockReplay);
    if (!lastEvent) return;
    stockState = applyStockEvent(stockState, lastEvent);
    $('#stock-feedback').textContent = copy('Isti događaj je već obrađen. Zaliha se nije promijenila.', 'This event was already processed. Stock is unchanged.');
  } else if (data.stockReset !== undefined) {
    stockState = createStockDemo();
    renderOperations();
    $('#ops-content [data-stock-step="0"]')?.focus({ preventScroll: true });
  } else if (data.supportQuestion) {
    supportQuestion = data.supportQuestion;
    renderWithFocus(renderOperations, 'data-support-question', supportQuestion);
  } else if (data.action) {
    const dialogIds = { cart: 'cart-dialog', wholesale: 'wholesale-dialog', operations: 'operations-dialog', project: 'project-dialog' };
    if (dialogIds[data.action]) openDialog(dialogIds[data.action], button);
    else if (data.action === 'workflow-demo') {
      activeOps = 'movements'; renderOperations(); openDialog('operations-dialog', button);
    }
    else if (data.action === 'browse') { $('#cart-dialog').close(); $('#ponuda').scrollIntoView(); }
    else if (data.action === 'clear-filters') {
      category = 'all'; searchQuery = ''; catalogPage = 0; $('#product-search').value = ''; renderFilters(); renderProducts(); $('#product-search').focus();
    } else if (data.action === 'quote') {
      quoteVisible = true; renderWithFocus(renderWholesale, 'data-action', 'quote');
      $('.quote-result')?.scrollIntoView({ block: 'nearest' });
    } else if (data.action === 'reset') {
      try { storage?.removeItem('ovamo-demo-cart-v1'); storage?.removeItem('ovamo-language'); } catch { /* No stored state to remove. */ }
      cart = []; wholesaleCart = []; quoteVisible = false; searchQuery = ''; category = 'all';
      activeCity = 'split'; activeOps = 'overview'; activeQuestion = 'stock'; language = 'hr';
      catalogPage = 0; stockState = createStockDemo(); supportQuestion = 'order';
      $('#product-search').value = ''; translatePage(); toast('Demo je resetiran. Krenimo iznova.');
    }
  }
});

$('#product-search').addEventListener('input', (event) => { searchQuery = event.target.value; catalogPage = 0; renderProducts(); });
$('#language-toggle').addEventListener('click', () => {
  language = language === 'hr' ? 'en' : 'hr';
  try { storage?.setItem('ovamo-language', language); } catch { /* Language still works in memory. */ }
  translatePage();
});
$('#menu-toggle').addEventListener('click', () => {
  const open = $('#primary-nav').classList.toggle('open');
  $('#menu-toggle').setAttribute('aria-expanded', String(open));
  updateMenuLabel();
  if (open) $('#primary-nav a').focus();
});
$$('#primary-nav a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const focusWasInMenu = $('#primary-nav').classList.contains('open') && $('#primary-nav').contains(document.activeElement);
  closeMenu();
  if (focusWasInMenu) $('#menu-toggle').focus();
});
$('.city-tabs').addEventListener('keydown', (event) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  activeCity = event.key === 'Home' ? 'split' : event.key === 'End' ? 'zadar' : activeCity === 'split' ? 'zadar' : 'split';
  renderCity();
  $(`.city-tabs [data-city="${activeCity}"]`).focus();
});
$$('dialog').forEach((dialog) => {
  dialog.addEventListener('close', () => {
    if (!$$('dialog[open]').length) document.body.classList.remove('dialog-open');
    const trigger = dialogTriggers.get(dialog);
    if (!$$('dialog[open]').length && trigger?.isConnected) trigger.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

translatePage();
