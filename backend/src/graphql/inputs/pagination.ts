import { Field, InputType, Int, ObjectType } from 'type-graphql';

@InputType()
export class PaginationInput {
	@Field(() => Int, { defaultValue: 0 })
	skip!: number;

	@Field(() => Int, { defaultValue: 10 })
	take!: number;
}

@ObjectType()
export class PaginatedResponse {
	@Field(() => [Object])
	items!: unknown[];

	@Field(() => Int)
	total!: number;

	@Field(() => Int)
	skip!: number;

	@Field(() => Int)
	take!: number;
}
