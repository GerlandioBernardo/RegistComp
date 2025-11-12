import {Request, Response, NextFunction} from "express";
import {prisma} from "../config/prisma";

export async function checkClientExists(req: Request, res: Response, next:NextFunction){
    const {clientId} = req.params;

    const clientExists = await prisma.cliente.findUnique({
        where:{
            id: clientId,
        }
    })

    if(!clientExists){
        res.status(404).json({message: "Cliente não cadastrado"});
        return;
    }
    next();
}