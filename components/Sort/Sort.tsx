import styles from "./Sort.module.css";
import cn from "classnames";
import SortIcon from "./sort.svg";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export enum SortEnum {
  Rating,
  Price,
}

interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum;
  setSort: (sort: SortEnum) => void;
}

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <button
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating,
        })}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price,
        })}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  );
};
