// app/api/auth/me/route.ts
import { authOptions } from "@/app/lib/auth/authOptions";
import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const session = await getServerSession(req, res, authOptions);

      try {
        const userEmail = session?.user.email;
        console.log("userEmail", userEmail);
        const user = await db.user.findUnique({
          where: { email: userEmail || "" },
          select: {
            id: true,
            email: true,
            username: true,
            name: true,
            role: true,
            image: true,
          },
        });

        res.status(200).json({ user, message: "Success" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ user: null, message: "Internal Server Error" });
      }
      break;
    }
    default: {
      res.status(405).json({ user: null, message: "Method Not Allowed" });
    }
  }
}
