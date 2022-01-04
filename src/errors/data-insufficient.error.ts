import { ServerError } from "./base/server.error";

export class InsufficientDataError extends ServerError {
  statusCode: number = 422;

  constructor(private errMessage: string) {
    super(errMessage);
    Object.setPrototypeOf(this, InsufficientDataError.prototype);
  }

  serializeError(): { message: string } {
    return { message: this.errMessage };
  }
}
