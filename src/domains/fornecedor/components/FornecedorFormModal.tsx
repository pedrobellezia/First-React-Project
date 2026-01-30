import { useState } from "react";
import Button from "../../../shared/components/Button";
import styles from "./FornecedorFormModal.module.css";

interface FornecedorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    cnpj: string;
    name: string;
    uf: string;
    municipio: string;
  }) => void;
}

export function FornecedorFormModal({
  isOpen,
  onClose,
  onSubmit,
}: FornecedorFormModalProps) {
  const [cnpj, setCnpj] = useState("");
  const [name, setName] = useState("");
  const [uf, setUf] = useState("");
  const [municipio, setMunicipio] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ cnpj, name, uf, municipio });
    onClose();
    setCnpj("");
    setName("");
    setUf("");
    setMunicipio("");
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modalHeader}>Adicionar Fornecedor</h2>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div>
            <label>CNPJ</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>UF</label>
            <input
              type="text"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Município</label>
            <input
              type="text"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              required
            />
          </div>

          <div className={styles.modalButtons}>
            <Button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancelar
            </Button>
            <Button type="submit" className={styles.submitBtn}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
