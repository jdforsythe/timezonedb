// Using class method
const Tzdb = require('timezonedb').Tzdb;
const tzdb = new Tzdb({ apiToken: 'abc123' });

tzdb.getTimeZoneByZone({ zone: 'America/New_York' })
  .then(console.log)
  .catch(console.error);

// Using method directly
const getTimeZoneByZone = require('timezonedb').getTimeZoneByZone;

getTimeZoneByZone({ apiToken: 'abc123' }, { zone: 'America/New_York' })
  .then(console.log)
  .catch(console.error);
