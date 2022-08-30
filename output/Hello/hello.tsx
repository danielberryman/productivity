import styles from "./hello.module.css";

type Props = {
  
};

const Hello = ({}: Props) => {
  return (
    <div className={styles.container}></div>
  );
};

export default Hello;