import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  //get postvotes for react-query
  if (req.method === "GET") {
    const postId = req.body.post;

    try {
      const data = await prisma.post_Vote.findMany({
        where: { postId },
      });
      return res.status(200).json(data);
    } catch (error) {
      res
        .status(403)
        .json({ msg: "Error has occured while getting postVotes" });
    }
  }

  // new post vote
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In." });
    }

    const postId = req.body.postId;
    const vote = req.body.vote;

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    try {
      if (vote === true) {
        const result = await prisma.post_Vote.create({
          data: {
            vote: true,
            postId,
            userId: user.id,
          },
        });
        res.status(200).json(result);
      } else {
        const result = await prisma.post_Vote.create({
          data: {
            vote: false,
            postId,
            userId: user.id,
          },
        });
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(403).json({ msg: "Error making post vote" });
    }
  }

  // remove existing vote
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In." });
    }

    const voteId = req.body.voteId;

    try {
      const result = await prisma.post_Vote.delete({
        where: { id: voteId },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ msg: "Error deleting post vote" });
    }
  }

  // update existing vote
  if (req.method === "PATCH") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In." });
    }

    const voteId = req.body.voteId;
    const vote = req.body.vote;

    // const postVote = await prisma.post_Vote.findUnique({
    //   where: {id: voteId}
    // })

    try {
      const result = await prisma.post_Vote.update({
        where: { id: voteId },
        data: {
          vote: vote,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ msg: "Error updating post vote" });
    }
  }
}
