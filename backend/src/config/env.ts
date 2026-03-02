import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
	DATABASE_URL: z.string().min(1),
	JWT_SECRET: z.string().min(1),
	PORT: z.coerce.number().default(4000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error(
		'Invalid environment variables:',
		z.treeifyError(parsedEnv.error),
	);
	process.exit(1);
}

export const env = parsedEnv.data;
