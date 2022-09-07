import express, { Request, Response } from "express";
import * as UserService from "../../services/users/users.service";

export const usersRouter = express.Router();

usersRouter.get("/find", UserService.find);
usersRouter.post("/signup", UserService.signup);
usersRouter.post("/login", UserService.login);
