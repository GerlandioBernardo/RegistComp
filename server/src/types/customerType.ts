import { compraType } from "./purchaseType";

export type clienteType = {
    id: string;
    nome: string;
    cpf: string;
    telefone: string;
    rua: string;
    numero: number;
    bairro: string
    cidade: string;
    estado: string;
    comercianteId: string;
    compras: compraType[];

}