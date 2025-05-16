import { authOptions } from "@/app/lib/auth/authOptions";
import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  switch (req.method) {
    case "POST": {
      if (!session) return res.status(401).json({ message: "Unauthorized" });
      try {
        const { comment, parentId, parentUsername } = await JSON.parse(
          req.body
        );
        await db.comment.create({
          data: {
            userId: session.user.id,
            content: comment,
            parentId,
            parentUsername,
          },
        });
        return res.status(200).json({ message: "Success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    case "GET": {
      try {
        const comments = await db.comment.findMany({
          where: { parentId: null },
          include: {
            user: true,
            replies: {
              include: {
                user: true,
              },
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        });

        const allCommentIds = [
          ...comments.map((c) => c.id),
          ...comments.flatMap((c) => c.replies.map((r) => r.id)),
        ];

        const likes = await db.commentLike.groupBy({
          by: ["commentId"],
          _sum: {
            value: true,
          },
          where: {
            commentId: {
              in: allCommentIds,
            },
          },
        });

        const likeMap = new Map(
          likes.map((l) => [l.commentId, l._sum.value ?? 0])
        );

        const commentsWithLikes = comments.map((c) => ({
          ...c,
          likes: likeMap.get(c.id) || 0,
          replies: c.replies
            .map((r) => ({
              ...r,
              likes: likeMap.get(r.id) || 0,
            }))
            .sort((a, b) => b.likes - a.likes), // ترتيب الردود حسب الإعجابات
        }));

        // ترتيب التعليقات حسب الإعجابات
        const sortedComments = commentsWithLikes.sort(
          (a, b) => b.likes - a.likes
        );

        return res.status(200).json(sortedComments);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }

    case "PUT": {
      if (!session) return res.status(401).json({ message: "Unauthorized" });
      try {
        const { id, content } = await JSON.parse(req.body);
        if (!id || !content)
          return res.status(400).json({ message: "Bad Request" });

        const comment = await db.comment.findUnique({
          where: { id },
        });

        if (!comment) return res.status(404).json({ message: "Not Found" });

        if (comment.userId !== session.user.id)
          return res.status(403).json({ message: "Forbidden" });

        await db.comment.update({
          where: { id },
          data: { content },
        });
        return res.status(200).json({ message: "Success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    case "DELETE": {
      if (!session) return res.status(401).json({ message: "Unauthorized" });
      try {
        const { id } = await JSON.parse(req.body);

        if (!id) return res.status(400).json({ message: "Bad Request" });

        const comment = await db.comment.findUnique({
          where: { id },
        });

        if (!comment) return res.status(404).json({ message: "Not Found" });

        if (comment.userId !== session.user.id)
          return res.status(403).json({ message: "Forbidden" });

        await db.comment.delete({
          where: { id },
        });

        return res.status(200).json({ message: "Success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    default: {
      res.status(405).json({ message: "Method not allowed" });
      break;
    }
  }
}
