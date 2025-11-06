import styles from "./ErrorMessage.module.css";
type propsType = {
  message: string;
};
const ErrorMessage = ({ message }: propsType) => {
  return <div className={styles.error}>{message}</div>;
};

export default ErrorMessage;
