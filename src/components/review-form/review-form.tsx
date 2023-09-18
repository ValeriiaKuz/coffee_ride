"use client";
import { StarsRating } from "@/src/components/rating/rating-stars";
import style from "./review-form.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import sitting from "../../images/sitting2.png";
import paperclip from "../../images/paperclip.svg";
import { PreviewsAddedImg } from "@/src/components/review-form/previews-added-img";
export const ReviewForm = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      let newFiles = Array.from(fileList);
      if (files.length > 0) {
        const avalible = 3 - files.length;
        newFiles = newFiles.slice(0, avalible);
      } else {
        if (newFiles.length > 3) {
          newFiles = newFiles.slice(0, 3);
        }
      }
      setFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = "";
  };
  const onHandleDeletePreview = (file) => {
    setFiles((prev) => prev.filter((prevFile) => prevFile !== file));
  };
  const onHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className={style.formWrapper}>
      <Image
        src={sitting}
        alt={"group"}
        height={270}
        width={279}
        className={style.imageGroup}
      />
      <h3>Leave a review</h3>
      <form onSubmit={onHandleSubmit} className={style.form}>
        <div className={style.fileInputContainer}>
          <input
            type={"file"}
            accept={".png, .jpeg, .jpg"}
            onChange={onInputFileChange}
            multiple
            disabled={files.length >= 3}
          />
          <Image src={paperclip} alt={"add-photo"} width={20} height={20} />
        </div>
        <textarea
          placeholder={"Please, feel free to drop here your feedback"}
        />
        <div className={style.buttons}>
          <h4 className={style.starsTitle}>Rate your experience</h4>
          <StarsRating />
          <button type={"submit"} className={style.submitButton}>
            Submit review
          </button>
        </div>
      </form>
      {files.length > 0 && (
        <div className={style.previews}>
          <PreviewsAddedImg
            files={files}
            onHandleDeletePreview={onHandleDeletePreview}
          />
        </div>
      )}
    </div>
  );
};
