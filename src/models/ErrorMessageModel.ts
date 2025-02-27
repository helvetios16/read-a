import { IErrorMessage } from "../interfaces/IErrorMessage";

export class ErrorMessage implements IErrorMessage {
  readonly message: string;
  readonly code: number;
  readonly details?: string;

  private constructor(message: string, code: number, details?: string) {
    this.message = message;
    this.code = code;
    this.details = details;
  }

  static readonly InvalidName = new ErrorMessage("Invalid name", 400);
  static readonly InvalidEmail = new ErrorMessage("Invalid email", 400);
  static readonly InvalidAge = new ErrorMessage("Invalid age", 400);
  static readonly InvalidPassword = new ErrorMessage("Invalid password", 400);
  static readonly UserAlreadyExists = new ErrorMessage(
    "User already exists",
    400,
  );
  static readonly UserNotFound = new ErrorMessage("User not found", 400);
  static readonly InvalidToken = new ErrorMessage("Invalid token", 400);
  static readonly TokenExpired = new ErrorMessage("Token expired", 400);
  static readonly TokenNotFound = new ErrorMessage("Token not found", 400);
  static readonly InternalServerError = new ErrorMessage(
    "Internal server error",
    500,
  );

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}
