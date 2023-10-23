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
import { ErrorComp } from "@/src/components/warning/error";
import { useFormInput } from "@/src/hooks/useFormInput";

export default function Login() {
  const emailProps = useFormInput("");
  const passwordProps = useFormInput("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, emailProps.value, passwordProps.value)
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
        setErrorMessage(error.message);
        console.log(errorCode, error.message);
      });
  };
  return (
    <main className={style.wrapper}>
      <h1 className={style.title}>Log in</h1>
      <form onSubmit={onFormSubmit} className={style.form}>
        <input
          type={"email"}
          value={emailProps.value}
          onChange={emailProps.onChange}
          placeholder={"E-mail"}
          required
          className={style.email}
        />
        <input
          type={"password"}
          value={passwordProps.value}
          onChange={passwordProps.onChange}
          placeholder={"Password"}
          required
          className={style.password}
        />
        {errorMessage && <ErrorComp errorMessage={errorMessage} />}
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
