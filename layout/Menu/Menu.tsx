import styles from "./Menu.module.css";
import cn from "classnames";
import { KeyboardEvent, useContext } from "react";
import { AppContext } from "../../context/app.contex";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "../../helpers/helper";
import { motion } from "framer-motion";

export const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory == secondCategory) {
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code == "Space" || key.code == "Enter") {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <a>
                <div
                  className={cn(styles.firstLevel, {
                    [styles.firstLevelActive]: m.id === firstCategory,
                  })}
                >
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => {
          if (m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div
                tabIndex={0}
                className={styles.secondLevel}
                onKeyDown={(key: KeyboardEvent) => {
                  openSecondLevelKey(key, m._id.secondCategory);
                }}
                onClick={() => openSecondLevel(m._id.secondCategory)}
              >
                {m._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                className={cn(styles.secondLevelBlock)}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return pages.map((page) => (
      <motion.div key={page._id} variants={variantsChildren}>
        <Link href={`/${route}/${page.alias}`}>
          <a
            tabIndex={isOpened ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath,
            })}
          >
            {page.category}
          </a>
        </Link>
      </motion.div>
    ));
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
