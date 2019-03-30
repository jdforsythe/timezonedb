// Using class method
import { Tzdb, ConvertTimeZoneRequest } from 'timezonedb';

const tzdb = new Tzdb({ apiToken: 'abc123' });
const req: ConvertTimeZoneRequest = { from: 'America/New_York', to: 'Europe/London' };

tzdb.convertTimeZone(req)
.then(console.log)
.catch(console.error);

// Using method directly
import { convertTimeZone, ConvertTimeZoneRequest } from 'timezonedb';

const req: ConvertTimeZoneRequest = { from: 'America/New_York', to: 'Europe/London' };

convertTimeZone({ apiToken: 'abc123' }, req)
  .then(console.log)
  .catch(console.error);
