"use client";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
import style from "./point.module.scss";
import { ImageGallery } from "@/src/components/Image-gallery/image-gallery";
import { Rating } from "@/src/components/rating/rating";
import PointMap from "@/src/components/maps/point-map";
import { ReviewForm } from "@/src/components/review-form/review-form";
import { Reviews } from "@/src/components/reviews/reviews";
import { useEffect, useState } from "react";
import { FavButton } from "@/src/components/fav-button/fav-button";
import noPhoto from "../../../images/noPhoto.jpeg";

type CafeParamsType = {
  params: { city: string; id: string };
};
export async function generateStaticParams({
  params: { city },
}: {
  params: { city: string };
}) {
  const coffeePointsData = await getDocs(collection(db, city));
  const coffeePoints = coffeePointsData.docs.map((point) => {
    const data = point.data();
    return {
      address: data.address,
      city: data.city,
      id: data.id,
      name: data.name,
      previews: data.previews,
      rating: data.rating,
      rating_google: data.rating_google,
      rating_ta: data.rating_ta,
      geopoint: {
        latitude: data.geopoint.latitude,
        longitude: data.geopoint.longitude,
      },
    };
  });

  return coffeePoints.map((point) => ({
    city: city,
    id: point.id,
  }));
}

export default function Cafe({ params }: CafeParamsType) {
  const [cafeInfo, setCafeInfo] = useState<CoffeePointType>();

  useEffect(() => {
    const fetchData = async () => {
      const cafeInfoData = await getDoc(doc(db, "coffeepoints", params.id));
      const cafe: CoffeePointType = cafeInfoData.data() as CoffeePointType;
      setCafeInfo(cafe);
    };
    fetchData();
  }, []);

  return (
    cafeInfo && (
      <div className={style.contentWrapper}>
        <div className={style.galleryWrapper}>
          <ImageGallery
            imagePreviews={
              cafeInfo.previews
                ? cafeInfo.previews
                : ([noPhoto.src] as string[])
            }
          />
        </div>
        <div className={style.infoWrapper}>
          <div className={style.infoContent}>
            <div className={style.infoAndRating}>
              <div className={style.info}>
                <div className={style.title}>
                  <h1>{cafeInfo.name}</h1>
                  <FavButton width={30} height={30} cafeID={params.id} />
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
            <ReviewForm cafeId={cafeInfo.id} cafeCity={cafeInfo.city} />
            <Reviews />
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
    )
  );
}
