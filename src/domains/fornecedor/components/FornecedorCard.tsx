import { useState } from "react";
import type { Cnd } from "../types";
import { CndItem } from "./CndItem";
import styles from "./FornecedorCard.module.css";

interface Props {
  name: string;
  cnds: Cnd[];
}

export function FornecedorCard({ name, cnds }: Props) {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <div className={styles.card}>
      <div
        className={styles.header}
        onClick={toggleOpen}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleOpen();
        }}
      >
        <span>{name}</span>
        <span>{open ? "▴" : "▾"}</span>
      </div>

      <div className={`${styles.content} ${open ? styles.contentShow : ""}`}>
        <div className={styles.inner}>
          {cnds.map((cnd) => (
            <CndItem key={cnd.id} cnd={cnd} />
          ))}
        </div>
      </div>
    </div>
  );
}
