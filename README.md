# TimeZoneDB

A simple promise-based (async/await) client library for interacting with [TimeZoneDB API](https://timezonedb.com) with Typescript type definitions.

![Code Coverage](./coverage/badge.svg)

## Install

```sh
npm install --save timezonedb
```

## Simple Example

```js
const Tzdb = require('timezonedb').Tzdb;

const tzdb = new Tzdb({
  apiToken: '123abc',
});

const go = async () => {
  const tz = await tzdb.getTimeZoneByZone({ zone: 'America/New_York' });

  console.log(JSON.stringify(tz));
};
```

```json
  {
    "countryCode": "US",
    "countryName": "United States",
    "zoneName": "America/New_York",
    "abbreviation": "EDT",
    "gmtOffset": -14400,
    "zoneStart": 1552201200,
    "zoneEnd": 1572760799,
    "timestamp": 1553811304,
    "formatted": "2019-03-28 22:15:04",
    "dst": false,
  }
```

## Documentation

### Known Limitations

The premium methods (`getTimeZoneByCity()` and `getTimeZoneByIP()`) are untested since I don't have a premium account. Pull requests are gladly accepted if you test and the code needs changed.

### Class vs request methods

You can either use `new Tzdb(TZDBConfig)` and use the instance methods or you can import the request functions (e.g. `listTimeZones(TZDBConfig, ListTimeZonesRequest)`) directly. The class is just a wrapper for calling the request functions with the provided config.

For example:

```ts
import { Tzdb } from 'timezonedb';

const tzdb = new Tzdb({ apiToken: 'abc123' });

tzdb.getTimeZoneByZone({ zone: 'America/New_York' })
  .then(console.log)
  .catch(console.error);
```

is equivalent to:

```ts
import { getTimeZoneByZone } from 'timezonedb';

const config = { apiToken: 'abc123' };

getTimeZoneByZone(config, { zone: 'America/New_York' })
 .then(console.log)
 .catch(console.error);
 ```

### Tzdb Class Methods

```ts
class Tzdb {
  listTimeZones(ListTimeZonesRequest) // returns `Promise<TimeZone[]>`
  getTimeZoneByZone(GetTimeZoneRequestByZone) // returns `Promise<TimeZoneDetail>`
  getTimeZoneByPosition(GetTimeZoneRequestByPosition) // returns `Promise<TimeZoneDetail>`
  getTimeZoneByCity(GetTimeZoneRequestByCity) // returns `Promise<TimeZoneDetail[]>`
  getTimeZoneByIP(GetTimeZoneRequestByIP) // returns `Promise<TimeZoneDetail>`
  convertTimeZone(ConvertTimeZoneRequest) // returns `Promise<TimeZoneConversion>`
}
```

### Request functions

```ts
import * as tzdb from 'timezonedb';

tzdb.listTimeZones(TZDBConfig, ListTimeZonesRequest) // returns `Promise<TimeZone[]>`
tzdb.getTimeZoneByZone(TZDBConfig, GetTimeZoneRequestByZone) // returns `Promise<TimeZoneDetail>`
tzdb.getTimeZoneByPosition(TZDBConfig, GetTimeZoneRequestByPosition) // returns `Promise<TimeZoneDetail>`
tzdb.getTimeZoneByCity(TZDBConfig, GetTimeZoneRequestByCity) // returns `Promise<TimeZoneDetail[]>`
tzdb.getTimeZoneByIP(TZDBConfig, GetTimeZoneRequestByIP) // returns `Promise<TimeZoneDetail>`
tzdb.convertTimeZone(TZDBConfig, ConvertTimeZoneRequest) // returns `Promise<TimeZoneConversion>`
```

### Parameters

  - `TZDBConfig`

      These values can all be set by their corresponding environment variables or passed as a config object to the class constructor or the request functions.

      ```ts
      {
        /**
         * Whether to use the premium API (vip.timezonedb.com). Enables `getTimeZoneByCity()` and `getTimeZoneByIP()`
        *
        * Default: false
        *
        * Environment variable:
        * TZDB_API_PREMIUM=TRUE
        */
        premium?: boolean;

        /**
         * Whether to use HTTPS to connect to the API
        *
        * Default: true
        *
        * Enviroment variable:
        * TZDB_API_HTTP=FALSE
        */
        https?: boolean;

        /**
         * TimeZoneDB host
        *
        * Default: api.timezonedb.com or vip.timezonedb.com (if premium is set)
        *
        * Environment variable:
        * TZDB_API_HOST=api.timezonedb.com
        */
        host?: string;

        /**
         * TimeZoneDB Port
        *
        * Default: 443 or 80 (if HTTP is set)
        *
        * Environment variable:
        * TZDB_API_PORT=443
        */
        port?: number;

        /**
         * TimeZoneDB API Base Path
        *
        * Default: /v2.1
        *
        * Environment variable:
        * TZDB_API_BASE_PATH=/v2.1
        */
        basePath?: string;

        /**
         * TimeZoneDB API Token
        *
        * Default: undefined
        *
        * Environment variable:
        * TZDB_API_TOKEN=123abc
        */
        apiToken?: string;

        /**
         * Timeout for TimeZoneDB API calls in milliseconds
        *
        * Default: 5000
        *
        * Environment variable:
        * TZDB_API_TIMEOUT=5000
        */
        timeoutMs?: number;
      }
      ```

  - `ListTimeZonesRequest`

      ```ts
      {
        /**
         * Customize the fields to display in response. Use an array of strings or a comma-separated string
         *
         * Options include:
         *
         * countryCode, countryName, zoneName, gmtOffset, timestamp, all (default)
         *
         * See: https://timezonedb.com/references/list-time-zone
         */
        fields?: string | (keyof TimeZone)[];

        /**
         * A valid ISO 3166 country code.
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        country?: string;

        /**
         * The name of a time zone. Use asterisk (*) for wildcard search
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        zone?: string;
      }
      ```

  - `GetTimeZoneRequestByZone`

      ```ts
      {
        /**
         * Customize the fields to display in response. Use an array of strings or a comma-separated string
         *
         * Options include:
         *
         * countryCode, countryName, regionName, cityName, zoneName, abbreviation, gmtOffset,
         * dst, zoneStart, zoneEnd, nextAbbreviation, timestamp, formatted, all (default)
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        fields?: string | (keyof TimeZoneApiDetail)[];

        /**
         * Navigate to other page when result is more than 25 records
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        page?: number;

        /**
         * Unix time in UTC to retrieve zone information for (used for calculating offsets at a particular time)
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        time?: number;

        /**
         * A time zone abbreviation or time zone name
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        zone: string;
      }
      ```

  - `GetTimeZoneRequestByPosition`

      ```ts
      {
        /**
         * Customize the fields to display in response. Use an array of strings or a comma-separated string
         *
         * Options include:
         *
         * countryCode, countryName, regionName, cityName, zoneName, abbreviation, gmtOffset,
         * dst, zoneStart, zoneEnd, nextAbbreviation, timestamp, formatted, all (default)
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        fields?: string | (keyof TimeZoneApiDetail)[];

        /**
         * Navigate to other page when result is more than 25 records
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        page?: number;

        /**
         * Unix time in UTC to retrieve zone information for (used for calculating offsets at a particular time)
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        time?: number;

        /**
         * Latitude of a city
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        lat: number | string;

        /**
         * Longitude of a city
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        lng: number | string;
      }
      ```

  - `GetTimeZoneRequestByCity` (premium and untested)

      ```ts
      {
        /**
         * Customize the fields to display in response. Use an array of strings or a comma-separated string
         *
         * Options include:
         *
         * countryCode, countryName, regionName, cityName, zoneName, abbreviation, gmtOffset,
         * dst, zoneStart, zoneEnd, nextAbbreviation, timestamp, formatted, all (default)
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        fields?: string | (keyof TimeZoneApiDetail)[];

        /**
         * Navigate to other page when result is more than 25 records
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        page?: number;

        /**
         * Unix time in UTC to retrieve zone information for (used for calculating offsets at a particular time)
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        time?: number;

        /**
         * A valid ISO 3166 country code
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        country: string;

        /**
         * The name of a city. Use asterisk (*) for wildcard search.
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        city: string;

        /**
         * A valid region code of United States
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        region?: string;
      }
      ```

  - `GetTimeZoneRequestByIP` (premium and untested)

      ```ts
      {
        /**
         * Customize the fields to display in response. Use an array of strings or a comma-separated string
         *
         * Options include:
         *
         * countryCode, countryName, regionName, cityName, zoneName, abbreviation, gmtOffset,
         * dst, zoneStart, zoneEnd, nextAbbreviation, timestamp, formatted, all (default)
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        fields?: string | (keyof TimeZoneApiDetail)[];

        /**
         * Navigate to other page when result is more than 25 records
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        page?: number;

        /**
         * Unix time in UTC to retrieve zone information for (used for calculating offsets at a particular time)
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        time?: number;

        /**
         * A valid IP address
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        ip: string;
      }
      ```

  - `ConvertTimeZoneRequest`

      ```ts
      {
        /**
         * Customize the fields to display in response. Use an array of strings or a comma-separated string
         *
         * Options include:
         *
         * fromZoneName, fromAbbreviation, fromTimestamp, toZoneName, toAbbreviation, toTimestamp, toFormatted, offset
         *
         * See: https://timezonedb.com/references/convert-time-zone
         */
        fields?: string | (keyof TimeZoneConversion)[];

        /**
         * A valid abbreviation or name of time zone to convert from
         *
         * See https://timezonedb.com/references/convert-time-zone
         */
        from: string;

        /**
         * A valid abbreviation or name of time zone to convert from
         *
         * See https://timezonedb.com/references/convert-time-zone
         */
        to: string;

        /**
         * Unix time in UTC to retrieve zone information for (used for calculating offsets at a particular time)
         *
         * See: https://timezonedb.com/references/get-time-zone
         */
        time?: number;
      }
      ```

### Responses

  - `TimeZone`

      ```ts
      {
        /**
         * Country code of the time zone
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        countryCode: string;

        /**
         * Country name of the time zone
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        countryName: string;

        /**
         * The time zone name
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        zoneName: string;

        /**
         * The time offset in seconds based on UTC time
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        gmtOffset: number;

        /**
         * Current local time in Unix time. Subtract `gmtOffset` to get UTC time
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        timestamp: number;
      }
      ```

  - `TimeZoneDetail`

      ```ts
      {
        /**
         * Country code of the time zone
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        countryCode: string;

        /**
         * Country name of the time zone
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        countryName: string;

        /**
         * The time zone name
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        zoneName: string;

        /**
         * Abbreviation of the time zone
         */
        abbreviation: string;

        /**
         * The time offset in seconds based on UTC time
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        gmtOffset: number;

        /**
         * Whether the time zone is in DST at the timestamp
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        dst: boolean;

        /**
         * The unix time in UTC when current time zone start (i.e. start of current DST / non-DST period)
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        zoneStart: number;

        /**
         * The unix time in UTC when current time zone start (i.e. start of current DST / non-DST period)
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        zoneEnd: number;

        /**
         * Current local time in unix time. Subtract `gmtOffset` to get UTC time
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        timestamp: number;

        /**
         * Formatted timestamp in `Y-m-d h:i:s` format (e.g. `2019-03-29 03:56:27`)
         *
         * See https://timezonedb.com/references/list-time-zone
         */
        formatted: string;

        /**
         * The total number of pages if results exceed 25
         */
        totalPage?: number;

        /**
         * The current page when results exceed 25
         */
        currentPage?: number;
      }
      ```

  - `TimeZoneConversion`

      ```ts
      {
        /**
         * The time zone name of the origin city
         *
         * See https://timezonedb.com/references/convert-time-zone
         */
        fromZoneName: string;

        /**
         * Time zone abbreviation of the origin city
         *
         * See https://timezonedb.com/references/convert-time-zone
         */
        fromAbbreviation: string;

        /**
         * Time of the origin city in unix time
         *
         * See https://timezonedb.com/references/convert-time-zone
         */
        fromTimestamp: number;

        /**
         * The time zone name of the destination city
         *
         * See https://timezonedb.com/references/convert-time-zone
         */
        toZoneName: string;

        /**
         * Time zone abbreviation of the destination city
         *
         * See https://timezonedb.com/references/convert-time-zone
         */
        toAbbreviation: string;

        /**
         * Time of the destination city in unix time
         *
         * See https://timezonedb.com/references/convert-time-zone
         */
        toTimestamp: number;

        /**
         * Difference in seconds between origin time zone and destination time zone
         *
         * See https://timezonedb.com/references/convert-time-zone
         */
        offset: number;

        /**
         * Formatted timestamp in `Y-m-d h:i:s` format (e.g. `2019-03-29 03:56:27`)
         *
         * See https://timezonedb.com/references/convert-time-zone
         */
        toFormatted?: string;
      }
      ```


## Examples

### List Time Zones

```ts
import { listTimeZones } from 'timezonedb';

listTimeZones({ apiToken: 'abc123' }, { fields: ['countryCode', 'zoneName'] })
  .then(console.log)
  .catch(console.error);
```

```json
[
  {
    "countryCode": "AD",
    "zoneName": "Europe/Andorra"
  },
  ...
]
```

### Get Time Zones by Position

```ts
import { getTimeZoneByPosition } from 'timezonedb';

getTimeZoneByPosition({ apiToken: 'abc123' }, { lat: '53.123', lng: '-80.123', fields: ['countryCode', 'zoneName'] })
  .then(console.log)
  .catch(console.error);
```

```json
[
  {
    "countryCode": "AD",
    "zoneName": "Europe/Andorra"
  },
  ...
]
```

More examples can be found in the `/examples` folder.
