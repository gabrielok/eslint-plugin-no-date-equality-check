import { rule } from './rules/no-date-equality-check';

const packageData = require('../package.json') as Record<string, string>;
const meta = { name: packageData.name, version: packageData.version };
const rules = {
  'no-date-equality-check': rule,
};

export { meta, rules };
