import { customerType } from "./clientType";

export type comercianteType = {
    id: string;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    nomeComercial: string;
    fotoPerfil?: string;
    clientes: customerType[];
}