import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In." });
    }
    const name = req.body.name;
    const description = req.body.description;
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (name.length > 12) {
      return res
        .status(403)
        .json({ msg: "Name cannot be more than 12 characters long." });
    }
    if (!name.length) {
      return res.status(403).json({ msg: "Please do not leave empty" });
    }

    try {
      const result = await prisma.sub.create({
        data: {
          name,
          userId: prismaUser.id,
          description,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error making community" });
    }
  }
}
