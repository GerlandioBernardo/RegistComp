import {prisma} from "../config/prisma";
import { clienteType } from "../types/clientType";
import {compraType} from "../types/purchaseType";


function calculateTotalPurchaseValue(compra: compraType){
    return compra.itens.reduce((acumulador, value) => {
        return acumulador + (value.precoUnitario * value.quantidade);
    }, 0)
}

export async function findClientById(clientId: string){
    const client = await prisma.cliente.findUnique({
        where:{
            id: clientId
        }
    })
    return client;
}

export async function createClient(merchantId: string, client: clienteType, purchase: compraType){
    const newClient = await prisma.cliente.create({
        data:{
            nome: client.nome,
            cpf: client.cpf,
            telefone: client.telefone,
            rua: client.rua,
            numero: client.numero,
            bairro: client.bairro,
            cidade: client.cidade,
            estado: client.estado,
            comercianteId: merchantId,
            compras: {
                create: {
                    valorTotal: calculateTotalPurchaseValue(purchase),
                    itens:{
                        create: purchase.itens.map((item) => ({
                            nome: item.nome,
                            precoUnitario: item.precoUnitario,
                            quantidade: item.quantidade,
                            valorTotal: item.precoUnitario * item.quantidade,
                        }))
                    }
                }
            }
        },
        select:{
            id: true,
            nome: true,
            telefone: true,
            cpf: true,
            rua: true,
            numero: true,
            bairro: true,
            cidade: true,
            compras:{
                select:{
                    id: true,
                    valorTotal: true,
                    data: true,
                    itens:{
                        select:{
                            id: true,
                            nome: true,
                            quantidade: true,
                            precoUnitario: true,
                            valorTotal: true
                        }
                    }
                }
            },
        }
    })
    return newClient;
}

export async function updateClient(id: string, newDataClient: clienteType){
    const newData = await prisma.cliente.update({
        where:{
            id
        }, 
        data:{
            ...(newDataClient.nome && {nome: newDataClient.nome}),
            ...(newDataClient.cpf && {cpf: newDataClient.cpf}),
            ...(newDataClient.telefone && {telefone: newDataClient.telefone}),
            ...(newDataClient.rua && {rua: newDataClient.rua}),
            ...(newDataClient.numero && {numero: newDataClient.numero}),
            ...(newDataClient.bairro && {bairro: newDataClient.bairro}),
            ...(newDataClient.cidade && {cidade: newDataClient.cidade}),
            ...(newDataClient.estado && {estado: newDataClient.estado}),
        }
    })
    return newData
}

export async function deletePurchase(clientId: string){
    const purchaseDelete = await prisma.compra.deleteMany({
        where:{
            clienteId: clientId
        }
    })
    return purchaseDelete;
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

export async function deleteItemPurchase(id: string){
    const itemDelete = await prisma.itemCompra.delete({
        where:{
            id
        }
    })
    return itemDelete;
}

