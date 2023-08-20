import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prismadb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(200).json([]);
    }

    try {
      const data = await prisma.user.findUnique({
        where: { email: session?.user?.email },
        select: {
          subs: { select: { name: true, slug: true } },
          joined: { include: { sub: { select: { name: true, slug: true } } } },
        },
      });

      const createdSubs = data.subs.map((created) => {
        return created;
      });

      const joinedSubs = data.joined.map((joined) => {
        return joined.sub;
      });

      const communities = [...createdSubs, ...joinedSubs];

      res.status(200).json(communities);
    } catch (err) {
      res.status(403).json({ msg: "Error retrieving feeds" });
    }
  }
}
