import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";
import styles from "./TopPageComponent.module.css";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes, ReactNode, useEffect, useReducer } from "react";
import { Advantages, P, Product, Sort, SortEnum, Tag } from "../../components";
import { HhData } from "../../components";
import { sortReducer } from "./sort.reducer";

export interface TopPageComponentProps {
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
    sort: SortEnum.Rating,
    products,
  });

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: "reset", initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1 className={styles.h1}>{page.title}</h1>
        {products && (
          <Tag color="gray" size="m">
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div>{sortedProducts && sortedProducts.map((p) => <Product product={p} key={p._id} />)}</div>
      <div className={styles.hhTitle}>
        <h2 className={styles.h2}>Вакансии - {page.category}</h2>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <h2>Преимущества</h2>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }}></div>
      )}
      <h2>Получаемые навыки</h2>
      {page.tags.map((tag) => (
        <Tag key={tag} color="primary">
          {tag}
        </Tag>
      ))}
    </div>
  );
};
