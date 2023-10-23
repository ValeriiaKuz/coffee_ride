import Image from "next/image";
import { FC } from "react";
import style from "./previews.module.scss";
type PreviewsAddedImgPropType = {
  files: File[];
  onHandleDeletePreview: (file: File) => void;
};
export const PreviewsAddedImg: FC<PreviewsAddedImgPropType> = ({
  files,
  onHandleDeletePreview,
}) => {
  return (
    <>
      {files.map((file, index) => (
        <div key={index} className={style.wrapper}>
          <Image
            src={URL.createObjectURL(file)}
            alt={"added-photo"}
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
          <span
            className={style.deleteElement}
            onClick={() => onHandleDeletePreview(file)}
          />
        </div>
      ))}
    </>
  );
};
