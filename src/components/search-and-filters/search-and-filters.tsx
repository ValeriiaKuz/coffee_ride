"use client";
import Image from "next/image";
import up from "@/src/images/up.svg";
import down from "@/src/images/down.svg";
import search from "../../images/search.svg";
import { FC, FormEvent, useState } from "react";
import style from "./search-and-filters.module.scss";
import { PointsMap } from "@/src/components/maps/points-map";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
import Modal from "../modal/modal";
type SearchAndFiltersPropsType = {
  inputValue: string;
  setInputValue: (value: string) => void;
  filter: number;
  setFilter: (value: number) => void;
  sort: string;
  setSort: (value: string) => void;
  points: CoffeePointType[];
};
export const SearchAndFilters: FC<SearchAndFiltersPropsType> = ({
  inputValue,
  setInputValue,
  filter,
  setFilter,
  sort,
  setSort,
  points,
}) => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);
  const [isMapOpen, setMapOpen] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const onHandleSearch = (e: FormEvent) => {
    e.preventDefault();
  };
  const isActiveFilter = (value: number, filter: number): boolean => {
    return value === filter;
  };
  const isActiveSort = (value: string, sort: string): boolean => {
    return value === sort;
  };

  return (
    <div className={style.contentWrapper}>
      <form onSubmit={onHandleSearch} className={onFocus ? style.focus : ""}>
        <button className={style.searchButton} type={"submit"}>
          <Image src={search} alt={"search"} width={30} height={30} />
        </button>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type={"text"}
          placeholder={"Enter a cafe name"}
          className={style.searchInput}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        />
      </form>
      <div className={style.filters}>
        <button
          onClick={() => {
            setMapOpen(!isMapOpen);
          }}
        >
          Map
        </button>
        <button
          onClick={() => {
            setFilterOpen(!isFilterOpen);
          }}
        >
          <span>Filter</span>
          <Image
            src={isFilterOpen ? up : down}
            alt={"up"}
            height={15}
            width={15}
          />
        </button>
        <button
          onClick={() => {
            setSortOpen(!isSortOpen);
          }}
        >
          <span>Sort by</span>
          <Image
            src={isSortOpen ? up : down}
            alt={"up"}
            height={15}
            width={15}
          />
        </button>
        {isMapOpen && (
          <Modal setIsOpen={setMapOpen}>
            <div className={style.mapWrapper}>
              <PointsMap points={points} />
            </div>
          </Modal>
        )}
        {isFilterOpen && (
          <div className={style.filterItems}>
            <span
              onClick={() => {
                setFilter(0);
                setFilterOpen(false);
              }}
              className={isActiveFilter(3, filter) ? style.active : ""}
            >
              -
            </span>
            <span
              onClick={() => {
                setFilter(3);
                setFilterOpen(false);
              }}
              className={isActiveFilter(3, filter) ? style.active : ""}
            >
              3+
            </span>
            <span
              onClick={() => {
                setFilter(4);
                setFilterOpen(false);
              }}
              className={isActiveFilter(4, filter) ? style.active : ""}
            >
              4+
            </span>
            <span
              onClick={() => {
                setFilter(4.5);
                setFilterOpen(false);
              }}
              className={isActiveFilter(4.5, filter) ? style.active : ""}
            >
              4.5+
            </span>
          </div>
        )}
        {isSortOpen && (
          <div className={style.sortItems}>
            <span
              onClick={() => {
                setSort("rating");
                setSortOpen(false);
              }}
              className={isActiveSort("rating", sort) ? style.active : ""}
            >
              Rating
            </span>
            <span
              onClick={() => {
                setSort("abc");
                setSortOpen(false);
              }}
              className={isActiveSort("abc", sort) ? style.active : ""}
            >
              A-Z
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
