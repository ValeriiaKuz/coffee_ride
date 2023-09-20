import { FC } from "react";
import { StarsRating } from "@/src/components/rating/rating-stars";
import Image from "next/image";
import { Timestamp } from "@firebase/firestore";
import style from "./review.module.scss";

export type TReview = {
  id: string;
  rating: number;
  text: string;
  date?: Timestamp;
  images?: string[];
};
type ReviewPropType = {
  review: TReview;
};
export const Review: FC<ReviewPropType> = ({ review }) => {
  const reviewDate = review.date?.toDate().toLocaleDateString();
  return (
    <div className={style.reviewWrapper}>
      <p>{review.text}</p>
      <StarsRating ratingFromCustReview={review.rating} />
      {review.images && review.images.length > 0 && (
        <div className={style.imagesWrapper}>
          {review.images?.map((i, index) => {
            return (
              <div key={index} className={style.imageWrapper}>
                <Image
                  src={i}
                  alt={"photo-from-review"}
                  style={{ objectFit: "cover" }}
                  fill={true}
                />
              </div>
            );
          })}
        </div>
      )}
      <span>{reviewDate}</span>
    </div>
  );
};
