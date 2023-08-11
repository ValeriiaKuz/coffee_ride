import { FC } from "react";
import style from "./rating.module.scss";
import googleImg from "../../images/google.svg";
import taImg from "../../images/ta.svg";
import Image from "next/image";
type ratingPropType = {
  google?: number;
  ta?: number;
  rating: number;
};
export const Rating: FC<ratingPropType> = ({ google, ta, rating }) => {
  return (
    <ul className={style.rating}>
      <li>
        <div>&#9733;</div>
        <span>{rating}</span>
      </li>
      {google && (
        <li>
          <Image src={googleImg} alt={"google"} width={30} height={30} />
          <span>{google}</span>
        </li>
      )}
      {ta && (
        <li>
          <Image src={taImg} alt={"trip-advisor"} width={35} height={35} />
          <span>{ta}</span>
        </li>
      )}
    </ul>
  );
};
