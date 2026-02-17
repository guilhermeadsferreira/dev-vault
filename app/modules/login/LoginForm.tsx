import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import { Box } from "~/components/ui/Box";
import { Button } from "~/components/ui/Button";
import { Card } from "~/components/ui/Card";
import { Form, FormGroup } from "~/components/ui/Form";
import { FormField } from "~/components/ui/FormField";
import { Stack } from "~/components/ui/Stack";
import { Text } from "~/components/ui/Text";
import { loginSchema, type LoginFormValues } from "./schema";
import styles from "./LoginForm.module.css";

export interface LoginFormProps
  extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  className?: string;
  /** Callback ao submeter com sucesso. Se omitido, usa console.log (dev). */
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
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    onSubmitProp ? onSubmitProp(data) : console.log(data);
  };

  return (
    <Stack
      direction="column"
      gap="lg"
      as="div"
      className={cn(className)}
      {...props}
    >
      <Card padding="none" className={styles.cardGrid}>
        <Form padding="md" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Stack direction="column" gap="sm" align="center">
              <Text as="h1" variant="title">
                Welcome back
              </Text>
              <Text as="p" variant="subtitle" align="center">
                Login to your Acme Inc account
              </Text>
            </Stack>
            <FormField
              control={control}
              name="email"
              label="Email"
              type="email"
              required
              autoComplete="email"
            />
            <FormField
              control={control}
              name="password"
              label="Senha"
              type="password"
              required
              autoComplete="current-password"
            />
            <Button type="submit" loading={isSubmitting}>
              Login
            </Button>
          </FormGroup>
        </Form>
        <Box as="div" background="muted" className={styles.imagePanel}>
          <img src="/logo.png" alt="" className={styles.image} loading="lazy" />
        </Box>
      </Card>
    </Stack>
  );
}
