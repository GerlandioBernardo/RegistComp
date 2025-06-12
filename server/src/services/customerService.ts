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
        }
    })
    return newClient;
}

export async function deletePurchase(clientId: string){
    const shoppingDelete = await prisma.compra.deleteMany({
        where:{
            clienteId: clientId
        }
    })
    return shoppingDelete;
}

