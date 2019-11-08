import {Router} from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { saveTransaction } from "../middlewares/transactions";
import { query } from "express-validator"

import {RestaurantsController} from "../controllers/RestaurantsController";

const router = Router();

router.get("/", [
  checkJwt,
  saveTransaction,
  query("city").optional().isString(),
  query("latitude").optional().isNumeric(),
  query("longitude").optional().isNumeric(),
], RestaurantsController.findRestaurants);

export default router;
