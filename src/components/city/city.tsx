"use client";
import { FC } from "react";
import { useDispatch, useSelector } from "../../servicies/redux/hooks/hooks";
import { setChosenCity } from "@/src/servicies/redux/slices/city";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const City: FC<{ city: string; setIsOpen: (isOpen: boolean) => void }> = ({
  city,
  setIsOpen,
}) => {
  const dispatch = useDispatch();
  const accepted = useSelector((state) => state.acceptedCookies.isAccepted);
  const router = useRouter();

  const chooseCity = () => {
    dispatch(setChosenCity(city));
    router.push(`/coffee-points/${city}`);
    setIsOpen(false);
    if (accepted) {
      setCookie("city", city);
    }
  };
  return <li onClick={chooseCity}>{city}</li>;
};
export default City;
