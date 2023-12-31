"use client";
import classnames from "classnames";
import style from "./hero.module.scss";
import { patrickHand400 } from "@/src/fonts/fonts";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const Hero = () => {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        backdropFilter: "blur(2.5px)",
        duration: 1.5,
      });
      gsap.to(textRef.current, {
        opacity: 1,
        duration: 1.5,
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);
  return (
    <div className={classnames(style.main)} ref={mainRef}>
      <div className={style.bgBlur} ref={bgRef}></div>
      <h1>
        Co
        <span className={classnames(patrickHand400.className)}>ff</span>
        ee Ride
      </h1>
      <p ref={textRef}>
        DIVE INTO THE COFFEE CULTURE: YOUR GUIDE TO LOCAL CAFES.
      </p>
    </div>
  );
};
