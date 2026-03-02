import { Field, ObjectType } from 'type-graphql';
import { User } from '../models/user';

@ObjectType()
export class AuthOutput {
	@Field(() => String)
	token!: string;

	@Field(() => User)
	user!: User;
}
