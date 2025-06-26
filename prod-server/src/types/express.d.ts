// types/express.d.ts
import { Request, Response, NextFunction } from 'express';

declare module 'express' {
  export interface Request {
    user?: {
      _id: string;
      name: string;
      email: string;
    };
  }

  export type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>;
}