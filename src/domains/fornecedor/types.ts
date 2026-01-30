export interface CndType {
  id: string;
  tipo: string;
}

export interface Cnd {
  id: string;
  file_name: string;
  validade: string;
  CndType?: CndType;
}

export interface Fornecedor {
  id: string;
  name: string;
  FornecedorCnds?: Cnd[];
}

export interface FornecedorResponse {
  success: boolean;
  data: Fornecedor[];
}
