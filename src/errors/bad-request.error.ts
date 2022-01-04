import { ServerError } from "./base/server.error";

export class BadReqError extends ServerError {
  statusCode: number = 403;

  constructor(private errMessage: string = "Forbidden") {
    super(errMessage);
    Object.setPrototypeOf(this, BadReqError.prototype);
  }

  serializeError(): { message: string } {
    return { message: this.errMessage };
  }
}
