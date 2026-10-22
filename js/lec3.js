//  Classes, Promises and callback hell in js:

// class:
/**
 * It is a blueprint of creating objects.
 */

class Shape{
    constructor(width, heigh){
        this.heigh = heigh;
        this.width = width;
    }


}


class Circle extends Shape{

}

// Promise:
/**
 * Its a object in js that tells us the faliure and completion of a asyncronous task.
 */

function setTimeoutPromisified(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        }, 1000);
    });
}

async function Task(){
    await setTimeoutPromisified();
}

Task();


// Callback hell:
/**
 * When we write another async task inside the other it creates a non readable code this is called callback hell.
 */

setInterval(()=>{
    console.log("Hmmm");
    
    setTimeout(()=>{
        console.log("Hii");
        setTimeout(() => {
            console.log("Hello");
        }, 1000);
    }, 1000);
}, 1000);