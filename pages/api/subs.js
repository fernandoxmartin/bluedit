import { prisma } from "@/lib/prismadb";

export default async function handler(req, res) {
  //get subs for react-query
  if (req.method === "GET") {
    try {
      const data = await prisma.sub.findMany({
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
      res.status(403).json({ msg: "Error has occured while getting subs" });
    }
  }
}
