// History of programming:

/**
 * In previous times code is written in Machine language.
 * Then we moved to Assemble level language. 
 * then procederal proograming came, till now there is no concept of oops
 * Now  we got oops language
 */

// Objects interact with each other in real world.

// Objects:
/**
 * - Real world entites.
 * - Objects: Chaaracterstics, Behaviour
 * e.g: Car:
    
    Characterstics:
    - engine
    - owner
    - color
    - brand
    - model
    - wheels

    Behaviour:
    - start
    - stop
    - gearshift
    - acceration
    - break
 */

// So in OOP(Object oriented programing) the objects interact with eaach other and they model different objects.

// Pillars of OOPs:
/**
 * - Abstraction
 * - Encapsulation
 * - Polymorphism
 * - Inheritance
 */

// Abstraction
/**
 * - Hiding unessay details from the client and showing only the things that are nessary.
 * - For one object to interact with other the object only needs the behaviour of other object mostly.
 */

// Encapsulation:
/**
 * - Combining variables and methods together as a single unit + Data Security.
 */

#include<iostream>
using namespace std;

class Car{
    public:
        virtual void startEngine() = 0; // it is only declared not defined. It is defined in child class
        virtual void shiftGear(int gear) = 0;
        virtual void stopEngine() = 0;
        virtual void accelerate() = 0;
        virtual void carBrake() = 0; // pure virtuaal fn and class is abstract
        // also in normal virtaual fn we have to provide its implementation somwhere
        virtual ~Car(){}
};

class SportsCar:public Car{
private:
    // Characterstics: Variables
    string brand;
    string model;
    bool isEngineOn;
    int currentSpeed;
    int currentGear;
    string tyre;

public:
    // behaviour: Methods
    SportsCar(string b, string m){
        this->brand = b;
        this->model = m;
        isEngineOn = false;
        currentSpeed = 0;
        currentGear = 0;
    }

    int getCurrentSpeed(){
        return this->currentSpeed;
    }

    string getTyre(){
        return this->tyre;
    }

    void setTyre(string tyre){
        this->tyre = tyre;
    }

    void startEngine(){
        isEngineOn = true;
        cout<<brand<<" "<<model<<" : Enginge starts with a roar!"<<endl;
    }

    void shiftGear(int gear){
        if(!isEngineOn){
            cout<<brand<<" "<<model<<" : Engine is off! Cannot shift the Gear."<<endl;
            return;
        }

        currentGear = gear;
        cout<<brand<<" "<<model<<" : Shifted to gear "<<currentGear<<"."<<endl;
    }

    void accelerate(){
        if(!isEngineOn){
            cout<<brand<<" "<<model<<" : Engine is off! Cannot accelerate."<<endl;
            return;
        }

        currentSpeed+=20;
        cout<<brand<<" "<<model<<" : Acceleratinng to "<<currentSpeed<<"."<<endl;
    }


    void carBrake(){
        currentSpeed -= 20;
        if(currentSpeed<0) currentSpeed = 0;

        cout<<brand<<" "<<model<<" : Breaking! Speed is now "<<currentSpeed<<"km/h"<<"."<<endl;
    }

    void stopEngine(){
        isEngineOn = false;
        currentGear = 0;
        currentSpeed = 0;
        cout<<brand<<" "<<model<<" : Engine turned off."<<endl;
    }


};

int main(){
    Car *myCar = new SportsCar("Ford", "Mustang");
    SportsCar *sportsCar = new SportsCar("Audi", "Cooper");
    
    sportsCar->startEngine();
    sportsCar->shiftGear(1);
    sportsCar->accelerate();
    sportsCar->shiftGear(2);
    sportsCar->accelerate();
    cout<<sportsCar->getCurrentSpeed()<<endl;
    sportsCar->carBrake();
    sportsCar->stopEngine();
    
    return 0;
}

