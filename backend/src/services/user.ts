import { prisma } from '@/lib/prisma';
import { NotFoundError } from '@/utils/errors';

export class UserService {
	async findById(userId: string) {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user) {
			throw new NotFoundError('User not found');
		}

		return user;
	}

	async getCategoriesByUserId(userId: string) {
		const result = await prisma.user.findUnique({
			where: { id: userId },
			include: { categories: true },
		});
		return result?.categories ?? [];
	}

	async getTransactionsByUserId(userId: string) {
		const result = await prisma.user.findUnique({
			where: { id: userId },
			include: { transactions: true },
		});
		return result?.transactions ?? [];
	}
}
