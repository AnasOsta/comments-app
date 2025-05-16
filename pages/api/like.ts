import { authOptions } from "@/app/lib/auth/authOptions";
import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { id, method } = await JSON.parse(req.body);

  if (!id) return res.status(400).json({ message: "commentId is required" });

  const comment = await db.comment.findUnique({
    where: {
      id,
    },
  });

  if (!comment) return res.status(404).json({ message: "Not Found" });

  if (comment.userId === session.user.id)
    return res.status(400).json({ message: "You can't like your own comment" });

  if (method === "PLUS") {
    try {
      const userLike = await db.commentLike.findUnique({
        where: {
          userId_commentId: {
            userId: session.user.id,
            commentId: id,
          },
        },
      });

      if (userLike) {
        if (userLike.value === 1) {
          await db.commentLike.delete({
            where: {
              userId_commentId: {
                userId: session.user.id,
                commentId: id,
              },
            },
          });
        } else if (userLike.value === -1) {
          await db.commentLike.update({
            where: {
              userId_commentId: {
                userId: session.user.id,
                commentId: id,
              },
            },
            data: {
              value: 1,
            },
          });
        }
        return res.status(200).json({ message: "Success" });
      } else {
        await db.commentLike.create({
          data: {
            userId: session.user.id,
            commentId: id,
            value: 1,
          },
        });
      }
      return res.status(200).json({ message: "Success" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (method === "MINUS") {
    try {
      const userLike = await db.commentLike.findUnique({
        where: {
          userId_commentId: {
            userId: session.user.id,
            commentId: id,
          },
        },
      });

      if (userLike) {
        if (userLike.value === -1) {
          await db.commentLike.delete({
            where: {
              userId_commentId: {
                userId: session.user.id,
                commentId: id,
              },
            },
          });
        } else if (userLike.value === 1) {
          await db.commentLike.update({
            where: {
              userId_commentId: {
                userId: session.user.id,
                commentId: id,
              },
            },
            data: {
              value: -1,
            },
          });
        }
        return res.status(200).json({ message: "Success" });
      } else {
        await db.commentLike.create({
          data: {
            userId: session.user.id,
            commentId: id,
            value: -1,
          },
        });
      }
      return res.status(200).json({ message: "Success" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ message: "Method Not Allowed" });
  }
}
