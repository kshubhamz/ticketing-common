import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { Model } from "mongoose";
import { BadReqError } from "../errors/bad-request.error";
import { JWT } from "../utils/jwt-utils";

// Hydrated document of user doc
interface IUser {
  email: string;
  password: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

export const CheckAuthenticated = (User: Model<IUser>, secret: Secret) => {
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
      const id = payload["id"];
      const currentUser = await User.findById(id);

      if (!currentUser) {
        next(new BadReqError("Not an authenticated request"));
        return;
      }

      req.user = { id: currentUser.id, email: currentUser.email };
      next();
    } catch (err) {
      next(err);
    }
  };
};
