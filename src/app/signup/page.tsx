"use client";
import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/src/firebase/firebase";
import style from "@/src/app/login/login-signup.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch } from "@/src/servicies/redux/hooks/hooks";
import { setUser } from "@/src/servicies/redux/slices/user";
import { setCookie } from "cookies-next";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (auth.currentUser && name) {
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(async () => {
              dispatch(setUser(auth.currentUser));
              setCookie("accessToken", await user.getIdToken());
              setCookie("refreshToken", user.refreshToken);
              router.push("/profile");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <main className={style.wrapper}>
      <h1 className={style.title}>Sign up</h1>
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
        <input
          type={"text"}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder={"Name"}
          className={style.nickname}
        />
        <button type={"submit"} className={style.button}>
          Sign up
        </button>
      </form>
    </main>
  );
}
