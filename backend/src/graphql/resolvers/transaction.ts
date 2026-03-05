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
import { PaginationInput } from '../inputs/pagination';
import {
	CreateTransactionInput,
	TransactionFilterInput,
	UpdateTransactionInput,
} from '../inputs/transaction';
import { Category } from '../models/category';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';
import { PaginatedTransaction } from '../outputs/transaction';

@Resolver(() => Transaction)
@UseMiddleware(AuthMiddleware)
export class TransactionResolver {
	private readonly transactionService = new TransactionService();
	private readonly userService = new UserService();
	private readonly categoryService = new CategoryService();

	@Query(() => PaginatedTransaction)
	async transactions(
		@Arg('filter', () => TransactionFilterInput) filter: TransactionFilterInput,
		@Arg('pagination', () => PaginationInput, {
			defaultValue: { skip: 0, take: 10 },
		})
		pagination: PaginationInput,
		@Ctx() ctx: GraphQLContext,
	): Promise<PaginatedTransaction> {
		return this.transactionService.findAll(
			ctx.userId,
			filter,
			pagination.skip,
			pagination.take,
		);
	}

	@Query(() => Transaction)
	async transaction(
		@Arg('id', () => ID) id: string,
		@Ctx() ctx: GraphQLContext,
	): Promise<Transaction> {
		return this.transactionService.findById(ctx.userId, id);
	}

	@Mutation(() => Transaction)
	async createTransaction(
		@Arg('input', () => CreateTransactionInput) input: CreateTransactionInput,
		@Ctx() ctx: GraphQLContext,
	): Promise<Transaction> {
		return this.transactionService.create(ctx.userId, input);
	}

	@Mutation(() => Transaction)
	async updateTransaction(
		@Arg('id', () => ID) id: string,
		@Arg('input', () => UpdateTransactionInput) input: UpdateTransactionInput,
		@Ctx() ctx: GraphQLContext,
	): Promise<Transaction> {
		return this.transactionService.update(ctx.userId, id, input);
	}

	@Mutation(() => Boolean)
	async deleteTransaction(
		@Arg('id', () => ID) id: string,
		@Ctx() ctx: GraphQLContext,
	): Promise<void> {
		await this.transactionService.deleteTransaction(ctx.userId, id);
	}

	@FieldResolver(() => User, { nullable: true })
	async user(@Root() transaction: Transaction): Promise<User | null> {
		return this.userService.findById(transaction.userId);
	}

	@FieldResolver(() => Category)
	async category(@Root() transaction: Transaction): Promise<Category> {
		return this.categoryService.findById(
			transaction.userId,
			transaction.categoryId,
		);
	}
}
