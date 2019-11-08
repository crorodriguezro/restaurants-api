import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
const uuidv1 = require('uuid/v1');

import {Transaction} from "../entity/Transaction";

export const saveTransaction = (req: Request, res: Response, next: NextFunction) => {
  const transactionRepository = getRepository(Transaction);

  const transaction: Transaction = {
    id: uuidv1(),
    username: res.locals.jwtPayload.username,
  };

  transactionRepository
    .save(transaction)
    .catch(reason => console.error("Error guardando transaccion", reason));

  next();
};
