// Inheritance:
/**
 * Inheriting the characterstics and behaviour of the parent.
 * Syntax: class B:public A{}
 * Here public A means inherit it publically, if their is private then the child class fo B donot have access to A class.
 */

// Polymorphism:
/**
 * Some objects have many forms.
 
 * Types:
  - Dynamic polymorphism(Runtime): Class based or inheritance(Function overriding)
  - Static Polymorphism(Compiletime): Function overloading(changing parameter number or type).
 */

// Operator overloading:
/**
 * Changing the defination of operator for a class.
 * Why not it iis other languages?
 * ans -> Due to its complexity and other languages want the operators to be simple and concize.
 */

#include<iostream>
using namespace std;

class Car{
protected:
    // Characterstics: Variables
    string brand;
    string model;
    bool isEngineOn;
    int currentSpeed;
    string tyre;

public:
    // behaviour: Methods
    Car(string b, string m){
        this->brand = b;
        this->model = m;
        isEngineOn = false;
        currentSpeed = 0;
        this->tyre = "MRF";
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
        cout<<brand<<" "<<model<<" : Engine starts with a roar!"<<endl;
    }

    virtual void accelerate() = 0;

    virtual void carBrake() = 0;

    virtual void stopEngine(){
        isEngineOn = false;
        currentSpeed = 0;
        cout<<brand<<" "<<model<<" : Engine turned off."<<endl;
    }

    bool getIsEngineOn(){
        return this->isEngineOn;
    }

    string getModel(){
        return this->model;
    }

    string getBrand(){
        return this->brand;
    }

    virtual ~Car(){}

};

class ManualCar:public Car{
private:
    int currentGear;

public:
    ManualCar(string b, string m):Car(b, m){
        currentGear = 0;
    }

    void shiftGear(int gear){
        if(!getIsEngineOn()){
            cout<<getBrand()<<" "<<getModel()<<" : Engine is off! Cannot shift the Gear."<<endl;
            return;
        }

        currentGear = gear;
        cout<<getBrand()<<" "<<getModel()<<" : Shifted to gear "<<currentGear<<"."<<endl;
    }

    void accelerate(){
        if(!isEngineOn){
            cout<<brand<<" "<<model<<" : Engine is off! Cannot accelerate."<<endl;
            return;
        }

        currentSpeed+=20;
        cout<<brand<<" "<<model<<" : Accelerating to "<<currentSpeed<<"."<<endl;
    }

    // Function overloading
    void accelerate(int speed){
        if(!isEngineOn){
            cout<<brand<<" "<<model<<" : Engine is off! Cannot accelerate."<<endl;
            return;
        }

        currentSpeed+=speed;
        cout<<brand<<" "<<model<<" : Accelerating to "<<currentSpeed<<"."<<endl;
    }
    
    void carBrake(){
        currentSpeed -= 20;
        if(currentSpeed<0) currentSpeed = 0;

        cout<<brand<<" "<<model<<" : Breaking! Speed is now "<<currentSpeed<<"km/h"<<"."<<endl;
    }

    void stopEngine(){
        isEngineOn = false;
        currentSpeed = 0;
        currentGear = 0;
        cout<<brand<<" "<<model<<" : Engine turned off."<<endl;
    }
};

class ElectricCar:public Car{
private:
    int batteryLevel;

public:
    ElectricCar(string b, string m):Car(b, m){
        batteryLevel = 100;
    }

    void chargeBattery(){
        batteryLevel = 100;
        cout<<getBrand()<<" "<<getModel()<<" : Battery fully charged!"<<endl;
    }
    void accelerate(){
        if(!isEngineOn){
            cout<<brand<<" "<<model<<" : Engine is off! Cannot accelerate."<<endl;
            return;
        }

        if(batteryLevel==0){
            cout<<brand<<" "<<model<<" : Battery is too low! Cannot accelerate."<<endl;
            return;
        }
        batteryLevel-=20;
        if(batteryLevel<0) batteryLevel = 0;
        currentSpeed+=10;
        cout<<brand<<" "<<model<<" : Accelerating to "<<currentSpeed<<"."<<endl;
    }

    void carBrake(){
        currentSpeed -= 5;
        if(currentSpeed<0) currentSpeed = 0;

        cout<<brand<<" "<<model<<" : Breaking! Speed is now "<<currentSpeed<<"km/h"<<"."<<endl;
    }

    int getCarBatteryPercentage(){
        return this->batteryLevel;
    }
    
};

int main(){
    // ====Manual Car===
    cout<<"\nManual Car:"<<endl;
    ManualCar *myManualCar = new ManualCar("Suzuki", "WagonR");
    myManualCar->startEngine();
    myManualCar->shiftGear(1);
    myManualCar->accelerate(60);
    myManualCar->carBrake();
    myManualCar->stopEngine();
    delete myManualCar;

    cout<<"\n-----------------------------------------"<<endl;
    // ====Electric Car===
    cout<<"\nElectric Car:"<<endl;
    ElectricCar *myElectricCar = new ElectricCar("Tesla", "Model_5");
    myElectricCar->chargeBattery();
    myElectricCar->startEngine();
    myElectricCar->accelerate();
    cout<<myElectricCar->getBrand()<<" "<<myElectricCar->getModel()<<" : Current battey level is: "<<myElectricCar->getCarBatteryPercentage()<<endl;
    myElectricCar->carBrake();
    myElectricCar->stopEngine();
    delete myElectricCar;
    cout<<endl;
    return 0;
}
