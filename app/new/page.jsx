import { prisma } from "@/lib/prismadb";
import ToggleForms from "./toggleForms";

export default async function New() {
  const subs = await prisma.sub.findMany();

  return <ToggleForms subs={JSON.parse(JSON.stringify(subs))} />;
}
