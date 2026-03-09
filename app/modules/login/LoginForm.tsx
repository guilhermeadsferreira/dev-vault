import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { Form, FormGroup } from "~/components/ui/Form";
import { FormField } from "~/components/ui/FormField";
import { loginSchema, type LoginFormValues } from "./schema";
import styles from "./LoginForm.module.css";

export interface LoginFormProps
  extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  className?: string;

  onSubmit?: (data: LoginFormValues) => void;
}

export function LoginForm({
  className,
  onSubmit: onSubmitProp,
  ...props
}: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    onSubmitProp ? onSubmitProp(data) : console.log(data);
  };

  return (
    <div className={cn(styles.container, className)} {...props}>
      <Form padding="none" onSubmit={handleSubmit(onSubmit)} className={styles.card}>
        <div className={styles.brandBlock}>
          <img src="/logo.png" alt="DevVault" className={styles.logo} />
        </div>

        <FormGroup className={styles.fields}>
          <FormField
            control={control}
            name="username"
            label="Usuário"
            type="text"
            required
            placeholder="Usuário"
            autoComplete="username"
          />
          <FormField
            control={control}
            name="password"
            label="Senha"
            type="password"
            required
            placeholder="Senha"
            autoComplete="current-password"
          />
          <label htmlFor="remember-me" className={styles.rememberRow}>
            <input
              id="remember-me"
              name="remember"
              type="checkbox"
              className={styles.rememberCheckbox}
            />
            Lembrar-me
          </label>
          <Button type="submit" loading={isSubmitting} className={styles.submitButton}>
            Entrar
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}
