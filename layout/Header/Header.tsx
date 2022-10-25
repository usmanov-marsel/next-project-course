import styles from "./Header.module.css";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header = ({ ...props }: HeaderProps) => {
  return <div {...props}>Header</div>;
};
