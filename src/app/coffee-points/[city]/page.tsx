"use client";
import style from "../coffee-points.module.scss";
import { useContext, useEffect, useMemo, useState } from "react";
import Cities from "@/src/app/coffee-points/@modal/cities/page";
import { useDispatch, useSelector } from "@/src/servicies/redux/hooks/hooks";
import { ModalContext } from "@/src/servicies/providers/modal-provider";
import CafeCard from "@/src/components/cafe-card/cafe-card";
import { poppins600 } from "@/src/fonts/fonts";
import { SearchAndFilters } from "@/src/components/search-and-filters/search-and-filters";
import {
  CoffeePointType,
  setCoffeePoints,
} from "@/src/servicies/redux/slices/coffeepoints";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { Loader } from "@/src/components/loader/loader";

export async function generateStaticParams() {
  const countriesData = await getDocs(collection(db, "countries"));
  const countries = countriesData.docs.map((country) => {
    return { [country.id]: country.data() };
  });

  return countries.map((country) => ({
    city: Object.keys(country)[0],
  }));
}
export default function CoffeePointsOfCity({
  params,
}: {
  params: { city: string };
}) {
  const dispatch = useDispatch();
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const chosenCity = params.city;
  const coffeePoints = useSelector((state) => state.coffeePoints.coffeePoints);
  const [inputValue, setInputValue] = useState("");
  const [searchedPoints, setSearchedPoints] = useState(coffeePoints);
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState("rating");
  const switchSort = (array: CoffeePointType[], sort: string) => {
    switch (sort) {
      case "rating":
        return [...array].sort((a, b) => b.rating - a.rating);
      case "abc":
        return [...array].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return array;
    }
  };
  const searchedCoffeePoints = useMemo(() => {
    const inputValueLower = inputValue.toLowerCase();
    return inputValue.length < 1
      ? coffeePoints
      : coffeePoints.filter((point) =>
          point.name.toLowerCase().includes(inputValueLower),
        );
  }, [inputValue, coffeePoints]);

  const filteredPoints = useMemo(() => {
    return filter === 0
      ? searchedCoffeePoints
      : searchedCoffeePoints.filter((point) => point.rating >= filter);
  }, [searchedCoffeePoints, filter]);

  const sortedPoints = useMemo(
    () => switchSort(filteredPoints, sort),
    [filteredPoints, sort],
  );

  useEffect(() => {
    setSearchedPoints(sortedPoints);
  }, [sortedPoints, setSearchedPoints]);

  useEffect(() => {
    const fetchData = async (chosenCity: string) => {
      try {
        const q = query(
          collection(db, "coffeepoints"),
          where("city", "==", chosenCity),
        );

        const coffeePointsData = await getDocs(q);
        const coffeePoints = coffeePointsData.docs.map((point) => {
          const data = point.data();
          return {
            address: data.address,
            city: data.city,
            id: data.id,
            name: data.name,
            previews: data.previews,
            rating: data.rating,
            rating_google: data.rating_google,
            rating_ta: data.rating_ta,
            geopoint: {
              latitude: data.geopoint.latitude,
              longitude: data.geopoint.longitude,
            },
          };
        });
        // замоканные данные
        // const coffeePoints = coffeePointsMokData;

        dispatch(setCoffeePoints(coffeePoints));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(chosenCity);
  }, [chosenCity]);

  return (
    <section className={style.coffeePoints}>
      {isOpen && <Cities />}

      <div className={style.contentWrapper}>
        {chosenCity && (
          <h1 className={poppins600.className}>
            coffee points in <span>{chosenCity}</span>
          </h1>
        )}
        <SearchAndFilters
          inputValue={inputValue}
          setInputValue={setInputValue}
          sort={sort}
          filter={filter}
          setFilter={setFilter}
          setSort={setSort}
          points={searchedPoints}
        />
        <div className={style.cardsWrapper}>
          {coffeePoints.length < 1 && <Loader />}
          {searchedPoints.map((cafe) => (
            <CafeCard cafe={cafe} key={cafe.address} />
          ))}
        </div>
      </div>
    </section>
  );
}
