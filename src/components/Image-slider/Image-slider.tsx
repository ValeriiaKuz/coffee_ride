"use client";
import { FC, useState } from "react";
import style from "./image-slider.module.scss";
import classNames from "classnames";
type ImageSliderPropsType = {
  imagePreviews: string[];
};
export const ImageSlider: FC<ImageSliderPropsType> = ({ imagePreviews }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    if (currentImageIndex !== 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  const goToNext = () => {
    if (currentImageIndex !== imagePreviews.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };
  return (
    <div className={style.slider}>
      <div>
        <div onClick={goToPrevious} className={style.left}>
          ❮
        </div>
        <div onClick={goToNext} className={style.right}>
          ❯
        </div>
      </div>
      <div
        className={style.slide}
        style={{ backgroundImage: `url(${imagePreviews[currentImageIndex]})` }}
      ></div>
      {imagePreviews.length > 1 && (
        <div className={style.dotsContainer}>
          {imagePreviews.map((image, slideIndex) => (
            <div
              className={classNames(
                style.dot,
                slideIndex === currentImageIndex && style.active,
              )}
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
