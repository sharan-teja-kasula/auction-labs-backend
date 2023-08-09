import { NextFunction, Request, Response } from "express";
import tokenDecrypt from "../../src/services/jwt";

import { JwtUserInfo } from "../../src/types/interfaces";

const requestValidator = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"];

      if (!token) return res.status(401).send({ msg: "Unauthorized Access!" });

      const decodedInfo: JwtUserInfo = tokenDecrypt.decryptToken(token);
      req.user = decodedInfo;
      next();
    } else {
      res.status(401).send({ msg: "Unauthorized Access!" });
    }
  } catch (e) {
    res.status(401).send({ msg: "Unauthorized Access!" });
  }
};

export const routeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.url.includes("/api")) {
    next();
  } else {
    requestValidator(req, res, next);
  }
};
