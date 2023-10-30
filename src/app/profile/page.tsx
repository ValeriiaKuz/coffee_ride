"use client";
import withAuth from "@/src/components/withAuth/withAuth";
import { signOut } from "@firebase/auth";
import { auth } from "@/src/firebase/firebase";
import style from "./profile.module.scss";
import { deleteCookie } from "cookies-next";
import { User } from "firebase/auth";
import FavouritesCafesProfile from "@/src/components/favourites-cafes-profile/favourites-cafes-profile";

function Profile({ user }: { user: User }) {
  const onHandleLogOut = () => {
    signOut(auth)
      .then(() => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  };
  return (
    <main className={style.wrapper}>
      <span>Profile</span>
      <span>{user.displayName || user.email}</span>
      <button onClick={onHandleLogOut} className={style.logoutButton}>
        Log out
      </button>
      <FavouritesCafesProfile userId={user.uid} />
    </main>
  );
}
export default withAuth(Profile);
