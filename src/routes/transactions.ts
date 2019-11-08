import {Router} from "express";
import { checkJwt } from "../middlewares/checkJwt";

import {TransactionsController} from "../controllers/TransactionsController";

const router = Router();

router.get("/", [
  checkJwt,
], TransactionsController.getTransactions);

export default router;
