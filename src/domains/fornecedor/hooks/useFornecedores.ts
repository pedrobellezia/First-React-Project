import { useEffect, useState, useCallback } from "react";
import type { Fornecedor } from "../types";
import { FornecedorApi } from "../api";

export function useFornecedores() {
  const [data, setData] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await FornecedorApi.getFornecedores({
        select: {
          id: true,
          name: true,
          FornecedorCnds: {
            select: {
              file_name: true,
              validade: true,
              CndType: {
                select: {
                  tipo: true,
                },
              },
            },
          },
        },
      });
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refresh: loadData }; // <- adiciona refresh aqui
}
