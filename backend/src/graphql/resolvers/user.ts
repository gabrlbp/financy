import {
	Ctx,
	FieldResolver,
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
import { Category } from '../models/category';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';

@Resolver(() => User)
@UseMiddleware(AuthMiddleware)
export class UserResolver {
	private readonly userService = new UserService();
	private readonly categoryService = new CategoryService();
	private readonly transactionService = new TransactionService();

	@Query(() => User)
	async me(@Ctx() ctx: GraphQLContext): Promise<User> {
		return this.userService.findById(ctx.userId);
	}

	@FieldResolver(() => [Category])
	async categories(@Root() user: User): Promise<Category[]> {
		return this.categoryService.findAllByUserId(user.id);
	}

	@FieldResolver(() => [Transaction])
	async transactions(@Root() user: User): Promise<Transaction[]> {
		return this.transactionService.findAllByUserId(user.id);
	}
}
