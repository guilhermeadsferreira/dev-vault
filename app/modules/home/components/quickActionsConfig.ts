import { Database, FolderLock, Home, PlusSquare, RefreshCcw } from "lucide-react";
import type { QuickActionItem } from "./QuickActionsGrid";

export const quickActionsItems: QuickActionItem[] = [
  {
    id: "deploy",
    type: "button",
    label: "Subir para Produção - 220",
    icon: RefreshCcw,
    tone: "default",
  },
  {
    id: "open",
    type: "button",
    label: "Atualizar Open",
    icon: Database,
    tone: "default",
  },
  {
    id: "home",
    type: "button",
    label: "Atu-Home-Praxedes",
    icon: Home,
    tone: "default",
  },
  {
    id: "unlock",
    type: "button",
    label: "Desbloquear Módulo",
    icon: FolderLock,
    tone: "danger",
  },
  {
    id: "ticket-id",
    type: "input",
    name: "ticketId",
    placeholder: "ID do Chamado:",
    ariaLabel: "ID do Chamado",
  },
  {
    id: "copy",
    type: "button",
    label: "Aplicar Cópia",
    icon: PlusSquare,
    tone: "primary",
  },
];
