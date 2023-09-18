"use client";
import { FC } from "react";
import { useDispatch } from "../../servicies/redux/hooks/hooks";
import { setChosenCity } from "@/src/servicies/redux/slices/city";
import { setCookie } from "cookies-next";

const City: FC<{ city: string }> = ({ city }) => {
  const dispatch = useDispatch();
  const chooseCity = () => {
    setCookie("city", city), dispatch(setChosenCity(city));
  };
  return <li onClick={chooseCity}>{city}</li>;
};
export default City;
