import { Field, ID, ObjectType } from 'type-graphql';
import { Transaction } from './transaction';
import { User } from './user';

@ObjectType()
export class Category {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	title!: string;

	@Field(() => String, { nullable: true })
	description?: string | null;

	@Field(() => String)
	icon!: string;

	@Field(() => String)
	color!: string;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;

	@Field(() => String)
	userId!: string;

	@Field(() => User, { nullable: true })
	user?: User | null;

	@Field(() => [Transaction], { nullable: true })
	transactions?: Transaction[] | null;
}
