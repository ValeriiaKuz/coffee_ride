import style from "./added-cafe.module.scss";
import Image from "next/image";
import { FC } from "react";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
export const AddedCafePreview: FC<{ cafeAddedData: CoffeePointType }> = ({
  cafeAddedData,
}) => {
  return (
    <section className={style.wrapper}>
      <p>
        ID: <span>{cafeAddedData.id}</span>
      </p>
      <p>
        Название: <span>{cafeAddedData.name}</span>
      </p>
      <p>
        Город: <span>{cafeAddedData.city}</span>
      </p>
      <p>
        Адрес: <span>{cafeAddedData.address}</span>
      </p>
      <p>
        latitude: <span>{cafeAddedData.geopoint.latitude}</span>
      </p>
      <p>
        longitude: <span>{cafeAddedData.geopoint.longitude}</span>
      </p>
      <p>
        Рейтинг: <span>{cafeAddedData.rating}</span>
      </p>
      {cafeAddedData.rating_google && !isNaN(cafeAddedData.rating_google) && (
        <p>
          Рейтинг Google: <span>{cafeAddedData.rating_google}</span>
        </p>
      )}
      {cafeAddedData.rating_ta && !isNaN(cafeAddedData.rating_ta) && (
        <p>
          Рейтинг Trip Adviser: <span>{cafeAddedData.rating_ta}</span>
        </p>
      )}
      {cafeAddedData.previews && (
        <div>
          {cafeAddedData.previews.map((prev, index) => (
            <Image
              src={prev}
              alt={"preview"}
              key={index}
              width={150}
              height={150}
            />
          ))}
        </div>
      )}
    </section>
  );
};
