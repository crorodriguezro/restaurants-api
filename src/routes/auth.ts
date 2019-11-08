import {Router} from "express";
import {AuthController} from "../controllers/AuthController";
import {check} from "express-validator";

const router = Router();

router.post("/sign-up", [
  check("username").isString(),
  check("password").isString(),
], AuthController.signUp);

router.post("/login", AuthController.login);

export default router;