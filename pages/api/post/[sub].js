import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  //get posts for react-query
  if (req.method === "GET") {
    const subname = req.query.sub;

    const sub = await prisma.sub.findUnique({
      where: { slug: subname },
    });

    try {
      const data = await prisma.post.findMany({
        orderBy: { voteCount: "desc" },
        where: { subId: sub.id },
        include: {
          post_votes: true,
          user: true,
          sub: true,
          comments: true,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(403).json({ msg: "Error has occured while getting posts" });
    }
  }
}
