import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  //get postvotes for react-query
  if (req.method === "GET") {
    try {
      const data = await prisma.post_Vote.findMany({
        include: { post: { select: { voteCount: true } } },
      });
      return res.status(200).json(data);
    } catch (error) {
      res
        .status(403)
        .json({ msg: "Error has occured while getting post votes" });
    }
  }

  // new post vote
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In!" });
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
        const voteCount = await prisma.post.update({
          where: { id: postId },
          data: {
            voteCount: {
              increment: 1,
            },
          },
        });
        res.status(200).json({ result, voteCount });
      } else {
        const result = await prisma.post_Vote.create({
          data: {
            vote: false,
            postId,
            userId: user.id,
          },
        });
        const voteCount = await prisma.post.update({
          where: { id: postId },
          data: {
            voteCount: {
              decrement: 1,
            },
          },
        });
        res.status(200).json({ result, voteCount });
      }
    } catch (err) {
      res.status(403).json({ msg: "Error, please try again!" });
    }
  }

  // remove existing vote
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In!" });
    }

    const voteId = req.body.voteId;
    const postId = req.body.postId;
    const vote = req.body.vote;

    try {
      if (vote === true) {
        const result = await prisma.post_Vote.delete({
          where: { id: voteId },
        });
        const voteCount = await prisma.post.update({
          where: { id: postId },
          data: {
            voteCount: {
              decrement: 1,
            },
          },
        });
        res.status(200).json({ result, voteCount });
      } else {
        const result = await prisma.post_Vote.delete({
          where: { id: voteId },
        });
        const voteCount = await prisma.post.update({
          where: { id: postId },
          data: {
            voteCount: {
              increment: 1,
            },
          },
        });
        res.status(200).json({ result, voteCount });
      }
    } catch (err) {
      res.status(403).json({ msg: "Error deleting vote!" });
    }
  }

  // update existing vote
  if (req.method === "PATCH") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: "Please Sign In!" });
    }

    const voteId = req.body.voteId;
    const vote = req.body.vote;
    const postId = req.body.postId;

    // const postVote = await prisma.post_Vote.findUnique({
    //   where: {id: voteId}
    // })

    try {
      if (vote === true) {
        const result = await prisma.post_Vote.update({
          where: { id: voteId },
          data: {
            vote: vote,
          },
        });
        const voteCount = await prisma.post.update({
          where: { id: postId },
          data: {
            voteCount: {
              increment: 2,
            },
          },
        });
        res.status(200).json({ result, voteCount });
      } else {
        const result = await prisma.post_Vote.update({
          where: { id: voteId },
          data: {
            vote: vote,
          },
        });
        const voteCount = await prisma.post.update({
          where: { id: postId },
          data: {
            voteCount: {
              decrement: 2,
            },
          },
        });
        res.status(200).json({ result, voteCount });
      }
    } catch (err) {
      res.status(403).json({ msg: "Error updating vote!" });
    }
  }
}
