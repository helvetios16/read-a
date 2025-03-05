import { prisma } from "../../lib/prisma";
import { ErrorMessage } from "../../models/ErrorMessageModel";
import { UserPublicModel } from "../../models/UserPublicModel";

export class UserService {
  static async getUser({ id }: { id: string }) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) return ErrorMessage.UserNotFound;
      return new UserPublicModel(user.id, user.name, user.email, user.age);
    } catch (_) {
      console.log("Database error: ", _ as Error);
      return ErrorMessage.InternalServerError;
    }
  }

  static async updateUser({ id }: { id: string }) {}

  static async deleteUser({ id }: { id: string }) {
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      return new UserPublicModel(user.id, user.name, user.email, user.age);
    } catch (_) {
      console.log("Database error: ", _ as Error);
      return ErrorMessage.InternalServerError;
    }
  }

  static async changePassword({ id }: { id: string }) {}
}
