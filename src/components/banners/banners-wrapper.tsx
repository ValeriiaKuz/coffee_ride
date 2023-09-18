"use client";
import style from "./banners-wrapper.module.scss";
import { MapBanner } from "@/src/components/banners/map-banner";
import { CafeCountBanner } from "@/src/components/banners/cafeCount-banner";
import { ArmsBanner } from "@/src/components/banners/arms-banner";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import classNames from "classnames";

export const BannersWrapper = () => {
  const bannersWrapperRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<HTMLTableSectionElement[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });
    const ctx = gsap.context(() => {
      const sections = panelRefs.current;

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: bannersWrapperRef.current,
          start: "center center",
          pin: true,
          scrub: 0.6,
          snap: 1 / (sections.length - 1),
          end: () => `+=${window.innerHeight * sections.length}`,
        },
      });
    }, bannersWrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={style.bannersWrapper} ref={bannersWrapperRef}>
      <section
        className={classNames(style.panel, style.firstBanner)}
        ref={(el) => (panelRefs.current[0] = el as HTMLTableSectionElement)}
      >
        <MapBanner />
      </section>
      <section
        className={style.panel}
        ref={(el) => (panelRefs.current[1] = el as HTMLTableSectionElement)}
      >
        <ArmsBanner />
      </section>
      <section
        className={style.panel}
        ref={(el) => (panelRefs.current[2] = el as HTMLTableSectionElement)}
      >
        <CafeCountBanner />
      </section>
    </div>
  );
};
