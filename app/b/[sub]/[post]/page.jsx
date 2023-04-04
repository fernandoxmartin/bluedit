import { prisma } from "@/lib/prismadb";
import { getUserId } from "@/lib/getUserId";
import PostCard from "@/app/components/posts/postCard";
import Comments from "./comments";

export default async function Post({ params }) {
  const post = await prisma.post.findUnique({
    where: { id: params.post },
    include: {
      post_votes: true,
      user: true,
      sub: true,
      comments: true,
    },
  });

  const user = await getUserId();

  return (
    <>
      <PostCard
        post={JSON.parse(JSON.stringify(post))}
        user={JSON.parse(JSON.stringify(user))}
      />
      <Comments />
    </>
  );
}
