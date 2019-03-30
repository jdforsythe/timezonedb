/**
 * Error when no API key is available for requests
 */
export class NoapiTokenError extends Error {
  constructor() {
    super('No API key is set');
  }
}

/**
 * An error returned from the API
 */
export class ApiRequestError extends Error {
  readonly responseBody: object;

  constructor(body: object) {
    super('API request failed');

    this.responseBody = body;
  }
}

/**
 * An error in making the request
 */
export class HttpRequestError extends Error {
  readonly reqErr: Error;

  constructor(err: Error) {
    super(`Failed to make API request: ${err.message}`);

    this.reqErr = err;
  }
}
