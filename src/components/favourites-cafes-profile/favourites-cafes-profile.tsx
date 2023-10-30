"use client";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import CafeCard from "@/src/components/cafe-card/cafe-card";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
import { useEffect, useState } from "react";
import { Loader } from "@/src/components/loader/loader";
export type UserType = {
  userID: string;
  favourites: string[];
};
function FavouritesCafesProfile({ userId }: { userId: string }) {
  const [cafes, setCafes] = useState<CoffeePointType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        const userData: UserType = userSnap.data() as UserType;
        const q = query(
          collection(db, "coffeepoints"),
          where("id", "in", userData.favourites),
        );
        const cafesSnapshot = await getDocs(q);
        setIsLoading(false);
        cafesSnapshot.forEach((doc) =>
          setCafes((prev) => [...prev, doc.data() as CoffeePointType]),
        );
      } catch (e) {
        setIsLoading(false);
        console.log("Error", e);
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {cafes.map((cafe) => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </>
  );
}
export default FavouritesCafesProfile;
