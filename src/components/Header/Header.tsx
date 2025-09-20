"use Client";

import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <p className={styles.title}>Did You Live stoic today?</p>
    </header>
  );
};
