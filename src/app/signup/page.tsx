"use client";
import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/src/firebase/firebase";
import style from "@/src/app/login/login-signup.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch } from "@/src/servicies/redux/hooks/hooks";
import { setUser } from "@/src/servicies/redux/slices/user";
import { setCookie } from "cookies-next";
import { ErrorComp } from "@/src/components/warning/error";
import { useFormInput } from "@/src/hooks/useFormInput";
import Link from "next/link";

export default function SignUp() {
  const emailProps = useFormInput("");
  const passwordProps = useFormInput("");
  const nameProps = useFormInput("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailProps.value, passwordProps.value)
      .then((userCredential) => {
        const user = userCredential.user;
        if (auth.currentUser && nameProps.value) {
          updateProfile(auth.currentUser, {
            displayName: nameProps.value,
          })
            .then(async () => {
              if (auth.currentUser) {
                dispatch(setUser(auth.currentUser));
              }
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
        setErrorMessage(error.message);
        console.log(errorCode, error.message);
      });
  };
  return (
    <main className={style.wrapper}>
      <h1 className={style.title}>Sign up</h1>
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
        <input
          type={"text"}
          value={nameProps.value}
          onChange={nameProps.onChange}
          placeholder={"Name"}
          className={style.nickname}
        />
        {errorMessage && <ErrorComp errorMessage={errorMessage} />}
        <button type={"submit"} className={style.button}>
          Sign up
        </button>
        <span>
          If you have already signed up, please
          <Link href={"/login"} className={style.accent}>
            {" "}
            LOG IN
          </Link>
        </span>
      </form>
    </main>
  );
}
