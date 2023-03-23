// import { CreatePostBtn } from "@/components/create-post-btn";
import { getPosts } from "../lib/getPosts";
import Posts from "./components/posts/posts";
import { getUserId } from "@/lib/getUserId";

export default async function Home() {
  const posts = await getPosts();
  const user = await getUserId();

  return (
    <Posts
      posts={JSON.parse(JSON.stringify(posts))}
      user={JSON.parse(JSON.stringify(user))}
    />
  );
}
