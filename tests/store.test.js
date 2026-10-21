import test from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../src/data.js';
import {
  normalizeCart,
  setQuantity,
  addToCart,
  cartSummary,
  filterProducts,
  loadCart,
  saveCart,
  formatMoney,
} from '../src/store.js';

const catalog = [
  {
    id: 'citrus',
    name: { hr: 'Đumbir i limun', en: 'Ginger and lemon' },
    category: 'drinks',
    description: { hr: 'Piće za sunčan dan.', en: 'A drink for a sunny day.' },
    priceCents: 199,
    wholesalePriceCents: 125,
    packSize: 6,
    stock: 28,
  },
  {
    id: 'cocoa',
    name: { hr: 'Čokolada', en: 'Chocolate' },
    category: 'snacks',
    description: { hr: 'Mali predah.', en: 'A little break.' },
    priceCents: 235,
    wholesalePriceCents: 175,
    packSize: 12,
    stock: 200,
  },
  {
    id: 'last-case',
    name: { hr: 'Posljednje pakiranje', en: 'Last case' },
    category: 'drinks',
    description: { hr: 'Primjer ograničene zalihe.', en: 'A low-stock example.' },
    priceCents: 300,
    wholesalePriceCents: 200,
    packSize: 6,
    stock: 5,
  },
];

test('cart totals remain exact integer cents and count individual units', () => {
  const summary = cartSummary([
    { id: 'citrus', quantity: 3 },
    { id: 'cocoa', quantity: 2 },
  ], catalog);

  assert.equal(summary.count, 5);
  assert.equal(summary.totalCents, 1067);
  assert.deepEqual(summary.lines.map(({ quantity, unitPriceCents, lineTotalCents }) => (
    { quantity, unitPriceCents, lineTotalCents }
  )), [
    { quantity: 3, unitPriceCents: 199, lineTotalCents: 597 },
    { quantity: 2, unitPriceCents: 235, lineTotalCents: 470 },
  ]);
});

test('normalization merges duplicates and enforces stock and 99-unit caps', () => {
  const input = [
    { id: 'citrus', quantity: 20 },
    { id: 'cocoa', quantity: 120 },
    { id: 'citrus', quantity: 20 },
  ];

  assert.deepEqual(normalizeCart(input, catalog), [
    { id: 'citrus', quantity: 28 },
    { id: 'cocoa', quantity: 99 },
  ]);
  assert.equal(input[0].quantity, 20, 'normalization must not mutate caller data');
});

test('normalization ignores malformed, inherited, unknown, and fractional entries', () => {
  const input = [
    null,
    'citrus',
    [],
    { id: 'citrus', quantity: '3' },
    { id: 'citrus', quantity: 1.5 },
    { id: 'citrus', quantity: -1 },
    { id: 'citrus', quantity: 0 },
    { id: 'citrus', quantity: Infinity },
    { id: 'citrus', quantity: Number.MAX_SAFE_INTEGER + 1 },
    { id: 'missing', quantity: 2 },
    { id: '__proto__', quantity: 2 },
    Object.create({ id: 'citrus', quantity: 4 }),
    { id: 'citrus', quantity: 2 },
  ];

  assert.deepEqual(normalizeCart(input, catalog), [{ id: 'citrus', quantity: 2 }]);
  assert.deepEqual(normalizeCart({ citrus: 4 }, catalog), []);
});

test('setting a quantity replaces it, caps it, and removes a line at zero', () => {
  const original = [{ id: 'citrus', quantity: 3 }];
  assert.deepEqual(setQuantity(original, 'citrus', 40, catalog), [
    { id: 'citrus', quantity: 28 },
  ]);
  assert.deepEqual(setQuantity(original, 'citrus', 0, catalog), []);
  assert.deepEqual(setQuantity(original, 'missing', 5, catalog), original);
  assert.deepEqual(setQuantity(original, 'citrus', 2.5, catalog), original);
  assert.deepEqual(original, [{ id: 'citrus', quantity: 3 }]);
});

test('adding uses units, merges an existing line, and respects the cap', () => {
  assert.deepEqual(addToCart([], 'citrus', undefined, catalog), [
    { id: 'citrus', quantity: 1 },
  ]);
  assert.deepEqual(addToCart([{ id: 'citrus', quantity: 25 }], 'citrus', 6, catalog), [
    { id: 'citrus', quantity: 28 },
  ]);
  assert.deepEqual(addToCart([], 'citrus', -1, catalog), []);
});

test('wholesale rounds up to complete packs and prices every unit at the wholesale rate', () => {
  const summary = cartSummary([{ id: 'citrus', quantity: 7 }], catalog, 'wholesale');

  assert.equal(summary.count, 12);
  assert.equal(summary.totalCents, 1500);
  assert.equal(summary.lines[0].quantity, 12);
  assert.equal(summary.lines[0].packCount, 2);
  assert.equal(summary.lines[0].unitPriceCents, 125);
});

test('wholesale caps at the largest whole pack and omits insufficient stock', () => {
  const summary = cartSummary([
    { id: 'citrus', quantity: 28 },
    { id: 'cocoa', quantity: 200 },
    { id: 'last-case', quantity: 1 },
  ], catalog, 'wholesale');

  assert.deepEqual(summary.lines.map(({ product, quantity, packCount }) => (
    { id: product.id, quantity, packCount }
  )), [
    { id: 'citrus', quantity: 24, packCount: 4 },
    { id: 'cocoa', quantity: 96, packCount: 8 },
  ]);
  assert.equal(summary.count, 120);
  assert.equal(summary.totalCents, 19800);
});

test('Croatian search ignores case and accents including đ, while preserving category filters', () => {
  assert.deepEqual(filterProducts(catalog, { query: ' COKOLADA ' }).map(({ id }) => id), ['cocoa']);
  assert.deepEqual(filterProducts(catalog, { query: 'dumbir' }).map(({ id }) => id), ['citrus']);
  assert.deepEqual(filterProducts(catalog, { query: 'suncan' }).map(({ id }) => id), ['citrus']);
  assert.deepEqual(filterProducts(catalog, { query: 'ginger', category: 'snacks' }), []);
  assert.equal(filterProducts(catalog).length, 3);
});

test('loading saved carts normalizes duplicate and malformed records', () => {
  const id = products[0].id;
  const storage = {
    getItem: () => JSON.stringify([
      { id, quantity: 2 },
      { id, quantity: 3 },
      { id: 'not-in-catalog', quantity: 4 },
      { id, quantity: 0.5 },
    ]),
  };

  assert.deepEqual(loadCart(storage), [{ id, quantity: 5 }]);
});

test('corrupt or unavailable storage returns an empty cart and never throws', () => {
  assert.deepEqual(loadCart({ getItem: () => '{broken json' }), []);
  assert.deepEqual(loadCart({ getItem: () => '{"__proto__":{"quantity":7}}' }), []);
  assert.deepEqual(loadCart({ getItem: () => { throw new Error('blocked'); } }), []);
  assert.deepEqual(loadCart(undefined), []);
});

test('saving persists only normalized cart entries and reports unavailable storage', () => {
  const id = products[0].id;
  const persisted = new Map();
  const storage = {
    setItem: (key, value) => persisted.set(key, value),
    getItem: (key) => persisted.get(key) ?? null,
  };

  assert.equal(saveCart(storage, [{ id, quantity: 2 }, { id, quantity: 1 }], 'test-cart'), true);
  assert.deepEqual(JSON.parse(persisted.get('test-cart')), [{ id, quantity: 3 }]);
  assert.equal(saveCart({ setItem: () => { throw new Error('quota'); } }, []), false);
  assert.equal(saveCart(undefined, []), false);
});

test('money formatting converts cents to localized euro amounts', () => {
  assert.equal(formatMoney(123456, 'hr').replace(/\s/gu, ' '), '1.234,56 €');
  assert.equal(formatMoney(123456, 'en').replace(/\s/gu, ' '), '€1,234.56');
  assert.equal(formatMoney(0, 'hr').replace(/\s/gu, ' '), '0,00 €');
});
