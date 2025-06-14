import {prisma} from "../config/prisma";
import {compraType} from "../types/purchaseType";

function calculateTotalPurchaseValue(compra: compraType){
    return compra.itens.reduce((acumulador, value) => {
        return acumulador + (value.precoUnitario * value.quantidade);
    }, 0)
}


export async function addPurchase(purchaseId: string, purchase: compraType, 
    valuePuschasePrevious: number){
    const purchases = await prisma.compra.update({
        where:{
            id: purchaseId
        },
        data:{
            valorTotal: valuePuschasePrevious + calculateTotalPurchaseValue(purchase),
            data: new Date(),
                 itens:{
                    create: purchase.itens.map((item) => ({
                        nome: item.nome,
                        precoUnitario: item.precoUnitario,
                        quantidade: item.quantidade,
                        valorTotal: item.precoUnitario * item.quantidade,
                     }))
                }
            }
    })
    return purchases;
}

export async function deletePurchase(clientId: string){
    const purchaseDelete = await prisma.compra.deleteMany({
        where:{
            clienteId: clientId
        }
    })
    return purchaseDelete;
}

export async function deleteItemPurchase(id: string){
    const itemDelete = await prisma.itemCompra.delete({
        where:{
            id
        }
    })
    return itemDelete;
}