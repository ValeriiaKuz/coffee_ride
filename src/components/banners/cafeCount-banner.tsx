"use client";
import { useEffect, useRef, useState } from "react";
import style from "./cafeCount.module.scss";
import classNames from "classnames";
import { poppins600 } from "@/src/fonts/fonts";
import cafe from "../../images/Group-cafe.png";
import Image from "next/image";
export const CafeCountBanner = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            setCount((prevCount) => {
              if (prevCount >= 100) {
                return prevCount;
              }
              const newCount = prevCount + 1;
              if (newCount >= 100) {
                clearInterval(interval);
              }
              return newCount;
            });
          }, 20);

          return () => {
            clearInterval(interval);
          };
        }
      },
      { threshold: 0.5 },
    );

    if (countRef.current) {
      observer.observe(countRef.current!);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current!);
      }
    };
  }, []);

  return (
    <div className={style.countWrapper} ref={countRef}>
      <Image src={cafe} alt={"cafe"} style={{ objectFit: "contain" }} />
      <span className={style.points}>coffee points</span>
      <p className={classNames(style.count, poppins600.className)}>
        {count}
        <span>+</span>
      </p>
    </div>
  );
};
