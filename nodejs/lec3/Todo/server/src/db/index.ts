import mongoose from "mongoose";
import { config } from "../config/index.js";
import { DB_NAME } from "../constants/index.js";


const main = async()=>{
    try {
        const connectionObj = await mongoose.connect(`${config.mongodbUri}/${DB_NAME}`);
        const host = connectionObj.connection.host;
        console.log("Mongodb Connected!!!\n");
        console.log(`Connection host: ${host}\n`);
    } catch (error) {
        throw error;
    }
}

export {main};