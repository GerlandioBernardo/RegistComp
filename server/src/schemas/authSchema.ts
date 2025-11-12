import {z} from "zod";
import {cpf} from "cpf-cnpj-validator"

export const loginSchema = z.object({
    email: z. string({required_error: "O email é obrigatório"})
    .email({message: "E-mail Inválido"}),
    senha: z.string({required_error: "A senha é obrigatória"})
    .min(8, {message: "Senha deve ter pelo menos 8 caracteres"})
    .max(255, {message: "Senha deve ter no máximo 255 caracteres"}),
})

export const signupSchema = z.object({

    nome: z.string({required_error: "O nome é obrigatório"})
    .trim()
    .min(3, {message: "Nome deve ter pelo menos 3 caracteres"})
    .max(255, {message: "Nome deve ter no maximo 255 caracteres"}),

    cpf: z.string({required_error: "O CPF é obrigatório"})
    .refine((val)=> cpf.isValid(val),{
        message: "CPF Inválido",
    }),

    email: z.string({required_error: "O email é obrigatório"})
    .email({message: "E-mail Inválido"})
    .max(255, {message: "E-mail deve ter no maximo 255 caracteres"}),

    senha: z.string({required_error: "A senha é obrigatória"})
    .trim()
    .min(8, {message: "Senha deve ter pelo menos 8 caracteres"})
    .max(255, {message: "Senha deve ter no máximo 255 caracteres"}),

    nomeComercial: z.string({required_error: "O nome comercial é obrigatório"})
    .trim()
    .min(3, {message: "O nome comercial deve ter pelo menos 3 caracteres"})
    .max(255, {message: "O nome comercial deve ter  no maximo 255 caracteres"})
})