import { TZDBConfig } from '../config';
import { tzdbRequest, ApiResponse } from '../request';

const ENDPOINT = 'convert-time-zone';

/**
 * Request to convert between time zones
 *
 * See https://timezonedb.com/references/convert-time-zone
 */
export interface ConvertTimeZoneRequest {
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

/**
 * Request that gets sent to the API for a convert-time-zone request
 */
interface ConvertTimeZoneApiRequest {
  fields?: string;
  from: string;
  to: string;
  time?: number;
}

/**
 * Time zone conversion information
 *
 * See https://timezonedb.com/references/convert-time-zone
 */
export interface TimeZoneConversion {
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

/**
 * Response from the API for a convert-time-zone request
 */
type ConvertTimeZoneResponse = TimeZoneConversion & ApiResponse;

/**
 * Convert API conversion detail to return detail record
 */
const mapConvertTimeZoneResponseToTimeZoneConversion = (resp: ConvertTimeZoneResponse): TimeZoneConversion => {
  const {
    fromZoneName,
    fromAbbreviation,
    fromTimestamp,
    toZoneName,
    toAbbreviation,
    toTimestamp,
    offset,
    toFormatted,
  } = resp;

  return {
    fromZoneName,
    fromAbbreviation,
    fromTimestamp,
    toZoneName,
    toAbbreviation,
    toTimestamp,
    offset,
    toFormatted,
  };
};

/**
 * Map passed request to API request
 */
const getApiRequest = (req: ConvertTimeZoneRequest): ConvertTimeZoneApiRequest => {
  const { fields } = req;

  if (fields) {
    if (Array.isArray(fields)) {
      return { ...req, fields: fields.join(',') };
    }

    return { ...req, fields };
  }

  return <ConvertTimeZoneApiRequest> req;
};

/**
 * Convert from one time zone to another
 *
 * See: https://timezonedb.com/references/convert-time-zone
 */
export const convertTimeZone = async (cfg: TZDBConfig, req: ConvertTimeZoneRequest): Promise<TimeZoneConversion> => {
  const tzReq: ConvertTimeZoneApiRequest = getApiRequest(req);

  const response: ConvertTimeZoneResponse = await tzdbRequest<ConvertTimeZoneResponse>(cfg, {
    endpoint: ENDPOINT,
    req: tzReq,
  });

  return mapConvertTimeZoneResponseToTimeZoneConversion(response);
};
