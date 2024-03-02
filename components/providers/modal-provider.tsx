"use client";

import { useEffect, useState } from "react";
import { NewProjectModal } from "../modals/new-project-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NewProjectModal />
    </>
  );
}
