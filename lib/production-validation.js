const TYPES = new Set(['commission', 'collaboration', 'research']);
const CONTENT_FIELDS = ['id', 'title', 'summary', 'body', 'category', 'image', 'actionUrl', 'actionLabel', 'stage', 'status'];
const CONTENT_LIMITS = { id: 80, title: 120, summary: 300, body: 6000, category: 60, image: 500, actionUrl: 500, actionLabel: 60, stage: 40, status: 20 };

export class InputError extends Error {}
const isRecord = value => !!value && typeof value === 'object' && !Array.isArray(value);
const exactKeys = (value, keys) => isRecord(value) && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));
const validEmail = value => typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const text = (value, limit, field, { required = false } = {}) => {
  if (typeof value !== 'string' || value.length > limit || (required && !value.trim())) throw new InputError(`Invalid ${field}`);
  return value.trim();
};
const safeHttps = value => {
  if (!value) return true;
  try { const url = new URL(value); return url.protocol === 'https:' && !!url.hostname && !/\s/.test(value); }
  catch { return false; }
};

export function cleanApplication(value) {
  const keys = ['name', 'email', 'type', 'goal', 'timing', 'budget'];
  if (!exactKeys(value, keys)) throw new InputError('Invalid application fields');
  const result = {
    name: text(value.name, 120, 'name', { required: true }),
    email: text(value.email, 254, 'email', { required: true }),
    type: text(value.type, 30, 'type', { required: true }),
    goal: text(value.goal, 6000, 'goal', { required: true }),
    timing: text(value.timing, 200, 'timing'),
    budget: text(value.budget, 200, 'budget'),
  };
  if (!validEmail(result.email)) throw new InputError('Enter a valid email address');
  if (!TYPES.has(result.type)) throw new InputError('Unknown application type');
  return result;
}

export function cleanBrief(value) {
  const fields = ['name', 'email', 'type', 'goal', 'timing', 'budget'];
  if (!exactKeys(value, fields)) throw new InputError('Invalid brief fields');
  return cleanApplication(value);
}

export function cleanContent(value) {
  if (!exactKeys(value, ['revision', 'experiments', 'products', 'contactEmail'])) throw new InputError('Invalid publisher document');
  if (!Number.isSafeInteger(value.revision) || value.revision < 0) throw new InputError('Invalid publisher revision');
  if (typeof value.contactEmail !== 'string' || value.contactEmail.length > 254 || (value.contactEmail && !validEmail(value.contactEmail))) throw new InputError('Invalid contact email');
  const result = { revision: value.revision, contactEmail: value.contactEmail.trim() };
  for (const kind of ['experiments', 'products']) {
    if (!Array.isArray(value[kind]) || value[kind].length > 100) throw new InputError('Collection must contain at most 100 records');
    const ids = new Set();
    result[kind] = value[kind].map(entry => {
      if (!exactKeys(entry, CONTENT_FIELDS)) throw new InputError('Invalid content record fields');
      const record = {};
      for (const [field, limit] of Object.entries(CONTENT_LIMITS)) record[field] = text(entry[field], limit, field);
      if (!record.id || !/^[\p{L}\p{N}_-]+$/u.test(record.id) || ids.has(record.id)) throw new InputError('Record IDs must be unique and URL safe');
      ids.add(record.id);
      if (!['draft', 'published', 'archived'].includes(record.status)) throw new InputError('Unknown publishing status');
      if (record.status === 'published' && (!record.title || !record.summary || !record.body)) throw new InputError('Publishing requires title, summary and content');
      if (!safeHttps(record.image) || !safeHttps(record.actionUrl)) throw new InputError('Image and action links must use HTTPS');
      if (!!record.actionUrl !== !!record.actionLabel) throw new InputError('An action requires both a label and URL');
      return record;
    });
  }
  return result;
}

export function cleanPricing(value) {
  if (!exactKeys(value, ['revision', 'currency', 'items']) || !Number.isSafeInteger(value.revision) || value.revision < 0) throw new InputError('Invalid rate card');
  if (!['GBP', 'USD', 'EUR', 'INR'].includes(value.currency) || !Array.isArray(value.items) || value.items.length > 50) throw new InputError('Invalid rate card');
  const ids = new Set();
  const items = value.items.map(item => {
    if (!exactKeys(item, ['id', 'label', 'unit', 'low', 'high'])) throw new InputError('Invalid rate item');
    const id = text(item.id, 100, 'rate ID', { required: true });
    const label = text(item.label, 100, 'rate label', { required: true });
    const unit = text(item.unit, 100, 'rate unit', { required: true });
    if (!/^[-\w]+$/.test(id) || ids.has(id)) throw new InputError('Rate items need unique URL-safe IDs');
    ids.add(id);
    if (!Number.isSafeInteger(item.low) || !Number.isSafeInteger(item.high) || item.low <= 0 || item.low > item.high || item.high > 100_000_000) throw new InputError('Enter valid price ranges in minor currency units');
    return { id, label, unit, low: item.low, high: item.high };
  });
  return { revision: value.revision, currency: value.currency, items };
}

export function cleanEstimateSelection(value, pricing) {
  if (!Array.isArray(value) || value.length < 1 || value.length > 50) throw new InputError('Select at least one service');
  const available = new Map(pricing.items.map(item => [item.id, item]));
  const seen = new Set();
  return value.map(choice => {
    if (!exactKeys(choice, ['id', 'quantity']) || typeof choice.id !== 'string' || !available.has(choice.id) || seen.has(choice.id) || !Number.isSafeInteger(choice.quantity) || choice.quantity < 1 || choice.quantity > 100) throw new InputError('Invalid service selection or quantity');
    seen.add(choice.id);
    const item = available.get(choice.id);
    return { ...item, quantity: choice.quantity, lowTotal: item.low * choice.quantity, highTotal: item.high * choice.quantity };
  });
}

export function cleanApplicationCredentials(value) {
  if (!exactKeys(value, ['id', 'accessKey']) || typeof value.id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.id) || typeof value.accessKey !== 'string' || value.accessKey.length < 32 || value.accessKey.length > 128) throw new InputError('Application ID and access key required');
  return value;
}
