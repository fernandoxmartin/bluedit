import { prisma } from "./prismadb";

export const getTopUsers = async () => {
  const userPosts = await prisma.user.findMany({
    select: {
      name: true,
      id: true,
      image: true,
      posts: {
        select: {
          voteCount: true,
        },
      },
    },
  });

  const topUsers = userPosts.map((user) => {
    return { user, total: user.posts.reduce((a, b) => a + b.voteCount, 0) };
  });

  topUsers.sort((a, b) => (b.total > a.total ? 1 : -1)).slice(0, 3);

  return topUsers;
};
