// Featch APi:
/**
 * Its a way to request from the server.
 */

// Axios:
/**
 * Its a third part library to request from the server.
 */

// Middlewares:
/**
 * In nodejs middlewares are the functions that have a access to req, res bjects along with next function in request response cycle.
 */

// Test application
const express = require("express");
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/add", (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    return res.status(200).json({
        add:a+b
    });
});

app.get("/multiply", (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    return res.status(200).json({
        add:a*b
    });
});

app.get("/subtract", (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    return res.status(200).json({
        add:a-b
    });
});

app.get("/divide", (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    return res.status(200).json({
        add:a/b
    });
});

app.listen(3000, ()=>{
    console.log(`Server is running: http://localhost:3000`);
    
});