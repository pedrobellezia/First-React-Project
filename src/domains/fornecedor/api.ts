import api from "../../infra/http/axios";
import type { FornecedorResponse, Fornecedor, Cnd } from "./types";
import { normalizeCnds } from "./services/normalizeCnds";

export interface CreateFornecedorPayload {
  name: string;
  cnds?: Cnd[];
}

export const FornecedorApi = {
  async getFornecedores(
    filter: Record<string, unknown> = {},
  ): Promise<FornecedorResponse> {
    const response: FornecedorResponse = (
      await api.post("/fornecedor/search", filter)
    ).data;

    if (!response.success) return response;
    const data = {
      ...response,
      data: response.data.map((f) => ({
        ...f,
        FornecedorCnds: normalizeCnds(f.FornecedorCnds),
      })),
    };
    return data;
  },

  async createFornecedor(
    payload: CreateFornecedorPayload,
  ): Promise<Fornecedor> {
    const response: { success: boolean; data: Fornecedor } = (
      await api.post("/fornecedor", payload)
    ).data;

    if (!response.success) {
      throw new Error("Erro ao criar fornecedor");
    }

    return {
      ...response.data,
      FornecedorCnds: normalizeCnds(response.data.FornecedorCnds),
    };
  },
};
