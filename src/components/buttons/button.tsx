import React, { FC } from "react";
import style from "./button.module.scss";

type ButtonPropsType = {
  title: string;
  onHandleClick?: () => void;
  bgC: string;
  color: string;
  hoverC: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
};
export const ButtonComponent: FC<ButtonPropsType> = ({
  onHandleClick,
  title,
  bgC,
  color,
  hoverC,
  type,
  disabled,
}) => {
  return (
    <button
      onClick={onHandleClick}
      className={style.button}
      style={
        {
          backgroundColor: bgC,
          color: color,
          "--hover-color": hoverC,
        } as React.CSSProperties
      }
      type={type}
      disabled={disabled}
    >
      <span>{title}</span>
    </button>
  );
};
