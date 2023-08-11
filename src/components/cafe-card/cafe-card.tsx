import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
import { FC, useState } from "react";
import style from "./cafe-card.module.scss";
import { ImageSlider } from "@/src/components/Image-slider/Image-slider";
import Link from "next/link";
import { Rating } from "@/src/components/rating/rating";
import Image from "next/image";
import fav from "../../images/fav.svg";
import { SharePopup } from "@/src/components/share/share-popup";
type cafePropType = {
  cafe: CoffeePointType;
};
const CafeCard: FC<cafePropType> = ({ cafe }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={style.cafeCard}>
      <div className={style.sliderWrapper}>
        <ImageSlider imagePreviews={cafe.previews} />
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
        <Link
          href={`coffee-points/${cafe.city}/${cafe.id}`}
          className={style.title}
        >
          {cafe.name}
        </Link>
        <div className={style.ratingWrapper}>
          <Rating rating={cafe.rating} />
          <Image
            src={fav}
            alt={"add favourite"}
            width={20}
            height={20}
            className={style.fav}
          />
        </div>
      </div>
    </div>
  );
};
export default CafeCard;
