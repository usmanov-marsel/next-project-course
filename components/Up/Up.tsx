import { useScrollY } from "../../hooks/useScrollY";
import { motion, useAnimation } from "framer-motion";
import styles from "./Up.module.css";
import UpIcon from "./up.svg";
import { useEffect } from "react";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";

export const Up = () => {
  const controls = useAnimation();

  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <motion.div animate={controls} initial={{ opacity: 0 }} className={styles.up}>
      <ButtonIcon appearance="primary" icon="up" onClick={scrollToTop} />
    </motion.div>
  );
};
