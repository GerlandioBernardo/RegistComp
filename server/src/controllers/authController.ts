import {Request, Response, NextFunction} from "express";
import {compareSync, hashSync} from "bcryptjs"
import {prisma} from "../config/prisma"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function generateToken(id: string){
    if(!process.env.CHAVE_SECRETA){
        throw new Error("CHAVE_SECRETA não está definida nas variáveis de ambiente.");
    }
    return jwt.sign({id}, process.env.CHAVE_SECRETA , {expiresIn: "24h"})
}

export async function  signup(req: Request, res: Response){
    try {
        const {nome, email, senha, nomeComercial, cpf, fotoPerfil} = req.body;
        const  merchantExists = await prisma.comerciante.findUnique({
            where: cpf
        })
        if(merchantExists){
            res.status(409).json({message: "Usuario já cadastrado"});
            return;
        }
        const  hashPassword = hashSync(senha, 10);
        const merchant = await prisma.comerciante.create({
            data: {
                nome,
                email,
                cpf,
                nomeComercial,
                senha: hashPassword,
                fotoPerfil,
                clientes:{
                    create: []
                }

            }
        })
        res.status(201).json({
            message: "Usuario criado com sucesso"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function login(req: Request, res: Response){
    try {
       const {email, senha} = req.body;
        const merchant = await prisma.comerciante.findUnique({
            where: email
        })

        if(!merchant){
            res.status(404).json({message: "Usúario não possui cadastro "});
            return;
        }

        const authorized = compareSync(senha, merchant.senha);

        if(!authorized){
            res.status(401).json({message: "Senha Incorreta"});
            return;
        }

        res.status(200).json({
            message: "Login realizado com sucesso",
            token: generateToken(merchant.id)
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
    
}



