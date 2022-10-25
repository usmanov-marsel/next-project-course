import styles from "./Sidebar.module.css";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Menu } from "../Menu/Menu";
import Logo from "../logo.svg";

interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <div>поиск...</div>
      <Menu />
    </div>
  );
};
