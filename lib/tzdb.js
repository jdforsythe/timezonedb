"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_time_zones_1 = require("./api/list-time-zones");
const get_time_zone_1 = require("./api/get-time-zone");
const convert_time_zone_1 = require("./api/convert-time-zone");
/**
 * Make requests to TimeZoneDB
 */
class Tzdb {
    constructor(tzdbConfig) {
        this.config = tzdbConfig;
    }
    /**
     * List time zones
     *
     * See: https://timezonedb.com/references/list-time-zone
     */
    listTimeZones(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return list_time_zones_1.listTimeZones(this.config, req);
        });
    }
    /**
     * Get time zone detail by zone name
     *
     * See: https://timezonedb.com/references/get-time-zone
     */
    getTimeZoneByZone(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return get_time_zone_1.getTimeZoneByZone(this.config, req);
        });
    }
    /**
     * Get time zone detail by geo position
     *
     * See: https://timezonedb.com/references/get-time-zone
     */
    getTimeZoneByPosition(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return get_time_zone_1.getTimeZoneByPosition(this.config, req);
        });
    }
    /**
     * Get time zone detail by city (premium).
     * This is not yet implemented as the return type has not been verified.
     *
     * See: https://timezonedb.com/references/get-time-zone
     */
    getTimeZoneByCity(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return get_time_zone_1.getTimeZoneByCity(this.config, req);
        });
    }
    /**
     * Get time zone detail by IP (premium).
     * This is not yet implented as the return type has not been verified.
     *
     * See: https://timezonedb.com/references/get-time-zone
     */
    getTimeZoneByIp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return get_time_zone_1.getTimeZoneByIP(this.config, req);
        });
    }
    convertTimeZone(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return convert_time_zone_1.convertTimeZone(this.config, req);
        });
    }
}
exports.Tzdb = Tzdb;
// TODO: move this to a separate file and export explicitly what is needed
// from the index file. Make sure everything is documented.
// double check the fields are documented properly.
// double check the field names - extra toFormatted on others?
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHpkYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90emRiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSwyREFJK0I7QUFFL0IsdURBVTZCO0FBRTdCLCtEQUlpQztBQUVqQzs7R0FFRztBQUNILE1BQU0sSUFBSTtJQUdSLFlBQVksVUFBdUI7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDRyxhQUFhLENBQUMsR0FBeUI7O1lBQzNDLE9BQU8sK0JBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDRyxpQkFBaUIsQ0FBQyxHQUE2Qjs7WUFDbkQsT0FBTyxpQ0FBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDRyxxQkFBcUIsQ0FBQyxHQUFpQzs7WUFDM0QsT0FBTyxxQ0FBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0csaUJBQWlCLENBQUMsR0FBNkI7O1lBQ25ELE9BQU8saUNBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNHLGVBQWUsQ0FBQyxHQUEyQjs7WUFDL0MsT0FBTywrQkFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0MsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLEdBQTJCOztZQUMvQyxPQUFPLG1DQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBQUE7Q0FDRjtBQUVRLG9CQUFJO0FBRWIsMEVBQTBFO0FBQzFFLDJEQUEyRDtBQUUzRCxtREFBbUQ7QUFDbkQsOERBQThEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVFpEQkNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7XG4gIGxpc3RUaW1lWm9uZXMsXG4gIExpc3RUaW1lWm9uZXNSZXF1ZXN0LFxuICBUaW1lWm9uZSxcbn0gZnJvbSAnLi9hcGkvbGlzdC10aW1lLXpvbmVzJztcblxuaW1wb3J0IHtcbiAgZ2V0VGltZVpvbmVCeVpvbmUsXG4gIEdldFRpbWVab25lUmVxdWVzdEJ5Wm9uZSxcbiAgZ2V0VGltZVpvbmVCeVBvc2l0aW9uLFxuICBHZXRUaW1lWm9uZVJlcXVlc3RCeVBvc2l0aW9uLFxuICBUaW1lWm9uZURldGFpbCxcbiAgR2V0VGltZVpvbmVSZXF1ZXN0QnlDaXR5LFxuICBnZXRUaW1lWm9uZUJ5Q2l0eSxcbiAgZ2V0VGltZVpvbmVCeUlQLFxuICBHZXRUaW1lWm9uZVJlcXVlc3RCeUlQLFxufSBmcm9tICcuL2FwaS9nZXQtdGltZS16b25lJztcblxuaW1wb3J0IHtcbiAgQ29udmVydFRpbWVab25lUmVxdWVzdCxcbiAgVGltZVpvbmVDb252ZXJzaW9uLFxuICBjb252ZXJ0VGltZVpvbmUsXG59IGZyb20gJy4vYXBpL2NvbnZlcnQtdGltZS16b25lJztcblxuLyoqXG4gKiBNYWtlIHJlcXVlc3RzIHRvIFRpbWVab25lREJcbiAqL1xuY2xhc3MgVHpkYiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBUWkRCQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKHR6ZGJDb25maWc/OiBUWkRCQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSB0emRiQ29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3QgdGltZSB6b25lc1xuICAgKlxuICAgKiBTZWU6IGh0dHBzOi8vdGltZXpvbmVkYi5jb20vcmVmZXJlbmNlcy9saXN0LXRpbWUtem9uZVxuICAgKi9cbiAgYXN5bmMgbGlzdFRpbWVab25lcyhyZXE6IExpc3RUaW1lWm9uZXNSZXF1ZXN0KTogUHJvbWlzZTxUaW1lWm9uZVtdPiB7XG4gICAgcmV0dXJuIGxpc3RUaW1lWm9uZXModGhpcy5jb25maWcsIHJlcSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRpbWUgem9uZSBkZXRhaWwgYnkgem9uZSBuYW1lXG4gICAqXG4gICAqIFNlZTogaHR0cHM6Ly90aW1lem9uZWRiLmNvbS9yZWZlcmVuY2VzL2dldC10aW1lLXpvbmVcbiAgICovXG4gIGFzeW5jIGdldFRpbWVab25lQnlab25lKHJlcTogR2V0VGltZVpvbmVSZXF1ZXN0Qnlab25lKTogUHJvbWlzZTxUaW1lWm9uZURldGFpbD4ge1xuICAgIHJldHVybiBnZXRUaW1lWm9uZUJ5Wm9uZSh0aGlzLmNvbmZpZywgcmVxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGltZSB6b25lIGRldGFpbCBieSBnZW8gcG9zaXRpb25cbiAgICpcbiAgICogU2VlOiBodHRwczovL3RpbWV6b25lZGIuY29tL3JlZmVyZW5jZXMvZ2V0LXRpbWUtem9uZVxuICAgKi9cbiAgYXN5bmMgZ2V0VGltZVpvbmVCeVBvc2l0aW9uKHJlcTogR2V0VGltZVpvbmVSZXF1ZXN0QnlQb3NpdGlvbik6IFByb21pc2U8VGltZVpvbmVEZXRhaWw+IHtcbiAgICByZXR1cm4gZ2V0VGltZVpvbmVCeVBvc2l0aW9uKHRoaXMuY29uZmlnLCByZXEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aW1lIHpvbmUgZGV0YWlsIGJ5IGNpdHkgKHByZW1pdW0pLlxuICAgKiBUaGlzIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgYXMgdGhlIHJldHVybiB0eXBlIGhhcyBub3QgYmVlbiB2ZXJpZmllZC5cbiAgICpcbiAgICogU2VlOiBodHRwczovL3RpbWV6b25lZGIuY29tL3JlZmVyZW5jZXMvZ2V0LXRpbWUtem9uZVxuICAgKi9cbiAgYXN5bmMgZ2V0VGltZVpvbmVCeUNpdHkocmVxOiBHZXRUaW1lWm9uZVJlcXVlc3RCeUNpdHkpOiBQcm9taXNlPFRpbWVab25lRGV0YWlsW10+IHtcbiAgICByZXR1cm4gZ2V0VGltZVpvbmVCeUNpdHkodGhpcy5jb25maWcsIHJlcSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRpbWUgem9uZSBkZXRhaWwgYnkgSVAgKHByZW1pdW0pLlxuICAgKiBUaGlzIGlzIG5vdCB5ZXQgaW1wbGVudGVkIGFzIHRoZSByZXR1cm4gdHlwZSBoYXMgbm90IGJlZW4gdmVyaWZpZWQuXG4gICAqXG4gICAqIFNlZTogaHR0cHM6Ly90aW1lem9uZWRiLmNvbS9yZWZlcmVuY2VzL2dldC10aW1lLXpvbmVcbiAgICovXG4gIGFzeW5jIGdldFRpbWVab25lQnlJcChyZXE6IEdldFRpbWVab25lUmVxdWVzdEJ5SVApOiBQcm9taXNlPFRpbWVab25lRGV0YWlsPiB7XG4gICAgcmV0dXJuIGdldFRpbWVab25lQnlJUCh0aGlzLmNvbmZpZywgcmVxKTtcbiAgfVxuXG4gIGFzeW5jIGNvbnZlcnRUaW1lWm9uZShyZXE6IENvbnZlcnRUaW1lWm9uZVJlcXVlc3QpOiBQcm9taXNlPFRpbWVab25lQ29udmVyc2lvbj4ge1xuICAgIHJldHVybiBjb252ZXJ0VGltZVpvbmUodGhpcy5jb25maWcsIHJlcSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgVHpkYiB9O1xuXG4vLyBUT0RPOiBtb3ZlIHRoaXMgdG8gYSBzZXBhcmF0ZSBmaWxlIGFuZCBleHBvcnQgZXhwbGljaXRseSB3aGF0IGlzIG5lZWRlZFxuLy8gZnJvbSB0aGUgaW5kZXggZmlsZS4gTWFrZSBzdXJlIGV2ZXJ5dGhpbmcgaXMgZG9jdW1lbnRlZC5cblxuLy8gZG91YmxlIGNoZWNrIHRoZSBmaWVsZHMgYXJlIGRvY3VtZW50ZWQgcHJvcGVybHkuXG4vLyBkb3VibGUgY2hlY2sgdGhlIGZpZWxkIG5hbWVzIC0gZXh0cmEgdG9Gb3JtYXR0ZWQgb24gb3RoZXJzP1xuIl19