"use client";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Review, TReview } from "@/src/components/reviews/review";

export const Reviews = () => {
  const pathname = usePathname();
  const [, , , id] = pathname.split("/");
  const [reviews, setReviews] = useState<TReview[]>([]);

  useEffect(() => {
    const q = query(collection(db, "reviews"), where("cafeID", "==", id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rev: TReview[] = [];
      querySnapshot.forEach((doc) => {
        rev.push(doc.data() as TReview);
      });
      setReviews(rev);
    });
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div>
      {reviews.map((review) => {
        return <Review key={review.id} review={review} />;
      })}
    </div>
  );
};
