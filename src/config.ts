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
// tslint:disable-next-line cyclomatic-complexity
export const config: TZDBConfig = ((): TZDBConfig => {
  const DEFAULT_FREE_HOST = 'api.timezonedb.com';
  const DEFAULT_PREMIUM_HOST = 'vip.timezonedb.com';
  const DEFAULT_HTTPS_PORT = 443;
  const DEFAULT_HTTP_PORT = 80;
  const DEFAULT_BASE_PATH = '/v2.1';
  const DEFAULT_TIMEOUT_MS = 5000;

  const { env } = process;

  // HTTPS is the default and must be explicitly disabled
  const https: boolean = (env.TZDB_API_HTTP && env.TZDB_API_HTTP.toUpperCase() === 'TRUE') ? false : true;
  const port: number = env.TZDB_API_PORT ? Number(env.TZDB_API_PORT) : (https ? DEFAULT_HTTPS_PORT : DEFAULT_HTTP_PORT);

  // FREE is the default and premium must be explicitly enabled
  const premium: boolean = !!(env.TZDB_API_PREMIUM && env.TZDB_API_PREMIUM.toUpperCase() === 'TRUE');

  const host: string = env.TZDB_API_HOST || (premium ? DEFAULT_PREMIUM_HOST : DEFAULT_FREE_HOST);
  const basePath: string = env.TZDB_API_BASE_PATH || DEFAULT_BASE_PATH;

  const apiToken = env.TZDB_API_TOKEN || undefined;

  const timeoutMs = env.TZDB_API_TIMEOUT ? Number(env.TZDB_API_TIMEOUT) : DEFAULT_TIMEOUT_MS;

  return {
    premium,
    https,
    host,
    port,
    basePath,
    apiToken,
    timeoutMs,
  };
})();
