import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const create = async (newUser) => {
	const {email, password, username} = newUser;
	console.log(newUser)
	const result = await prisma.user.create({
		data: {
			email,
			password,
			username,
		}
	});
	return result;
}
