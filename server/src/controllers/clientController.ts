import {Request, Response} from "express";
import * as clientService from "../services/clientService";

export async function createClient(req: Request, res: Response){
    try {
        const {merchantId, client, purchase} = req.body;

        const newClient = await clientService.createClient(merchantId, client, purchase);
        if(!newClient){
            res.status(400).json({message: "Error ao cadastra cliente"});
            return;
        }
        res.status(201).json({
            message: "Cliente cadastro com sucesso",
            client: newClient
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export async function deletePurchase(req: Request, res:Response){
    try {
        const {clientId} = req.params;

        const client = await clientService.findClientById(clientId);
        if(!client){
            res.status(404).json({message: "Cliente não cadastro"});
            return;
        }
        const deleteShopping = await clientService.deletePurchase(clientId);
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

export async function addPurchase(req:Request, res:Response){
    try {
        const {clientId, valuePuschasePrevious, purchaseId, purchase} = req.body;

        const client = await clientService.findClientById(clientId);
        if(!client){
            res.status(404).json({message: "Cliente não cadastro"});
            return;
        }

        const newpurchase = await clientService.addPurchase(purchaseId, purchase, valuePuschasePrevious);
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

export async function deleteItemPurchase(req: Request, res: Response){
    try {
        const {clientId, itemPurchaseId} = req.params;

        const client = await clientService.findClientById(clientId);
        if(!client){
            res.status(404).json({message: "Cliente não cadastro"});
            return;
        }
        const itemDelete = await clientService.deleteItemPurchase(itemPurchaseId);
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