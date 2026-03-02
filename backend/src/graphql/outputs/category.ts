import { Field, Int, ObjectType } from 'type-graphql';
import { Category } from '../models/category';

@ObjectType()
export class PaginatedCategory {
	@Field(() => [Category])
	items!: Category[];

	@Field(() => Int)
	total!: number;

	@Field(() => Int)
	skip!: number;

	@Field(() => Int)
	take!: number;
}
