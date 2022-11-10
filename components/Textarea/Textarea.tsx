import styles from "./Textarea.module.css";
import cn from "classnames";
import { DetailedHTMLProps, ForwardedRef, forwardRef, TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface TextareaProps
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  error?: FieldError;
}

export const Textarea = forwardRef(
  ({ className, error, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <div className={cn(className, styles.textareaWrapper)}>
        <textarea
          className={cn(styles.textarea, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
