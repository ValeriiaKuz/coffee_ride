import { doc, getDoc } from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
import style from "./point.module.scss";
import { ImageGallery } from "@/src/components/Image-gallery/image-gallery";
import { Rating } from "@/src/components/rating/rating";
import PointMap from "@/src/components/maps/point-map";
import { ReviewForm } from "@/src/components/review-form/review-form";
import fav from "../../../images/fav.svg";
import Image from "next/image";

type CafeParamsType = {
  params: { slug: [city: string, cafeID: string] };
};
export default async function Cafe({ params }: CafeParamsType) {
  const cafeInfoData = await getDoc(doc(db, params.slug[0], params.slug[1]));
  const cafeInfo: CoffeePointType = cafeInfoData.data() as CoffeePointType;
  return (
    <div className={style.contentWrapper}>
      <div className={style.galleryWrapper}>
        <ImageGallery imagePreviews={cafeInfo.previews} />
      </div>
      <div className={style.infoWrapper}>
        <div className={style.infoContent}>
          <div className={style.infoAndRating}>
            <div className={style.info}>
              <div className={style.title}>
                <h1>{cafeInfo.name}</h1>
                <button className={style.button}>
                  <Image
                    src={fav}
                    alt={"add to favourite"}
                    width={30}
                    height={30}
                  />
                </button>
              </div>
              <p>
                City: <span>{cafeInfo.city}</span>
              </p>
              <p>
                Address: <span>{cafeInfo.address}</span>
              </p>
            </div>
            <div className={style.ratingWrapper}>
              Rating
              <Rating
                rating={cafeInfo.rating}
                google={cafeInfo.rating_google}
                ta={cafeInfo.rating_ta}
              />
            </div>
          </div>
          <ReviewForm />
        </div>
        <div className={style.mapWrapper}>
          <PointMap
            center={{
              lat: cafeInfo.geopoint.latitude,
              lng: cafeInfo.geopoint.longitude,
            }}
            name={cafeInfo.name}
            address={cafeInfo.address}
          />
        </div>
      </div>
    </div>
  );
}
