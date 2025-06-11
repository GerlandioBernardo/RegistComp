import {Request, Response, NextFunction} from "express";
import * as merchantService from "../services/merchantService";

export  async function updateMerchant(req: Request, res: Response){
    try {
        const {merchantId, newMerchantData} = req.body;

        const merchantExists = await merchantService.findMerchantById(merchantId);

        if(!merchantExists){
            res.status(404).json({message: "Usuario não encontrado"});
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
            res.status(404).json({message: "Usuario não encontrado"});
            return;
        }

        const merchant = await merchantService.deleteMerchant(merchantId);
        
        if(!merchant){
            res.status(404).json({message: "Error ao excluir usuario"});
            return;
        }

        res.status(200).json({message: "Usuario excluido com sucesso"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}