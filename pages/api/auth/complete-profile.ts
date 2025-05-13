// /app/api/complete-profile/route.ts
import { authOptions } from "@/app/lib/auth/authOptions";
import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      const data = await req.body;
      const { username } = data;
      const session = await getServerSession(req, res, authOptions);

      if (!session?.user?.email) {
        res.status(401).json({ message: "Unauthorized" });
      }
      if (!username) {
        res.status(400).json({ message: "Username is required" });
      }
      const existingUsername = await db.user.findUnique({
        where: { username },
      });
      if (existingUsername) {
        res.status(409).json({ message: "Username already exists" });
      }

      await db.user.update({
        where: { email: session?.user.email || "" },
        data: { username: username },
      });

      res.status(200).json({ message: "Profile completed successfully" });
    }
    default: {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
}
