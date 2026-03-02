import { Arg, Mutation, Resolver } from 'type-graphql';
import { AuthService } from '@/services/auth';
import { LoginInput, RegisterInput } from '../inputs/auth';
import { AuthOutput } from '../outputs/auth';

@Resolver()
export class AuthResolver {
	private readonly authService = new AuthService();

	@Mutation(() => AuthOutput)
	async register(
		@Arg('input', () => RegisterInput) input: RegisterInput,
	): Promise<AuthOutput> {
		return this.authService.register(input);
	}

	@Mutation(() => AuthOutput)
	async login(
		@Arg('input', () => LoginInput) input: LoginInput,
	): Promise<AuthOutput> {
		return this.authService.login(input);
	}
}
