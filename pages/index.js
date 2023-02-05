import { Logoutbtn } from "../components/logout-btn";
import { Layout } from "../components/layout";

import { CreatePostBtn } from "@/components/create-post-btn";

export default function Home() {
  return (
    <Layout title="Bluedit">
      <main className="">
        <CreatePostBtn />
      </main>
    </Layout>
  );
}
