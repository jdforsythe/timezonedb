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
const got = require("got");
const config_1 = require("./config");
const error_1 = require("./error");
const getBaseUrl = (cfg) => {
    const proto = cfg.https ? 'https://' : 'http://';
    return `${proto}${cfg.host}:${cfg.port}${cfg.basePath}`;
};
const validateConfig = (cfg) => __awaiter(this, void 0, void 0, function* () {
    if (!cfg || !cfg.apiToken) {
        throw new error_1.NoapiTokenError();
    }
});
/**
 * Make request to TimeZoneDB API
 */
exports.tzdbRequest = (cfg, apiReq) => __awaiter(this, void 0, void 0, function* () {
    const combinedCfg = Object.assign({}, config_1.config, cfg);
    yield validateConfig(combinedCfg);
    const tzdbReq = {
        json: true,
        baseUrl: getBaseUrl(combinedCfg),
        query: Object.assign({ key: combinedCfg.apiToken, format: 'json' }, apiReq.req),
        timeout: combinedCfg.timeoutMs,
    };
    let res;
    try {
        res = yield got.get(apiReq.endpoint, tzdbReq);
    }
    catch (ex) {
        throw new error_1.HttpRequestError(ex);
    }
    const { body } = res;
    if (body.status === 'FAILED') {
        throw new error_1.ApiRequestError(body);
    }
    return body;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQkFBMkI7QUFFM0IscUNBQThDO0FBQzlDLG1DQUE2RTtBQXNCN0UsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFlLEVBQVUsRUFBRTtJQUM3QyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUVqRCxPQUFPLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDMUQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxjQUFjLEdBQUcsQ0FBTyxHQUFlLEVBQWlCLEVBQUU7SUFDOUQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7UUFDekIsTUFBTSxJQUFJLHVCQUFlLEVBQUUsQ0FBQztLQUM3QjtBQUNILENBQUMsQ0FBQSxDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLFdBQVcsR0FBRyxDQUE4QixHQUFlLEVBQUUsTUFBa0IsRUFBYyxFQUFFO0lBRTFHLE1BQU0sV0FBVyxxQkFBb0IsZUFBTSxFQUFLLEdBQUcsQ0FBRSxDQUFDO0lBRXRELE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRWxDLE1BQU0sT0FBTyxHQUF1QjtRQUNsQyxJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQ2hDLEtBQUssa0JBQ0gsR0FBRyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQ3pCLE1BQU0sRUFBRSxNQUFNLElBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FDZDtRQUNELE9BQU8sRUFBRSxXQUFXLENBQUMsU0FBUztLQUMvQixDQUFDO0lBRUYsSUFBSSxHQUFvQixDQUFDO0lBQ3pCLElBQUk7UUFDRixHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDL0M7SUFDRCxPQUFPLEVBQUUsRUFBRTtRQUNULE1BQU0sSUFBSSx3QkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNoQztJQUVELE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFckIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM1QixNQUFNLElBQUksdUJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqQztJQUVELE9BQVcsSUFBSSxDQUFDO0FBRWxCLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZ290IGZyb20gJ2dvdCc7XG5cbmltcG9ydCB7IFRaREJDb25maWcsIGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE5vYXBpVG9rZW5FcnJvciwgQXBpUmVxdWVzdEVycm9yLCBIdHRwUmVxdWVzdEVycm9yIH0gZnJvbSAnLi9lcnJvcic7XG5cbi8qKlxuICogUmVxdWVzdCBvYmplY3Qgd2l0aCBpbnRlbmRlZCBlbmRwb2luZyBhbmQgcmVxdWVzdCBwYXJhbWV0ZXJzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBpUmVxdWVzdCB7XG4gIGVuZHBvaW50OiBzdHJpbmc7XG4gIHJlcTogYW55OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWFueVxufVxuXG4vKipcbiAqIEJhc2UgQVBJIHJlc3BvbnNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBpUmVzcG9uc2Uge1xuICBzdGF0dXM6ICdPSycgfCAnRkFJTEVEJztcbiAgbWVzc2FnZT86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEFwaVJlc3BvbnNlRnVsbCB7XG4gIGJvZHk6IEFwaVJlc3BvbnNlO1xufVxuXG5jb25zdCBnZXRCYXNlVXJsID0gKGNmZzogVFpEQkNvbmZpZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHByb3RvID0gY2ZnLmh0dHBzID8gJ2h0dHBzOi8vJyA6ICdodHRwOi8vJztcblxuICByZXR1cm4gYCR7cHJvdG99JHtjZmcuaG9zdH06JHtjZmcucG9ydH0ke2NmZy5iYXNlUGF0aH1gO1xufTtcblxuY29uc3QgdmFsaWRhdGVDb25maWcgPSBhc3luYyAoY2ZnOiBUWkRCQ29uZmlnKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghY2ZnIHx8ICFjZmcuYXBpVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgTm9hcGlUb2tlbkVycm9yKCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFrZSByZXF1ZXN0IHRvIFRpbWVab25lREIgQVBJXG4gKi9cbmV4cG9ydCBjb25zdCB0emRiUmVxdWVzdCA9IGFzeW5jIDxUIGV4dGVuZHMgQXBpUmVzcG9uc2U+KGNmZzogVFpEQkNvbmZpZywgYXBpUmVxOiBBcGlSZXF1ZXN0KTogUHJvbWlzZTxUPiA9PiB7XG5cbiAgY29uc3QgY29tYmluZWRDZmc6IFRaREJDb25maWcgPSB7IC4uLmNvbmZpZywgLi4uY2ZnIH07XG5cbiAgYXdhaXQgdmFsaWRhdGVDb25maWcoY29tYmluZWRDZmcpO1xuXG4gIGNvbnN0IHR6ZGJSZXE6IGdvdC5Hb3RKU09OT3B0aW9ucyA9IHtcbiAgICBqc29uOiB0cnVlLFxuICAgIGJhc2VVcmw6IGdldEJhc2VVcmwoY29tYmluZWRDZmcpLFxuICAgIHF1ZXJ5OiB7XG4gICAgICBrZXk6IGNvbWJpbmVkQ2ZnLmFwaVRva2VuLFxuICAgICAgZm9ybWF0OiAnanNvbicsXG4gICAgICAuLi5hcGlSZXEucmVxLFxuICAgIH0sXG4gICAgdGltZW91dDogY29tYmluZWRDZmcudGltZW91dE1zLFxuICB9O1xuXG4gIGxldCByZXM6IEFwaVJlc3BvbnNlRnVsbDtcbiAgdHJ5IHtcbiAgICByZXMgPSBhd2FpdCBnb3QuZ2V0KGFwaVJlcS5lbmRwb2ludCwgdHpkYlJlcSk7XG4gIH1cbiAgY2F0Y2ggKGV4KSB7XG4gICAgdGhyb3cgbmV3IEh0dHBSZXF1ZXN0RXJyb3IoZXgpO1xuICB9XG5cbiAgY29uc3QgeyBib2R5IH0gPSByZXM7XG5cbiAgaWYgKGJvZHkuc3RhdHVzID09PSAnRkFJTEVEJykge1xuICAgIHRocm93IG5ldyBBcGlSZXF1ZXN0RXJyb3IoYm9keSk7XG4gIH1cblxuICByZXR1cm4gPFQ+IGJvZHk7XG5cbn07XG4iXX0=