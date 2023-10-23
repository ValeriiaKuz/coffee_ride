"use client";
import { FC, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { db, storage } from "@/src/firebase/firebase";
import { doc, setDoc } from "@firebase/firestore";
import style from "./cafe-form.module.scss";
import { CafeForm } from "@/src/components/cafe-form/cafe-form";
import { FileInput } from "@/src/components/review-form/file-input";
import { PreviewsAddedImg } from "@/src/components/review-form/previews-added-img";
export type CafeFuncPropsType = {
  setCafeId: (cafeId: string) => void;
  setCafeCity: (cafeCity: string) => void;
};
export type CafePropsType = {
  cafeId: string;
  cafeCity: string;
};
type CafeFormWrapperPropsType = CafePropsType & CafeFuncPropsType;
export const CafeFormWrapper: FC<CafeFormWrapperPropsType> = ({
  cafeId,
  setCafeId,
  cafeCity,
  setCafeCity,
}) => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [imageURLs, setImageUrls] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
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
      setIsLoading(true);
      setIsAdded(false);
      const imageRef = ref(storage, `${city}/${id}/${name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setFiles([]);
      setIsLoading(false);
      setIsAdded(true);
      return url;
    } catch (error) {
      setIsLoading(false);
      alert("ошибка");
    }
  };

  const uploadPreviewsUrls = async (urls: string[]) => {
    try {
      setIsLoading(true);
      setIsAdded(false);
      const cafeRef = doc(db, cafeCity, cafeId);
      await setDoc(cafeRef, { previews: urls }, { merge: true });
      setIsLoading(false);
      setIsAdded(true);
    } catch (error) {
      setIsLoading(false);
      alert("ошибка");
    }
  };
  const uploadAllFiles = async (files: File[], city: string, id: string) => {
    try {
      setIsLoading(true);
      setIsAdded(false);
      for (const file of files) {
        const url = await uploadImage(city, id, file.name, file);
        if (url) {
          setImageUrls((prev) => [...prev, url]);
        }
      }
      setIsLoading(false);
      setIsAdded(true);
    } catch (error) {
      setIsLoading(false);
      alert("ошибка");
    }
  };
  return (
    <section className={style.contentWrapper}>
      <CafeForm setCafeId={setCafeId} setCafeCity={setCafeCity} />
      <label>
        <span>Выбрать картинки</span>
        <FileInput
          setFiles={setFiles}
          files={files}
          uploadAllFiles={uploadAllFiles}
          cafeId={cafeId}
          cafeCity={cafeCity}
        />
      </label>
      <div>
        <PreviewsAddedImg
          files={files}
          onHandleDeletePreview={onHandleDeletePreview}
        />
      </div>
      <button
        onClick={() => uploadPreviewsUrls(imageURLs)}
        disabled={imageURLs.length < 1}
      >
        Загрузить превью к кофейне
      </button>
      {isLoading && <span>Загрузка...</span>}
      {isAdded && <span>Добавлено</span>}
    </section>
  );
};
