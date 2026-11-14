// Document editor:
/**
 * Based on we will learn till now. We will implement it.
 
 * 2 ways to design a application:
  
 - Top-down: We will create big components and its dependencies then small components and its dependencies.
  - bottom-up: We will create first small component and its dependencies then we will handle large components.
 
 * Document editor has text, images
 * Lets just take a editor that only upport text and images. Rest it should be expandable..
 */

 // Principle of least knolege:
 /**
  * It says you should always talk to your immedate friends or classes.
  * Immedate class is a class which talks to its class to which its depend on.
  * No indirect dependency on some other class.
  */

// Exmaple:
/*
================================================================
                  GOOGLE DOCS - LLD CLASS DIAGRAM
================================================================


  <<ABSTRACT>>                         <<MODEL>>
+----------------------+          +---------------------------+
|   DocumentElement    |<---------|        Document           |
+----------------------+   1..*   +---------------------------+
|                      |          | - vector<DocumentElement> |
| + render()           |          |   elements                |
|                      |          |                           |
+----------------------+          | + addElement(el)          |
          ^                       | + getElements()           |
          |                       +---------------------------+
     _____|_____
     |         |
     |         |
+------------+  +-------------+
| TextElement|  |ImageElement |
+------------+  +-------------+
| + render() |  | + render()  |
+------------+  +-------------+



  <<ABSTRACT>>
+---------------------------+
|        Persistence        |
+---------------------------+
|                           |
| + save(string data)       |
+---------------------------+
             ^
             |
       _____|_____
       |         |
       |         |
+--------------+  +--------------+
| FileStorage  |  |  DBStorage   |
+--------------+  +--------------+
| + save()     |  | + save()     |
+--------------+  +--------------+



+---------------------------+       +---------------------------+
|     DocumentRenderer      |       |      DocumentEditor       |
+---------------------------+       +---------------------------+
| - Document doc            |       | - Document doc            |
|                           |       | - Persistence storage     |
| + render()                |       |                           |
|                           |       | + addText(string text)    |
|                           |       | + addImage(string path)   |
+---------------------------+       +---------------------------+
             |                                  |
             |                                  |
             +------------+---------------------+
                          |
                          |
                    +-----------+
                    |  Client   |
                    +-----------+


================================================================
                       RELATIONSHIPS
================================================================

1. INHERITANCE

   TextElement  ----------|> DocumentElement
   ImageElement ----------|> DocumentElement

   FileStorage  ----------|> Persistence
   DBStorage    ----------|> Persistence


2. DOCUMENT CONTAINS ELEMENTS

   Document 1 -------- 1..* DocumentElement


3. HAS-A RELATIONSHIP

   DocumentEditor --------> Document
   DocumentEditor --------> Persistence
   DocumentRenderer ------> Document


4. CLIENT INTERACTION

   Client --------> DocumentEditor
   Client --------> DocumentRenderer


================================================================
*/