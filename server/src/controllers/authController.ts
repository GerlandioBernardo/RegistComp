import {Request, Response, NextFunction} from "express";
import {compareSync, hashSync} from "bcryptjs"
import {prisma} from "../config/prisma";
import jwt, {JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function generateToken(id: string){
    const key = process.env.CHAVE_SECRETA
    if(!key){
        throw new Error("CHAVE_SECRETA não está definida nas variáveis de ambiente.");
    }
    return jwt.sign({id}, key , {expiresIn: "24h"})
}


