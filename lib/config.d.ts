/**
 * TimeZoneDB config
 */
export interface TZDBConfig {
    /**
     * Whether to use the premium API (vip.timezonedb.com)
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
/**
 * Get default config merged with environment variables, if present
 */
export declare const config: TZDBConfig;
