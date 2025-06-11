import express from "express";
import cors from  "cors";
import rootRoute from "./routes";

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', rootRoute);

app.listen(porta, ()=> {
    console.log(`Servidor rodando na porta ${porta}`);
})