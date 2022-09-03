import express, { Request, Response } from "express";
import * as UserService from "../../services/users/users.service";

export const usersRouter = express.Router();

usersRouter.post("/", async (req: Request, res: Response) => {
	try{
		const user = req.body;
		console.log(user)
		const newUser = await UserService.create(user);

		res.status(201).json(newUser);
	} catch(e) {
		res.status(500).send(e.message);
	}
});