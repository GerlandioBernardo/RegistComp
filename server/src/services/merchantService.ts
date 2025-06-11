import {prisma} from "../config/prisma";
import { comercianteType } from "../types/merchantType";

export async function findMerchantById(id: string){
    return await prisma.comerciante.findUnique({
        where: {
            id
        }
    })
}

export async function updateMerchant(id: string, newMerchantData: comercianteType){
    const merchant = await prisma.comerciante.update({
        where:{
            id
        },
        data: {
           ...(newMerchantData.nome && { nome: newMerchantData.nome }),
            ...(newMerchantData.cpf && { cpf: newMerchantData.cpf }),
            ...(newMerchantData.email && { email: newMerchantData.email }),
             ...(newMerchantData.nomeComercial && { nomeComercial: newMerchantData.nomeComercial})

        },
         select:{
            nome: true,
            email: true,
            cpf: true,
            nomeComercial: true,
         }
    }) 
    return merchant;
}