"use client";
import { FC } from "react";
import { useDispatch, useSelector } from "../../servicies/redux/hooks/hooks";
import { setChosenCity } from "@/src/servicies/redux/slices/city";
import { setCookie } from "cookies-next";

const City: FC<{ city: string }> = ({ city }) => {
  const dispatch = useDispatch();
  const accepted = useSelector((state) => state.acceptedCookies.isAccepted);

  const chooseCity = () => {
    dispatch(setChosenCity(city));
    if (accepted) {
      setCookie("city", city);
    }
  };
  return <li onClick={chooseCity}>{city}</li>;
};
export default City;
