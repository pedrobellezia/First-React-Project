import type { Fornecedor, Cnd } from "./types";

export function mapCnd(raw: any): Cnd {
  return {
    id: String(raw.id),
    file_name: String(raw.file_name),
    validade: String(raw.validade),
    CndType: raw.CndType
      ? {
          id: String(raw.CndType.id ?? ""),
          tipo: String(raw.CndType.tipo ?? ""),
        }
      : undefined,
  };
}

export function mapFornecedor(raw: any): Fornecedor {
  return {
    id: String(raw.id),
    name: String(raw.name),
    FornecedorCnds: Array.isArray(raw.FornecedorCnds)
      ? raw.FornecedorCnds.map(mapCnd)
      : [],
  };
}
