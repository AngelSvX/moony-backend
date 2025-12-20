import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response } from "express";
import { RequestWithToken } from "../types/request-with-user.interface";

@Injectable()
export class JwtMiddleware implements NestMiddleware{
  use(req: RequestWithToken, res: Response, next: (error?: any) => void) {
    const authHeader = req.headers.authorization
    if(authHeader?.startsWith('Bearer ')){
      req.token = authHeader.replace('Bearer ', '')
    }

    next()

  }
}