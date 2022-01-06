import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { BadReqError } from "../errors/bad-request.error";
import { JWT } from "../utils/jwt-utils";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

export const CheckAuthenticated = (secret: Secret) => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.session?.jwt) {
        next(new BadReqError("Not an authenticated request"));
        return;
      }

      const payload = await JWT.verifyToken(req.session.jwt, secret);

      req.user = payload as { id: string; email: string };
      next();
    } catch (err) {
      next(err);
    }
  };
};
