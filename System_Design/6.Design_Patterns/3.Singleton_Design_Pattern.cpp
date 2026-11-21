// Singleton Design Pattern:
/**
 * Singleton: Its a class through which we can create only a single object/instance.
 * So implementing this class is called singleton design pattern.
 * e.g we have a class "A"
    then A* a = new A();// This line is calling a constructor.
    - Also through "new" keyword we got a reserved memory in the heap.
    - So main culprit is the "new" keyword.
 * Conclusion:
    - Create a private constructor.
    - Create a static instance fn(getInstance) that returns the same instance every time.
 * Use cases:
    - logging System.
    - Database connection.
    - Configration manager.
 */
#include <iostream>
#include <mutex>

using namespace std;

class Singleton {
private:
    static Singleton* instance;
    static mutex mtx;

    Singleton() {
        cout << "Singleton constructor is called. New object is created.\n";
    }

public:
    static Singleton* getInstance() {
        if (instance == nullptr) {
            lock_guard<mutex> lock(mtx);
            if (instance == nullptr) {
                instance = new Singleton();
            }
        }
        return instance;
    }

    // Eager method
    static Singleton* getInstanceEager() {
        return instance;
    }
};

// Define static members outside the class
Singleton* Singleton::instance = new Singleton(); // You can call a private method outside of the main class
mutex Singleton::mtx;

int main() {
    Singleton* s1 = Singleton::getInstance();
    Singleton* s2 = Singleton::getInstance();
    cout << (s1 == s2) << endl;
    return 0;
}