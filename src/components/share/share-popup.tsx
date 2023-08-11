import style from "./popup.module.scss";
export const SharePopup = () => {
  return (
    <div className={style.popup}>
      <div> Copy link</div>
      <div> Add to favourite</div>
    </div>
  );
};
