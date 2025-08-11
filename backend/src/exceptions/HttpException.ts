export class HttpException extends Error {
  status: number;
  errors?: any;
  constructor(status: number, message: string, errors?: any) {
    super(message);
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}

export class ValidationException extends HttpException {
  constructor(errors: any) {
    super(400, 'Validation error', errors);
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'Not found') {
    super(404, message);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(401, message);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(403, message);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}


export class ConflictException extends HttpException {
  constructor(message = 'Conflict') {
    super(409, message);
    Object.setPrototypeOf(this, ConflictException.prototype);
  }
}
