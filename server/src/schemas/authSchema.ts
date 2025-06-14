import {z} from "zod";
import {cpf} from "cpf-cnpj-validator"

export const loginSchema = z.object({
    email: z. string().email({message: "E-mail Inválido"}),
    senha: z.string()
    .min(8, {message: "Senha deve ter pelo menos 8 caracteres"})
    .max(255, {message: "Senha deve ter no máximo 255 caracteres"}),
})

export const signupSchema = z.object({

    nome: z.string()
    .trim()
    .min(3, {message: "Nome deve ter pelo menos 3 caracteres"})
    .max(255, {message: "Nome deve ter no maximo 255 caracteres"}),

    cpf: z.string()
    .refine((val)=> cpf.isValid(val),{
        message: "CPF Inválido",
    }),

    email: z.string().email({message: "E-mail Inválido"})
    .max(255, {message: "E-mail deve ter no maximo 255 caracteres"}),

    senha: z.string()
    .trim()
    .min(8, {message: "Senha deve ter pelo menos 8 caracteres"})
    .max(255, {message: "Senha deve ter no máximo 255 caracteres"}),

    nomeComercial: z.string()
    .trim()
    .min(3, {message: "O nome comercial deve ter pelo menos 3 caracteres"})
    .max(255, {message: "O nome comercial deve ter  no maximo 255 caracteres"})
})