"use client";
import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/firebase/firebase";
import Link from "next/link";
import style from "./login-signup.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch } from "../../servicies/redux/hooks/hooks";
import { setUser } from "@/src/servicies/redux/slices/user";
import { setCookie } from "cookies-next";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(user));
        const accessToken = await user.getIdToken();
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", user.refreshToken);
        router.push("/profile");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <main className={style.wrapper}>
      <h1 className={style.title}>Log in</h1>
      <form onSubmit={onFormSubmit} className={style.form}>
        <input
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"E-mail"}
          required
          className={style.email}
        />
        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Password"}
          required
          className={style.password}
        />
        <button type={"submit"} className={style.button}>
          Log in
        </button>
      </form>
      <span>
        If you have not signed up yet, please
        <Link href={"/signup"} className={style.accent}>
          {" "}
          SIGN UP
        </Link>
      </span>
      <span>
        <Link href={"/password"} className={style.accent}>
          Forgot your password?
        </Link>
      </span>
    </main>
  );
}
