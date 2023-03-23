import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In." });
    }
    const subname = req.body.subname;
    const description = req.body.description;
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (subname.length > 20) {
      return res
        .status(403)
        .json({ msg: "Name cannot be more than 20 characters long." });
    }
    if (!subname.length) {
      return res.status(403).json({ msg: "Please do not leave empty" });
    }
    const slug = subname.split(" ").join("").toLowerCase();

    try {
      const result = await prisma.sub.create({
        data: {
          name: subname,
          slug,
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
