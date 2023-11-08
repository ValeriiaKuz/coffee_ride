"use client";
import style from "./cookies.module.scss";
import { setAcceptedCookies } from "@/src/servicies/redux/slices/accepted-cookies";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useDispatch, useSelector } from "@/src/servicies/redux/hooks/hooks";
import { useEffect, useState } from "react";
import { ButtonComponent } from "@/src/components/buttons/button";
export const CookiesAccept = () => {
  const [showComponent, setShowComponent] = useState(false);
  const isAcceptedCookies = getCookie("acceptedCookies");
  const accepted = useSelector((state) => state.acceptedCookies.isAccepted);
  const dispatch = useDispatch();
  let date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  const acceptCookies = () => {
    dispatch(setAcceptedCookies(true));
    setCookie("acceptedCookies", true, { expires: date });
  };
  const denyCookies = () => {
    dispatch(setAcceptedCookies(false));
    deleteCookie("acceptedCookies");
  };
  useEffect(() => {
    if (isAcceptedCookies) {
      dispatch(setAcceptedCookies(true));
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (accepted || !showComponent || accepted === false) {
    return null;
  } else {
    return (
      <div className={style.notification}>
        <p className={style.info}>
          This website uses cookies in order to offer you the most relevant
          information. Please accept cookies for optimal performance. By
          continuing to use the website, you allow the use of cookie files.
        </p>
        <ButtonComponent
          onHandleClick={acceptCookies}
          title={"Accept cookies"}
          bgC={"var(--second-color)"}
          color={"var(--light-color)"}
          hoverC={"var(--second-color-lighter)"}
        />
        <ButtonComponent
          onHandleClick={denyCookies}
          title={"Disable cookies"}
          bgC={"transparent"}
          color={"var(--second-color)"}
          hoverC={"var(--light-color)"}
        />
        <button onClick={denyCookies} className={style.close}>
          &#10005;
        </button>
      </div>
    );
  }
};
