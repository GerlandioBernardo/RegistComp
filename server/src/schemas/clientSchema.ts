import {z} from "zod";
import {cpf} from "cpf-cnpj-validator";
import {compraSchema} from "./purchaseSchema";

export const clienteSchema = z.object({
    
    nome: z.string({required_error: "O nome do cliente é obrigatório"})
    .trim()
    .min(3, {message: "Nome deve ter pelo menos 3 caracteres"})
    .max(255, {message: "Nome deve ter no maximo 255 caracteres"}),

    cpf: z.string({required_error: "O cpf é obrigatório"})
    .refine((val)=> cpf.isValid(val),{
        message: "CPF Inválido",
    }),

    telefone: z.string({required_error: "O numero do telefone é obrigatório"})
    .regex(/^55\d{2}9\d{8}$/, {
         message: "O número deve conter o DDI 55, DDD e 9 dígitos (ex: 5583912346789)",
    }),

    rua: z.string({required_error: "O nome da rua é obrigatório"})
    .min(2, {message: "O nome da Rua deve ter pelo menos 2 caracteres"})
    .max(100, { message: "O nome da rua deve ter no máximo 100 caracteres" }),

    numero: z.number({required_error: "O numero da casa é obrigatório"})
    .min(1, {message: "O numero da casa deve ter pelo menos 1 digito"}),

    bairro: z.string({required_error: "O nome do bairro é obrigatório"})
    .trim()
    .min(2, {message: "O nome do Barrio deve ter pelo menos 2 caracteres"})
    .max(100, { message: "O nome do Barrio deve ter no máximo 100 caracteres" }),

    cidade: z.string({required_error: "O nome da cidade é obrigatório"})
    .trim()
    .min(3, {message: "O nome da Cidade deve ter pelo menos 3 caracteres"})
    .max(100, { message: "O nome da Cidade deve ter no máximo 100 caracteres" }),

    estado: z.string({required_error: "O nome do estado é obrigatório"})
    .trim()
    .min(4, {message: "O nome do estado deve ter pelo menos 4 caracteres"})
    .max(16, {message: "O nome do estado deve ter no maximo 16 caracteres"}),

})

export const clienteCompraSchema = z.object({
  client: clienteSchema,
  purchase: compraSchema
});