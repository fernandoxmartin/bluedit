import { Logoutbtn } from "../components/logout-btn";
import { Layout } from "../components/layout";

export default function Home() {
  return (
    <Layout title="Bluedit">
      <main>
        <Logoutbtn />
      </main>
    </Layout>
  );
}
