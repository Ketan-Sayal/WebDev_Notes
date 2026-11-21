// Factory Design Pattern:
/**
 * Steps:
 * 1. Client--->ask object--->Factory
 * 2. Fac tory--->returns obj---->client.
 * 
 * In all design patterns we want to decouple the client.
 * 
 * Types of Factory:
 * 1. Simple factory: Principle
 * - The client will not create a object but a factory will create it fir us based on the type of object. Type client will provide and the Factory return us object.
 * - In this we have  product varients<--have---product(abstract)<--has-a---factory
 * - Defination: A factory class is a class which decides which class to initiate.
 * 
 * 2. Factory method: Design pattern
 * - We have a factory and a product
 * - In factory method pattern we will create abstraction in factory also like in Product.
 * 
 * 3. Abstract factory method: Design pattern
 */