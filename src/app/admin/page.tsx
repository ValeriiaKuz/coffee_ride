"use client";
import { CafeFormWrapper } from "@/src/components/cafe-form/cafe-form-wrapper";
import { AddedCafePreview } from "@/src/components/added-cafe-preview/added-cafe-preview";
import style from "./admin.module.scss";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
export default function AdminPage() {
  const [cafeId, setCafeId] = useState("");
  const [cafeCity, setCafeCity] = useState("");
  const [cafeAddedData, setCafeAddedData] = useState<CoffeePointType>();

  useEffect(() => {
    if (cafeCity && cafeId) {
      const unsubscribe = onSnapshot(doc(db, cafeCity, cafeId), (doc) => {
        const data: CoffeePointType = doc.data() as CoffeePointType;
        setCafeAddedData(data);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [cafeId, cafeCity]);
  return (
    <main className={style.wrapper}>
      <CafeFormWrapper
        cafeId={cafeId}
        setCafeId={setCafeId}
        cafeCity={cafeCity}
        setCafeCity={setCafeCity}
      />
      {cafeAddedData && <AddedCafePreview cafeAddedData={cafeAddedData} />}
    </main>
  );
}
