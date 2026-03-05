import { prisma } from '@/lib/prisma';
import { ConflictError, NotFoundError } from '@/utils/errors';

interface CreateCategoryInput {
	title: string;
	description?: string;
	icon: string;
	color: string;
}

type UpdateCategoryInput = Partial<CreateCategoryInput>;

export class CategoryService {
	async create(
		userId: string,
		{ color, icon, title, description }: CreateCategoryInput,
	) {
		const existingCategory = await prisma.category.findUnique({
			where: {
				title_userId: {
					title,
					userId,
				},
			},
		});

		if (existingCategory) {
			throw new ConflictError('Category with this title already exists');
		}

		const category = prisma.category.create({
			data: {
				color,
				icon,
				title,
				userId,
				description,
			},
		});

		return category;
	}

	async findAll(userId: string, skip: number = 0, take: number = 10) {
		const [categories, total] = await Promise.all([
			prisma.category.findMany({
				where: { userId },
				orderBy: { createdAt: 'desc' },
				skip,
				take,
			}),
			prisma.category.count({ where: { userId } }),
		]);

		return { items: categories, total, skip, take };
	}

	async findById(userId: string, categoryId: string) {
		const category = await prisma.category.findFirst({
			where: {
				id: categoryId,
				userId,
			},
		});

		if (!category) {
			throw new NotFoundError('Category not found');
		}

		return category;
	}

	async update(
		userId: string,
		categoryId: string,
		{ color, description, icon, title }: UpdateCategoryInput,
	) {
		const existingCategory = await prisma.category.findFirst({
			where: {
				id: categoryId,
				userId,
			},
		});

		if (!existingCategory) {
			throw new NotFoundError('Category not found');
		}

		if (title && title !== existingCategory.title) {
			const duplicateCategory = await prisma.category.findUnique({
				where: {
					title_userId: {
						title,
						userId,
					},
				},
			});

			if (duplicateCategory) {
				throw new ConflictError('Category with this title already exists');
			}
		}

		return prisma.category.update({
			where: { id: categoryId },
			data: {
				color,
				description,
				icon,
				title,
			},
		});
	}

	async deleteCategory(userId: string, categoryId: string) {
		const existingCategory = await prisma.category.findFirst({
			where: {
				id: categoryId,
				userId,
			},
		});

		if (!existingCategory) {
			throw new NotFoundError('Category not found');
		}

		await prisma.category.delete({
			where: { id: categoryId },
		});
	}

	async findAllByUserId(userId: string) {
		const result = await prisma.category.findMany({
			where: { userId },
		});

		return result ?? [];
	}
}
