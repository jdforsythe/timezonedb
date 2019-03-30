import { TZDBConfig } from './config';
/**
 * Request object with intended endpoing and request parameters
 */
export interface ApiRequest {
    endpoint: string;
    req: any;
}
/**
 * Base API response
 */
export interface ApiResponse {
    status: 'OK' | 'FAILED';
    message?: string;
}
/**
 * Make request to TimeZoneDB API
 */
export declare const tzdbRequest: <T extends ApiResponse>(cfg: TZDBConfig, apiReq: ApiRequest) => Promise<T>;
