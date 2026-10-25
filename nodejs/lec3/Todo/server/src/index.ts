import { config } from "./config/index.js";
import {app} from "./app.js";
import { main } from "./db/index.js";

const port = config.port || 3000;

main()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running: http://localhost:${port}`);
    });
}).catch((error)=>{
    console.log(`Mongodb error: ${error}`);
    process.exit(1);
});