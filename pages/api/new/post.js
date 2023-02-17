import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In." });
    }
    const subId = req.body.sub;
    const title = req.body.title;
    const body = req.body.body;
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (title.length > 44) {
      return res
        .status(403)
        .json({ msg: "Title cannot be more than 44 characters long." });
    }
    if (body.length > 500) {
      return res
        .status(403)
        .json({ msg: "Body cannot be more than 500 characters long." });
    }
    if (!title.length || !body.length || !subId.length) {
      return res.status(403).json({ msg: "Please do not leave empty" });
    }

    try {
      const result = await prisma.post.create({
        data: {
          subId,
          title,
          body,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error making post" });
    }
  }
}
