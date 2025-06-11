import {Request, Response, NextFunction} from "express";
import * as merchantService from "../services/merchantService";


export async function getClients(req: Request, res: Response){
    try {
        const {merchantId} = req.body;

        const merchantExists = await merchantService.findMerchantById(merchantId);
        if(!merchantExists){
            res.status(404).json({message: "Usuario não existente"});
            return;
        }
        const clients = await merchantService.getClients(merchantId);
        res.status(200).json(clients);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export  async function updateMerchant(req: Request, res: Response){
    try {
        const {merchantId, newMerchantData} = req.body;

        const merchantExists = await merchantService.findMerchantById(merchantId);

        if(!merchantExists){
            res.status(404).json({message: "Usuario não existente"});
            return;
        }
        const merchant = await merchantService.updateMerchant(merchantId, newMerchantData);
        res.status(200).json(merchant);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
    
}

export async function deleteMerchant(req: Request, res: Response){
    try {
        const {merchantId} = req.body;

        const merchantExists = await merchantService.findMerchantById(merchantId);
        if(!merchantExists){
            res.status(404).json({message: "Usuario não existente"});
            return;
        }

        const merchant = await merchantService.deleteMerchant(merchantId);
        
        if(!merchant){
            res.status(400).json({message: "Error ao excluir usuario"});
            return;
        }

        res.status(200).json({message: "Usuario excluido com sucesso"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

// rota para upload de imagem

export async function updateProfilePicture(req: Request, res: Response){
    try {
        const {merchantId, fotoPerfil} = req.body

        const merchantExists = await merchantService.findMerchantById(merchantId);
        if(!merchantExists){
            res.status(404).json({message: "Usuario não existente"});
            return;
        }
        const newUrlImage = await merchantService.updateProfilePicture(merchantId, fotoPerfil);

        if(!newUrlImage){
            res.status(400).json({message: "Error ao atualizar imagem de perfil do usuario"});
            return;
        }
        res.status(200).json(newUrlImage);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}