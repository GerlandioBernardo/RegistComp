import {Request, Response, NextFunction} from "express";
import {prisma} from "../config/prisma";

export async function checkMerchantExists(req: Request, res: Response, next:NextFunction){
    const {merchantId} = req.body;

    const merchantExists = await prisma.comerciante.findUnique({
        where:{
            id: merchantId
        }
    })

    if(!merchantExists){
        res.status(404).json({message: "Usuario não encontrado"});
        return;
    }
    next();
}