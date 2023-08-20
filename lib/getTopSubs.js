import { prisma } from "./prismadb";

export const getTopSubs = async () => {
  const subs = await prisma.sub.findMany({
    select: {
      name: true,
      id: true,
      members: true,
      slug: true,
    },
  });

  const topSubs = subs.map((sub) => {
    return {
      name: sub.name,
      id: sub.id,
      members: sub.members.length + 1,
      slug: sub.slug,
    };
  });

  topSubs.sort((a, b) => (b.members > a.members ? 1 : -1)).slice(0, 3);

  return topSubs;
};
