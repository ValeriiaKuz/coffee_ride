"use client";
import { FormEvent, useState } from "react";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "@/src/firebase/firebase";
import style from "@/src/app/login/login-signup.module.scss";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const onHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsSent(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <main className={style.wrapper}>
      <h1 className={style.title}> Reset password</h1>
      <form onSubmit={onHandleSubmit} className={style.form}>
        <input
          type={"email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder={"E-mail"}
          className={style.email}
        />
        <button type={"submit"} className={style.button}>
          Send e-mail for reset
        </button>
        {isSent && (
          <>
            <span>Password reset email sent! Please, check your email</span>
            <Link href={"/login"}>Log in</Link>
          </>
        )}
      </form>
    </main>
  );
}
