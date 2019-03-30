import { TZDBConfig } from '../config';
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
 * List time zones
 *
 * See: https://timezonedb.com/references/list-time-zone
 */
export declare const listTimeZones: (cfg: TZDBConfig, req: ListTimeZonesRequest) => Promise<TimeZone[]>;
