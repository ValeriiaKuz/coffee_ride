"use client";
import Image from "next/image";
import fav from "@/src/images/fav.svg";
import favChosen from "../../images/favChosen.svg";
import { LoginBefore } from "@/src/components/warning/login-before";
import { FC, useEffect, useState } from "react";
import style from "./fav-button.module.scss";
import { useIsAuth } from "@/src/hooks/useLoginBefore";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";

type FavButtonPropType = {
  width: number;
  height: number;
  cafeID: string;
};
export const FavButton: FC<FavButtonPropType> = ({ width, height, cafeID }) => {
  const { userID, isAuth, isLoginBefore, setLoginBefore } = useIsAuth();
  const [favCafes, setFavCafes] = useState<Array<string>>([]);
  const [isFav, setIsFav] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const [isDeletedFromFav, setIsDeletedFromFav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (userID) {
        const favRef = doc(db, "users", userID);
        try {
          const userData = await getDoc(favRef);
          const user = userData.data() as {
            userID: string;
            favourites: string[];
          };
          setFavCafes(user.favourites);
        } catch (e) {
          console.log("Error getting  document:", e);
        }
      }
    };
    fetchData();
  }, [isAddedToFav, isDeletedFromFav, userID]);
  useEffect(() => {
    if (favCafes.includes(cafeID)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [favCafes, cafeID]);

  const addToFavourite = async () => {
    if (isAuth && userID) {
      try {
        setIsLoading(true);
        const userRef = doc(db, "users", userID);
        await setDoc(
          userRef,
          {
            userID: userID,
            favourites: arrayUnion(cafeID),
          },
          { merge: true },
        );
        setIsFav(true);
        setIsLoading(false);
        setIsAddedToFav(true);
      } catch (e) {
        setIsLoading(false);
        console.log("Error adding to fav:", e);
      }
    } else {
      setLoginBefore(!isLoginBefore);
    }
  };
  const deleteFromFavourite = async () => {
    if (isAuth && userID) {
      try {
        setIsLoading(true);
        const userRef = doc(db, "users", userID);
        await updateDoc(userRef, {
          userID: userID,
          favourites: arrayRemove(cafeID),
        });
        setIsFav(false);
        setIsLoading(false);
        setIsDeletedFromFav(true);
      } catch (e) {
        setIsLoading(false);
        console.log("Error deleting from fav:", e);
      }
    } else {
      setLoginBefore(!isLoginBefore);
    }
  };
  return (
    <button
      className={isLoading ? `${style.button} ${style.loading}` : style.button}
      onClick={isFav ? deleteFromFavourite : addToFavourite}
    >
      <Image
        src={isFav ? favChosen : fav}
        alt={"add favourite"}
        width={width}
        height={height}
      />
      {isLoginBefore && <LoginBefore />}
    </button>
  );
};
