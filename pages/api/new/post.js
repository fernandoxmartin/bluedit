import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In." });
    }
    const subId = req.body.sub;
    const title = req.body.title;
    const body = req.body.body;

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (title.length > 80) {
      return res
        .status(403)
        .json({ msg: "Post title cannot be greater than 80 characters long!" });
    }
    if (body.length > 500) {
      return res
        .status(403)
        .json({ msg: "Post body cannot be greater than 500 characters long!" });
    }
    if (!title.length || !subId.length) {
      return res
        .status(403)
        .json({ msg: "Your post must include a community and title!" });
    }

    try {
      const result = await prisma.post.create({
        data: {
          userId: prismaUser.id,
          subId,
          title,
          body,
          voteCount: 0,
        },
        include: {
          sub: true,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ msg: "Error, please try again!" });
    }
  }
}
