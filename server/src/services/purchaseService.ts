import {prisma} from "../config/prisma";
import {compraType} from "../types/purchaseType";

function calculateTotalPurchaseValue(compra: compraType){
    return compra.itens.reduce((acumulador, value) => {
        return acumulador + (value.precoUnitario * value.quantidade);
    }, 0)
}
export async function findPurchasesByClientId(clientId: string){
    const purchase = await prisma.compra.findMany({
        where:{
            clienteId: clientId
        }
    })
    return purchase;
}

export async function addPurchase(purchaseId: string, purchase: compraType, 
    valuePuschasePrevious: number, clientId: string){
    const purchases = await prisma.compra.upsert({
        where:{
            id: purchaseId
        }, 
        update:{
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
        },
        create:{
            valorTotal: calculateTotalPurchaseValue(purchase),
            clienteId: clientId,
            itens:{
                create: purchase.itens.map((item) => ({
                    nome: item.nome,
                    precoUnitario: item.precoUnitario,
                    quantidade: item.quantidade,
                    valorTotal: item.precoUnitario * item.quantidade,
                 }))
            }

        },
        include:{
            itens: true,
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