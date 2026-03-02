import { prisma } from '@/lib/prisma';
import { ConflictError, UnauthorizedError } from '@/utils/errors';
import { comparePassword, hashPassword } from '@/utils/hash';
import { generateToken } from '@/utils/jwt';

interface RegisterInput {
	name: string;
	email: string;
	password: string;
}

interface LoginInput {
	email: string;
	password: string;
}

export class AuthService {
	async register({ email, name, password }: RegisterInput) {
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			throw new ConflictError('User with this email already exists');
		}

		const hashedPassword = await hashPassword(password);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		const token = generateToken({ userId: user.id });

		return {
			token,
			user,
		};
	}

	async login({ email, password }: LoginInput) {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new UnauthorizedError('Invalid credentials');
		}

		const isValidPassword = await comparePassword(password, user.password);

		if (!isValidPassword) {
			throw new UnauthorizedError('Invalid credentials');
		}

		const token = generateToken({ userId: user.id });

		return {
			token,
			user,
		};
	}
}
