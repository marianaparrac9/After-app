import { Request, Response, NextFunction } from "express";
import Boom from "@hapi/boom";

export const errorsMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const boomError = Boom.isBoom(error) ? error : Boom.boomify(error);

  if (boomError.output.statusCode >= 500) {
    console.error(error);
  }

  return res.status(boomError.output.statusCode).json({
    ...boomError.output.payload,
    details: boomError.data ?? undefined,
  });
};

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
