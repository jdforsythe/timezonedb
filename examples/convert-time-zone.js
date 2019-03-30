// Using class method
const Tzdb = require('timezonedb').Tzdb;
const tzdb = new Tzdb({ apiToken: 'abc123' });

tzdb.convertTimeZone({ from: 'America/New_York', to: 'Europe/London' })
  .then(console.log)
  .catch(console.error);

// Using method directly
const convertTimeZone = require('timezonedb').convertTimeZone;

convertTimeZone({ apiToken: 'abc123' }, { from: 'America/New_York', to: 'Europe/London' })
  .then(console.log)
  .catch(console.error);
