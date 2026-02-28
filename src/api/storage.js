const NETWORK_DELAY_MS = 220;

function clone(items) {
  return JSON.parse(JSON.stringify(items));
}

export function wait(ms = NETWORK_DELAY_MS) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function writeCollection(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function ensureSeed(key, seedItems) {
  if (!localStorage.getItem(key)) {
    writeCollection(key, seedItems);
  }
}

export function readCollection(key, seedItems) {
  ensureSeed(key, seedItems);
  const raw = localStorage.getItem(key);

  try {
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : clone(seedItems);
  } catch {
    return clone(seedItems);
  }
}

export function normalizeQuery(value = "") {
  return value.trim().toLowerCase();
}

export function createId(items) {
  return (
    items.reduce((maxId, item) => {
      const id = Number(item.id) || 0;
      return Math.max(maxId, id);
    }, 0) + 1
  );
}

export function paginate(items, page = 1, pageSize = 5) {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safePageSize;

  return {
    items: items.slice(start, start + safePageSize),
    page: safePage,
    pageSize: safePageSize,
    totalItems,
    totalPages,
  };
}
