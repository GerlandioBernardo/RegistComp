import {prisma} from "../config/prisma";
import { comercianteType } from "../types/merchantType";

export async function findMerchantById(id: string){
    return await prisma.comerciante.findUnique({
        where: {
            id
        }
    })
}

export async function getClients(id: string){
    const clients = await prisma.comerciante.findUnique({
        where:{
            id
        },
        select:{
            clientes: true
        }
    })
    return clients;
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

export async function deleteMerchant(id: string){
    const merchant = await prisma.comerciante.delete({
        where:{
            id
        }
    })
    return merchant;
}

export async function updateProfilePicture(id: string, image: string){
    const newImage = await prisma.comerciante.update({
        where:{
            id
        }, 
        data:{
            fotoPerfil: image,
        }, 
        select:{
            fotoPerfil: true
        }
    })
    return newImage;
}