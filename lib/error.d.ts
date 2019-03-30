/**
 * Error when no API key is available for requests
 */
export declare class NoapiTokenError extends Error {
    constructor();
}
/**
 * An error returned from the API
 */
export declare class ApiRequestError extends Error {
    readonly responseBody: object;
    constructor(body: object);
}
/**
 * An error in making the request
 */
export declare class HttpRequestError extends Error {
    readonly reqErr: Error;
    constructor(err: Error);
}
