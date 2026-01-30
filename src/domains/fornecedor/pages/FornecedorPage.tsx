import { useState } from "react";
import { FornecedorCard } from "../components/FornecedorCard";
import { useFornecedores } from "../hooks/useFornecedores";
import Button from "../../../shared/components/Button";
import { FornecedorFormModal } from "../components/FornecedorFormModal";
import { FornecedorApi } from "../api"; 

export default function FornecedorPage() {
  const { data, loading, error, refresh } = useFornecedores();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddFornecedor = async (data: {
    cnpj: string;
    name: string;
    uf: string;
    municipio: string;
  }) => {
    try {
      await FornecedorApi.createFornecedor(data);
      refresh(); // atualiza a lista
      setModalOpen(false);
    } catch (err) {
      console.error("Erro ao criar fornecedor:", err);
      alert("Não foi possível criar o fornecedor. Tente novamente.");
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2>Fornecedores</h2>
        <Button onClick={() => setModalOpen(true)}>Adicionar fornecedor</Button>
      </div>

      {loading && (
        <div className="text-center py-5">Carregando fornecedores...</div>
      )}

      {!loading && error && (
        <div className="alert alert-danger text-center">
          Não foi possível carregar os fornecedores.
        </div>
      )}

      {!loading && !error && (
        <div className="row">
          {Array.isArray(data) && data.length === 0 && (
            <div className="text-center col-12 py-5">
              Nenhum fornecedor encontrado.
            </div>
          )}

          {Array.isArray(data) &&
            data.map((fornecedor) => (
              <div className="col-md-6 col-lg-4 mb-3" key={fornecedor.id}>
                <FornecedorCard
                  name={fornecedor.name}
                  cnds={fornecedor.FornecedorCnds ?? []}
                />
              </div>
            ))}
        </div>
      )}

      <FornecedorFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddFornecedor}
      />
    </div>
  );
}
