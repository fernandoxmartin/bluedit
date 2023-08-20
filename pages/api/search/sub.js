import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  //get posts for react-query
  if (req.method === "GET") {
    const query = req.query.q;

    try {
      const data = await prisma.sub.findMany({
        where: {
          slug: {
            contains: query,
          },
        },
        include: {
          _count: {
            select: {
              members: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      res
        .status(403)
        .json({ msg: "Error has occured while getting searched subs" });
    }
  }
}
