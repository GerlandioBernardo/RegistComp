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

export async function updateClient(req: Request, res: Response){
    try {
        const {clientId, newDataClient} = req.body;
        
        const newData = await clientService.updateClient(clientId, newDataClient);
        if(!newData){
            res.status(400).json({message: "Error ao atualizar dados do cliente"});
            return;
        }
        res.status(200).json({
            message: "Dados do cliente atualizado com sucesso",
            newDataClient: newData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export async function deletePurchase(req: Request, res:Response){
    try {
        const {clientId} = req.params;

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
        const {valuePuschasePrevious, purchaseId, purchase} = req.body;

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
        const {itemPurchaseId} = req.params;
        

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