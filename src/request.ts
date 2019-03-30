import * as got from 'got';

import { TZDBConfig, config } from './config';
import { NoapiTokenError, ApiRequestError, HttpRequestError } from './error';

/**
 * Request object with intended endpoing and request parameters
 */
export interface ApiRequest {
  endpoint: string;
  req: any; // tslint:disable-line no-any
}

/**
 * Base API response
 */
export interface ApiResponse {
  status: 'OK' | 'FAILED';
  message?: string;
}

interface ApiResponseFull {
  body: ApiResponse;
}

const getBaseUrl = (cfg: TZDBConfig): string => {
  const proto = cfg.https ? 'https://' : 'http://';

  return `${proto}${cfg.host}:${cfg.port}${cfg.basePath}`;
};

const validateConfig = async (cfg: TZDBConfig): Promise<void> => {
  if (!cfg || !cfg.apiToken) {
    throw new NoapiTokenError();
  }
};

/**
 * Make request to TimeZoneDB API
 */
export const tzdbRequest = async <T extends ApiResponse>(cfg: TZDBConfig, apiReq: ApiRequest): Promise<T> => {

  const combinedCfg: TZDBConfig = { ...config, ...cfg };

  await validateConfig(combinedCfg);

  const tzdbReq: got.GotJSONOptions = {
    json: true,
    baseUrl: getBaseUrl(combinedCfg),
    query: {
      key: combinedCfg.apiToken,
      format: 'json',
      ...apiReq.req,
    },
    timeout: combinedCfg.timeoutMs,
  };

  let res: ApiResponseFull;
  try {
    res = await got.get(apiReq.endpoint, tzdbReq);
  }
  catch (ex) {
    throw new HttpRequestError(ex);
  }

  const { body } = res;

  if (body.status === 'FAILED') {
    throw new ApiRequestError(body);
  }

  return <T> body;

};
