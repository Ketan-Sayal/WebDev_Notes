import * as dotenv from "dotenv";
dotenv.config();

interface IConfig{
    port: number,
    jwtSecret:string,
    mongodbUri:string
}

const config:IConfig = {
    port: parseInt(String(process.env.PORT)),
    jwtSecret: String(process.env.JWT_SECRET),
    mongodbUri: String(process.env.MONGODB_URI)
}

export {config};