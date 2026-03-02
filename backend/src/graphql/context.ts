import type { ExpressContextFunctionArgument } from '@as-integrations/express5';
import { verifyToken } from '@/utils/jwt';

export interface GraphQLContext {
	userId: string;
	req: ExpressContextFunctionArgument['req'];
	res: ExpressContextFunctionArgument['res'];
}

export async function createContext({
	req,
	res,
}: ExpressContextFunctionArgument): Promise<GraphQLContext> {
	const token = extractTokenFromRequest(req);
	let userId: string = '';

	if (token) {
		const payload = verifyToken(token);
		userId = payload.userId;
	}

	return { userId, req, res };
}

function extractTokenFromRequest(
	req: ExpressContextFunctionArgument['req'],
): string | null {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return null;
	}

	const [type, token] = authHeader.split(' ');

	if (type !== 'Bearer' || !token) {
		return null;
	}

	return token;
}
