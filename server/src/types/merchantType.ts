import { customerType } from "./customerType";

export type comercianteType = {
    id: string;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    nomeComercial: string;
    clientes: customerType[];
}