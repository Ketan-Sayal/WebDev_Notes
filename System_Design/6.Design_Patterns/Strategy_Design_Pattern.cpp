// Design Patterns:
/*
 * The problems solutions is found by other devlopers during application building.
   Using those solutions/steps we also make our application i.e called patterns.
 
  * So the problems occured during designing a application and people made its solutions then those solutions are called design patterns.

 * These are some steps we have to follow to build our application so on changing the application we have to write minimal code. 
 * To change a application devlopers should write minimal code and give minimal time to it.
 * We will saperate our static and dynamic parts. We have to saperate these parts. 
 */

// Stratergy design Pattern:
/**
 * Note: According to this pattern inheritance is not good.
 * App->robots simulation
 * Inheritance problems:
  - Code Reuse
  - To add a feature lots of changes are required.
  - Breakinnng of OCP principle

 * Stratergy design patterns defines a family of algorithms, put them into saperate classes so that they can be changed on runtime.
 * So things that are changing the application we will create saperate classesv for them. 
 * Favor composition(Using abstraction of fns) over inheritance.
 */

// e.g:
/*
                   <<STRATEGY>>          <<STRATEGY>>          <<STRATEGY>>
                    <<abstract>>          <<abstract>>          <<abstract>>
                     Talkable              Walkable              Flyable
                    ------------          ------------          ------------
                      talk();                walk();                fly();
                        ^                      ^                     ^
                       / \                    / \                   / \
                      /   \                  /   \                 /   \
                     /     \                /     \               /     \
                NormalTalk  NoTalk       NormalW   NoW         NormalF   NoF
                  talk()    talk()        walk()   walk()       fly()    fly()


    +------------------------------------------------+
    |                    Robot                       |
    |------------------------------------------------|
    |  Talkable t;                                    |
    |  Walkable w;                                    |
    |  Flyable f;                                     |
    |                                                |
    |  projection();                                  |
    +------------------------------------------------+
                         |
                         |
                       Client
*/



/*
                    STRATEGY DESIGN PATTERN
                         CONCLUSION
    ------------------------------------------------

    1. Encapsulate what varies and keep it
       separate from what remains the same.

    2. Solution to inheritance is NOT more
       inheritance.

    3. Composition should be favoured over
       inheritance.

    4. Code to an INTERFACE and not to
       CONCRETE IMPLEMENTATION.

    5. DO NOT REPEAT YOURSELF (DRY).
    
    ------------------------------------------------
*/


#include <iostream>
#include <memory>
using namespace std;

// ==========================================
// 1. STRATEGY INTERFACES (ABSTRACT CLASSES)
// ==========================================

class Talkable {
public:
    virtual void talk() = 0;
    virtual ~Talkable() = default;
};

class Walkable {
public:
    virtual void walk() = 0;
    virtual ~Walkable() = default;
};

class Flyable {
public:
    virtual void fly() = 0;
    virtual ~Flyable() = default;
};


// ==========================================
// 2. CONCRETE STRATEGIES - TALKING
// ==========================================

class NormalTalk : public Talkable {
public:
    void talk() override {
        cout << "Robot can talk normally\n";
    }
};

class NoTalk : public Talkable {
public:
    void talk() override {
        cout << "Robot cannot talk\n";
    }
};


// ==========================================
// 3. CONCRETE STRATEGIES - WALKING
// ==========================================

class NormalWalk : public Walkable {
public:
    void walk() override {
        cout << "Robot can walk normally\n";
    }
};

class NoWalk : public Walkable {
public:
    void walk() override {
        cout << "Robot cannot walk\n";
    }
};


// ==========================================
// 4. CONCRETE STRATEGIES - FLYING
// ==========================================

class NormalFly : public Flyable {
public:
    void fly() override {
        cout << "Robot can fly normally\n";
    }
};

class NoFly : public Flyable {
public:
    void fly() override {
        cout << "Robot cannot fly\n";
    }
};


// ==========================================
// 5. CONTEXT CLASS - ROBOT
// ==========================================

class Robot {
private:
    unique_ptr<Talkable> t;
    unique_ptr<Walkable> w;
    unique_ptr<Flyable> f;

public:
    Robot(
        unique_ptr<Talkable> talk,
        unique_ptr<Walkable> walk,
        unique_ptr<Flyable> fly
    ) {
        t = move(talk);
        w = move(walk);
        f = move(fly);
    }

    void projection() {
        t->talk();
        w->walk();
        f->fly();
    }
};


// ==========================================
// 6. CLIENT
// ==========================================

int main() {

    Robot r1(
        make_unique<NormalTalk>(),
        make_unique<NormalWalk>(),
        make_unique<NormalFly>()
    );

    cout << "Robot 1:\n";
    r1.projection();

    cout << "\n";

    Robot r2(
        make_unique<NoTalk>(),
        make_unique<NormalWalk>(),
        make_unique<NoFly>()
    );

    cout << "Robot 2:\n";
    r2.projection();

    return 0;
}

