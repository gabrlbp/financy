import { TransactionType as PrismaTransactionType } from '@prisma/client';
import type { Decimal } from '@prisma/client/runtime/client';
import { Field, Float, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Category } from './category';
import { User } from './user';

registerEnumType(PrismaTransactionType, {
	name: 'TransactionType',
});

export { PrismaTransactionType as TransactionType };

@ObjectType()
export class Transaction {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	description!: string;

	@Field(() => Float)
	amount!: Decimal;

	@Field(() => PrismaTransactionType)
	type!: PrismaTransactionType;

	@Field(() => Date)
	date!: Date;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;

	@Field(() => String)
	categoryId!: string;

	@Field(() => Category, { nullable: true })
	category?: Category | null;

	@Field(() => String)
	userId!: string;

	@Field(() => User, { nullable: true })
	user?: User | null;
}
