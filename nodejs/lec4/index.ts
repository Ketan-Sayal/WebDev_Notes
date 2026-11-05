// Typescript:

// Strongly typed vs loosely typed languages:
/**
 *  1. Strongly typed languages:
    - Less errors.
    - Easy to catch errors.
    - Stricter codebase.

 *  2. Loosely typed:
    - Easy to write code
    - Fast bootstrap
    - Low learning curve.

 **/

// Note: People realized js is very powerful but lack types o they introduce typescript.

// What is typescript?
/**
 * It is devloped by microsoft.
 * Its a superset of js wwhich adds extra freature of static typing in js.
 */

// Commands:
/**
 * 1. npm i -d typescript
 * 2. npx tsc --init (initailization of typescript project)
 * 3. tsc -b (Building a typescript project)
 */

// Some basic types in typescript
/**
 * 1. number
 * 2. boolean
 * 3. null
 * 4. undefined
 * 5. string
 */

// tsconfig.json:
/**
 * This file set the rulesfor compilation of ts code.
 * this file have bunch of options to chnge compilation process.
 */

// Assigning types to object:
// 1. Interfaces:
/** They let you aggregate data */

interface User{
    firstName:string;
    lastName:string;
    email:string;
    age:number;
}

const user:User = {
	firstName: "harkirat",
	lastName: "singh",
	email: "email@gmail.com",
	age: 21,
}

// 2. Types:
/**They are used to aggregate the data. 
 * But they have union and intersection unlike interfaces.
 */
type TUser = {
   firstName:string;
   lastName:string;
   email:string;
   age:number | string;// means age can be string or number(union)
}

type Manager = {
   name: string;
   department: string;
}

type TeamLead = TUser & Manager; // It has both the properties of manager and TUser

// Enums:
/**
 * They are the named constants used to make code readable.
 * Their defalt value start from 0 then 1 and so on.
 * But default value can be changed as shown below.
 */

enum Direction {
    Up = "UP",
    Down = "Down",
    Left = "Left",
    Right = 'Right'
}

function doSomething(keyPressed: Direction) {
	// do something.
}

doSomething(Direction.Down);

// Generics:
/**
 * They help you create components of any type.
 * Data type is defined on runrtime.
 */

const identity = <T>(arg:T)=>{
   return arg;
}

let output1 = identity<string>("Hello World");
let output2 = identity<number>(12);
console.log(output1);
console.log(output2);

