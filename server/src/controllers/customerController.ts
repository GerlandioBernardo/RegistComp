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
        
    }
}