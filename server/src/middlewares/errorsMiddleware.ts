import { Request, Response, NextFunction } from "express";
import Boom from "@hapi/boom";

export const errorsMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const boomError = Boom.isBoom(error) ? error : Boom.boomify(error);
  return res.status(boomError.output.statusCode).json({
    ...boomError.output.payload,
    message: boomError.message,
  });
};

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
