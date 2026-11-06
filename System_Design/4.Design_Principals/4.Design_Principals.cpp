// Application Problem:
/**
 * 1. Maintainability
 * 2. Reusability
 * 3. Bugs
 */

// SOLID Design principals:
/*
    1. S: Single Responsibility Principal(SRP)
    2. O: Open-close principal(OCP)
    3. L: Liscov substitution Principal(LSP)
    4. I: Interface segregation principal
    5. D: Dependency inversion principal.
*/

// S: Single responsibility principal
/**
 * A class should have only one reason to change
   or should do only 1 thing.
 
 * 1 class only 1 thing to do.
 */

#include<iostream>
#include<vector>
using namespace std;

class Product{
public:
    string name;
    double price;

    Product(string name, double price){
        this->price = price;
        this->name = name;
    }

};

class ShoppingCart{
private:
    vector<Product> products;

public:
    void addProduct(Product p){
        products.push_back(p);
    }

    const vector<Product>& getProducts(){
        return products;
    }

    double calculateTotal(){
        double total = 0;
        for(auto product:products){
            total+=product.price;
        }
        return total;
    }
};

class ShoppingCartPrinter{
private:
    ShoppingCart *cart;

public:
    ShoppingCartPrinter(ShoppingCart *cart){
        this->cart = cart;
    }

    void printInvoice(){
        cout<<"Shopping cart invoice:"<<endl;

        for(auto p:cart->getProducts()){
            cout<<p.name<<" - $"<<p.price<<endl;
        }

        cout<<"Total: $"<<cart->calculateTotal()<<endl;
    }
};

class ShoppingCartStorage{
    private:
        ShoppingCart *cart;
    
    public:
        ShoppingCartStorage(ShoppingCart *cart){
            this->cart = cart;
        }

        void saveToDb(){
            cout<<"Saving shoping cart to database...."<<endl;
        }

};

int main(){
    ShoppingCart *cart = new ShoppingCart();
    cart->addProduct(Product("Laptop", 120000));
    cart->addProduct(Product("Mouse", !200));
    
    ShoppingCartPrinter *printer = new ShoppingCartPrinter(cart);
    printer->printInvoice();

    ShoppingCartStorage *db = new ShoppingCartStorage(cart);
    db->saveToDb();
    return 0;
}

// O:Open close principle
/**
 * A class should be open for extension(new feature addition) and close for modification(old class change{not}).
 * We cannot add a new method in the old class so we will use inheritance, abstraction and polymorphism.
 * Loosely coupled.
 * Client--->Interface--->Class.
 */

// Interface:
/**
 * Its a blueprint of a class.
 * Its contract that tells the client what this class can do.
 */
class Persistence{
    public:
        virtual void save(ShoppingCart *cart) = 0;
};

class MongoPersistence:public Persistence{
    public:
        void save(ShoppingCart *cart){
            cout<<"Saving to mongodb database";
        }
};

class SqlPersistence:public Persistence{
    public:
        void save(ShoppingCart *cart){
            cout<<"Saving to sql database";
        }
};

class FilePersistence:public Persistence{
    public:
        void save(ShoppingCart *cart){
            cout<<"Saving to file";
        }
};


// L: Liscov substitution principle
/**
 * Sub-class should be able to substitutable for their base class / parent class.
 * Suppose we have A(Parent) and B(Child) then LSp means we can use B as a refence of A and use it and our code will be fine.
 */  
// Why its changed so much?
/**
 * Sometimes in subclass we throw exception while overriding the method to limit its reach that breaks LSP.
 */
