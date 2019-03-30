import { TZDBConfig } from './config';
import { ListTimeZonesRequest, TimeZone } from './api/list-time-zones';
import { GetTimeZoneRequestByZone, GetTimeZoneRequestByPosition, TimeZoneDetail, GetTimeZoneRequestByCity, GetTimeZoneRequestByIP } from './api/get-time-zone';
import { ConvertTimeZoneRequest, TimeZoneConversion } from './api/convert-time-zone';
/**
 * Make requests to TimeZoneDB
 */
declare class Tzdb {
    private readonly config;
    constructor(tzdbConfig?: TZDBConfig);
    /**
     * List time zones
     *
     * See: https://timezonedb.com/references/list-time-zone
     */
    listTimeZones(req: ListTimeZonesRequest): Promise<TimeZone[]>;
    /**
     * Get time zone detail by zone name
     *
     * See: https://timezonedb.com/references/get-time-zone
     */
    getTimeZoneByZone(req: GetTimeZoneRequestByZone): Promise<TimeZoneDetail>;
    /**
     * Get time zone detail by geo position
     *
     * See: https://timezonedb.com/references/get-time-zone
     */
    getTimeZoneByPosition(req: GetTimeZoneRequestByPosition): Promise<TimeZoneDetail>;
    /**
     * Get time zone detail by city (premium).
     * This is not yet implemented as the return type has not been verified.
     *
     * See: https://timezonedb.com/references/get-time-zone
     */
    getTimeZoneByCity(req: GetTimeZoneRequestByCity): Promise<TimeZoneDetail[]>;
    /**
     * Get time zone detail by IP (premium).
     * This is not yet implented as the return type has not been verified.
     *
     * See: https://timezonedb.com/references/get-time-zone
     */
    getTimeZoneByIp(req: GetTimeZoneRequestByIP): Promise<TimeZoneDetail>;
    convertTimeZone(req: ConvertTimeZoneRequest): Promise<TimeZoneConversion>;
}
export { Tzdb };
