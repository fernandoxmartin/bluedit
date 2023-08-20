import { prisma } from "./prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getCommunities = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const data = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    select: {
      subs: { select: { name: true, slug: true } },
      joined: { include: { sub: { select: { name: true, slug: true } } } },
    },
  });

  const createdSubs = data.subs.map((created) => {
    return created;
  });

  const joinedSubs = data.joined.map((joined) => {
    return joined.sub;
  });

  const communities = [...createdSubs, ...joinedSubs];

  return communities;
};
