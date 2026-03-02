import { Field, ID, ObjectType } from 'type-graphql';
import { Category } from './category';
import { Transaction } from './transaction';

@ObjectType()
export class User {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	name!: string;

	@Field(() => String)
	email!: string;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;

	@Field(() => [Category], { nullable: true })
	categories?: Category[] | null;

	@Field(() => [Transaction], { nullable: true })
	transactions?: Transaction[] | null;
}
