// Functions in js:
/**
 * Block of code that can be used again and again.
 */

// Addition of 2 numbers:
function sum(a, b){
    return a+b;
}

console.log(sum(9, 10));

// Sum from 1 to n:

function sum(n){
    let sum = 0;
    for(let i = 1; i<=n; i++){
        sum+=i;
    }
    return sum;
}

console.log(sum(5));


// Syncronous and Asyncronous operations:
/*
 *  Syncronous operations:
- The code i.e executed line by line and waits for the previous statemment is called a syncronous code.
- e.g: Code above us.
 */ 