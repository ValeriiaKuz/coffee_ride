import Link from "next/link";
import style from "./warning.module.scss";
export const LoginBefore = () => {
  return (
    <div className={style.popUp}>
      <Link href={"/login"}>Login</Link> please
    </div>
  );
};
