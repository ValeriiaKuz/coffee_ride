"use client";
import { FormEvent, useState } from "react";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "@/src/firebase/firebase";
import style from "@/src/app/login/login-signup.module.scss";
import Link from "next/link";
import { ErrorComp } from "@/src/components/warning/error";
import { useFormInput } from "@/src/hooks/useFormInput";

export default function ForgotPassword() {
  const emailProps = useFormInput("");
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const onHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, emailProps.value)
      .then(() => {
        setIsSent(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(error.message);
        console.log(errorCode, error.message);
      });
  };
  return (
    <main className={style.wrapper}>
      <h1 className={style.title}> Reset password</h1>
      <form onSubmit={onHandleSubmit} className={style.form}>
        <input
          type={"email"}
          value={emailProps.value}
          onChange={emailProps.onChange}
          placeholder={"E-mail"}
          className={style.email}
        />
        {errorMessage && <ErrorComp errorMessage={errorMessage} />}
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
