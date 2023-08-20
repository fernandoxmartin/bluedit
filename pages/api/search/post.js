import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  //get posts for react-query
  if (req.method === "GET") {
    const query = req.query.q;

    try {
      const data = await prisma.post.findMany({
        where: {
          title: {
            contains: query,
          },
        },
        include: {
          post_votes: true,
          user: true,
          sub: true,
          comments: true,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(403).json({ msg: "Error has occured while getting posts" });
    }
  }
}
