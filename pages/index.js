import { Logoutbtn } from "../components/logout-btn";
import { Layout } from "../components/layout";
import { getPosts } from "@/lib/getPosts";
import { CreatePostBtn } from "@/components/create-post-btn";
import { Posts } from "@/components/posts";
import { getUserId } from "@/lib/getUserId";

export default function Home({ posts, user }) {
  return (
    <Layout title="Bluedit">
      <Posts posts={posts} user={user} />
      <CreatePostBtn />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const posts = await getPosts();
  const user = await getUserId(context);
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)), user },
  };
}
