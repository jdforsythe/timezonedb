// Using class method
import { Tzdb, GetTimeZoneByZoneRequest } from 'timezonedb';

const tzdb = new Tzdb({ apiToken: 'abc123' });
const req: GetTimeZoneByZoneRequest = { zone: 'America/New_York' };

tzdb.getTimeZoneByZone(req)
.then(console.log)
.catch(console.error);

// Using method directly
import { getTimeZoneByZone, GetTimeZoneByZoneRequest } from 'timezonedb';

const req: GetTimeZoneByZoneRequest = { zone: 'America/New_York' };

getTimeZoneByZone({ apiToken: 'abc123' }, req)
  .then(console.log)
  .catch(console.error);
