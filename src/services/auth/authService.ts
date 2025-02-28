import { compare, hash } from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { UserPublicModel } from "../../models/UserPublicModel";
import { ErrorMessage } from "../../models/ErrorMessageModel";

export class AuthService {
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
    try {
      const foundUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (foundUser) return ErrorMessage.UserAlreadyExists;

      const saltRounds: number = parseInt(process.env.SALT_ROUND, 10);
      const hashedPassword: string = await hash(password, saltRounds);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          age,
          password: hashedPassword,
        },
      });

      return new UserPublicModel(user.id, user.name, user.email, user.age);
    } catch (_) {
      console.log("Database error: ", _ as Error);
      return ErrorMessage.InternalServerError;
    }
  }

  static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserPublicModel | ErrorMessage> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) return ErrorMessage.UserNotFound;

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) return ErrorMessage.WrongPassword;

      return new UserPublicModel(user.id, user.name, user.email, user.age);
    } catch (_) {
      console.log("Database error: ", _ as Error);
      return ErrorMessage.InternalServerError;
    }
  }
}
