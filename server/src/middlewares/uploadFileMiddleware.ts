import axios from "axios";
import dotenv from "dotenv";
import formData from "form-data";
import multer, {FileFilterCallback} from "multer";
import {Request, Response, NextFunction} from "express";

dotenv.config();

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const SIZE_MAX_FILE = 5 * 1024 * 1024;

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {fieldSize: SIZE_MAX_FILE},
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback ) => {
        if(ALLOWED_MIME_TYPES.includes(file.mimetype)){
            cb(null, true);
        }
        else{
            cb(new Error("Formato de arquivo Inválido"));
        }
    }
})

async function apiUrl (file: Buffer): Promise<string> {
    const form = new formData();
    form.append("image", file.toString("base64"));
    try {
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API}`,form,
            {
                headers:{
                    ...form.getHeaders()
                }
            }
        )
       return response.data.data.url;
    } catch (error) {
        throw new Error("Error ao carregar imagem no imgBB");
    }

}

export const uploadFileMiddleware = [
    upload.single("file"),
    async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const file = req.file;
        if(!file){
            req.body.fotoPerfil ="https://i.ibb.co/TxknvgR5/4e90b2cab3ba.png"
            return next();
        }
        const urlImg = await apiUrl(file.buffer);

        req.body.fotoPerfil = urlImg;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
]