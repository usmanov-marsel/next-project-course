import styles from "./Product.module.css";
import cn from "classnames";
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  useRef,
  useState,
} from "react";
import { ProductModel } from "../../interfaces/product.interface";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import { declOfNum } from "../../helpers/helper";
import Image from "next/image";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { motion } from "framer-motion";

interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel;
}

export const Product = motion(
  forwardRef(
    ({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>) => {
      const [isReviewOpened, setIsReviewOpened] = useState(false);
      const reviewRef = useRef<HTMLDivElement>(null);
      const variants = {
        visible: { opacity: 1, height: "auto" },
        hidden: { opacity: 0, height: 0 },
      };
      const formatter = new Intl.NumberFormat("ru", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0,
      });

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        reviewRef.current?.focus();
      };

      return (
        <div className={className} ref={ref} {...props}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span>
                <span className="visualyHidden">цена</span> {formatter.format(product.price)}
              </span>
              {product.oldPrice && (
                <Tag className={styles.oldPrice} color="green">
                  {formatter.format(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              {formatter.format(product.credit)}/<span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <span className="visualyHidden">
                {"рейтинг" + (product.reviewAvg ?? product.initialRating)}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((c) => (
                <Tag key={c} color="ghost" className={styles.category}>
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle} aria-hidden={true}>
              цена
            </div>
            <div className={styles.creditTitle} aria-hidden={true}>
              кредит
            </div>
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}{" "}
                {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics.map((c) => (
                <div className={styles.characteristic} key={c.name}>
                  <span className={styles.characteristicName}>{c.name}</span>
                  <span className={styles.characteristicDots}></span>
                  <span className={styles.characteristicValue}>{c.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                appearance="ghost"
                arrow={isReviewOpened ? "down" : "right"}
                className={styles.reviewButton}
                onClick={() => setIsReviewOpened(!isReviewOpened)}
                aria-expanded={isReviewOpened}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            animate={isReviewOpened ? "visible" : "hidden"}
            ref={reviewRef}
            variants={variants}
            initial="hidden"
          >
            {isReviewOpened && (
              <Card color="blue" className={styles.reviews} tabIndex={isReviewOpened ? 0 : -1}>
                {product.reviews.map((r) => (
                  <div key={r._id}>
                    <Review review={r} />
                    <Divider />
                  </div>
                ))}
                <ReviewForm productId={product._id} />
              </Card>
            )}
          </motion.div>
        </div>
      );
    }
  )
);
