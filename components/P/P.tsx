import styles from "./P.module.css";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface PProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  size?: "s" | "m" | "l";
  children: ReactNode;
}

export const P = ({ size = "m", children, className, ...props }: PProps) => {
  return (
    <p className={cn(styles.p, className, styles[size])} {...props}>
      {children}
    </p>
  );
};
