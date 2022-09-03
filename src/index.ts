//Required External Modules
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {PrismaClient} from '@prisma/client'
import routes from "./routers";

dotenv.config();

//App Variables
if(!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const prisma = new PrismaClient()
const app = express();

//App Config
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", routes);

//Server Activation
app.listen(PORT, () => {
	console.log(`Listening on port http://localhost:${PORT}`);
});
