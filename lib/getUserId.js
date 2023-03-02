import React from "react";
import { prisma } from "./prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getUserId = async (e) => {
  const session = await getServerSession(e.req, e.res, authOptions);
  if (!session) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    include: {
      post_votes: true,
    },
  });

  return user;
};
