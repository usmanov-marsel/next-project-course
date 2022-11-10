import styles from "./Card.module.css";
import cn from "classnames";
import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: "white" | "blue";
  children: ReactNode;
}

export const Card = forwardRef(
  (
    { color = "white", children, className, ...props }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={cn(styles.card, className, {
          [styles.blue]: color == "blue",
        })}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
