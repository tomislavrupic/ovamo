import { productMedia } from './product-media.js?v=20261021-8';
import { productIllustration } from './illustrations.js?v=20261021-2';
import { formatMoney } from './store.js?v=20261021-2';

export const FAVOURITES_KEY = 'ovamo-demo-favourites-v1';
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const text = (value, language) => value?.[language] ?? value?.hr ?? '';

/** Store only unique IDs that still exist in the current catalogue. */
export function normalizeFavourites(value, catalog = []) {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(catalog.map((product) => product.id));
  return [...new Set(value.filter((id) => typeof id === 'string' && allowed.has(id)))];
}

export function loadFavourites(storage, catalog) {
  try { return normalizeFavourites(JSON.parse(storage?.getItem(FAVOURITES_KEY) ?? '[]'), catalog); }
  catch { return []; }
}

export function saveFavourites(storage, value, catalog) {
  try {
    if (!storage || typeof storage.setItem !== 'function') return false;
    storage.setItem(FAVOURITES_KEY, JSON.stringify(normalizeFavourites(value, catalog)));
    return true;
  } catch { return false; }
}

export function toggleFavourite(value, id, catalog) {
  const clean = normalizeFavourites(value, catalog);
  if (!catalog.some((product) => product.id === id)) return clean;
  return clean.includes(id) ? clean.filter((entry) => entry !== id) : [...clean, id];
}

/** Respect the same stock/99-unit ceiling as the existing demo basket. */
export function remainingProductQuantity(product, cart = []) {
  const limit = Number.isFinite(product?.stock) ? Math.max(0, Math.min(99, Math.floor(product.stock))) : 0;
  const quantity = cart.reduce((sum, line) => sum + (line.id === product?.id && Number.isSafeInteger(line.quantity) && line.quantity > 0 ? Math.min(line.quantity, 99) : 0), 0);
  return Math.max(0, limit - quantity);
}

function safeSourceUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : '';
  } catch { return ''; }
}

export function mediaForProduct(product) {
  const media = productMedia[product.id] ?? {};
  return {
    ...media,
    // Public catalogue metadata is authored, but only known local media is embedded.
    images: (Array.isArray(media.images) ? media.images : []).filter((image) => typeof image.src === 'string' && /^(\.\/)?assets\/products\/[a-z0-9._-]+$/i.test(image.src)),
    facts: Array.isArray(media.facts) ? media.facts : [],
    sourceUrl: safeSourceUrl(media.sourceUrl ?? product.sourceUrl),
    buyUrl: safeSourceUrl(media.buyUrl),
  };
}

export function productPicture(product, language, { index = 0, className = 'product-photo', thumbnail = false } = {}) {
  const image = mediaForProduct(product).images[index];
  if (!image) return productIllustration(product);
  return `<img class="${className}" src="${escapeHTML(image.src)}" alt="${thumbnail ? '' : escapeHTML(text(image.alt, language) || product.name[language])}" width="800" height="800" loading="${thumbnail || className === 'product-photo' ? 'lazy' : 'eager'}" decoding="async">`;
}

export function favouriteButton(product, language, selected, { className = 'favourite-button', showLabel = false } = {}) {
  const label = language === 'hr' ? (selected ? 'Ukloni iz favorita' : 'Spremi u favorite') : (selected ? 'Remove from favourites' : 'Save to favourites');
  return `<button type="button" class="${className}${selected ? ' is-favourite' : ''}" data-favourite="${product.id}" aria-pressed="${selected}" aria-label="${label}: ${escapeHTML(product.name[language])}">${icon('heart')}${showLabel ? `<span>${selected ? (language === 'hr' ? 'U favoritima' : 'Saved') : (language === 'hr' ? 'Spremi' : 'Save')}</span>` : ''}</button>`;
}

export function renderProductDetails(product, { language = 'hr', categoryName = '', favourite = false, quantity = 1, imageIndex = 0, remaining = 1 } = {}) {
  const copy = (hr, en) => language === 'hr' ? hr : en;
  const media = mediaForProduct(product);
  const selectedIndex = Math.min(Math.max(0, imageIndex), Math.max(0, media.images.length - 1));
  const selectedImage = media.images[selectedIndex];
  const imageSource = safeSourceUrl(selectedImage?.sourceUrl) || media.sourceUrl;
  const name = escapeHTML(product.name[language]);
  const manufacturer = product.provenance === 'manufacturer';
  const type = manufacturer ? copy('PRIJEDLOG ASORTIMANA', 'PROPOSED ADDITION') : copy('OVAMO / KONCEPT PROIZVODA', 'OVAMO / PRODUCT CONCEPT');
  const caption = selectedImage ? (text(selectedImage.caption, language) || copy('Fotografija proizvođača.', 'Manufacturer photograph.')) : manufacturer ? copy('Ilustracija kategorije. Fotografija ovog proizvoda još nije dostupna.', 'Category illustration. A photograph of this product is not yet available.') : copy('OVAMO vizualni koncept. Izvedba proizvoda još nije potvrđena.', 'OVAMO visual concept. Product production is not yet confirmed.');
  const facts = media.facts.filter((fact) => text(fact.label, language) && text(fact.value, language));
  const sourceLabel = typeof media.sourceLabel === 'string' ? media.sourceLabel : text(media.sourceLabel, language);
  const safeQuantity = remaining > 0 ? Math.min(Math.max(1, Math.floor(quantity) || 1), remaining) : 0;
  return `<div class="product-detail-layout">
    <div class="product-detail-gallery">
      <figure class="product-gallery-figure">
        <div class="product-gallery-stage" style="--product-bg:${product.color}20">${productPicture(product, language, { index: selectedIndex, className: 'product-detail-photo' })}</div>
        <figcaption class="product-image-caption">${escapeHTML(caption)}${media.images.length > 1 ? `<span>${selectedIndex + 1} / ${media.images.length}</span>` : ''}</figcaption>
      </figure>
      ${media.images.length > 1 ? `<div class="product-thumbnails" role="group" aria-label="${copy('Fotografije proizvoda', 'Product photographs')}">${media.images.map((image, index) => `<button type="button" class="product-thumbnail" data-product-image="${index}" aria-pressed="${index === selectedIndex}" aria-label="${copy('Prikaži sliku', 'Show image')} ${index + 1} ${copy('od', 'of')} ${media.images.length}">${productPicture(product, language, { index, className: 'product-thumbnail-photo', thumbnail: true })}</button>`).join('')}</div>` : ''}
      ${imageSource ? `<a class="product-image-source" href="${escapeHTML(imageSource)}" target="_blank" rel="noopener noreferrer">${copy('Izvor fotografija i podataka', 'Photo and information source')}${sourceLabel ? `: ${escapeHTML(sourceLabel)}` : ''} <span aria-hidden="true">↗</span></a>` : ''}
    </div>
    <div class="product-detail-copy">
      <p class="product-detail-kicker">${type} <span>· ${escapeHTML(categoryName)}</span></p>
      <h2 id="product-detail-title">${name}</h2>
      <p class="product-detail-description">${escapeHTML(product.description[language])}</p>
      ${facts.length ? `<dl class="product-detail-facts">${facts.map((fact) => `<div><dt>${escapeHTML(text(fact.label, language))}</dt><dd>${escapeHTML(text(fact.value, language))}</dd></div>`).join('')}</dl>` : ''}
      <div class="product-detail-price"><div><span>${copy('Ogledna cijena po komadu', 'Illustrative price per unit')}</span><strong>${formatMoney(product.priceCents, language)}</strong></div>${favouriteButton(product, language, favourite, { className: 'product-save-button', showLabel: true })}</div>
      <div class="product-purchase-row">
        <div class="product-quantity"><span>${copy('Količina', 'Quantity')}</span><div class="quantity-control"><button type="button" data-detail-quantity="-1" aria-label="${copy('Smanji količinu', 'Decrease quantity')}" ${safeQuantity <= 1 ? 'disabled' : ''}>${icon('minus')}</button><output aria-label="${copy('Odabrana količina', 'Selected quantity')}">${safeQuantity}</output><button type="button" data-detail-quantity="1" aria-label="${copy('Povećaj količinu', 'Increase quantity')}" ${safeQuantity >= remaining ? 'disabled' : ''}>${icon('plus')}</button></div></div>
        <button type="button" class="button button-plum product-detail-add" data-detail-add="${product.id}" ${remaining < 1 ? 'disabled' : ''}>${icon('bag')}<span>${copy('Dodaj u demo košaricu', 'Add to demo basket')}</span></button>
      </div>
      <p id="product-detail-feedback" class="product-detail-feedback" role="status" aria-live="polite"></p>
      ${remaining < 1 ? `<p class="product-limit-note" role="status">${copy('Dosegnuta je najveća demo količina za ovaj proizvod.', 'The demo quantity limit for this product has been reached.')}</p>` : ''}
      <button type="button" class="product-open-cart" data-detail-cart>${copy('Pregledaj demo košaricu', 'View demo basket')} ${icon('arrow')}</button>
      <p id="product-detail-notice" class="product-detail-notice">${copy('Ovo je demonstracija kupnje. Cijena i zaliha su ogledni; dodavanje ne šalje narudžbu i ne naplaćuje se.', 'This is a shopping demonstration. Prices and inventory are illustrative; adding an item places no order and charges nothing.')}</p>
      ${media.buyUrl ? `<a class="product-manufacturer-link" href="${escapeHTML(media.buyUrl)}" target="_blank" rel="noopener noreferrer"><span>${escapeHTML(text(media.buyLabel, language) || copy('Pogledaj u trgovini proizvođača', 'Visit the manufacturer’s shop'))}</span>${icon('up')}</a><p class="product-external-note">${copy('Vanjska trgovina ima vlastite cijene, dostupnost i uvjete kupnje.', 'The external shop has its own prices, availability and purchase terms.')}</p>` : media.sourceUrl ? `<a class="product-manufacturer-link" href="${escapeHTML(media.sourceUrl)}" target="_blank" rel="noopener noreferrer"><span>${copy('Detalji kod proizvođača', 'Details from the manufacturer')}</span>${icon('up')}</a>` : ''}
    </div>
  </div>`;
}
