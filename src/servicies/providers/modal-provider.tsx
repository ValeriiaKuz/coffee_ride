"use client";
import { createContext, ReactNode, useState } from "react";
export const ModalContext = createContext<{
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});
export default function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}
