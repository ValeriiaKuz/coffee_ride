"use client";
import style from "./cities.module.scss";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import Modal from "../../../../components/modal/modal";
import City from "@/src/components/city/city";
import { useContext } from "react";
import { ModalContext } from "@/src/servicies/providers/modal-provider";
import { poppins600 } from "@/src/fonts/fonts";
export default function Cities() {
  // const countriesData = await getDocs(collection(db, "countries"));
  // const countries = countriesData.docs.map((country) => {
  //   return { [country.id]: country.data() };
  // });

  //   Замоканные данные
  interface Country {
    [key: string]: {
      cities: string[];
    };
  }
  const countries: Country[] = [
    { Japan: { cities: ["Tokyo", "Yokohama", "Osaka"] } },
    { Korea: { cities: ["Seoul", "Busan"] } },
    { Thailand: { cities: ["Bangkok", "Phuket"] } },
  ];
  const {
    isOpen,
    setIsOpen,
  }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void } =
    useContext(ModalContext);
  return isOpen ? (
    <Modal setIsOpen={setIsOpen}>
      <div className={style.content}>
        <h1 className={poppins600.className}> Choose your city</h1>
        <div className={style.wrapper}>
          {countries.map((countryObject, index) => {
            const countryName = Object.keys(countryObject)[0];
            const citiesOfCountry = countryObject[countryName].cities;
            return (
              <div key={index} className={style.cities}>
                <h4 className={style.country}>{countryName}</h4>
                <ul>
                  {citiesOfCountry.map((city) => (
                    <City city={city} key={city} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  ) : null;
}
