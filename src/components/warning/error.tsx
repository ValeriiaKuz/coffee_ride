import style from "./warning.module.scss";
import { FC } from "react";
type ErrorPropType = {
  errorMessage: string;
};
export const ErrorComp: FC<ErrorPropType> = ({ errorMessage }) => {
  return <span className={style.error}>{errorMessage}</span>;
};
