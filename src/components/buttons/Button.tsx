import { ButtonHTMLAttributes } from "react";
import styles from "./SubmitButton.module.scss";

type submitButtonProps = {
  text?: string;
  isPending?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text = "ثبت", isPending, ...rest }: submitButtonProps) => {
  return (
    <button disabled={isPending} {...rest} className={styles.button}>
      {isPending ? <>صبر کنید ...</> : text}
    </button>
  );
};
export default Button;
