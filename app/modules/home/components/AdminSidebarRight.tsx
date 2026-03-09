import { Boxes, ClipboardList } from "lucide-react";
import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import styles from "./AdminSidebarRight.module.css";

const chamadosItems = ["Chamado 1", "Chamado 2"];
const modulosItems = ["Módulo 1", "Módulo 2", "Módulo 3", "Módulo 4", "Módulo 5"];

export function AdminSidebarRight() {
  return (
    <aside className={styles.sidebar} aria-label="Informações laterais">
      <Card variant="outlined" className={styles.sectionCard}>
        <div className={styles.sectionHeading}>
          <ClipboardList size={16} aria-hidden />
          <Text as="h2" variant="subtitle" className={styles.sectionTitle}>
            Chamados no meu nome
          </Text>
        </div>
        <ul className={styles.itemList}>
          {chamadosItems.map((item) => (
            <li key={item} className={styles.item}>
              <Text as="span" variant="muted">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </Card>

      <Card variant="outlined" className={styles.sectionCard}>
        <div className={styles.sectionHeading}>
          <Boxes size={16} aria-hidden />
          <Text as="h2" variant="subtitle" className={styles.sectionTitle}>
            Módulos em uso
          </Text>
        </div>
        <ul className={styles.gridList}>
          {modulosItems.map((item) => (
            <li key={item} className={styles.item}>
              <Text as="span" variant="muted">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
