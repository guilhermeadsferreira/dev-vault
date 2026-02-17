import type React from "react";
import { cn } from "~/lib/utils";
import { Stack } from "~/components/ui/Stack";
import styles from "./Form.module.css";

type FormPadding = "none" | "md" | "lg";

export interface FormProps extends Omit<
  React.ComponentProps<"form">,
  "className"
> {
  padding?: FormPadding;
  className?: string;
  children?: React.ReactNode;
}

const paddingClass: Record<FormPadding, string> = {
  none: "",
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

export function Form({
  padding = "md",
  className,
  children,
  ...rest
}: FormProps) {
  return (
    <form
      className={cn(styles.form, paddingClass[padding], className)}
      {...rest}
    >
      {children}
    </form>
  );
}

export interface FormGroupProps {
  className?: string;
  children?: React.ReactNode;
}

export function FormGroup({ className, children }: FormGroupProps) {
  return (
    <Stack direction="column" gap="lg" as="div" className={className}>
      {children}
    </Stack>
  );
}
