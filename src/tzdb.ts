import { TZDBConfig } from './config';
import {
  listTimeZones,
  ListTimeZonesRequest,
  TimeZone,
} from './api/list-time-zones';

import {
  getTimeZoneByZone,
  GetTimeZoneRequestByZone,
  getTimeZoneByPosition,
  GetTimeZoneRequestByPosition,
  TimeZoneDetail,
  GetTimeZoneRequestByCity,
  getTimeZoneByCity,
  getTimeZoneByIP,
  GetTimeZoneRequestByIP,
} from './api/get-time-zone';

import {
  ConvertTimeZoneRequest,
  TimeZoneConversion,
  convertTimeZone,
} from './api/convert-time-zone';

/**
 * Make requests to TimeZoneDB
 */
class Tzdb {
  private readonly config: TZDBConfig;

  constructor(tzdbConfig?: TZDBConfig) {
    this.config = tzdbConfig;
  }

  /**
   * List time zones
   *
   * See: https://timezonedb.com/references/list-time-zone
   */
  async listTimeZones(req: ListTimeZonesRequest): Promise<TimeZone[]> {
    return listTimeZones(this.config, req);
  }

  /**
   * Get time zone detail by zone name
   *
   * See: https://timezonedb.com/references/get-time-zone
   */
  async getTimeZoneByZone(req: GetTimeZoneRequestByZone): Promise<TimeZoneDetail> {
    return getTimeZoneByZone(this.config, req);
  }

  /**
   * Get time zone detail by geo position
   *
   * See: https://timezonedb.com/references/get-time-zone
   */
  async getTimeZoneByPosition(req: GetTimeZoneRequestByPosition): Promise<TimeZoneDetail> {
    return getTimeZoneByPosition(this.config, req);
  }

  /**
   * Get time zone detail by city (premium).
   * This is not yet implemented as the return type has not been verified.
   *
   * See: https://timezonedb.com/references/get-time-zone
   */
  async getTimeZoneByCity(req: GetTimeZoneRequestByCity): Promise<TimeZoneDetail[]> {
    return getTimeZoneByCity(this.config, req);
  }

  /**
   * Get time zone detail by IP (premium).
   * This is not yet implented as the return type has not been verified.
   *
   * See: https://timezonedb.com/references/get-time-zone
   */
  async getTimeZoneByIp(req: GetTimeZoneRequestByIP): Promise<TimeZoneDetail> {
    return getTimeZoneByIP(this.config, req);
  }

  async convertTimeZone(req: ConvertTimeZoneRequest): Promise<TimeZoneConversion> {
    return convertTimeZone(this.config, req);
  }
}

export { Tzdb };

// TODO: move this to a separate file and export explicitly what is needed
// from the index file. Make sure everything is documented.

// double check the fields are documented properly.
// double check the field names - extra toFormatted on others?
