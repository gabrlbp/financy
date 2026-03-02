import type { MiddlewareFn } from 'type-graphql';
import { UnauthorizedError } from '@/utils/errors';
import type { GraphQLContext } from '../graphql/context';

export const AuthMiddleware: MiddlewareFn<GraphQLContext> = async (
	{ context },
	next,
) => {
	if (!context.userId) {
		throw new UnauthorizedError('Authentication required');
	}
	return next();
};
