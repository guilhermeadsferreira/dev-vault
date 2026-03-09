import { Bolt, LayoutPanelTop, PlusSquare, X } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Card } from "~/components/ui/Card";
import { Input } from "~/components/ui/Field";
import { Text } from "~/components/ui/Text";
import { QuickActionsGrid } from "./QuickActionsGrid";
import { quickActionsItems } from "./quickActionsConfig";
import styles from "./AdminMainPanel.module.css";

export function AdminMainPanel() {
  return (
    <section className={styles.panel} aria-label="Conteúdo principal do painel">
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <LayoutPanelTop size={18} aria-hidden />
          <Text as="h1" variant="title">
            Painel desenvolvimento
          </Text>
        </div>
        <button type="button" className={styles.closeButton} aria-label="Fechar painel">
          <X size={16} aria-hidden />
        </button>
      </header>

      <QuickActionsGrid
        items={quickActionsItems}
        title="Ações Rápidas"
        titleIcon={Bolt}
        className={styles.quickActions}
      />

      <section className={styles.addModuleSection} aria-label="Adicionar módulo novo ao chamado">
        <Text as="h2" variant="subtitle">
          Adicionar Módulo Novo ao Chamado
        </Text>
        <div className={styles.addModuleRow}>
          <Input
            id="new-module-search"
            name="newModuleSearch"
            placeholder="Procurar"
            aria-label="Procurar módulo"
          />
          <Button type="button" leftIcon={<PlusSquare size={16} aria-hidden />}>
            Registrar
          </Button>
        </div>
      </section>

      <Card variant="outlined" className={styles.contentArea}>
        <Text as="p" variant="muted">
          Área principal de conteúdo
        </Text>
      </Card>
    </section>
  );
}
