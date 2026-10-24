// Authentication flow:
/**
 * User sends a signin request--->backend sends back a token --> Based on that token backend verify who user is.
 */

// Jwt:
/**
 * Json web tokens are the tokens that are used to store information of the user.
 * It store information of user in a token so that backend should not have to store it in a session.
 * They are stateless means they can store any type of information in it..
 */

// Application
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const PORT = 3000;

const app = express();

const jwtSecret = "secret";

const users = [
    {
        username:"Ketan sayal",
        password:"12345"
    }, 
    {
        username:"Jhon Doe",
        password:"123456"
    },
    {
        username:"James",
        password:"james123"
    }
];

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const isLoggedIn = (req, res, next)=>{
    try {
        const token = req.headers.authorization || req.cookies.token;
        if(!token) return res.status(401).json({data:null, message:"Token is required"});
        const userData = jwt.verify(token, jwtSecret);
        
        if(!userData || !userData.username){
            return res.status(401).json({data:null, message:"Invalid user token"});
        }
        req.user = userData;
        next();
    } catch (error) {
        return res.status(401).json({data:null, message:"Sonething went wrong"});
    }
}

app.post("/signin", (req, res)=>{
    const {username, password} = req.body;
    const user = users.find(x=>x.username == username && x.password==password);
    if(!user) return res.status(404).json({data:null, message:"User not found"});

    const token = jwt.sign({username}, jwtSecret);

    return res.status(201).cookie("token", token).json({data:{username, token}, message:"User signed in sucessfully"});
});

app.post("/signout", (req, res)=>{
    return res
        .clearCookie("token")
        .json({data:null, message:"User signout sucessfully"});
});

app.post("/newUser", isLoggedIn, (req, res)=>{
    const {username, password} = req.body;

    const user = users.find(x=>x.username==username);
    if(user){
        return res.status(403).json({data:null, message:"User already exists"});
    }
    const newUser = {username, password}
    users.push(newUser);

    return res.status(201).json({data:{username}, message:"User created sucessfully"});
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`); 
});