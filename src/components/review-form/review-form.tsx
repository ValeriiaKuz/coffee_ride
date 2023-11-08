"use client";
import { StarsRating } from "@/src/components/rating/rating-stars";
import style from "./review-form.module.scss";
import { FC, FormEvent, useState } from "react";
import Image from "next/image";
import sitting from "../../images/sitting2.png";
import paperclip from "../../images/paperclip.svg";
import { PreviewsAddedImg } from "@/src/components/review-form/previews-added-img";
import { useIsAuth } from "@/src/hooks/useLoginBefore";
import { LoginBefore } from "@/src/components/warning/login-before";
import { FileInput } from "@/src/components/review-form/file-input";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { db, storage } from "@/src/firebase/firebase";
import { CafePropsType } from "@/src/components/cafe-form/cafe-form-wrapper";
import { useFormInput } from "@/src/hooks/useFormInput";
import { doc, setDoc } from "@firebase/firestore";
import { Loader } from "@/src/components/loader/loader";
import { ErrorComp } from "@/src/components/warning/error";
import { ButtonComponent } from "@/src/components/buttons/button";
export const ReviewForm: FC<CafePropsType> = ({ cafeId, cafeCity }) => {
  const [files, setFiles] = useState<Array<File>>([]);
  const textValue = useFormInput("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [warning, setWarning] = useState({ isWarning: false, message: "" });
  const { userID, isAuth, isLoginBefore, setLoginBefore } = useIsAuth();
  const onHandleDeletePreview = (file: File) => {
    setFiles((prev) => prev.filter((prevFile) => prevFile !== file));
  };
  const uploadImage = async (
    city: string,
    id: string,
    name: string,
    file: File,
  ) => {
    try {
      const imageRef = ref(storage, `${city}/${id}/reviews/${name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setFiles([]);
      return url;
    } catch (error) {
      setWarning({ isWarning: true, message: "error" });
    }
  };
  const uploadImages = async (
    files: File[],
    city: string,
    id: string,
    imageUrls: string[],
  ) => {
    try {
      for (const file of files) {
        const url = await uploadImage(city, id, file.name, file);
        if (url) {
          imageUrls.push(url);
        }
      }
    } catch (error) {
      setWarning({ isWarning: true, message: "error" });
    }
  };

  const addReview = async (
    text: string,
    urls: string[],
    city: string,
    user: string,
    cafe: string,
    rating: number,
  ) => {
    try {
      const reviewId = self.crypto.randomUUID();
      const reviewRef = doc(db, `reviews`, reviewId);
      await setDoc(
        reviewRef,
        {
          text: text,
          date: new Date(),
          id: reviewId,
          rating: rating,
          images: urls,
          userID: user,
          cafeID: cafe,
          city: city,
        },
        { merge: true },
      );
      textValue.clear();
      setRating(0);
    } catch (error) {
      setWarning({ isWarning: true, message: "error" });
    }
  };
  const onHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setWarning({ isWarning: false, message: "" });
    if (isAuth && userID) {
      if (rating > 0 && textValue.value.length > 0 && files.length > 0) {
        setIsAdded(false);
        setIsLoading(true);
        const imageUrls: string[] = [];
        uploadImages(files, cafeCity, cafeId, imageUrls)
          .then(() => {
            addReview(
              textValue.value,
              imageUrls,
              cafeCity,
              userID,
              cafeId,
              rating,
            );
          })
          .then(() => {
            setIsLoading(false), setIsAdded(true);
          });
      } else {
        setWarning({
          isWarning: true,
          message: "not all form fields are completed",
        });
      }
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
          value={textValue.value}
          onChange={textValue.onChange}
        />
        <div className={style.buttons}>
          <h4 className={style.starsTitle}>Rate your experience</h4>
          <StarsRating rating={rating} setRating={setRating} />
          <div className={style.buttonWrapper}>
            {isLoading && <Loader />}
            {isAdded && <span>Review has been added</span>}
            {warning && <ErrorComp errorMessage={warning.message} />}
            <ButtonComponent
              title={"Submit review"}
              bgC={"var(--accent-color-lighter)"}
              color={"var(--light-color)"}
              hoverC={"var(--accent-color)"}
              type={"submit"}
              disabled={isLoading}
            />
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
