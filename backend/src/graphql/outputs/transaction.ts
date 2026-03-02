import { Field, Int, ObjectType } from 'type-graphql';
import { Transaction } from '../models/transaction';

@ObjectType()
export class PaginatedTransaction {
	@Field(() => [Transaction])
	items!: Transaction[];

	@Field(() => Int)
	total!: number;

	@Field(() => Int)
	skip!: number;

	@Field(() => Int)
	take!: number;
}
