// Deterministic, single-SKU stock demonstration for an illustrative soft drink.
// No storage, network, accounts, fiscalization, invoicing, or production stock.
const BUCKETS = ['warehouse', 'inTransit', 'shop', 'sold'];
const EVENT_TYPES = new Set(['receive', 'dispatch', 'accept', 'sell', 'return']);

export function createStockDemo() {
  return { warehouse: 0, inTransit: 0, shop: 0, sold: 0, events: [], processedIds: [] };
}

function assertBalances(state) {
  let total = 0;
  for (const key of BUCKETS) {
    if (!Number.isSafeInteger(state[key]) || state[key] < 0) {
      throw new Error(`Stock limit: ${key} must be a nonnegative safe integer.`);
    }
    total += state[key];
    if (!Number.isSafeInteger(total)) {
      throw new Error('Stock limit exceeded: combined units must remain a safe integer.');
    }
  }
}

function normalizeEvent(event) {
  if (!event || typeof event !== 'object' || Array.isArray(event)) {
    throw new Error('Stock event must be an object.');
  }
  if (typeof event.id !== 'string' || event.id.trim() === '') {
    throw new Error('Stock event id must be a non-empty string.');
  }
  if (!EVENT_TYPES.has(event.type)) {
    throw new Error('Unknown stock event type.');
  }
  if (!Number.isSafeInteger(event.quantity) || event.quantity < 0) {
    throw new Error('Stock event quantity must be a nonnegative safe integer.');
  }

  const record = { id: event.id, type: event.type, quantity: event.quantity, units: event.quantity };
  if (event.type === 'receive') {
    const packSize = event.packSize === undefined ? 24 : event.packSize;
    if (!Number.isSafeInteger(packSize) || packSize <= 0) {
      throw new Error('Receive packSize must be a positive safe integer.');
    }
    record.packSize = packSize;
    record.units = event.quantity * packSize;
    if (!Number.isSafeInteger(record.units)) {
      throw new Error('Receive quantity overflows the safe integer unit limit.');
    }
  } else if (event.packSize !== undefined) {
    throw new Error('packSize applies only to receive events; other quantities are individual units.');
  }
  return record;
}

/**
 * receive.quantity is cartons; receive.packSize defaults to 24 units per carton.
 * dispatch / accept / sell / return quantities are individual units.
 * sold is net sold units, decreasing when a return is accepted into sellable shop stock.
 * Zero quantity is valid and records a zero movement. A UI may choose to disable it.
 * Identical IDs and canonical payloads return the same state reference. Reusing an
 * ID with changed type, quantity, or pack size throws, including equal-unit changes.
 */
export function applyStockEvent(state, event) {
  if (!state || typeof state !== 'object' || !Array.isArray(state.events)
    || !Array.isArray(state.processedIds)) {
    throw new Error('Stock state must contain event and processed-ID arrays.');
  }
  assertBalances(state);
  const record = normalizeEvent(event);
  const previous = state.events.find((entry) => entry?.id === record.id);
  const processed = state.processedIds.includes(record.id);

  if (previous || processed) {
    if (!previous || !processed) throw new Error('Stock event history and processed IDs are inconsistent.');
    if (previous.type === record.type && previous.quantity === record.quantity
      && previous.packSize === record.packSize && previous.units === record.units) return state;
    throw new Error(`Event id "${record.id}" is already used for a different payload.`);
  }

  const next = {
    warehouse: state.warehouse,
    inTransit: state.inTransit,
    shop: state.shop,
    sold: state.sold,
    events: state.events,
    processedIds: state.processedIds,
  };

  if (record.type === 'receive') {
    next.warehouse += record.units;
  } else {
    const routes = {
      dispatch: ['warehouse', 'inTransit'],
      accept: ['inTransit', 'shop'],
      sell: ['shop', 'sold'],
      return: ['sold', 'shop'],
    };
    const [source, destination] = routes[record.type];
    if (next[source] < record.units) {
      throw new Error(`Not enough ${source} units for ${record.type}.`);
    }
    next[source] -= record.units;
    next[destination] += record.units;
  }

  assertBalances(next);
  next.events = [...state.events, record];
  next.processedIds = [...state.processedIds, record.id];
  return next;
}
