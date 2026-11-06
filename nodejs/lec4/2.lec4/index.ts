interface User {
	name: string;
	age: number;
    email?:string
}

function sumOfAge(user1: User, user2: User) {
  return user1.age + user2.age;
};

// Example usage
const result = sumOfAge({
	name: "harkirat",
	age: 20
}, {
	name: "raman",
	age: 21
});
console.log(result); // Output: 41

// Some Gernal Generiics:

// 1. Pick
/**
 * It lets you create a new type having some properties of some existing type.
 */

type UserProfile = Pick<User, 'name' | 'email'>

// Partial:
/**    
 * Creates a new type from existing type but it makes its properties optional.
 */

type OptionalUser = Partial<User>;

// Readonly:
/**
 * It donot let you alter data after initialization.
 */

type ReadonlyUser =  Readonly<User>;

// Record:
/**
 * It defines the type of key value pair.
 */

type Users = Record<string, User>;

// Exclude:
/**
 * Its lets you exclude some properties from existing type.
 */

type Event = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<Event, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK
