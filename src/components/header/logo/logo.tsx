import classnames from "classnames";
import style from "@/src/components/header/header.module.scss";
import Link from "next/link";
import { patrickHand400 } from "@/src/fonts/fonts";

export const Logo = () => {
  return (
    <Link
      href={"/"}
      className={classnames(patrickHand400.className, style.accentLetters)}
    >
      ff
    </Link>
  );
};
