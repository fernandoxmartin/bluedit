"use client";
import Modal from "@/app/components/modal";
import ToggleForms from "@/app/new/toggleForms";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// import { prisma } from "@/lib/prismadb";

export default function NewModalPage() {
  // const subs = await prisma.sub.findMany();

  const getSubs = async () => {
    const response = await axios.get(`/api/subs`);
    return response.data;
  };

  const subsQuery = useQuery({
    queryKey: ["subs"],
    queryFn: getSubs,
  });

  return (
    <Modal>
      <ToggleForms subs={subsQuery.data} />
    </Modal>
  );
}
