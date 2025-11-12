import { itemCompraType } from "./purchaseItemType";

export type compraType = {
    id: string;
    data: Date;
    valorTotal: number;
    clienteId: string
    itens: itemCompraType[];
}