import { Logoutbtn } from "../components/logout-btn";
import { Layout } from "../components/layout";
import { getPosts } from "@/lib/getPosts";
import { CreatePostBtn } from "@/components/create-post-btn";
import { Posts } from "@/components/posts";

export default function Home({ posts }) {
  return (
    <Layout title="Bluedit">
      <Posts posts={posts} />
      <CreatePostBtn />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const posts = await getPosts();
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}
