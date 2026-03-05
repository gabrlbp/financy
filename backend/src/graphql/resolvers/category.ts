import {
	Arg,
	Ctx,
	FieldResolver,
	ID,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql';
import { AuthMiddleware } from '@/middleware/auth';
import { CategoryService } from '@/services/category';
import { TransactionService } from '@/services/transaction';
import { UserService } from '@/services/user';
import type { GraphQLContext } from '../context';
import { CreateCategoryInput, UpdateCategoryInput } from '../inputs/category';
import { PaginationInput } from '../inputs/pagination';
import { Category } from '../models/category';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';
import { PaginatedCategory } from '../outputs/category';

@Resolver(() => Category)
@UseMiddleware(AuthMiddleware)
export class CategoryResolver {
	private readonly categoryService = new CategoryService();
	private readonly userSerivce = new UserService();
	private readonly transactionService = new TransactionService();

	@Query(() => PaginatedCategory)
	async categories(
		@Arg('pagination', () => PaginationInput) pagination: PaginationInput,
		@Ctx() ctx: GraphQLContext,
	): Promise<PaginatedCategory> {
		return this.categoryService.findAll(
			ctx.userId,
			pagination.skip,
			pagination.take,
		);
	}

	@Query(() => Category)
	async category(
		@Arg('id', () => ID) id: string,
		@Ctx() ctx: GraphQLContext,
	): Promise<Category> {
		return this.categoryService.findById(ctx.userId, id);
	}

	@Mutation(() => Category)
	async createCategory(
		@Arg('input', () => CreateCategoryInput) input: CreateCategoryInput,
		@Ctx() ctx: GraphQLContext,
	): Promise<Category> {
		return this.categoryService.create(ctx.userId, input);
	}

	@Mutation(() => Category)
	async updateCategory(
		@Arg('id', () => ID) id: string,
		@Arg('input', () => UpdateCategoryInput) input: UpdateCategoryInput,
		@Ctx() ctx: GraphQLContext,
	): Promise<Category> {
		return this.categoryService.update(ctx.userId, id, input);
	}

	@Mutation(() => Boolean)
	async deleteCategory(
		@Arg('id', () => ID) id: string,
		@Ctx() ctx: GraphQLContext,
	): Promise<void> {
		await this.categoryService.deleteCategory(ctx.userId, id);
	}

	@FieldResolver(() => User, { nullable: true })
	async user(@Root() category: Category): Promise<User | null> {
		return this.userSerivce.findById(category.userId);
	}

	@FieldResolver(() => [Transaction])
	async transactions(@Root() category: Category): Promise<Transaction[]> {
		return this.transactionService.findAllByCategoryId(category.id);
	}
}
