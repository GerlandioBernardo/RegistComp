import express from "express";
import cors from  "cors";

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

app.listen(porta, ()=> {
    console.log(`Servidor rodando na porta ${porta}`);
})