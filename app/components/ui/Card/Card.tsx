import { cn } from "~/lib/utils";
import styles from "./Card.module.css";

type CardVariant = "default" | "outlined";
type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  children?: React.ReactNode;
}

const paddingClass: Record<CardPadding, string> = {
  none: styles.paddingNone,
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

export function Card({
  variant = "default",
  padding = "md",
  className,
  children,
}: CardProps) {
  return (
    <section
      className={cn(
        styles.card,
        variant === "outlined" && styles.outlined,
        paddingClass[padding],
        className
      )}
    >
      {children}
    </section>
  );
}

export interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return <div className={cn(styles.header, className)}>{children}</div>;
}

export interface CardBodyProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardBody({ className, children }: CardBodyProps) {
  return <div className={cn(styles.body, className)}>{children}</div>;
}

export interface CardFooterProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return <div className={cn(styles.footer, className)}>{children}</div>;
}
