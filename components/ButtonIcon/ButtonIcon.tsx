import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./ButtonIcon.module.css";
import cn from "classnames";
import up from "./up.svg";
import close from "./close.svg";
import menu from "./menu.svg";

export const icons = { up, close, menu };
export type IconName = keyof typeof icons;

interface ButtonIconProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconName;
  appearance: "primary" | "white";
}

export const ButtonIcon = ({ appearance, icon, className, ...props }: ButtonIconProps) => {
  const IconComp = icons[icon];
  return (
    <button className={cn(styles.button, styles[appearance], className)} {...props}>
      <IconComp />
    </button>
  );
};
