// Using class method
const Tzdb = require('timezonedb').Tzdb;
const tzdb = new Tzdb({ apiToken: 'abc123' });

tzdb.listTimeZones({ fields: ['countryCode', 'zoneName'] })
  .then(console.log)
  .catch(console.error);

// Using method directly
const listTimeZones = require('timezonedb').listTimeZones;

listTimeZones({ apiToken: 'abc123' }, { fields: ['countryCode', 'zoneName'] })
  .then(console.log)
  .catch(console.error);
