import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import styles from "./Button.module.css";
import cn from "classnames";
import ArrowIcon from "./arrow.svg";
import { motion } from "framer-motion";

interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
  > {
  children: ReactNode;
  appearance: "primary" | "ghost";
  arrow?: "right" | "down" | "none";
}

export const Button = ({
  appearance,
  children,
  className,
  arrow = "none",
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={cn(styles.button, styles[appearance], className)}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow === "down",
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
};
