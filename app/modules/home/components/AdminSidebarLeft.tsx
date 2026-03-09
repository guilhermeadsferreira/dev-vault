import { Form } from "react-router";
import {
  BarChart3,
  FolderKanban,
  LogOut,
  Search,
  UserRoundPlus,
} from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Field";
import styles from "./AdminSidebarLeft.module.css";

const menuItems = [
  { label: "Repositórios", icon: FolderKanban },
  { label: "Cadastro", icon: UserRoundPlus },
  { label: "Relatórios", icon: BarChart3 },
];

export function AdminSidebarLeft() {
  return (
    <aside className={styles.sidebar} aria-label="Navegação principal do painel">
      <div className={styles.searchBlock}>
        <label htmlFor="menu-search" className={styles.searchLabel}>
          <Search size={14} className={styles.labelIcon} aria-hidden />
          Buscar
        </label>
        <Input id="menu-search" name="menuSearch" placeholder="Buscar" />
      </div>

      <nav aria-label="Menu lateral">
        <ul className={styles.menuList}>
          {menuItems.map(({ label, icon: Icon }) => (
            <li key={label}>
              <Button
                variant="ghost"
                className={styles.menuButton}
                leftIcon={<Icon size={16} aria-hidden />}
              >
                {label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <Form method="post" action="/?index" className={styles.logoutForm}>
        <input type="hidden" name="_action" value="logout" />
        <Button
          type="submit"
          variant="secondary"
          className={styles.logoutButton}
          leftIcon={<LogOut size={16} aria-hidden />}
        >
          Sair
        </Button>
      </Form>
    </aside>
  );
}
