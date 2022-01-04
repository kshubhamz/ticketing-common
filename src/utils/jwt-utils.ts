import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { BadReqError } from "../errors/bad-request.error";

interface IJWT {
  id: string;
  email: string;
}

export class JWT {
  private constructor() {}

  static createJWT(props: IJWT, secret: Secret): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(props, secret, (err: any, encoded: any) => {
        if (err) {
          reject(err.message);
        }

        if (!encoded) {
          reject(new BadReqError("Not authorized"));
        } else {
          resolve(encoded);
        }
      });
    });
  }

  static verifyToken(token: string, secret: Secret): Promise<JwtPayload> {
    return new Promise<JwtPayload>((resolve, reject) => {
      jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
          reject(err.message);
        }

        if (!decoded) {
          reject(new BadReqError("Invalid token"));
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
