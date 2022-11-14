import styles from "./Rating.module.css";
import cn from "classnames";
import StarIcon from "./star.svg";
import { FieldError } from "react-hook-form";
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
  error?: FieldError;
}

export const Rating = forwardRef(
  (
    { isEditable = false, rating, setRating, error, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i == 0) {
        return 0;
      }
      if (r == i + 1) {
        return 0;
      }
      return -1;
    };

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r, index) => (
        <span
          className={cn(styles.star, {
            [styles.filled]: index < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(index + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(index + 1)}
          tabIndex={computeFocus(rating, index)}
          onKeyDown={handleKey}
          ref={(r) => ratingArrayRef.current?.push(r)}
          role={isEditable ? "slider" : ""}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-label={isEditable ? "Укажите рейтинг" : "рейтинг " + rating}
          aria-invalid={error ? true : false}
        >
          <StarIcon />
        </span>
      ));
      setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) return;
      constructRating(i);
    };

    const onClick = (i: number) => {
      if (!isEditable || !setRating) return;
      setRating(i);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) return;
      if (e.code == "ArrowRight" || e.code == "ArrowUp") {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code == "ArrowLeft" || e.code == "ArrowDown") {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((r, index) => (
          <span key={index}>{r}</span>
        ))}
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
