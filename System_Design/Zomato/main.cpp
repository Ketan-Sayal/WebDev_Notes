// Zomato Food Delivery App - Low Level Design (matches the class diagram)
// Build: g++ -std=c++17 zomato.cpp -o zomato && ./zomato
#include <algorithm>
#include <iostream>
#include <memory>
#include <string>
#include <vector>
using namespace std;

// ---------------------------------------------------------------- <<Model>>
class MenuItem {
    string code;
    string name;
    int price;
public:
    MenuItem(string code, string name, int price)
        : code(move(code)), name(move(name)), price(price) {}
    // getters & setters
    const string& getCode() const { return code; }
    const string& getName() const { return name; }
    int getPrice() const { return price; }
    void setCode(const string& c) { code = c; }
    void setName(const string& n) { name = n; }
    void setPrice(int p) { price = p; }
};

class Restaurant {
    int restaurantId;
    string name;
    string loc;
    vector<MenuItem> menu;
    static int nextId;
public:
    Restaurant(string name, string loc)
        : restaurantId(nextId++), name(move(name)), loc(move(loc)) {}
    void addMenuItem(const MenuItem& item) { menu.push_back(item); }
    int getId() const { return restaurantId; }
    const string& getName() const { return name; }
    const string& getLoc() const { return loc; }
    const vector<MenuItem>& getMenu() const { return menu; }
};
int Restaurant::nextId = 1;

// -------------------------------------------------------------- <<Singleton>>
class RestaurantManager {
    vector<shared_ptr<Restaurant>> restaurants;
    RestaurantManager() = default;
public:
    RestaurantManager(const RestaurantManager&) = delete;
    RestaurantManager& operator=(const RestaurantManager&) = delete;
    static RestaurantManager& getInstance() {
        static RestaurantManager instance;
        return instance;
    }
    void addRestaurant(shared_ptr<Restaurant> r) { restaurants.push_back(move(r)); }
    vector<shared_ptr<Restaurant>> searchByLoc(const string& loc) const {
        vector<shared_ptr<Restaurant>> result;
        for (const auto& r : restaurants)
            if (r->getLoc() == loc) result.push_back(r);
        return result;
    }
};

// ---------------------------------------------------------------------- Cart
class Cart {
    Restaurant* r = nullptr;
    vector<MenuItem> items;
public:
    void setRestaurant(Restaurant* rest) { r = rest; }
    Restaurant* getRestaurant() const { return r; }
    void addToCart(const MenuItem& item) { items.push_back(item); }
    int totalCost() const {
        int total = 0;
        for (const auto& it : items) total += it.getPrice();
        return total;
    }
    bool isEmpty() const { return items.empty(); }
    const vector<MenuItem>& getItems() const { return items; }
    void clear() { items.clear(); r = nullptr; }
};

// ---------------------------------------------------------------- <<Model>>
class User {
    int userId;
    string name;
    string address;
public:
    Cart cart;
    User(int id, string name, string address)
        : userId(id), name(move(name)), address(move(address)) {}
    int getId() const { return userId; }
    const string& getName() const { return name; }
    const string& getAddress() const { return address; }
};

// ------------------------------------------------- Strategy: <<Interface>>
class IPaymentStrategy {
public:
    virtual ~IPaymentStrategy() = default;
    virtual void pay(int amount) = 0;
};
class CreditCard : public IPaymentStrategy {
public:
    void pay(int amount) override { cout << "  Paid Rs." << amount << " using Credit Card\n"; }
};
class NetBanking : public IPaymentStrategy {
public:
    void pay(int amount) override { cout << "  Paid Rs." << amount << " using Net Banking\n"; }
};
class UPI : public IPaymentStrategy {
public:
    void pay(int amount) override { cout << "  Paid Rs." << amount << " using UPI\n"; }
};

// ----------------------------------------------------------------------- Order
class Order {
protected:
    int id;
    User* user;
    Restaurant* rst;
    vector<MenuItem> items;
    shared_ptr<IPaymentStrategy> strategy;
    static int nextId;
public:
    Order(User* u, Restaurant* r, vector<MenuItem> its, shared_ptr<IPaymentStrategy> s)
        : id(nextId++), user(u), rst(r), items(move(its)), strategy(move(s)) {}
    virtual ~Order() = default;
    virtual string getType() const = 0;
    int getId() const { return id; }
    User* getUser() const { return user; }
    Restaurant* getRestaurant() const { return rst; }
    const vector<MenuItem>& getItems() const { return items; }
    int total() const {
        int t = 0;
        for (const auto& it : items) t += it.getPrice();
        return t;
    }
    void processPayment() { strategy->pay(total()); }
};
int Order::nextId = 1;

class DeliveryOrder : public Order {
    string address;
public:
    DeliveryOrder(User* u, Restaurant* r, vector<MenuItem> its, shared_ptr<IPaymentStrategy> s)
        : Order(u, r, move(its), move(s)), address(u->getAddress()) {}
    string getType() const override { return "Delivery to " + address; }
};

class PickupOrder : public Order {
    string rsAddress;
public:
    PickupOrder(User* u, Restaurant* r, vector<MenuItem> its, shared_ptr<IPaymentStrategy> s)
        : Order(u, r, move(its), move(s)), rsAddress(r->getLoc()) {}
    string getType() const override { return "Pickup from " + rsAddress; }
};

// ------------------------------------------------- Factory: <<Interface>>
class IOrderFactory {
public:
    virtual ~IOrderFactory() = default;
    virtual unique_ptr<Order> createOrder(User* user, shared_ptr<IPaymentStrategy> pay,
                                          const string& type) = 0;
protected:
    static unique_ptr<Order> build(User* user, shared_ptr<IPaymentStrategy> pay, const string& type) {
        Restaurant* r = user->cart.getRestaurant();
        const auto& items = user->cart.getItems();
        if (type == "pickup")
            return make_unique<PickupOrder>(user, r, items, move(pay));
        return make_unique<DeliveryOrder>(user, r, items, move(pay));
    }
};

class NowOrderFactory : public IOrderFactory {
public:
    unique_ptr<Order> createOrder(User* user, shared_ptr<IPaymentStrategy> pay,
                                  const string& type) override {
        cout << "  [NowOrderFactory] creating immediate " << type << " order\n";
        return build(user, move(pay), type);
    }
};

class ScheduleOrderFactory : public IOrderFactory {
    string scheduleTime;
public:
    explicit ScheduleOrderFactory(string t) : scheduleTime(move(t)) {}
    unique_ptr<Order> createOrder(User* user, shared_ptr<IPaymentStrategy> pay,
                                  const string& type) override {
        cout << "  [ScheduleOrderFactory] creating " << type << " order scheduled at "
             << scheduleTime << "\n";
        return build(user, move(pay), type);
    }
};

// -------------------------------------------------------------- <<Singleton>>
class OrderManager {
    vector<unique_ptr<Order>> orderList;
    OrderManager() = default;
public:
    OrderManager(const OrderManager&) = delete;
    OrderManager& operator=(const OrderManager&) = delete;
    static OrderManager& getInstance() {
        static OrderManager instance;
        return instance;
    }
    Order* addOrder(unique_ptr<Order> order) {
        orderList.push_back(move(order));
        return orderList.back().get();
    }
    void listOrders() const {
        cout << "\n=== All Orders ===\n";
        for (const auto& o : orderList)
            cout << "Order #" << o->getId() << " | " << o->getUser()->getName()
                 << " | " << o->getRestaurant()->getName()
                 << " | " << o->getType() << " | Rs." << o->total() << "\n";
    }
};

// -------------------------------------------------------- NotificationService
class NotificationService {
    Order* order;
public:
    explicit NotificationService(Order* o) : order(o) {}
    void notifyUser() const {
        cout << "  Notification -> " << order->getUser()->getName() << ": your order #"
             << order->getId() << " (" << order->getType() << ") is confirmed!\n";
    }
};

// ------------------------------------------------------------ Orchestration
class Tomato {
public:
    Tomato() { initializeRestaurants(); }

    vector<shared_ptr<Restaurant>> searchRestaurants(const string& loc) {
        return RestaurantManager::getInstance().searchByLoc(loc);
    }
    void showMenu(const Restaurant& r) const {
        cout << "Menu of " << r.getName() << ":\n";
        for (const auto& m : r.getMenu())
            cout << "  " << m.getCode() << " " << m.getName() << " - Rs." << m.getPrice() << "\n";
    }
    void addToCart(User& user, Restaurant& r, const string& code) {
        for (const auto& m : r.getMenu()) {
            if (m.getCode() == code) {
                user.cart.setRestaurant(&r);
                user.cart.addToCart(m);
                cout << "  Added " << m.getName() << " to " << user.getName() << "'s cart\n";
                return;
            }
        }
        cout << "  Item " << code << " not found\n";
    }
    void checkout(User& user, IOrderFactory& factory, shared_ptr<IPaymentStrategy> pay,
                  const string& type) {
        if (user.cart.isEmpty()) { cout << "  Cart is empty!\n"; return; }
        cout << "Checkout for " << user.getName() << " (total Rs." << user.cart.totalCost() << ")\n";
        auto order = factory.createOrder(&user, move(pay), type);
        Order* placed = OrderManager::getInstance().addOrder(move(order));
        placed->processPayment();
        NotificationService(placed).notifyUser();
        user.cart.clear();
    }
private:
    void initializeRestaurants() {
        auto r1 = make_shared<Restaurant>("Punjabi Dhaba", "Ludhiana");
        r1->addMenuItem({"M1", "Butter Chicken", 320});
        r1->addMenuItem({"M2", "Paneer Tikka", 250});
        r1->addMenuItem({"M3", "Butter Naan", 40});
        auto r2 = make_shared<Restaurant>("Pizza Hub", "Ludhiana");
        r2->addMenuItem({"P1", "Margherita", 299});
        r2->addMenuItem({"P2", "Garlic Bread", 129});
        auto r3 = make_shared<Restaurant>("Dosa Corner", "Chandigarh");
        r3->addMenuItem({"D1", "Masala Dosa", 120});
        auto& rm = RestaurantManager::getInstance();
        rm.addRestaurant(r1); rm.addRestaurant(r2); rm.addRestaurant(r3);
    }
};

// ----------------------------------------------------------------------- main
int main() {
    Tomato app;
    User alice(1, "Alice", "12 Model Town, Ludhiana");
    User bob(2, "Bob", "45 Sector 17, Chandigarh");

    cout << "--- Search restaurants in Ludhiana ---\n";
    auto found = app.searchRestaurants("Ludhiana");
    for (auto& r : found) cout << "  #" << r->getId() << " " << r->getName() << "\n";

    // Alice: Now + Delivery + UPI
    Restaurant& dhaba = *found[0];
    app.showMenu(dhaba);
    app.addToCart(alice, dhaba, "M1");
    app.addToCart(alice, dhaba, "M3");
    NowOrderFactory nowFactory;
    app.checkout(alice, nowFactory, make_shared<UPI>(), "delivery");

    // Bob: Scheduled + Pickup + Credit Card
    auto chd = app.searchRestaurants("Chandigarh");
    Restaurant& dosa = *chd[0];
    app.addToCart(bob, dosa, "D1");
    ScheduleOrderFactory scheduleFactory("08:00 PM");
    app.checkout(bob, scheduleFactory, make_shared<CreditCard>(), "pickup");

    // Alice again: Net Banking
    Restaurant& pizza = *found[1];
    app.addToCart(alice, pizza, "P1");
    app.checkout(alice, nowFactory, make_shared<NetBanking>(), "pickup");

    OrderManager::getInstance().listOrders();
    return 0;
}