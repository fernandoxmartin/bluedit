import React from "react";
import { Layout } from "@/components/layout";
import { getSubData } from "@/lib/getSubData";
import { Posts } from "@/components/posts";
import { useRouter } from "next/router";
import { AboutCommunity } from "@/components/about-community";
import { getUserId } from "@/lib/getUserId";

export default function Sub({ sub, user }) {
  return (
    <Layout>
      <Posts posts={sub.data.posts} user={user} />
      <AboutCommunity sub={sub.data} user={user} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const sub = await getSubData(context.params.sub);
  const user = await getUserId(context);

  return {
    props: {
      sub: JSON.parse(JSON.stringify(sub)),
      user,
    },
  };
}
