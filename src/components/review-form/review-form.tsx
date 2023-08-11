"use client";
import { StarsRating } from "@/src/components/rating/rating-stars";
import style from "./review-form.module.scss";
import { FormEvent } from "react";
export const ReviewForm = () => {
  const onHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className={style.formWrapper}>
      <h3>Leave a review</h3>
      <form onSubmit={onHandleSubmit} className={style.form}>
        <textarea
          placeholder={"Please, feel free to drop here your feedback"}
        />
        <div className={style.buttons}>
          <h4 className={style.starsTitle}>Rate your experience</h4>
          <StarsRating />
          <button type={"submit"} className={style.submitButton}>
            Submit review
          </button>
        </div>
      </form>
    </div>
  );
};
