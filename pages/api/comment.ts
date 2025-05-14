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
      const session = await getServerSession(req, res, authOptions);

      if (!session) return res.status(401).json({ message: "Unauthorized" });
      const { comment, parentId } = await JSON.parse(req.body);
      await db.comment.create({
        data: {
          userId: session.user.id,
          content: comment,
          parentId,
        },
      });
      return res.status(200).json({ message: "Success" });
    }
    case "GET": {
      const comments = await db.comment.findMany({
        where: { parentId: null },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          replies: {
            include: {
              user: true,
              _count: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          _count: true,
        },
      });
      res.status(200).json(comments);
    }
    case "PUT": {
    }
    case "DELETE": {
    }
    default: {
      res.status(405).json({ message: "Method not allowed" });
      break;
    }
  }
}
