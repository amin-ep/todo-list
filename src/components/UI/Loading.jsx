import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loading;
