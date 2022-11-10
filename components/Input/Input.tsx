import styles from "./Input.module.css";
import cn from "classnames";
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: FieldError;
}

export const Input = forwardRef(
  ({ className, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={cn(className, styles.inputWrapper)}>
        <input
          className={cn(styles.input, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        ></input>
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
