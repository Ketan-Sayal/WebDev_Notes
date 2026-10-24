// Nodejs:
/**
 * Its a runtime of javascript.
 * It uses V8 engine to run js code.
 * V8 engine: Its a open source engine used to run js code. Devloped by google.
 */

let firstName = "Ketan Sayal";
console.log(firstName);

const chalk = require('chalk');

console.log(chalk.blue.bold('Hello, world!'));
console.log(chalk.red.bold('This is an error message.'));
console.log(chalk.green.underline('This is a success message.'));

// internal packages:
const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "a.txt"), "utf-8", (err, data)=>{
    if(err){
        return;
    }
    console.log(data);
});

// Routes, Domain, IP, HTTP request:

// Http:
/**
 * Http protocol is made to connect the computers to each other using a server client components.
 */

// Types of Http requests:
/**
 * 1. GET
 * 2. POST
 * 3. PATCH
 * 4. DELETE
 */

// Domain vs IP:
// Domain:
/**
 * Its the human readable adress of the server under the hood it is IP.
 */

// IP:
/**
 * Its the address of the computer on the internet.
 */

// Routes:
/**
 * When the request is made to the server via path, routes task is to handle the incoming request.
 */

// Headers:
/**
 * They are the extra data sent with the actual data.
 */

// Body:
/**
 * Its the part of data where actual data really exists.
 */