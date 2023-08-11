"use client";
import style from "./stars-rating.module.scss";
import { useState } from "react";
import classNames from "classnames";
export const StarsRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className={style.stars}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={classNames(
              style.button,
              index <= (hover || rating) ? style.on : style.off,
            )}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
