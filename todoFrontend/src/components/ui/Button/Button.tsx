import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "basic";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
  isDisabled?: boolean;
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  isDisabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
