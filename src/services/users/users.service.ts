import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import * as session from 'express-session';

const prisma = new PrismaClient()

export const find = async (req, res) => {
	try {
		const {id, username} = req.query;
		const queryParams = {id: Number(id), username}
		const results = await prisma.user.findFirst({
			where: queryParams,
		});
		res.json(results);
	} catch(e) {
		res.status(500).send(e.message);
	}
}

export const signup = async (req, res) => {
	try {
		const {email, password, username} = req.body;

		if (!(email && password && username)) {
			return res.status(400).send({ error: "Data not formatted properly" });
		}
		
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const result = await prisma.user.create({
			data: {
				email,
				password: hashPassword,
				username,
			}
		});

		res.status(201).json('User created successfully');
	} catch(e) {
		res.status(500).send(e.message);
	}
}

export const login = async (req, res) => {
	try {
		const {email, password} = req.body;
		const results = await prisma.user.findUnique({where: {email: email}});

		if(results) {
			const validPassword = await bcrypt.compare(password, results.password);
			res.status(200).json({ message: "Valid password" });
		} else {
			res.status(400).json({ error: "Invalid Password" });
		}
	} catch (e) {
		res.status(500).send(e.message);
	}
}
