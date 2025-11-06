import styles from "./Header.module.css";

type PropsType = {
  title: string;
};

const Header = ({ title }: PropsType) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default Header;
