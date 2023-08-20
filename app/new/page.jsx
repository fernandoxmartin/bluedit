import { prisma } from "@/lib/prismadb";
import Rules from "./rules";
import ToggleForms from "./toggleForms";

export default async function New() {
  const subs = await prisma.sub.findMany();

  return (
    <div className="w-full grid lg:grid-cols-[650px_auto] gap-2 lg:gap-4">
      <ToggleForms subs={JSON.parse(JSON.stringify(subs))} />
      <div className="space-y-2">
        <Rules />
      </div>
    </div>
  );
}
