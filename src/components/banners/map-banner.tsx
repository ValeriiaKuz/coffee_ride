import style from "./map.module.scss";
import { roboto900 } from "@/src/fonts/fonts";
export const MapBanner = () => {
  return (
    <div className={style.mapWrapper}>
      <div className={style.bg}>
        <span className={roboto900.className}>more than 5 countries</span>
      </div>
    </div>
  );
};
