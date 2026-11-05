// UML Diagrams:
/**
 * Supose you have a idea to make a application.
 * You have 2 ways to express that idea(enties and all):
 * 1. Paragraph(Bad as it can be very long).
 * 2. Diagrams(Good as it is very intutive).
 * 
 * So UML diagrams are the rough way to express your idea digramatically.
 */

// Types of UML Diagrams:
/**
 * 1. Structural: Structure of application(Components and their linking).(7)
 * 2. Behavioural: Interation of components(How methods are called).(7)
 */

// Only 2 are important:
/**
 * 1. Class Diagram(Stuctural)
 * 2. Sequence diagram(Behavioural)
 */

// Class Diagram:
/**
 * It tells what classes a application have(Entities) and their linking.
 * 1. Draw a rectangle.
 * 2. Divide it into 3 parts like rows(vertical).
 * 4. First part at top repersent name of class
 * 5. Second part of rectangle have all the characterstics or variables.(Variable_name:Type)
 * 6. Third part of rectangle repersents the fns or behaviour.(fn_name:type)
 * 7. How to show the access modifiers in a class disgram:
      1. Public(+)
      2. Private(-)
      3. Protected(#)
    e.g: In the variable section: (+ brand:String)
    This is also used in last section class section to tell which fn is public, private or protected.

 * 8. <<abstract>> is repersented on the top of the top tof a class if it is abtract.

       <<abstract>>
      ┌───────────────┐
      │     Car       │
      ├───────────────┤
      │ - brand: String
      │ - model: String
      │ # engineCC: int
      ├───────────────┤
      │ + startEngine(): void
      │ + stopEngine(): void
      │ + accelerate(): void
      │ + brake(): void
      └───────────────┘
 */

// Association in class diagram:
/**
 * 1. Class Association: Inheritance
 * 2. Object Association: Simple association, Aggregation, Composition[But programatically only composition is used]
 */

// Inheritance:
/**
 * Its a (is-a) relationship.
 * ─────────▷ (a arrow is used in UML diagram to repersent inheritance.)
 */

// Composition:
/**
 * Its a (has-a) relationship.
   
   1. Simple Association:
   - Defines a simple relationship between 2 classes
   - e.g: Student ─────────> Teacher
   - Both classes interact with each other but can exists independently also.

   2. Aggregation:
   - Main object has multiple small objects. The main ohect acts a container for small objects.
   - e.g: Room◇────────sofa
   - Room has a sofa but sofa can independently exist
   - One class can exist independently but other donot.

   3. Composition:
   - Its a inavidable part or fixed part of a class.
   - If one object is dependent on the other or part of it.
   - i.e their is no usse of the object apart being the part.
   - e.g: House ◆──────── Room
   - Means House has a room but room cannot independently exist.
 */

// Sequence Diagram:
/**
 * Its a behavioural diagram.
 * It tells about interaction between the components.
 * Steps:
 * 1. Component: [A], [B]
 * 2. Life line: Tells  till when the commponent is existed.
 * 3. Activation bar: Till when the object is active.
 * 4. Messages:
     ┌─────┐   ┌─────┐   ┌─────┐
     │  A  │   │  B  │   │  C  │
     └─────┘   └─────┘   └─────┘
        |         |         |
        |         |        ┌─┐
        |         |        │ │  ← Activation Bar
        |         |        │ │
        |        ┌─┐       │ │
        |        │ │       │ │
        |        └─┘       └─┘
       ┌─┐       |          |
       │ │       |          |
       └─┘       |          |
        |        |          |
________|________|__________|____
        ↑
     Lifeline
 */

// Messages:
/**
 * Syncronous message:
   - For sending a message use:─────────▷ and for reciving message: -------▷. 
   - They both should be in activation bar limits.
 *
 * Asyncronous message:
   - For sending a message use:─────────>
   - No wait for response.
 
 * Create message:
  - The message that creates a object>.
          ┌─────┐
          │  A  │
          └─────┘
             ┆
             ┆
          ┌──┴──┐
          │     │
          │     │  <<create>>
          │     ├──────────────▷┌─────┐
          │     │                │  B  │
          └──┬──┘                └─────┘
             ┆                    ┆
             ┆                    ┆
             ┆                    ┆

 * Destroy message:
  - The message that destroys a object lifeline

          ┌─────┐          ┌─────┐
          │  A  │          │  B  │
          └─────┘          └─────┘
             ┆                ┆
             ┆                ┆
          ┌──┴──┐             ┆
          │     │             ┆
          │     ├──<<destroy>>┼────▷ X
          │     │
          │     │
          └──┬──┘
             ┆
             ┆
             ┆

 * Lost message:
  - Message that donot reach the activation bar but in a lifeline where the component is not active.
 
 * Found message:
  - We donot know the source of message but the component recived the message. 

 */

// Steps to make sequence diagram:
/**
 * 1. Use-case(Flow)
 * 2. Objects
 * 3. Sequence diagram
 * 
       User          ATM          Transaction       Account       Cash Dispenser
        O
       /|\
       / \           ┌─────┐
        ┆            │ ATM │
      ┌─┴─┐          └─────┘
      │   │             │
      │   │             │
      │   │          ┌──┴──┐
      │   ├─────────>│     │
      │   │ withdraw(amount, account)
      │   │          │     ├──────────────>┌─────────────┐
      │   │          │     │ withdraw(...) │ Transaction │
      │   │          │     │               └─────────────┘
      │   │          │     │                     │
      │   │          │     │                  ┌──┴──┐
      │   │          │     │                  │     │
      │   │          │     │                  │     ├────────>┌─────────┐
      │   │          │     │                  │     │ checkAmt │ Account │
      │   │          │     │                  │     │          └─────────┘
      │   │          │     │                  │     │             │
      │   │          │     │                  │     │          ┌──┴──┐
      │   │          │     │                  │     │          │     │
      │   │          │     │                  │     │< - - - - -│     │
      │   │          │     │                  │     │ return true
      │   │          │     │                  └──┬──┘
      │   │          < - - - - - - - - - - - - -┤
      │   │          │     │     return true    X
      │   │          │     │
      │   │          │     ├──────────────────────────────────>┌───────────────┐
      │   │          │     │       withdrawCash(amount)         │ Cash Dispenser│
      │   │          │     │                                    └───────────────┘
      │   │          │     │                                          │
      │   │          │     │                                       ┌──┴──┐
      │   │          │     │                                       │     │
      │   │          │     │< - - - - - - - - - - - - - - - - - -│     │
      │   │          │     │              return amount           └──┬──┘
      │   │          │     │
      │   < - - - - - - - - return amount
      └───┘          └──┬──┘
        ┆                │
 */

// some more ssequence diagram terms:
/**
 * 1. alt(if-else)(other block)
 * 2. option(if)
 * 3. loop(for())
 */