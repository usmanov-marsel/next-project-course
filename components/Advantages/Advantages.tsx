import { TopPageAdvantage } from "../../interfaces/page.interface";
import styles from "./Advantages.module.css";
import CheckIcon from "./check.svg";

interface AdvantagesProps {
  advantages: TopPageAdvantage[];
}

export const Advantages = ({ advantages }: AdvantagesProps) => {
  return (
    <>
      {advantages.map((a) => (
        <div key={a._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <div className={styles.description}>{a.description}</div>
        </div>
      ))}
    </>
  );
};
