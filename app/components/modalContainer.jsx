"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ToggleForms from "../new/toggleForms";
import Modal from "./modal";

export default function ModalContainer() {
  const params = useParams();
  const router = useRouter();
  console.log(params, router);

  return (
    <>
      {params === null && (
        <Modal
          onClose={() => {
            router.back;
          }}
        >
          <ToggleForms />
        </Modal>
      )}
    </>
  );
}
