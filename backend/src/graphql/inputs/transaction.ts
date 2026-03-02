import { Field, ID, InputType, Int } from 'type-graphql';
import { TransactionType } from '../models/transaction';

@InputType()
export class CreateTransactionInput {
	@Field(() => String)
	description!: string;

	@Field(() => Number)
	amount!: number;

	@Field(() => TransactionType)
	type!: TransactionType;

	@Field(() => String)
	date!: string;

	@Field(() => ID)
	categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => Number, { nullable: true })
	amount?: number;

	@Field(() => TransactionType, { nullable: true })
	type?: TransactionType;

	@Field(() => String, { nullable: true })
	date?: string;

	@Field(() => ID, { nullable: true })
	categoryId?: string;
}

@InputType()
export class TransactionFilterInput {
	@Field(() => Int)
	month!: number;

	@Field(() => Int)
	year!: number;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => TransactionType, { nullable: true })
	type?: TransactionType;

	@Field(() => ID, { nullable: true })
	categoryId?: string;
}
