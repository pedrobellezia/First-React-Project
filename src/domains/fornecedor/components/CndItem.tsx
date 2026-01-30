import type { Cnd } from "../types";
import styles from "./CndItem.module.css";

interface Props {
  cnd: Cnd;
}

export function CndItem({ cnd }: Props) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const fileUrl = `${baseUrl}/public/${cnd.file_name}`;

  if (!cnd.CndType) return null;

  function formatDate(dateStr: string) {
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return dateStr;
    const [, year, month, day] = match;
    return `${day}/${month}/${year}`;
  }

  return (
    <a
      className={styles.cndItem}
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.name}>{cnd.CndType.tipo}</span>
      <span className={styles.validity}>Válido até {formatDate(cnd.validade)}</span>
      <span className={styles.open}>Abrir PDF</span>
    </a>
  );
}
