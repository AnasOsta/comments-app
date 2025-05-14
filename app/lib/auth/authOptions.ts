import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "../db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub!,
          name: profile.name!,
          email: profile.email!,
          image: profile.picture!,
          role: "user",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: {
          // تغيير من email إلى login لقبول القيمتين
          label: "Email/Username",
          type: "text",
          placeholder: "email@example.com أو اسم المستخدم",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findFirst({
          where: {
            OR: [{ email: credentials.login }, { username: credentials.login }],
          },
        });

        if (!existingUser) {
          return null;
        }

        if (existingUser.password) {
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password
          );
          if (!passwordMatch) {
            return null;
          }
        }
        return {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
          image: existingUser.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.user?.id as string;
      session.user.username = token.user?.username as string;
      return session;
    },
  },
};
