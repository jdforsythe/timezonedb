"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error when no API key is available for requests
 */
class NoapiTokenError extends Error {
    constructor() {
        super('No API key is set');
    }
}
exports.NoapiTokenError = NoapiTokenError;
/**
 * An error returned from the API
 */
class ApiRequestError extends Error {
    constructor(body) {
        super('API request failed');
        this.responseBody = body;
    }
}
exports.ApiRequestError = ApiRequestError;
/**
 * An error in making the request
 */
class HttpRequestError extends Error {
    constructor(err) {
        super(`Failed to make API request: ${err.message}`);
        this.reqErr = err;
    }
}
exports.HttpRequestError = HttpRequestError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILE1BQWEsZUFBZ0IsU0FBUSxLQUFLO0lBQ3hDO1FBQ0UsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBSkQsMENBSUM7QUFFRDs7R0FFRztBQUNILE1BQWEsZUFBZ0IsU0FBUSxLQUFLO0lBR3hDLFlBQVksSUFBWTtRQUN0QixLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUU1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFSRCwwQ0FRQztBQUVEOztHQUVHO0FBQ0gsTUFBYSxnQkFBaUIsU0FBUSxLQUFLO0lBR3pDLFlBQVksR0FBVTtRQUNwQixLQUFLLENBQUMsK0JBQStCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQVJELDRDQVFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFcnJvciB3aGVuIG5vIEFQSSBrZXkgaXMgYXZhaWxhYmxlIGZvciByZXF1ZXN0c1xuICovXG5leHBvcnQgY2xhc3MgTm9hcGlUb2tlbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcignTm8gQVBJIGtleSBpcyBzZXQnKTtcbiAgfVxufVxuXG4vKipcbiAqIEFuIGVycm9yIHJldHVybmVkIGZyb20gdGhlIEFQSVxuICovXG5leHBvcnQgY2xhc3MgQXBpUmVxdWVzdEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICByZWFkb25seSByZXNwb25zZUJvZHk6IG9iamVjdDtcblxuICBjb25zdHJ1Y3Rvcihib2R5OiBvYmplY3QpIHtcbiAgICBzdXBlcignQVBJIHJlcXVlc3QgZmFpbGVkJyk7XG5cbiAgICB0aGlzLnJlc3BvbnNlQm9keSA9IGJvZHk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBlcnJvciBpbiBtYWtpbmcgdGhlIHJlcXVlc3RcbiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBSZXF1ZXN0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHJlYWRvbmx5IHJlcUVycjogRXJyb3I7XG5cbiAgY29uc3RydWN0b3IoZXJyOiBFcnJvcikge1xuICAgIHN1cGVyKGBGYWlsZWQgdG8gbWFrZSBBUEkgcmVxdWVzdDogJHtlcnIubWVzc2FnZX1gKTtcblxuICAgIHRoaXMucmVxRXJyID0gZXJyO1xuICB9XG59XG4iXX0=