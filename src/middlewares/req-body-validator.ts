import { NextFunction, Request, RequestHandler, Response } from "express";
import { BadReqError } from "../errors/bad-request.error";

export function RequestBodyValidator(...bodyParams: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      throw new BadReqError("Invalid Request");
    }

    const missingBodyParams: string[] = [];
    for (const param of bodyParams) {
      if (typeof req.body[param] !== "boolean" && !req.body[param]) {
        missingBodyParams.push(param);
      }
    }

    if (missingBodyParams.length) {
      throw new BadReqError(`Missing: ${missingBodyParams.join(", ")}`);
    }

    next();
  };
}
