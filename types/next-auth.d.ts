import { User as UserDb } from "../generated/prisma/client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserDb;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: UserDb;
  }
}
