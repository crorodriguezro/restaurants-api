import { Router } from "express";
import auth from "./auth";
import restaurants from "./restaurants";
import transactions from "./transactions";

const routes = Router();

routes.use("/auth", auth);
routes.use("/restaurants", restaurants);
routes.use("/transactions", transactions);

export default routes;
