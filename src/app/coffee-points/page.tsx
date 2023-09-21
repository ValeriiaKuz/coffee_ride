"use client";
import style from "./coffee-points.module.scss";
import { useContext, useEffect } from "react";
import Cities from "@/src/app/coffee-points/@modal/cities/page";
import { useDispatch, useSelector } from "../../servicies/redux/hooks/hooks";
import { ModalContext } from "@/src/servicies/providers/modal-provider";
import { getCookie } from "cookies-next";
import { setChosenCity } from "@/src/servicies/redux/slices/city";
import { useRouter } from "next/navigation";

export default function CoffeePoints() {
  const dispatch = useDispatch();
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const cityFromCookie: string = getCookie("city") as string;
  const chosenCity = useSelector((state) => state.chosenCity.chosenCity);
  const router = useRouter();

  useEffect(() => {
    if (!chosenCity) {
      if (!cityFromCookie) {
        setIsOpen(true);
      } else {
        router.push(`coffee-points/${chosenCity}`);
        dispatch(setChosenCity(cityFromCookie));
      }
    } else {
      router.push(`coffee-points/${chosenCity}`);
    }
  }, [chosenCity]);
  return (
    <section className={style.coffeePoints}>
      {isOpen && <Cities />}
      {!isOpen && (
        <div>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className={style.mainButton}
          >
            Please,choose city to see coffee-points
          </button>
        </div>
      )}
    </section>
  );
}
