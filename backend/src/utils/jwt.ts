import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UnauthorizedError } from './errors';

interface TokenPayload {
	userId: string;
}

export function generateToken(payload: TokenPayload): string {
	return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload {
	try {
		const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
		return decoded;
	} catch (_error) {
		throw new UnauthorizedError('Invalid or expired token');
	}
}
