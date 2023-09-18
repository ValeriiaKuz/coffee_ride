"use client";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Review } from "@/src/components/reviews/review";

export const Reviews = () => {
  const pathname = usePathname();
  const [, , city, id] = pathname.split("/");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async (cityCol, idCol) => {
      try {
        const reviewsData = await getDocs(
          collection(db, cityCol, idCol, "reviews"),
        );

        const reviews = reviewsData.docs.map((review) => review.data());
        setReviews(reviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(city, id);
  }, [city, id]);

  return (
    <div>
      {reviews.map((review, index) => {
        return <Review key={review.id | index} review={review} />;
      })}
    </div>
  );
};
