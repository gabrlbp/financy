import { PrismaLibSql} from '@prisma/adapter-libsql';
import { env } from '@/config/env';
import { PrismaClient } from '@/generated/client';

const adapter = new PrismaLibSql({ url: env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });
