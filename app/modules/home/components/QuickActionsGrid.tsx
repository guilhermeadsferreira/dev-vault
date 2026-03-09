import type { LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Field";
import { Text } from "~/components/ui/Text";
import styles from "./QuickActionsGrid.module.css";

export type QuickActionTone = "default" | "danger" | "primary";

export interface QuickActionButton {
  id: string;
  type: "button";
  label: string;
  icon: LucideIcon;
  tone?: QuickActionTone;
}

export interface QuickActionInput {
  id: string;
  type: "input";
  name: string;
  placeholder: string;
  ariaLabel: string;
}

export type QuickActionItem = QuickActionButton | QuickActionInput;

export interface QuickActionsGridProps {
  items: QuickActionItem[];
  title?: string;
  titleIcon?: LucideIcon;
  className?: string;
}

const toneClass: Record<QuickActionTone, string> = {
  default: styles.actionCard,
  danger: styles.actionCardDanger,
  primary: styles.actionCardPrimary,
};

export function QuickActionsGrid({
  items,
  title,
  titleIcon: TitleIcon,
  className,
}: QuickActionsGridProps) {
  return (
    <section className={className} aria-label={title ?? "Ações rápidas"}>
      {title && (
        <div className={styles.header}>
          {TitleIcon && <TitleIcon size={16} aria-hidden />}
          <Text as="h2" variant="subtitle" className={styles.title}>
            {title}
          </Text>
        </div>
      )}

      <div className={styles.grid}>
        {items.map((item) => {
          if (item.type === "input") {
            return (
              <Input
                key={item.id}
                id={item.id}
                name={item.name}
                placeholder={item.placeholder}
                aria-label={item.ariaLabel}
                className={styles.actionInput}
              />
            );
          }

          const Icon = item.icon;
          const tone = item.tone ?? "default";

          return (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              className={toneClass[tone]}
              leftIcon={<Icon size={14} aria-hidden />}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
