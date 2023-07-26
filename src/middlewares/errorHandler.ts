import { ErrorRequestHandler } from "express";
import {
  ApplicationError,
  AuthError,
  NotFoundError,
  UserError,
} from "../lib/errors";

const getStatusCode = (error: unknown) => {
  if (error instanceof ApplicationError) {
    return 500;
  }
  if (error instanceof UserError) {
    return 400;
  }
  if (error instanceof NotFoundError) {
    return 404;
  }
  if (error instanceof AuthError) {
    return 401;
  }
  return 500;
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    console.error(err);
    const payload = {
      message: err.message,
      error: err.name,
    };
    return res.status(getStatusCode(err)).json(payload);
  }
  next();
};
