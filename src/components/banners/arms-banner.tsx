import rightArm from "../../images/girlCake.png";
import leftArm from "../../images/knife.png";
import cup from "../../images/cake.png";
import Image from "next/image";
import style from "./arms.module.scss";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
export const ArmsBanner = () => {
  const imgRefs = useRef<HTMLImageElement[]>([]);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const images = imgRefs.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: () => `+=${window.innerHeight}`,
          end: () => `+=${window.innerHeight * 2}`,
          scrub: true,
        },
      });
      tl.to(
        [images[0], images[1], images[2]],
        {
          x: 0,
          rotation: 0,
        },
        0,
      );

      tl.to(images[0], { x: 50, rotation: 5 }, 0);
      tl.to(images[2], { x: -50, rotation: 5 }, 0);
      tl.to(images[1], { rotation: -30 }, 0);
    }, bannerRef);

    return () => ctx.revert();
  }, []);
  // useLayoutEffect(() => {
  //   // gsap.registerPlugin(ScrollTrigger);
  //   // ScrollTrigger.config({
  //   //   limitCallbacks: true,
  //   //   ignoreMobileResize: true,
  //   // });
  //
  //   const images = imgRefs.current;
  //
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: bannerRef.current,
  //       start: () => `+=${window.innerHeight * 1}`,
  //       end: () => `+=${window.innerHeight * 2}`,
  //       scrub: true,
  //     },
  //   });
  //   tl.to(
  //     [images[0], images[1], images[2]],
  //     {
  //       x: 0,
  //       rotation: 0,
  //     },
  //     0,
  //   );
  //
  //   tl.to(images[0], { x: 50, rotation: 5 }, 0);
  //   tl.to(images[2], { x: -50, rotation: 5 }, 0);
  //   tl.to(images[1], { rotation: -30 }, 0);
  // }, []);
  return (
    <div className={style.bannerWrapper} ref={bannerRef}>
      <Image
        className={style.leftArm}
        src={leftArm}
        alt={"left-arm"}
        width={500}
        ref={(el) => (imgRefs.current[0] = el as HTMLImageElement)}
      />
      <Image
        src={cup}
        alt={"cup"}
        width={300}
        ref={(el) => (imgRefs.current[1] = el as HTMLImageElement)}
      />
      <Image
        className={style.rightArm}
        src={rightArm}
        alt={"right-arm"}
        width={500}
        ref={(el) => (imgRefs.current[2] = el as HTMLImageElement)}
      />
    </div>
  );
};
