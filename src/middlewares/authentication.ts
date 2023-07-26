import { RequestHandler } from "express";
import { AuthError } from "../lib/errors";
import { Jwt } from "../lib/jwt";

export const authentication: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AuthError("No auth header present");
    }
    const [, token] = authHeader.split("Bearer");
    //  @ts-ignore
    req.user = Jwt.verify(token.trim());
    next();
  } catch (e) {
    next(e);
  }
};
