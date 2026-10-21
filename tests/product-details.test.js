import test from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../src/data.js';
import { FAVOURITES_KEY, normalizeFavourites, toggleFavourite, loadFavourites, saveFavourites, remainingProductQuantity, mediaForProduct, renderProductDetails } from '../src/product-details.js';

const catalog = [{ id: 'a', stock: 12 }, { id: 'b', stock: 300 }];

test('favourites reject unknown, duplicated and malformed stored IDs', () => {
  const value = ['a', 'a', null, {}, '__proto__', 8, 'b', ['a']];
  assert.deepEqual(normalizeFavourites(value, catalog), ['a', 'b']);
  assert.deepEqual(normalizeFavourites({ a: true }, catalog), []);
  assert.deepEqual(value, ['a', 'a', null, {}, '__proto__', 8, 'b', ['a']]);
});

test('favourites toggle known products without mutating caller state', () => {
  const initial = ['a'];
  assert.deepEqual(toggleFavourite(initial, 'b', catalog), ['a', 'b']);
  assert.deepEqual(toggleFavourite(initial, 'a', catalog), []);
  assert.deepEqual(toggleFavourite(initial, 'unknown', catalog), ['a']);
  assert.deepEqual(initial, ['a']);
});

test('storage failure and malformed JSON leave favourites usable in memory', () => {
  const denied = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } };
  assert.deepEqual(loadFavourites(denied, catalog), []);
  assert.deepEqual(loadFavourites({ getItem: () => '{broken' }, catalog), []);
  assert.equal(saveFavourites(denied, ['a'], catalog), false);
  assert.equal(saveFavourites(undefined, ['a'], catalog), false);
});

test('favourites storage persists only validated IDs under its own key', () => {
  const values = new Map();
  const storage = { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) };
  assert.equal(saveFavourites(storage, ['a', 'a', 'unknown', 'b'], catalog), true);
  assert.equal(values.get(FAVOURITES_KEY), '["a","b"]');
  assert.deepEqual(loadFavourites(storage, catalog), ['a', 'b']);
});

test('detail quantities respect stock, existing cart amounts and the 99-unit cap', () => {
  assert.equal(remainingProductQuantity(catalog[0], [{ id: 'a', quantity: 10 }]), 2);
  assert.equal(remainingProductQuantity(catalog[0], [{ id: 'a', quantity: 30 }]), 0);
  assert.equal(remainingProductQuantity(catalog[1], [{ id: 'b', quantity: 98 }]), 1);
  assert.equal(remainingProductQuantity(catalog[0], [{ id: 'a', quantity: 1.5 }, { id: 'z', quantity: 5 }]), 12);
  assert.equal(remainingProductQuantity({ id: 'c', stock: -1 }), 0);
});

test('all real proposals have sourced photography; concepts keep their own illustration', () => {
  for (const product of products) {
    const media = mediaForProduct(product);
    if (product.provenance === 'manufacturer') {
      assert.ok(media.images.length > 0, product.id);
      assert.ok(media.sourceUrl.startsWith('https://'), product.id);
      assert.ok(media.facts.length > 0, product.id);
    } else {
      assert.equal(media.images.length, 0, product.id);
      assert.equal(media.buyUrl, '', product.id);
    }
  }
});

test('detail rendering includes both purchase boundaries and labelled controls in HR and EN', () => {
  const product = products.find((item) => item.id === 'premium-zigante-truffle-chips');
  for (const language of ['hr', 'en']) {
    const html = renderProductDetails(product, { language, categoryName: 'Snacks', favourite: true, quantity: 1, remaining: 3 });
    assert.match(html, /id="product-detail-title"/);
    assert.match(html, /id="product-detail-notice"/);
    assert.match(html, /aria-pressed="true"/);
    assert.match(html, /data-detail-add="premium-zigante-truffle-chips"/);
    assert.match(html, /class="product-manufacturer-link" href="https:\/\/zigantetartufi.com/);
    assert.match(html, language === 'hr' ? /ne šalje narudžbu/ : /places no order/);
    assert.match(html, /data-product-image="1"/);
  }
});

test('exhausted demo quantity disables adding; display copy is escaped', () => {
  const product = { ...products[0], name: { hr: '<bad>', en: '<bad>' }, description: { hr: '<script>bad</script>', en: '' } };
  const html = renderProductDetails(product, { remaining: 0, categoryName: '<tag>' });
  assert.match(html, /data-detail-add="[^"]+" disabled/);
  assert.match(html, /&lt;bad&gt;/);
  assert.match(html, /&lt;script&gt;bad&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>/);
});
