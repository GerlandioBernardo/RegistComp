import {Request, Response} from "express";
import * as clientService from "../services/clientService";
import { clienteType } from "../types/clientType";

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
