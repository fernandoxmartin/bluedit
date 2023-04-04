import { prisma } from "./prismadb";

export const getPosts = async (e) => {
  if (!e) {
    const posts = prisma.post.findMany({
      include: {
        post_votes: true,
        user: true,
        sub: true,
        comments: true,
      },
    });
    return posts;
  }

  const sub = await prisma.sub.findUnique({
    where: { name: e },
  });
  const posts = await prisma.post.findMany({
    where: { subId: sub.id },
    include: {
      post_votes: true,
      user: true,
      sub: true,
      comments: true,
    },
  });
  return posts;
};
