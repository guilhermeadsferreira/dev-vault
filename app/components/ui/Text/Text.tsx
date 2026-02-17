import type React from "react";
import { cn } from "~/lib/cn";
import styles from "./Text.module.css";

type TextVariant = "title" | "subtitle" | "body" | "muted";
type TextAlign = "start" | "center" | "end";

export interface TextProps {
  variant?: TextVariant;
  align?: TextAlign;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  children?: React.ReactNode;
}

const variantClass: Record<TextVariant, string> = {
  title: styles.variantTitle,
  subtitle: styles.variantSubtitle,
  body: styles.variantBody,
  muted: styles.variantMuted,
};

const alignClass: Record<TextAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
};

export function Text({
  variant = "body",
  align,
  as: Component = "p",
  className,
  children,
}: TextProps) {
  return (
    <Component
      className={cn(
        styles.text,
        variantClass[variant],
        align && alignClass[align],
        className
      )}
    >
      {children}
    </Component>
  );
}
