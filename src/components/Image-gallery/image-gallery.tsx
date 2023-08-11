"use client";
import { FC, useState } from "react";
import style from "./image-gallery.module.scss";
import classNames from "classnames";

type ImageGalleryPropType = {
  imagePreviews: string[];
};
export const ImageGallery: FC<ImageGalleryPropType> = ({ imagePreviews }) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  return (
    <div className={style.gallery}>
      <div
        style={{
          backgroundImage: `url(${imagePreviews[selectedImgIndex]})`,
          backgroundSize: "cover",
        }}
        className={style.selected}
      >
        {selectedImgIndex < imagePreviews.length - 1 && (
          <span
            className={style.next}
            onClick={() => {
              setSelectedImgIndex(selectedImgIndex + 1);
            }}
          >
            →
          </span>
        )}
        {selectedImgIndex > 0 && (
          <span
            className={style.previous}
            onClick={() => {
              setSelectedImgIndex(selectedImgIndex - 1);
            }}
          >
            ←
          </span>
        )}
      </div>

      <div className={style.small}>
        {imagePreviews.map((img, index) => {
          return (
            <div
              style={{
                backgroundImage: `url(${imagePreviews[index]})`,
                backgroundSize: "cover",
              }}
              className={classNames(
                style.smallImg,
                index === selectedImgIndex ? style.selectedSmall : null,
              )}
              key={index}
              onClick={() => setSelectedImgIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
};
