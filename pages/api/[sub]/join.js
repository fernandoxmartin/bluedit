import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Must be logged in to join!" });
    }
    const subId = req.body.subId;

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    try {
      const result = await prisma.joined_Subs.create({
        data: {
          join: true,
          subId,
          userId: user.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ msg: "Error joining, please try again!" });
    }
  }
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Must be logged in to join!" });
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    const joinedSub = await prisma.joined_Subs.findFirst({
      where: { userId: user.id },
    });

    try {
      const result = await prisma.joined_Subs.delete({
        where: { id: joinedSub.id },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ msg: "Error leaving, please try again!" });
    }
  }
}
