"use client";
import withAuth from "@/src/components/withAuth/withAuth";
import { signOut } from "@firebase/auth";
import { auth } from "@/src/firebase/firebase";
import style from "./profile.module.scss";
import { deleteCookie } from "cookies-next";
import { User } from "firebase/auth";
import FavouritesCafesProfile from "@/src/components/favourites-cafes-profile/favourites-cafes-profile";
import { ButtonComponent } from "@/src/components/buttons/button";

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
      <h1> {user.displayName || user.email}</h1>
      <ButtonComponent
        title={"Log out"}
        onHandleClick={onHandleLogOut}
        bgC={"var(--light-color)"}
        color={"var(--accent-color)"}
        hoverC={"var(--accent-color-lighter)"}
      />
      <h2>Favourites cafes</h2>
      <div className={style.favWrapper}>
        <FavouritesCafesProfile userId={user.uid} />
      </div>
    </main>
  );
}
export default withAuth(Profile);
