import type React from "react";
import { Container } from "~/components/ui/Container";
import { cn } from "~/lib/utils";
import {
  AdminMainPanel,
  AdminSidebarLeft,
  AdminSidebarRight,
} from "./components";
import styles from "./HomePage.module.css";

export interface HomePageProps extends React.ComponentProps<"main"> {
  className?: string;
}

export function HomePage({ className, ...props }: HomePageProps) {
  return (
    <main className={cn(styles.main, className)} {...props}>
      <Container fluid className={styles.shell}>
        <section className={styles.grid}>
          <AdminSidebarLeft />
          <AdminMainPanel />
          <AdminSidebarRight />
        </section>
      </Container>
    </main>
  );
}
