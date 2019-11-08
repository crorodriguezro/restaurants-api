import {Request, Response} from "express";
import { getRepository } from "typeorm";

import {Transaction} from "../entity/Transaction";

const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find();
    res.send(transactions);
  } catch (err) {
    res.status(500).json({msg: "unknown error"});
  }
};

export const TransactionsController = {
  getTransactions,
};
