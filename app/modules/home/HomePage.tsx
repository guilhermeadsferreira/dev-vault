import type React from "react";
import { Form } from "react-router";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import styles from "./HomePage.module.css";

export interface HomePageProps extends React.ComponentProps<"main"> {
  className?: string;
}

export function HomePage({ className, ...props }: HomePageProps) {
  return (
    <main className={styles.main} {...props}>
      <Container size="md" centered>
        <header className={styles.header}>
          <Text as="h1" variant="title">
            Home
          </Text>
          <p className={styles.subtitle}>Bem-vindo ao Dev Vault</p>
        </header>
        <Form method="post" action="/?index" className={styles.logoutForm}>
          <input type="hidden" name="_action" value="logout" />
          <button type="submit" className={styles.logoutButton}>
            Sair
          </button>
        </Form>
      </Container>
    </main>
  );
}
