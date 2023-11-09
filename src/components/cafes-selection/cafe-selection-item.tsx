"use client";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
import { FC, useLayoutEffect, useRef } from "react";
import { ImageSlider } from "@/src/components/Image-slider/Image-slider";
import style from "./cafe-selection.module.scss";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

type cafeItemPropType = {
  cafe: CoffeePointType;
  index: number;
};
export const CafeItem: FC<cafeItemPropType> = ({ cafe }) => {
  const left = useRef<HTMLDivElement | null>(null);
  const right = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLAnchorElement | null>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });
    const ctx = gsap.context(() => {
      gsap.fromTo(
        right.current,
        { x: 50, opacity: 0.2 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: right.current,
            scrub: 0.2,
          },
        },
      );
      gsap.fromTo(
        left.current,
        { x: -50, opacity: 0.5 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: left.current,
            end: "top 10%",
            scrub: 0.2,
          },
        },
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);
  return (
    <Link
      href={`${cafe.city}/${cafe.id}`}
      className={style.itemWrapper}
      ref={wrapperRef}
    >
      <>
        <div className={style.sliderWrapper} ref={left}>
          <ImageSlider imagePreviews={cafe.previews} />
        </div>
        <div className={style.infoWrapper} ref={right}>
          <h3>{cafe.name}</h3>
          <span>{cafe.city}</span>
        </div>
      </>
    </Link>
  );
};
