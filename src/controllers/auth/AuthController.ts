import { ErrorMessage } from "../../models/ErrorMessageModel";
import { UserPublicModel } from "../../models/UserPublicModel";
import { AuthService } from "../../services/auth/authService";

export class AuthController {
  static async createUser({
    name,
    email,
    age,
    password,
  }: {
    name: string;
    email: string;
    age: number;
    password: string;
  }): Promise<UserPublicModel | ErrorMessage> {
    if (!name || typeof name !== "string") return ErrorMessage.InvalidName;

    if (!email || typeof email !== "string" || !email.includes("@"))
      return ErrorMessage.InvalidEmail;

    if (!age || typeof age !== "number" || age <= 0)
      return ErrorMessage.InvalidAge;

    if (!password || typeof password !== "string" || password.length < 6)
      return ErrorMessage.InvalidPassword;

    const result = await AuthService.createUser({ name, email, age, password });

    if (result instanceof ErrorMessage) return result;

    return result;
  }
}
