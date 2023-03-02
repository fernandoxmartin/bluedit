import { prisma } from "./prismadb";

export const getSubData = async (e) => {
  const data = await prisma.sub.findUnique({
    where: { name: e },
    include: {
      posts: { include: { post_votes: true } },
      members: true,
    },
  });

  return { data };
};
