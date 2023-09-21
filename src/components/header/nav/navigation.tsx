"use client";
import Link from "next/link";
import Image from "next/image";
import location from "../../../images/location.svg";
import locationC from "../../../images/locationC.svg";
import profileLogo from "../../../images/profile.svg";
import profileLogoC from "../../../images/profileC.svg";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { ModalContext } from "@/src/servicies/providers/modal-provider";
import { useSelector } from "@/src/servicies/redux/hooks/hooks";
import style from "../header.module.scss";
import classNames from "classnames";
export const Navigation = () => {
  const { setIsOpen } = useContext(ModalContext);
  const chosenCity = useSelector((state) => state.chosenCity.chosenCity);
  const pathname = usePathname();
  const isMain = pathname === "/";
  const onCityClick = () => setIsOpen(true);
  return (
    <nav className={classNames(!isMain && style.notMain)}>
      <ul>
        {chosenCity && pathname.includes("/coffee-points/") && (
          <li>
            <button onClick={onCityClick}>
              <Image
                src={isMain ? location : locationC}
                alt={"location"}
                width={20}
                height={20}
              />
              {chosenCity}
            </button>
          </li>
        )}
        <li>
          <Link href={`/coffee-points`}>COFFEE POINTS</Link>
        </li>
        <li>
          <Link href={"/profile"}>
            <Image
              src={isMain ? profileLogo : profileLogoC}
              alt={"profile"}
              width={50}
              height={50}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
