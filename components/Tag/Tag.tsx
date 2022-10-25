import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import styles from "./Tag.module.css";
import cn from "classnames";

interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "s" | "m";
  children: ReactNode;
  color?: "ghost" | "red" | "gray" | "green" | "primary";
  href?: string;
}

export const Tag = ({
  size = "s",
  children,
  color = "ghost",
  href,
  className,
  ...props
}: TagProps) => {
  return (
    <div className={cn(styles.tag, className, styles[size], styles[color])} {...props}>
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
