import { prisma } from "../../lib/prismadb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const subs = await prisma.sub.findMany();
      return res.status(200).json(subs);
    } catch (error) {
      return res.status(403).json({ msg: error });
    }
  }
}
