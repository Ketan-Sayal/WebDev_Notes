# INFO WE NEED:

# 1. Requirements gathhering:
a. functional
    - User can search for restraunts based on location.
    - User can add item to cart.
    - User can checkout by making payment.
    - User should be noticified once the order is placed successfully.

b. non-funnctional:
- Each part of design should be scalable and modifiable.

# 2. basic flow:
  O
 /|\   --->  +---------+         Restaurants
 / \         | [ ] --- | ---->
User         |         |
 ^           | [ ] --- |
 |           |         |
 |           | [ ] --- |
 |           +---------+
 |                \
 |                 \
 |                  v
 |               +---------+         Menu
 |               | [ ] --- | ---->
 |               |         |
 |               | [ ] --- |
 |               |         |
 |               +---------+
 |                    |
 |                    v
 |               +---------+       +------+
 |               |  Order  | ----- | Cart |
 |               +---------+       +------+
 |                /       \
 |               /         \
 |              v           v
 |       +----------+   +---------+
 |       | Delivery |   | Pick up |
 |       +----------+   +---------+
 |            \              /
 |             \            /
 |              v          v
 |               +---------+
 |               | Payment |
 |               +---------+
 |                    |
 |                    v
 |+--------------+    |
 || Notification | <--+
 |+--------------+
 +--------------------+


# 3. UML  Diagram:
a. Bottom up aproach:(smaller to larger) [use this mostly]
b. Top-down approach:(larger to smaller)

<!--
Build Zomato Food Delivery App | System Design - rough class diagram

                                                  +------------------------+                        +--------------------------+
                                                  |         Tomato         |                        |   NotificationService    |
                                                  +------------------------+                        +--------------------------+
                                                  | // Orchestration       |                        | Order order;             |
                                                  |    class.              |                        +--------------------------+
                                                  +------------------------+                        | notifyUser();            |
                                                                                                    +--------------------------+
                                                                                                      |
+-------------------------+                                                                           |
|           Cart          |=========================================+=======================+         |
+-------------------------+  <<Singleton>>             <<Model>>    v            <<Model>>  v         |     <<Interface>>
| Restaurant* r;          |  +------------------+      +------------------+      +----------------+   |     +------------------+
| vector<MenuItem> items; |  |RestaurantManager |      |    Restaurant    |      |    MenuItem    | +=+====>| IPaymentStrategy |
+-------------------------+  +------------------+(1..*)+------------------+(1..*)+----------------+ | |     +------------------+
| addToCart(MenuItem it); |  |vector<Restaurant>|<>====| int restaurantId;|<#>===| - code : String| | |     | pay();           |
| totalCost();            |  |   restaurants;   |      | String name;     |      | - name : String| | |     +------------------+
| isEmpty();              |  +------------------+      | String loc;      |      | - price : int  | | |      ^             ^  ^
+-------------------------+  | addRestaurant(   |      | vector<MenuItem> |<+    +- - - - - - - - + | |      |             |  +==========+
              |              |   Restaurant r); |      |   menu;          | |    | // getters     | | |      |             |             |
              |              | searchByLoc(loc);|      +------------------+ |    |    & setters   | | | +----------+  +----------+  +----------+
             <#> <<Model>>   +------------------+                           |    +--------^-------+ | | |CreditCard|  |NetBanking|  |   UPI    |
              |                                                             |             |         | | +----------+  +----------+  +----------+
  +----------------------+                                                  |             |         | | |pay() {..}|  |pay() {..}|  |pay() {..}|
  |         User         |<=================================+               |             |         | | +----------+  +----------+  +----------+
  +----------------------+                                  |         +---------------------------+ | |
  | int userId;          |     <<Interface>>                |         |           Order           |=+ |
  | String name;         |     +--------------------+       |         +---------------------------+   |
  | String address;      |     |   IOrderFactory    |       |         | int id;                   |<==+
  | Cart cart;           |     +--------------------+       |         | User user;                |             <<Singleton>>
  +----------------------+     |                    |       +=========| Restaurant* rst;          |             +------------------+
                               +--------------------+                 | vector<MenuItem> items;   |             |   OrderManager   |
                               | createOrder();     |                 | PaymentStrategy strategy; |             +------------------+
                               +--------------------+                 +---------------------------+   (1..*)    | vector<Order>    |
                                         ^        ^                   | getType();                |===========<>|   orderList;     |
                                         |        |                   +---------------------------+             +------------------+
                +========================+        |                     ^                         ^             | addOrder(order); |
                |                                 |                     |                         |             | listOrders();    |
                |                                 |                     |                         |             +------------------+
  +--------------------------+    +--------------------------+      +--------------------+    +----------------------+
  |   ScheduleOrderFactory   |    |     NowOrderFactory      |      |   DeliveryOrder    |    |     PickupOrder      |
  +--------------------------+    +--------------------------+      +--------------------+    +----------------------+
  | String scheduleTime;     |    | createOrder(type) {..}   |      | String address;    |    | String rsAddress;    |
  | createOrder(type) {..}   |    +--------------------------+      | getType() {..}     |    | getType() {..}       |
  +--------------------------+              |                       +--------------------+    +----------------------+
        |                                   |                           ^           ^             ^           ^
        |                                   +===========================+===========+=============+===========+
        |                                                               |                         |
        +===============================================================+=========================+

Legend:  =====>  association / uses     ^  inheritance / implements (points to parent / interface)
         <>===   aggregation            <#>=== composition      (1..*) multiplicity
Note:    horizontal connectors use '=' because a dash-dash-greater-than sequence would close the HTML comment early.
-->

