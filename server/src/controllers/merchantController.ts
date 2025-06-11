import {Request, Response, NextFunction} from "express";
import * as merchantService from "../services/merchantService";

export  async function updateMerchant(req: Request, res: Response){
    try {
        const {merchantId, newMerchantData} = req.body;

        const merchantExists = await merchantService.findMerchantById(merchantId);

        if(!merchantExists){
            res.status(404).json({message: "Usúario não encontrado"});
            return;
        }
        const merchant = await merchantService.updateMerchant(merchantId, newMerchantData);
        res.status(200).json(merchant);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
    
}