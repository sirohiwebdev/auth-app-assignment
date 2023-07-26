export class ApplicationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ApplicationError";
  }
}

export class UserError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UserError";
  }
}

export class AuthError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
