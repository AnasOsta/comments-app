import { db } from "@/app/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import * as z from "zod";
import { User } from "@/app/generated/prisma";

type ResponseData = {
  message: string;
  user?: User | null;
};

const UserSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "POST": {
      try {
        const { email, username, password } = UserSchema.parse(req.body);

        console.log(email, username, password);
        // check if email already exists
        const existingUserByEmail = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (existingUserByEmail) {
          res.status(409).json({ user: null, message: "Email already exists" });
        }

        // check if username already exists
        const existingUserByUsername = await db.user.findUnique({
          where: {
            username,
          },
        });

        if (existingUserByUsername) {
          res
            .status(409)
            .json({ user: null, message: "Username already exists" });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
          },
        });

        res.status(200).json({
          user: newUser,
          message: "User Created successfully",
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!" });
      }
      break;
    }
    default:
      res.status(200).json({ message: "GET" });
      break;
  }
}
