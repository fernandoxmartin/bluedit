"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context/store";

export default function Modal({ children }) {
  const router = useRouter();
  const { open, setOpen } = useGlobalContext();

  const handleOnOpenChange = (open) => {
    if (!open) {
      router.back();
      setOpen(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOnOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-5" />
        <Dialog.Content className="fixed w-full max-w-[650px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded p-4 shadow">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
