import { NextFunction, Request, Response } from "express";
import { ServerError } from "../errors/base/server.error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ServerError) {
    res.status(err.statusCode).send(err.serializeError());
    return;
  }
  res.status(500).send({ message: err.message });
};
