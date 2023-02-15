import { Logoutbtn } from "../components/logout-btn";
import { Layout } from "../components/layout";

import { CreatePostBtn } from "@/components/create-post-btn";
import { Posts } from "@/components/posts";

export default function Home() {
  return (
    <Layout title="Bluedit">
      <Posts />
      <CreatePostBtn />
    </Layout>
  );
}
