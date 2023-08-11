"use client";
import {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
} from "react";
import { useRouter } from "next/navigation";
import style from "./modal.module.scss";
import ReactDOM from "react-dom";

export default function Modal({
  children,
  setIsOpen,
}: {
  children: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const overlay = useRef<HTMLDivElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    setIsOpen(false);
  }, [router,setIsOpen]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return ReactDOM.createPortal(
    <div ref={overlay} onClick={onClick} className={style.overlay}>
      <div ref={wrapper} className={style.modalContent}>
        <span className={style.close} onClick={onDismiss} />
        {children}
      </div>
    </div>,
    document.getElementById("pop-ups")!,
  );
}
