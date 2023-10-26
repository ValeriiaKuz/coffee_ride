"use client";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
import { FC, useState } from "react";
import style from "./cafe-card.module.scss";
import { ImageSlider } from "@/src/components/Image-slider/Image-slider";
import Link from "next/link";
import { Rating } from "@/src/components/rating/rating";
import { SharePopup } from "@/src/components/share/share-popup";
import { FavButton } from "@/src/components/fav-button/fav-button";
import noPhoto from "../../images/noPhoto.jpeg";
type cafePropType = {
  cafe: CoffeePointType;
};
const CafeCard: FC<cafePropType> = ({ cafe }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={style.cafeCard}>
      <div className={style.sliderWrapper}>
        <ImageSlider
          imagePreviews={
            cafe.previews ? cafe.previews : ([noPhoto.src] as string[])
          }
        />
        <div
          className={style.share}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          ●
        </div>
        {isOpen && <SharePopup />}
      </div>
      <div className={style.cafeInfo}>
        <Link href={`${cafe.city}/${cafe.id}`} className={style.title}>
          {cafe.name}
        </Link>
        <div className={style.ratingWrapper}>
          <Rating rating={cafe.rating} />
          <FavButton height={20} width={20} cafeID={cafe.id} />
        </div>
      </div>
    </div>
  );
};
export default CafeCard;
