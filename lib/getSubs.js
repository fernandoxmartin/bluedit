import { prisma } from "./prismadb";

export const getSubs = () => {
  const subs = prisma.sub.findMany();
  return subs;
};
