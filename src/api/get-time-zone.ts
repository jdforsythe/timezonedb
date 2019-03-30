import { TZDBConfig } from '../config';
import { tzdbRequest, ApiResponse } from '../request';

const ENDPOINT = 'get-time-zone';

/**
 * Valid by fields
 */
interface GetTimeZoneRequestBy {
  by: 'zone' | 'position' | 'city' | 'ip';
}

/**
 * A request to the "/get-time-zone" endpoint
 */
interface GetTimeZoneRequestCommon {
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
}

/**
 * Look up detailed zone information by providing a zone name (free)
 *
 * See: https://timezonedb.com/references/get-time-zone
 */
export interface GetTimeZoneRequestByZone extends GetTimeZoneRequestCommon {
  /**
   * A time zone abbreviation or time zone name
   *
   * See: https://timezonedb.com/references/get-time-zone
   */
  zone: string;
}

/**
 * Look up detailed zone information by providing a latitude and longitude (free)
 *
 * See: https://timezonedb.com/references/get-time-zone
 */
export interface GetTimeZoneRequestByPosition extends GetTimeZoneRequestCommon {
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

/**
 * Look up detailed zone information by providing a city (premium)
 *
 * See: https://timezonedb.com/references/get-time-zone
 */
export interface GetTimeZoneRequestByCity extends GetTimeZoneRequestCommon {
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

/**
 * Look up detailed zone information by providing an IP address (premium)
 *
 * See: https://timezonedb.com/references/get-time-zone
 */
export interface GetTimeZoneRequestByIP extends GetTimeZoneRequestCommon {
  /**
   * A valid IP address
   *
   * See: https://timezonedb.com/references/get-time-zone
   */
  ip: string;
}

/**
 * Request that gets sent to the API for a get-time-zone request
 */
interface GetTimeZoneApiRequest extends GetTimeZoneRequestBy {
  fields?: string;
  zone?: string;
  lat?: string;
  lng?: string;
  country?: string;
  city?: string;
  region?: string;
  page?: number;
  time?: number;
}

/**
 * Time zone information
 *
 * See https://timezonedb.com/references/get-time-zone
 */
export interface TimeZoneDetail {
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

/**
 * API timezone detail record
 */
interface TimeZoneApiDetail {
  countryCode: string;
  countryName: string;
  zoneName: string;
  abbreviation: string;
  gmtOffset: number;
  dst: 0 | 1;
  zoneStart: number;
  zoneEnd: number;
  timestamp: number;
  formatted: string;
  totalPage?: number;
  currentPage?: number;
}

/**
 * Response from the API for a get-time-zone request where one zone is returned
 */
interface GetTimeZoneResponseSingle extends ApiResponse, TimeZoneApiDetail {}

/**
 * Response from the API for a get-time-zone request where multiple zones are returned
 */
interface GetTimeZoneResponseMultiple extends ApiResponse {
  zones: TimeZoneApiDetail[];
}

/**
 * Map passed request to API request
 */
const getApiRequest = (req: GetTimeZoneRequestCommon & GetTimeZoneRequestBy): GetTimeZoneApiRequest => {
  const { fields } = req;

  if (fields) {
    if (Array.isArray(fields)) {
      return { ...req, fields: fields.join(',') };
    }

    return { ...req, fields };
  }

  return <GetTimeZoneApiRequest> req;
};

/**
 * Convert API time zone detail to return time zone detail record
 */
const mapTimeZoneApiDetailToTimeZoneDetail = (apiDetail: TimeZoneApiDetail): TimeZoneDetail => {
  const {
    countryCode,
    countryName,
    zoneName,
    abbreviation,
    gmtOffset,
    dst,
    zoneStart,
    zoneEnd,
    timestamp,
    formatted,
    totalPage,
    currentPage,
  } = apiDetail;

  return {
    countryCode,
    countryName,
    zoneName,
    abbreviation,
    gmtOffset,
    zoneStart,
    zoneEnd,
    timestamp,
    formatted,
    totalPage,
    currentPage,
    dst: !!(dst === 1),
  };
};

/**
 * Get time zone detail by zone name
 *
 * See: https://timezonedb.com/references/get-time-zone
 */
export const getTimeZoneByZone = async (cfg: TZDBConfig, req: GetTimeZoneRequestByZone): Promise<TimeZoneDetail> => {
  const tzReq: GetTimeZoneApiRequest = getApiRequest({ ...req, by: 'zone' });

  const response: GetTimeZoneResponseSingle = await tzdbRequest<GetTimeZoneResponseSingle>(cfg, {
    endpoint: ENDPOINT,
    req: tzReq,
  });

  return mapTimeZoneApiDetailToTimeZoneDetail(response);
};

/**
 * Get time zone detail by geo position
 *
 * See: https://timezonedb.com/references/get-time-zone
 */
export const getTimeZoneByPosition = async (cfg: TZDBConfig, req: GetTimeZoneRequestByPosition): Promise<TimeZoneDetail> => {
  const tzReq: GetTimeZoneApiRequest = getApiRequest({ ...req, by: 'position' });

  const response: GetTimeZoneResponseSingle = await tzdbRequest<GetTimeZoneResponseSingle>(cfg, {
    endpoint: ENDPOINT,
    req: tzReq,
  });

  return mapTimeZoneApiDetailToTimeZoneDetail(response);
};

/**
 * Get time zone detail by city (premium).
 *
 * NOTE: The return value of this HAS NOT BEEN VERIFIED and this could be completely broken.
 *
 * See: https://timezonedb.com/references/get-time-zone
 */
export const getTimeZoneByCity = async (cfg: TZDBConfig, req: GetTimeZoneRequestByCity): Promise<TimeZoneDetail[]> => {
  const tzReq: GetTimeZoneApiRequest = getApiRequest({ ...req, by: 'city' });

  const response: GetTimeZoneResponseMultiple = await tzdbRequest<GetTimeZoneResponseMultiple>(cfg, {
    endpoint: ENDPOINT,
    req: tzReq,
  });

  return response.zones.map(mapTimeZoneApiDetailToTimeZoneDetail);
};

/**
 * Get time zone detail by IP (premium).
 *
 * NOTE: The return value of this HAS NOT BEEN VERIFIED and this could be completely broken.
 *
 * See: https://timezonedb.com/references/get-time-zone
 */
export const getTimeZoneByIP = async (cfg: TZDBConfig, req: GetTimeZoneRequestByIP): Promise<TimeZoneDetail> => {
  const tzReq: GetTimeZoneApiRequest = getApiRequest({ ...req, by: 'ip' });

  const response: GetTimeZoneResponseSingle = await tzdbRequest<GetTimeZoneResponseSingle>(cfg, {
    endpoint: ENDPOINT,
    req: tzReq,
  });

  return mapTimeZoneApiDetailToTimeZoneDetail(response);
};
