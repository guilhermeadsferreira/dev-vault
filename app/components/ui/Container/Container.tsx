import type React from "react";
import { cn } from "~/lib/utils";
import styles from "./Container.module.css";

type ContainerSize = "sm" | "md" | "lg" | "xl";

export interface ContainerProps {
  size?: ContainerSize;
  centered?: boolean;
  fluid?: boolean;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

const sizeClass: Record<ContainerSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

export function Container({
  size = "lg",
  centered = false,
  fluid = false,
  as: Component = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        styles.container,
        sizeClass[size],
        centered && styles.centered,
        fluid && styles.fluid,
        className
      )}
    >
      {children}
    </Component>
  );
}
