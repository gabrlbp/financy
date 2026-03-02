import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import { DateTimeISOResolver } from 'graphql-scalars';
import { buildSchema } from 'type-graphql';
import { env } from './config/env';
import { createContext } from './graphql/context';
import { AuthResolver } from './graphql/resolvers/auth';
import { CategoryResolver } from './graphql/resolvers/category';
import { TransactionResolver } from './graphql/resolvers/transaction';
import { UserResolver } from './graphql/resolvers/user';

async function bootstrap() {
	const app = express();

	app.use(
		cors({
			origin: 'http://localhost:5173',
			credentials: true,
		}),
	);

	const schema = await buildSchema({
		resolvers: [
			AuthResolver,
			UserResolver,
			CategoryResolver,
			TransactionResolver,
		],
		scalarsMap: [{ type: Date, scalar: DateTimeISOResolver }],
		validate: false,
	});

	const server = new ApolloServer({ schema });

	await server.start();

	app.use(
		'/graphql',
		express.json(),
		expressMiddleware(server, {
			context: createContext,
		}),
	);

	app.listen(env.PORT, () => {
		console.log(`Server running at http://localhost:${env.PORT}/graphql`);
	});
}

bootstrap().catch((error) => {
	console.error('Failed to start server:', error);
	process.exit(1);
});
