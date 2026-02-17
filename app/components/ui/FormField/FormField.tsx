import type React from "react";
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Field, Input } from "~/components/ui/Field";
import type { InputProps } from "~/components/ui/Field";

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  labelSuffix?: React.ReactNode;
  hint?: string;
  required?: boolean;
  type?: InputProps["type"];
  size?: InputProps["size"];
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Campo de formulário conectado ao React Hook Form.
 * Renderiza Field + Input com erro e estado vindos do form.
 */
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  labelSuffix,
  hint,
  required = false,
  type = "text",
  size,
  placeholder,
  autoComplete,
  disabled,
  className,
}: FormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          label={label}
          labelSuffix={labelSuffix}
          hint={hint}
          error={fieldState.error?.message}
          required={required}
          name={field.name}
          className={className}
        >
          <Input
            {...field}
            type={type}
            size={size}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            invalid={Boolean(fieldState.error)}
          />
        </Field>
      )}
    />
  );
}
