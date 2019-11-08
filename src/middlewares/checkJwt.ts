import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.headers["authentication"];
    const jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
    const {userId, username} = jwtPayload;
    const newToken = jwt.sign({userId, username}, config.jwtSecret, {
      expiresIn: "1h"
    });
    res.setHeader("token", newToken);
  } catch (error) {
    res.status(401).send();
  }
  next();
};
