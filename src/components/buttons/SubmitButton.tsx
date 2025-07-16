import { ButtonHTMLAttributes } from "react";
import styles from "./SubmitButton.module.scss";

type submitButtonProps = {
  text?: string;
  isPending?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton = ({
  text = "ثبت",
  isPending,
  ...rest
}: submitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      {...rest}
      className={styles.button}
    >
      {isPending ? <>لطفا صبر کنید ...</> : text}
    </button>
  );
};
export default SubmitButton;
