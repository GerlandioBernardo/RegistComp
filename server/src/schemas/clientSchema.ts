import {z} from "zod";
import {cpf} from "cpf-cnpj-validator";
import {compraSchema} from "./purchaseSchema";

export const clienteSchema = z.object({
    
    nome: z.string()
    .trim()
    .min(3, {message: "Nome deve ter pelo menos 3 caracteres"})
    .max(255, {message: "Nome deve ter no maximo 255 caracteres"}),

    cpf: z.string()
    .refine((val)=> cpf.isValid(val),{
        message: "CPF Inválido",
    }),

    telefone: z.string()
    .regex(/^55\d{2}9\d{8}$/, {
         message: "O número deve conter o DDI 55, DDD e 9 dígitos (ex: 5583912346789)",
    }),

    rua: z.string()
    .min(2, {message: "O nome da Rua deve ter pelo menos 2 caracteres"})
    .max(100, { message: "O nome da rua deve ter no máximo 100 caracteres" }),

    numero: z.number()
    .min(1, {message: "O numero da casa deve ter pelo menos 1 digito"}),

    barrio: z.string()
    .trim()
    .min(2, {message: "O nome do Barrio deve ter pelo menos 2 caracteres"})
    .max(100, { message: "O nome do Barrio deve ter no máximo 100 caracteres" }),

    cidade: z.string()
    .trim()
    .min(3, {message: "O nome da Cidade deve ter pelo menos 3 caracteres"})
    .max(100, { message: "O nome da Cidade deve ter no máximo 100 caracteres" }),

    estado: z.string()
    .trim()
    .min(4, {message: "O nome do estado deve ter pelo menos 4 caracteres"})
    .max(16, {message: "O nome do estado deve ter no maximo 16 caracteres"}),

    compras: z.array(compraSchema).min(1, {
        message: "Deve haver pelo menos um produto a ser comprado",
    }),
})