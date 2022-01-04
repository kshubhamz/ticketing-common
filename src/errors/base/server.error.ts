export abstract class ServerError extends Error {
  abstract statusCode: number;

  constructor(public errorMessage: string) {
    super(errorMessage);
    Object.setPrototypeOf(this, ServerError.prototype);
  }

  abstract serializeError(): { message: string };
}
