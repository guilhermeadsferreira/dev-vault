import type React from "react";
import { cn } from "~/lib/utils";
import styles from "./Box.module.css";

type BoxPadding = "none" | "sm" | "md" | "lg";
type BoxBackground = "none" | "default" | "muted" | "card";
type BoxRadius = "none" | "sm" | "md" | "lg";

export interface BoxProps {
  padding?: BoxPadding;
  border?: boolean;
  background?: BoxBackground;
  radius?: BoxRadius;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

const paddingClass: Record<BoxPadding, string> = {
  none: styles.paddingNone,
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

const backgroundClass: Record<BoxBackground, string> = {
  none: "",
  default: styles.backgroundDefault,
  muted: styles.backgroundMuted,
  card: styles.backgroundCard,
};

const radiusClass: Record<BoxRadius, string> = {
  none: styles.radiusNone,
  sm: styles.radiusSm,
  md: styles.radiusMd,
  lg: styles.radiusLg,
};

export function Box({
  padding = "none",
  border = false,
  background = "none",
  radius = "none",
  as: Component = "div",
  className,
  children,
}: BoxProps) {
  return (
    <Component
      className={cn(
        styles.box,
        paddingClass[padding],
        border && styles.border,
        backgroundClass[background],
        radiusClass[radius],
        className
      )}
    >
      {children}
    </Component>
  );
}
