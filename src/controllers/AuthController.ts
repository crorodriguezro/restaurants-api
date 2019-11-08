import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {getRepository} from "typeorm";

import {User} from "../entity/User";
import config from "../config/config";
import * as bcrypt from "bcryptjs";
import {validationResult} from "express-validator";

const login = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({msg: "bad request"});
    return;
  }

  const {username, password} = req.body;

  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail({where: {username}});
  } catch (error) {
    res.status(401).send();
  }

  if (!checkPassword(password, user.password)) {
    res.status(401).send();
    return;
  }

  const token = jwt.sign(
    {username: user.username},
    config.jwtSecret,
    {expiresIn: "1h"}
  );

  res.send(token);
};

const signUp = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({msg: "bad request"});
    return;
  }

  let {username, password} = req.body;

  let user: User = {
    username,
    password: hashPassword(password),
  };

  const userRepository = getRepository(User);
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("error saving user");
    return;
  }

  res.status(201).send("user created");
};

const hashPassword = (clearPassword: string) => {
  return bcrypt.hashSync(clearPassword, 10);
};

const checkPassword = (clearPassword: string, hash: string) => {
  return bcrypt.compareSync(clearPassword, hash);
};

export const AuthController = {
  login,
  signUp,
};
