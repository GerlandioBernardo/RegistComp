import {Request, Response, NextFunction} from "express";
import dotenv from "dotenv"
import jwt, {JwtPayload} from "jsonwebtoken";

dotenv.config();

export async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).json({message: "Token não fornecido"});
        return;
    }

    const [, token] = authHeader.split(' ');

    jwt.verify(token, process.env.CHAVE_SECRETA as string, (error, decoded)=> {
        if(error){
            res.status(401).json({message: "Token Inválido"});
            return;
        }
        
        req.body.merchantId = (decoded as JwtPayload).id;
        next();
    })
}