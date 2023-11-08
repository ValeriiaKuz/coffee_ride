"use client";
import style from "./popup.module.scss";
import { FC, useEffect, useState } from "react";
export const SharePopup: FC<{
  cafeID: string;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ cafeID, setIsOpen }) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const { hostname, href } = window.location;
    setUrl(`${href}/${cafeID}`);
  }, []);
  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setIsOpen(false);
  };
  return (
    <div className={style.popup}>
      <div onClick={copyLink}> Copy link</div>
    </div>
  );
};
