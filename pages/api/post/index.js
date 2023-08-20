import { prisma } from "../../../lib/prismadb";

export default async function handler(req, res) {
  //get posts for react-query
  if (req.method === "GET") {
    const subname = req.query.sub;
    const filter = req.query.filter;

    if (!subname) {
      if (filter === "top") {
        try {
          const data = await prisma.post.findMany({
            orderBy: { voteCount: "desc" },
            include: {
              post_votes: true,
              user: true,
              sub: true,
              comments: true,
            },
          });
          return res.status(200).json(data);
        } catch (error) {
          res
            .status(403)
            .json({ msg: "Error has occured while getting posts" });
        }
      }
      if (filter === "new") {
        try {
          const data = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            include: {
              post_votes: true,
              user: true,
              sub: true,
              comments: true,
            },
          });
          return res.status(200).json(data);
        } catch (error) {
          res
            .status(403)
            .json({ msg: "Error has occured while getting posts" });
        }
      }
      if (filter === "comments") {
        try {
          const data = await prisma.post.findMany({
            orderBy: { comments: { _count: "desc" } },
            include: {
              post_votes: true,
              user: true,
              sub: true,
              comments: true,
            },
          });
          return res.status(200).json(data);
        } catch (error) {
          res
            .status(403)
            .json({ msg: "Error has occured while getting posts" });
        }
      }
    } else {
      const sub = await prisma.sub.findUnique({
        where: { slug: subname },
      });
      if (filter === "top") {
        try {
          const data = await prisma.post.findMany({
            where: { subId: sub.id },
            orderBy: { voteCount: "desc" },
            include: {
              post_votes: true,
              user: true,
              sub: true,
              comments: true,
            },
          });
          return res.status(200).json(data);
        } catch (error) {
          res
            .status(403)
            .json({ msg: "Error has occured while getting posts" });
        }
      }
      if (filter === "new") {
        try {
          const data = await prisma.post.findMany({
            where: { subId: sub.id },
            orderBy: { createdAt: "desc" },
            include: {
              post_votes: true,
              user: true,
              sub: true,
              comments: true,
            },
          });
          return res.status(200).json(data);
        } catch (error) {
          res
            .status(403)
            .json({ msg: "Error has occured while getting posts" });
        }
      }
      if (filter === "comments") {
        try {
          const data = await prisma.post.findMany({
            where: { subId: sub.id },
            orderBy: { comments: { _count: "desc" } },
            include: {
              post_votes: true,
              user: true,
              sub: true,
              comments: true,
            },
          });
          return res.status(200).json(data);
        } catch (error) {
          res
            .status(403)
            .json({ msg: "Error has occured while getting posts" });
        }
      }
    }
  }
}

// FOR FILTERING POSTS WITH MOST VOTES WITHIN A CERTAIN TIME FRAME (7 days, 30 days, etc...)
//
//
// if (filter === "hot") {
//   try {
//     let lastDay = Date.now() - 30 * 24 * 60 * 60 * 1000;
//     lastDay = new Date(lastDay).toISOString();
//     const data = await prisma.post.findMany({
//       orderBy: { voteCount: "desc" },
//       where: {
//         createdAt: {
//           gte: lastDay,
//         },
//       },
//       include: {
//         post_votes: true,
//         user: true,
//         sub: true,
//         comments: true,
//       },
//     });
//     return res.status(200).json(data);
//   } catch (error) {
//     res
//       .status(403)
//       .json({ msg: "Error has occured while getting posts" });
//   }
// }
