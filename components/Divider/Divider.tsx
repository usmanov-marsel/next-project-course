import styles from "./Divider.module.css";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface DividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {}

export const Divider = ({ className, ...props }: DividerProps) => {
  return <hr className={cn(className, styles.hr)} {...props} />;
};
