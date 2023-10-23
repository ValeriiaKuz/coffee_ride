"use client";
import { StarsRating } from "@/src/components/rating/rating-stars";
import style from "./review-form.module.scss";
import { FormEvent, useState } from "react";
import Image from "next/image";
import sitting from "../../images/sitting2.png";
import paperclip from "../../images/paperclip.svg";
import { PreviewsAddedImg } from "@/src/components/review-form/previews-added-img";
import { useIsAuth } from "@/src/hooks/useLoginBefore";
import { LoginBefore } from "@/src/components/warning/login-before";
import { FileInput } from "@/src/components/review-form/file-input";
export const ReviewForm = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const { isAuth, isLoginBefore, setLoginBefore } = useIsAuth();
  const onHandleDeletePreview = (file: File) => {
    setFiles((prev) => prev.filter((prevFile) => prevFile !== file));
  };
  const onHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isAuth) {
      // post review
    } else {
      setLoginBefore(!isLoginBefore);
    }
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
          <FileInput files={files} setFiles={setFiles} isLimited={true} />
          <Image src={paperclip} alt={"add-photo"} width={20} height={20} />
        </div>
        <textarea
          placeholder={"Please, feel free to drop here your feedback"}
        />
        <div className={style.buttons}>
          <h4 className={style.starsTitle}>Rate your experience</h4>
          <StarsRating />
          <div className={style.buttonWrapper}>
            <button type={"submit"} className={style.submitButton}>
              Submit review
            </button>
            {isLoginBefore && <LoginBefore />}
          </div>
        </div>
      </form>
      {files && files.length > 0 && (
        <div className={style.previews}>
          <span className={style.sumOfImg}>{files.length}/3</span>
          <PreviewsAddedImg
            files={files}
            onHandleDeletePreview={onHandleDeletePreview}
          />
        </div>
      )}
    </div>
  );
};
