import test from 'node:test';
import assert from 'node:assert/strict';
import { createStockDemo, applyStockEvent } from '../src/stock-demo.js';

test('receiving cartons, transferring, selling and returning preserve physical unit balances', () => {
  let state = createStockDemo();
  state = applyStockEvent(state, { id: 'delivery-1', type: 'receive', quantity: 10 });
  assert.equal(state.warehouse, 240);
  state = applyStockEvent(state, { id: 'transfer-1-out', type: 'dispatch', quantity: 48 });
  assert.deepEqual([state.warehouse, state.inTransit, state.shop], [192, 48, 0]);
  state = applyStockEvent(state, { id: 'transfer-1-in', type: 'accept', quantity: 48 });
  assert.deepEqual([state.warehouse, state.inTransit, state.shop], [192, 0, 48]);
  state = applyStockEvent(state, { id: 'receipt-1', type: 'sell', quantity: 3 });
  assert.deepEqual([state.warehouse, state.inTransit, state.shop, state.sold], [192, 0, 45, 3]);
  assert.equal(state.warehouse + state.inTransit + state.shop, 237);
  state = applyStockEvent(state, { id: 'return-1', type: 'return', quantity: 2 });
  assert.deepEqual([state.warehouse, state.inTransit, state.shop, state.sold], [192, 0, 47, 1]);
  assert.deepEqual(state.events.map(({ id, type, units }) => ({ id, type, units })), [
    { id: 'delivery-1', type: 'receive', units: 240 },
    { id: 'transfer-1-out', type: 'dispatch', units: 48 },
    { id: 'transfer-1-in', type: 'accept', units: 48 },
    { id: 'receipt-1', type: 'sell', units: 3 },
    { id: 'return-1', type: 'return', units: 2 },
  ]);
});

test('invalid payloads and unsafe arithmetic are rejected without changing the state', () => {
  const state = createStockDemo();
  const invalid = [
    null,
    { id: '', type: 'receive', quantity: 1 },
    { id: 'unknown', type: 'erase', quantity: 1 },
    { id: 'negative', type: 'receive', quantity: -1 },
    { id: 'fraction', type: 'receive', quantity: 1.5 },
    { id: 'text', type: 'receive', quantity: '2' },
    { id: 'infinite', type: 'receive', quantity: Infinity },
    { id: 'unsafe', type: 'receive', quantity: Number.MAX_SAFE_INTEGER + 1 },
    { id: 'zero-pack', type: 'receive', quantity: 1, packSize: 0 },
    { id: 'fractional-pack', type: 'receive', quantity: 1, packSize: 2.5 },
    { id: 'wrong-pack', type: 'dispatch', quantity: 0, packSize: 24 },
    { id: 'overflow', type: 'receive', quantity: Number.MAX_SAFE_INTEGER, packSize: 2 },
  ];
  for (const event of invalid) assert.throws(() => applyStockEvent(state, event), Error);
  assert.deepEqual(state, createStockDemo());

  const full = applyStockEvent(state, {
    id: 'full', type: 'receive', quantity: Number.MAX_SAFE_INTEGER, packSize: 1,
  });
  const inTransit = applyStockEvent(full, {
    id: 'full-dispatch', type: 'dispatch', quantity: Number.MAX_SAFE_INTEGER,
  });
  assert.throws(() => applyStockEvent(inTransit, {
    id: 'one-too-many', type: 'receive', quantity: 1, packSize: 1,
  }), /safe|limit|overflow/i);
  assert.equal(inTransit.warehouse, 0);
  assert.equal(inTransit.inTransit, Number.MAX_SAFE_INTEGER);
});

test('each outgoing movement refuses a shortage in its actual source bucket', () => {
  const state = createStockDemo();
  for (const type of ['dispatch', 'accept', 'sell', 'return']) {
    assert.throws(() => applyStockEvent(state, { id: `short-${type}`, type, quantity: 1 }),
      /not enough|insufficient/i);
  }
  assert.deepEqual(state, {
    warehouse: 0, inTransit: 0, shop: 0, sold: 0, events: [], processedIds: [],
  });
});

test('replaying an identical event is idempotent and returns the original state reference', () => {
  const event = { id: 'delivery-retry', type: 'receive', quantity: 2 };
  const state = applyStockEvent(createStockDemo(), event);
  assert.strictEqual(applyStockEvent(state, event), state);
  assert.strictEqual(applyStockEvent(state, { ...event, packSize: 24 }), state);
  assert.equal(state.warehouse, 48);
  assert.equal(state.events.length, 1);
  assert.deepEqual(state.processedIds, ['delivery-retry']);
});

test('an event ID cannot be reused for a conflicting type, quantity or carton definition', () => {
  const state = applyStockEvent(createStockDemo(), {
    id: 'unique-delivery', type: 'receive', quantity: 1, packSize: 24,
  });
  const conflicts = [
    { id: 'unique-delivery', type: 'dispatch', quantity: 1 },
    { id: 'unique-delivery', type: 'receive', quantity: 2, packSize: 24 },
    { id: 'unique-delivery', type: 'receive', quantity: 2, packSize: 12 },
  ];
  for (const event of conflicts) {
    assert.throws(() => applyStockEvent(state, event), /conflict|different payload|already used/i);
  }
  assert.equal(state.warehouse, 24);
  assert.equal(state.events.length, 1);
});

test('successful and zero-unit events append new ledgers without mutating frozen inputs', () => {
  const state = createStockDemo();
  Object.freeze(state.events);
  Object.freeze(state.processedIds);
  Object.freeze(state);

  const received = applyStockEvent(state, { id: 'small-case', type: 'receive', quantity: 2, packSize: 6 });
  assert.notStrictEqual(received, state);
  assert.notStrictEqual(received.events, state.events);
  assert.notStrictEqual(received.processedIds, state.processedIds);
  assert.equal(received.warehouse, 12);
  assert.equal(state.warehouse, 0);
  assert.equal(state.events.length, 0);

  const noMovement = applyStockEvent(received, { id: 'zero-move', type: 'dispatch', quantity: 0 });
  assert.deepEqual([noMovement.warehouse, noMovement.inTransit], [12, 0]);
  assert.equal(noMovement.events.length, 2);
  assert.deepEqual(noMovement.events[1], {
    id: 'zero-move', type: 'dispatch', quantity: 0, units: 0,
  });
});
