import { parseAsBoolean, useQueryState } from "nuqs";
import { useState } from "react";

export const useAssistantMenuItemModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "open-assistant",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    open,
    close,
    isOpen,
    setIsOpen,
  };
};