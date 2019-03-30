import { TZDBConfig } from '../config';
import { tzdbRequest, ApiResponse } from '../request';

const ENDPOINT = 'list-time-zone';

/**
 * Request for a list of time zones
 *
 * See: https://timezonedb.com/references/list-time-zone
 */
export interface ListTimeZonesRequest {
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

/**
 * Request that gets sent to the API for a list-time-zone request
 */
interface ListTimeZonesApiRequest {
  fields?: string;
  country?: string;
  zone?: string;
}

/**
 * Time zone information
 *
 * See https://timezonedb.com/references/list-time-zone
 */
export interface TimeZone {
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

/**
 * Response from the API for a list-time-zone request
 */
interface ListTimeZonesResponse extends ApiResponse {
  zones: TimeZone[];
}

/**
 * Map passed request to API request
 */
const getApiRequest = (req: ListTimeZonesRequest): ListTimeZonesApiRequest => {
  const { fields } = req || { fields: undefined };

  if (fields) {
    if (Array.isArray(fields)) {
      return { ...req, fields: fields.join(',') };
    }

    return { ...req, fields };
  }

  return <ListTimeZonesApiRequest> req;
};

/**
 * List time zones
 *
 * See: https://timezonedb.com/references/list-time-zone
 */
export const listTimeZones = async (cfg: TZDBConfig, req: ListTimeZonesRequest): Promise<TimeZone[]> => {
  const tzReq: ListTimeZonesApiRequest = getApiRequest(req);

  const response: ListTimeZonesResponse = await tzdbRequest<ListTimeZonesResponse>(cfg, {
    endpoint: ENDPOINT,
    req: tzReq,
  });

  return response.zones;
};
