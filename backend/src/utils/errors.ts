export class AppError extends Error {
	constructor(
		message: string,
		public code: string,
		public statusCode: number = 500,
	) {
		super(message);
		this.name = 'AppError';
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string = 'Unauthorized') {
		super(message, 'UNAUTHORIZED', 401);
		this.name = 'UnauthorizedError';
	}
}

export class BadRequestError extends AppError {
	constructor(message: string) {
		super(message, 'BAD_REQUEST', 400);
		this.name = 'BadRequestError';
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = 'Resource not found') {
		super(message, 'NOT_FOUND', 404);
		this.name = 'NotFoundError';
	}
}

export class ConflictError extends AppError {
	constructor(message: string) {
		super(message, 'CONFLICT', 409);
		this.name = 'ConflictError';
	}
}
