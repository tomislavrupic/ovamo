import { products } from './data.js?v=20261021-2';

const CART_KEY = 'ovamo-demo-cart-v1';

function productIndex(catalog) {
  const index = new Map();
  for (const product of Array.isArray(catalog) ? catalog : []) {
    if (product && typeof product.id === 'string') index.set(product.id, product);
  }
  return index;
}

function stockLimit(product) {
  return Number.isFinite(product.stock)
    ? Math.max(0, Math.min(Math.floor(product.stock), 99))
    : 0;
}

/** Return fresh cart lines containing only positive whole units of known products. */
export function normalizeCart(value, catalog = products) {
  if (!Array.isArray(value)) return [];
  const index = productIndex(catalog);
  const quantities = new Map();

  for (const entry of value) {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) continue;
    if (!Object.hasOwn(entry, 'id') || !Object.hasOwn(entry, 'quantity')) continue;
    const { id, quantity } = entry;
    if (typeof id !== 'string' || !Number.isSafeInteger(quantity) || quantity <= 0) continue;
    const product = index.get(id);
    if (!product) continue;
    const limit = stockLimit(product);
    if (limit === 0) continue;

    // Clip before adding so even very large input values cannot overflow.
    quantities.set(id, Math.min(limit, (quantities.get(id) ?? 0) + Math.min(quantity, limit)));
  }

  return Array.from(quantities, ([id, quantity]) => ({ id, quantity }));
}

/** Set a unit quantity; zero removes a line. Invalid changes leave the clean cart intact. */
export function setQuantity(cart, id, quantity, catalog = products) {
  const clean = normalizeCart(cart, catalog);
  if (!productIndex(catalog).has(id) || !Number.isSafeInteger(quantity) || quantity < 0) return clean;
  if (quantity === 0) return clean.filter((line) => line.id !== id);

  const exists = clean.some((line) => line.id === id);
  const next = exists
    ? clean.map((line) => (line.id === id ? { id, quantity } : line))
    : [...clean, { id, quantity }];
  return normalizeCart(next, catalog);
}

/** Add individual units. A wholesale UI should pass product.packSize for one pack. */
export function addToCart(cart, id, quantity = 1, catalog = products) {
  return normalizeCart([...normalizeCart(cart, catalog), { id, quantity }], catalog);
}

/**
 * All quantities and prices are per individual unit, including in wholesale mode.
 * Wholesale quantities round up to a complete pack, then cap at the largest whole
 * pack within available stock and the 99-unit demo limit. Products with no complete
 * pack available are omitted. Wholesale lines additionally expose packCount.
 * The caller can persist returned line quantities if it needs a canonical pack cart.
 */
export function cartSummary(cart, catalog = products, mode = 'retail') {
  const index = productIndex(catalog);
  const wholesale = mode === 'wholesale';
  const lines = [];
  let count = 0;
  let totalCents = 0;

  for (const entry of normalizeCart(cart, catalog)) {
    const product = index.get(entry.id);
    let quantity = entry.quantity;
    const packSize = Number.isSafeInteger(product.packSize) && product.packSize > 0
      ? product.packSize
      : 1;

    if (wholesale) {
      const packLimit = Math.floor(stockLimit(product) / packSize) * packSize;
      quantity = Math.min(Math.ceil(quantity / packSize) * packSize, packLimit);
      if (quantity === 0) continue;
    }

    const unitPriceCents = wholesale ? product.wholesalePriceCents : product.priceCents;
    const lineTotalCents = quantity * unitPriceCents;
    const line = { product, quantity, unitPriceCents, lineTotalCents };
    if (wholesale) line.packCount = quantity / packSize;
    lines.push(line);
    count += quantity;
    totalCents += lineTotalCents;
  }

  return { lines, count, totalCents };
}

function searchText(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

/** Search Croatian and English names/descriptions without case or Croatian accents. */
export function filterProducts(catalog, { category = 'all', query = '' } = {}) {
  const needle = searchText(query);
  return (Array.isArray(catalog) ? catalog : []).filter((product) => {
    if (category !== 'all' && product.category !== category) return false;
    const haystack = searchText([
      product.name?.hr,
      product.name?.en,
      product.description?.hr,
      product.description?.en,
    ].join(' '));
    return haystack.includes(needle);
  });
}

/** Storage is injected so unavailable browser storage never prevents the demo working. */
export function loadCart(storage, key = CART_KEY) {
  try {
    const value = storage?.getItem(key);
    return value ? normalizeCart(JSON.parse(value)) : [];
  } catch {
    return [];
  }
}

/** Persist product IDs and unit quantities only; report a denied/quota-limited write. */
export function saveCart(storage, cart, key = CART_KEY) {
  try {
    if (!storage || typeof storage.setItem !== 'function') return false;
    storage.setItem(key, JSON.stringify(normalizeCart(cart)));
    return true;
  } catch {
    return false;
  }
}

export function formatMoney(cents, locale = 'hr') {
  const language = locale === 'hr' ? 'hr-HR' : locale === 'en' ? 'en-IE' : locale;
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
