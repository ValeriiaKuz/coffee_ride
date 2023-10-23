"use client";
import Image from "next/image";
import fav from "@/src/images/fav.svg";
import { LoginBefore } from "@/src/components/warning/login-before";
import { FC } from "react";
import style from "./fav-button.module.scss";
import { useIsAuth } from "@/src/hooks/useLoginBefore";
type FavButtonPropType = {
  width: number;
  height: number;
};
export const FavButton: FC<FavButtonPropType> = ({ width, height }) => {
  const { isAuth, isLoginBefore, setLoginBefore } = useIsAuth();
  const addToFavourite = () => {
    if (isAuth) {
      // add to fav func
    } else {
      setLoginBefore(!isLoginBefore);
    }
  };
  return (
    <button className={style.button}>
      <Image
        src={fav}
        alt={"add favourite"}
        width={width}
        height={height}
        onClick={addToFavourite}
      />
      {isLoginBefore && <LoginBefore />}
    </button>
  );
};
