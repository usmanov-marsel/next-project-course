import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";
import styles from "./TopPageComponent.module.css";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { Tag } from "../../components";

export interface TopPageComponentProps {
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>{page.title}</h1>
        {products && (
          <Tag color="gray" size="m">
            products.length
          </Tag>
        )}
        <span>Сортировка</span>
      </div>
      {products && products.length}
    </div>
  );
};
