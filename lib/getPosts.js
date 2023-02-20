import { prisma } from "./prismadb";

export const getPosts = () => {
  const posts = prisma.post.findMany();
  return posts;
};
