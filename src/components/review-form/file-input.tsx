"use client";
import { ChangeEvent, FC } from "react";
import { CafePropsType } from "@/src/components/cafe-form/cafe-form-wrapper";
type FileInputPropsType = {
  files: File[];
  setFiles: (file: (prev: File[]) => File[]) => void;
  isLimited?: boolean;
  uploadAllFiles?: (files: File[], city: string, id: string) => Promise<void>;
} & Partial<CafePropsType>;
export const FileInput: FC<FileInputPropsType> = ({
  files,
  setFiles,
  isLimited = false,
  uploadAllFiles,
  cafeId,
  cafeCity,
}) => {
  const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      let newFiles = Array.from(fileList);
      if (isLimited) {
        if (files.length > 0) {
          const avalible = 3 - files.length;
          newFiles = newFiles.slice(0, avalible);
        } else {
          if (newFiles.length > 3) {
            newFiles = newFiles.slice(0, 3);
          }
        }
      }
      setFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = "";
  };
  return (
    <>
      <input
        type={"file"}
        accept={".png, .jpeg, .jpg"}
        onChange={onInputFileChange}
        multiple
        disabled={isLimited ? files.length >= 3 : false}
      />
      {!isLimited && (
        <button
          onClick={() =>
            uploadAllFiles ? uploadAllFiles(files, cafeCity!, cafeId!) : null
          }
          disabled={files.length < 1}
        >
          Загрузить в хранилище
        </button>
      )}
    </>
  );
};
