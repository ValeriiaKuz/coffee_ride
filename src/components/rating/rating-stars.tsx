"use client";
import style from "./stars-rating.module.scss";
import { FC, useState } from "react";
import classNames from "classnames";
type StarsRatingProps = {
  ratingFromCustReview?: number;
  rating?: number;
  setRating?: (raiting: number) => void;
};
export const StarsRating: FC<StarsRatingProps> = ({
  ratingFromCustReview,
  rating,
  setRating,
}) => {
  // const [rating, setRating] = useState(ratingFromCustReview || 0);
  const [hover, setHover] = useState(0);
  return (
    <div className={style.stars}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            disabled={!!ratingFromCustReview}
            type="button"
            key={index}
            className={classNames(
              style.button,
              ratingFromCustReview && style.review,
              index <= (hover || rating || ratingFromCustReview)
                ? style.on
                : style.off,
            )}
            onClick={() => (setRating ? setRating(index) : null)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating!)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
