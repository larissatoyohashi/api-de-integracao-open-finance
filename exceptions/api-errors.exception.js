class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || 500;
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Não encontrado') {
    super(message, 404);
  }
}

class BadRequestError extends ApiError {
  constructor(message = 'Requisição inválida') {
    super(message, 400);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = 'Proibido') {
    super(message, 403);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Não autorizado') {
    super(message, 401);
  }
}

export { ApiError, NotFoundError, BadRequestError, ForbiddenError, UnauthorizedError };
