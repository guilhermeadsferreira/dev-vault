import React, { forwardRef, useId } from "react";
import { cn } from "~/lib/cn";
import styles from "./Field.module.css";

type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "className"
> {
  size?: InputSize;
  invalid?: boolean;
  className?: string;
}

const inputSizeClass: Record<InputSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { size = "md", invalid = false, className, ...rest },
    ref
  ) {
    return (
      <input
        ref={ref}
        className={cn(
          styles.input,
          inputSizeClass[size],
          invalid && styles.invalid,
          className
        )}
        aria-invalid={invalid ? "true" : undefined}
        {...rest}
      />
    );
  }
);

export interface FieldProps {
  label?: string;
  labelSuffix?: React.ReactNode;
  hint?: string;
  error?: string;
  required?: boolean;
  /** Usado no label (htmlFor) e no input. Se não informado, usa name. */
  id?: string;
  /** Nome do campo no formulário (FormData). Sincronizado com id quando só um for passado. */
  name?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Field({
  label,
  labelSuffix,
  hint,
  error,
  required = false,
  id: idProp,
  name: nameProp,
  children,
  className,
}: FieldProps) {
  const generatedId = useId();
  const id = idProp ?? nameProp ?? generatedId;
  const name = nameProp ?? idProp;
  const describedBy =
    [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") ||
    undefined;

  const inputProps = {
    id,
    ...(name !== undefined && { name }),
    "aria-describedby": describedBy,
    "aria-invalid": Boolean(error),
    "aria-required": required,
  };

  const inputElement = children ? (
    React.isValidElement(children) ? (
      React.cloneElement(
        children as React.ReactElement<{
          id?: string;
          name?: string;
          "aria-describedby"?: string;
          "aria-invalid"?: boolean;
          "aria-required"?: boolean;
        }>,
        inputProps
      )
    ) : (
      children
    )
  ) : (
    <Input {...inputProps} invalid={Boolean(error)} />
  );

  const labelContent = label ? (
    labelSuffix ? (
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && " *"}
        </label>
        <span className={styles.labelSuffix}>{labelSuffix}</span>
      </div>
    ) : (
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && " *"}
      </label>
    )
  ) : null;

  return (
    <div className={cn(styles.field, className)}>
      {labelContent}
      {inputElement}
      {hint && !error && (
        <span id={`${id}-hint`} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
