"use client";
import withAuth from "@/src/components/withAuth/withAuth";
import { signOut } from "@firebase/auth";
import { auth } from "@/src/firebase/firebase";
import style from "./profile.module.scss";
import { deleteCookie } from "cookies-next";

function Profile() {
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
      <button onClick={onHandleLogOut} className={style.logoutButton}>
        Log out
      </button>
    </main>
  );
}
export default withAuth(Profile);
