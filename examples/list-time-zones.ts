// Using class method
import { Tzdb, ListTimeZonesRequest } from 'timezonedb';

const tzdb = new Tzdb({ apiToken: 'abc123' });
const req: ListTimeZonesRequest = { fields: ['countryCode', 'zoneName'] };

tzdb.listTimeZones(req)
.then(console.log)
.catch(console.error);

// Using method directly
import { listTimeZones, ListTimeZonesRequest } from 'timezonedb';

const req: ListTimeZonesRequest = { fields: ['countryCode', 'zoneName'] };

listTimeZones({ apiToken: 'abc123' }, req)
  .then(console.log)
  .catch(console.error);
