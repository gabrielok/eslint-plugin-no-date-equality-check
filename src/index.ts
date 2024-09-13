import { configs } from './configs/';
import { rules } from './rules/';

const packageData = require('../package.json') as Record<string, string>;
const meta = { name: packageData.name, version: packageData.version };

export { configs, meta, rules };
