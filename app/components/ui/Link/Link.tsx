import type React from "react";
import { cn } from "~/lib/utils";
import styles from "./Link.module.css";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children?: React.ReactNode;
}

export function Link({ className, children, ...rest }: LinkProps) {
  return (
    <a className={cn(styles.link, className)} {...rest}>
      {children}
    </a>
  );
}
