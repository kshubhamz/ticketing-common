import { ServerError } from "./base/server.error";

export class AuthError extends ServerError {
  statusCode: number = 401;

  constructor(private errMsg: string = "Unauthorized") {
    super(errMsg);
    Object.setPrototypeOf(this, AuthError.prototype);
  }

  serializeError(): { message: string } {
    return { message: this.errMsg };
  }
}
