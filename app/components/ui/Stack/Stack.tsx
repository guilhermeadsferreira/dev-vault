import type React from "react";
import { cn } from "~/lib/utils";
import styles from "./Stack.module.css";

type StackDirection = "column" | "row";
type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify = "start" | "center" | "end" | "between";

export interface StackProps {
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

const gapClass: Record<StackGap, string> = {
  xs: styles.gapXs,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
};

const alignClass: Record<StackAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
};

const justifyClass: Record<StackJustify, string> = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
};

export function Stack({
  direction = "column",
  gap = "md",
  align,
  justify,
  wrap = false,
  as: Component = "div",
  className,
  children,
}: StackProps) {
  return (
    <Component
      className={cn(
        styles.stack,
        direction === "column" ? styles.column : styles.row,
        gapClass[gap],
        align && alignClass[align],
        justify && justifyClass[justify],
        direction === "row" && wrap && styles.wrap,
        className
      )}
    >
      {children}
    </Component>
  );
}
