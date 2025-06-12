import {Request, Response} from "express";
import * as customerService from "../services/customerService";

export async function createClient(req: Request, res: Response){
    try {
        const {merchantId, client, purchase} = req.body;

        const newClient = await customerService.createClient(merchantId, client, purchase);
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
        const {clientId} = req.body;

        const client = await customerService.findClientById(clientId);
        if(!client){
            res.status(404).json({message: "Cliente não possui cadastro"});
            return;
        }
        const deleteShopping = await customerService.deletePurchase(clientId);
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