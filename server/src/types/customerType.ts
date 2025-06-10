import { compraType } from "./purchaseType";

export type customerType = {
    id: string;
    nome: string;
    cpf: string;
    telefone: string;
    rua: string;
    numero: number;
    barrio: string
    cidade: string;
    estado: string;
    comercianteId: string;
    compras: compraType[];

}