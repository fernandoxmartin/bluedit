import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { prisma } from "@/lib/prismadb";

export default async function handler(req, res) {
  //get comments for react-query
  if (req.method === "GET") {
    const postId = req.query.postId;

    try {
      const data = await prisma.post.findUnique({
        where: { id: postId },
        select: { comments: { include: { user: true } } },
      });
      return res.status(200).json(data);
    } catch (error) {
      res
        .status(403)
        .json({ msg: "Error has occured while getting post comments" });
    }
  }

  // new post comment
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In." });
    }

    const postId = req.query.postId;
    const comment = req.body.comment;

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    try {
      const result = await prisma.comment.create({
        data: {
          userId: user.id,
          postId,
          message: comment,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ msg: "Error making comment" });
    }
  }
}
