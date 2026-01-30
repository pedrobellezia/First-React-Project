import type { Cnd } from "../types";

/**
 * Mantém apenas uma CND por tipo, escolhendo sempre a mais recente pela validade.
 * Essa função contém regra de negócio pura (não depende de React, API, etc).
 */
export function normalizeCnds(list: Cnd[] = []): Cnd[] {
  const map = new Map<string, Cnd>();

  for (const item of list) {
    const tipo = item.CndType?.tipo;
    if (!tipo) continue;

    const current = map.get(tipo);

    // Se ainda não existe uma CND desse tipo, salva
    if (!current) {
      map.set(tipo, item);
      continue;
    }

    // Se a atual tem validade maior, substitui
    const currentDate = new Date(current.validade);
    const newDate = new Date(item.validade);

    if (newDate > currentDate) {
      map.set(tipo, item);
    }
  }

  return Array.from(map.values());
}
