import {z} from "zod";

const itemCompraSchema = z.object({

    nome: z.string({required_error: "O nome do item é obrigatório"})
    .trim()
    .min(3, {message: "O nome do item deve ter pelo menos 3 caracteres"})
    .max(150, {message: "O nome do item deve ter no maximo 150 caracteres"}),

    quantidade: z.number({required_error: "O campo quantidade é obrigatório"})
    .min(1, {message: "A quantidade de itens comprados deve ter pelo menos 1"}),

    precoUnitario: z.number({required_error: "O campo preco unitario é obrigatório"})
    .min(0.01, { message: "O preço unitário deve ser maior que zero" }),
})


export const compra = z.object({
    itens: z.array(itemCompraSchema).min(1, {
        message: "Deve haver pelo menos um item a ser comprado",
    }),
})
export const compraSchema = z.object({
    valuePuschasePrevious: z.number(),
    purchase: compra
})

