import {Request, Response} from "express";
import * as purchaseService from "../services/purchaseService";

export async function addPurchase(req:Request, res:Response){
    try {
        const {valuePuschasePrevious, purchaseId, purchase} = req.body;

        const newpurchase = await purchaseService.addPurchase(purchaseId, purchase, valuePuschasePrevious);
        if(!newpurchase){
            res.status(400).json({message: "Error ao cadastra compras"});
            return;
        }

        res.status(200).json({
            message: "Compras cadastradas com sucesso",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function deletePurchase(req: Request, res:Response){
    try {
        const {clientId} = req.params;

        const deleteShopping = await purchaseService.deletePurchase(clientId);
        if(deleteShopping.count === 0){
            res.status(404).json({message: "Nenhuma compra encontrada para esse cliente"});
            return;
        }
        res.status(200).json({message: "Compras excluidas com sucesso"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function deleteItemPurchase(req: Request, res: Response){
    try {
        const {itemPurchaseId} = req.params;

        const itemDelete = await purchaseService.deleteItemPurchase(itemPurchaseId);
        if(!itemDelete){
            res.status(404).json({message: "Nenhuma compra encontrada para esse cliente"});
            return;
        }

        res.status(200).json({message: "Compra excluida com sucesso"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}