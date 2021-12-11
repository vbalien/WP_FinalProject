type PrismaUser = import("@prisma/client").User;

namespace Express {
  interface User extends Omit<PrismaUser, "password"> {}
}
