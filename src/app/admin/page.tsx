"use client";
import { CafeFormWrapper } from "@/src/components/cafe-form/cafe-form-wrapper";
import { AddedCafePreview } from "@/src/components/added-cafe-preview/added-cafe-preview";
import style from "./admin.module.scss";
import { FC, useEffect, useState } from "react";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
import withAuth from "@/src/components/withAuth/withAuth";
import { User } from "firebase/auth";
const AdminPage: FC<{ user: User }> = ({ user }) => {
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
      {user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID ? (
        <span>У вас нет доступа</span>
      ) : (
        <>
          <CafeFormWrapper
            cafeId={cafeId}
            setCafeId={setCafeId}
            cafeCity={cafeCity}
            setCafeCity={setCafeCity}
          />
          {cafeAddedData && <AddedCafePreview cafeAddedData={cafeAddedData} />}
        </>
      )}
    </main>
  );
};
export default withAuth(AdminPage);
