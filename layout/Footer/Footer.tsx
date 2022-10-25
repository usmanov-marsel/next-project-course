import styles from "./Footer.module.css";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { format } from "date-fns";

interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <div>OwlTop © 2020 - {format(new Date(), "yyyy")} Все права защищены</div>
      <a href="#" target="_blank">
        Пользовательское соглашение
      </a>
      <a href="#" target="_blank">
        Политика конфиденциальности
      </a>
    </footer>
  );
};
