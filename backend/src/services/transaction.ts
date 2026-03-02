import type { TransactionType } from '@prisma/client';
import type { TransactionWhereInput } from '@/generated/prisma/internal/prismaNamespace';
import { prisma } from '@/lib/prisma';
import { BadRequestError, NotFoundError } from '@/utils/errors';

interface CreateTransactionInput {
	description: string;
	amount: number;
	type: TransactionType;
	date: string | Date;
	categoryId: string;
}

interface UpdateTransactionInput {
	description?: string;
	amount?: number;
	type?: TransactionType;
	date?: string | Date;
	categoryId?: string;
}

interface TransactionFilters {
	month: number;
	year: number;
	description?: string;
	type?: TransactionType;
	categoryId?: string;
}

export class TransactionService {
	async create(
		userId: string,
		{ amount, categoryId, date, description, type }: CreateTransactionInput,
	) {
		const category = await prisma.category.findFirst({
			where: {
				id: categoryId,
				userId,
			},
		});

		if (!category) {
			throw new BadRequestError('Category not found');
		}

		return prisma.transaction.create({
			data: {
				description: description,
				amount: amount,
				type: type,
				date: new Date(date),
				categoryId: categoryId,
				userId,
			},
		});
	}

	async findAll(
		userId: string,
		filters: TransactionFilters,
		skip: number = 0,
		take: number = 10,
	) {
		const startDate = new Date(filters.year, filters.month - 1, 1);
		const endDate = new Date(filters.year, filters.month, 31, 23, 59, 59, 999);

		const where: TransactionWhereInput = {
			userId,
			date: {
				gte: startDate,
				lte: endDate,
			},
		};

		if (filters.description) {
			where.description = {
				contains: filters.description,
				mode: 'insensitive',
			};
		}

		if (filters.type) {
			where.type = filters.type;
		}

		if (filters.categoryId) {
			where.categoryId = filters.categoryId;
		}

		const [transactions, total] = await Promise.all([
			prisma.transaction.findMany({
				where,
				orderBy: { createdAt: 'desc' },
				skip,
				take,
			}),
			prisma.transaction.count({ where }),
		]);

		return { items: transactions, total, skip, take };
	}

	async findById(userId: string, transactionId: string) {
		const transaction = await prisma.transaction.findFirst({
			where: {
				id: transactionId,
				userId,
			},
		});

		if (!transaction) {
			throw new NotFoundError('Transaction not found');
		}

		return transaction;
	}

	async update(
		userId: string,
		transactionId: string,
		{ amount, categoryId, date, description, type }: UpdateTransactionInput,
	) {
		const existingTransaction = await prisma.transaction.findFirst({
			where: {
				id: transactionId,
				userId,
			},
		});

		if (!existingTransaction) {
			throw new NotFoundError('Transaction not found');
		}

		if (categoryId) {
			const category = await prisma.category.findFirst({
				where: {
					id: categoryId,
					userId,
				},
			});

			if (!category) {
				throw new BadRequestError('Category not found');
			}
		}

		return prisma.transaction.update({
			where: { id: transactionId },
			data: {
				amount,
				description,
				type,
				date,
				categoryId,
			},
		});
	}

	async deleteTransaction(userId: string, transactionId: string) {
		const existingTransaction = await prisma.transaction.findFirst({
			where: {
				id: transactionId,
				userId,
			},
		});

		if (!existingTransaction) {
			throw new NotFoundError('Transaction not found');
		}

		await prisma.transaction.delete({
			where: { id: transactionId },
		});

		return true;
	}

	async findAllByCategoryId(categoryId: string) {
		const result = await prisma.transaction.findMany({
			where: { categoryId },
		});

		return result ?? []
	}

	async findAllByUserId(userId: string) {
		const result = await prisma.transaction.findMany({
			where: { userId },
		});

		return result ?? []
	}
}
