-- this is a comment
/*
	this is a multiline comment. 
*/
USE MyDatabase;

SELECT * /*All data in customers*/
FROM customers;

SELECT * 
FROM orders;

-- Select only the choosen colomns
SELECT 
	first_name, 
	country,
	score
FROM customers;

-- Where clause: retrives customers whose score is not 0
SELECT * 
FROM customers
WHERE score != 0; -- Use the colomn name for the condition


-- SELECT customers from Germany
SELECT *
FROM customers
WHERE country = 'Germany'; -- only single quotes are allowed for string

-- ORDER BY clause
SELECT *
FROM customers
ORDER BY country ASC, score DESC;

-- GROUP BY clause
/*Find the total score of each contry*/
SELECT 
	country,
	SUM(score) AS total_score
FROM customers
GROUP BY country; -- non aggregated colomns must be the part of group by otherwise error

-- Find the total score and count for each contry
SELECT 
	country,
	SUM(score) AS total_score,
	COUNT(id) as country_count -- becomes same id as the same country rows combined and final they will have same ids
FROM customers
GROUP BY country;

-- HAVING clause

-- Find the average score for each contry considering only customers with score not equal to 0 and returns only countries whose average score is greater than 430
SELECT 
	country,
	AVG(score) as average
FROM customers
WHERE score != 0
GROUP BY country
HAVING AVG(score)>430; 

-- DISTINCT clause
SELECT DISTINCT country
FROM customers;

-- TOP clause
SELECT TOP 3 *
FROM customers
ORDER BY score DESC;

-- Get the 2 most recent orders
SELECT TOP 2 *
FROM orders
ORDER BY order_date DESC;

-- STATIC variables
SELECT 'hello word' as hello_static;

SELECT 
	id,
	first_name,
	'New Customer' as customer_type -- static variable
FROM customers;

SELECT *
FROM customers
WHERE country='Germany';

-- DDL
/*1. CREATE*/
CREATE TABLE persons(
	id INT PRIMARY KEY  IDENTITY(1, 1),
	person_name VARCHAR(50) NOT NULL,
	birth_day DATE,
	phone VARCHAR(15) NOT NULL
);

SELECT * FROM persons;

/*2. ALTER*/
ALTER TABLE persons
ADD email VARCHAR(50) NOT NULL; -- add the colomn to last

ALTER TABLE persons
DROP COLUMN phone; 

ALTER TABLE persons
ALTER COLUMN person_name VARCHAR(66) NOT NULL;

/*3. DROP*/
DROP TABLE persons;

-- DML:

/*1. INSERT*/

INSERT INTO customers(id, first_name, country, score)
VALUES(6, 'Ana', 'USA', NULL),
	  (7, 'Sam', NULL, 100);

INSERT INTO customers(id, first_name)
VALUES(8, 'Sahra'); -- By default data will be null

SELECT * FROM customers;

-- Insert the data from customers table into persons table
INSERT INTO persons(person_name, birth_day, phone)
SELECT 
	first_name,
	NULL,
	'Unknown'
FROM customers;

SELECT * FROM persons;

/*2. UPDATE*/
UPDATE customers
SET score = 0
WHERE id = 6;

-- change the customer id 8 score to 0 and country to UK.
UPDATE customers
SET score = 0,
	country = 'UK'
WHERE id = 8;

SELECT * FROM customers;

-- Update all customers where score is NULL to 0 
UPDATE customers
SET score = 0
WHERE score IS NULL;

/*DELETE*/
DELETE FROM customers
WHERE id>5;

-- Delete all data from table persons
TRUNCATE TABLE persons; -- fast
DELETE FROM persons; -- slow

-- WHERE clasue conditions operators:

/*1. Comparision operators*/
-- a. = : Used to get values thaat have equal to the curr value
SELECT * 
FROM customers
WHERE country = 'Germany';

-- b. != <> : Used to get values that are not equal
SELECT * 
FROM customers
WHERE country!='Germany';

-- c: >: Used to get values greater that a pre-defined values
SELECT *
FROM customers
WHERE score > 500;

-- d. >=: Gets the value that is greater than equal to the predefined value
SELECT *
FROM customers
WHERE score >= 500;

-- e: <: Used to get values less than the predefined values.
SELECT *
FROM customers
WHERE score < 500;

-- f: <=: Used to get values less than and equal to the predefined values.
SELECT *
FROM customers
WHERE score <= 500;

/*2. Logical operators: */

-- a. AND: Both conditions should be true.
SELECT *
FROM customers
WHERE country='USA' AND score>500;

-- b. OR: Only one condition should be true
SELECT *
FROM customers
WHERE score>500 OR country = 'USA';

-- c. NOT: Excludes matching values(Reverse)
SELECT *
FROM customers
WHERE NOT score<500;

/*3. Range*/
SELECT *
FROM customers
WHERE score BETWEEN 100 AND 500;

/*4. Membership operators*/

-- a. IN: Return sthe values that are in the list.
SELECT *
FROM customers
WHERE country IN ('Germany', 'USA');

-- b. NOT IN:Return sthe values that are not in the list.

/*5. Secarch operator:*/
-- a. LIKE: Used to match the pattren
SELECT *
FROM customers
WHERE first_name LIKE 'M%';

SELECT *
FROM customers
WHERE first_name LIKE '%n';

SELECT *
FROM customers
WHERE first_name LIKE '%r%';

SELECT *
FROM customers
WHERE first_name LIKE '__r%';

-- Combining data

--Joins:
/*1. Inner join*/
SELECT 
	id,
	first_name,
	order_id,
	sales
FROM customers
INNER JOIN orders
ON id = customer_id;

/*2. Left join*/

-- Retrive all the customers with their orders, inclusing those without orders
SELECT 
	c.first_name,
	c.country,
	o.order_id,
	o.sales
FROM customers AS c
LEFT JOIN orders AS o
ON c.id = o.customer_id;

/*3. Right join*/

-- Get the all orders from customers where they match customers including unmatched orders

SELECT 
	c.first_name,
	c.country,
	o.order_date,
	o.sales
FROM customers AS c
RIGHT JOIN orders AS o
ON c.id = o.customer_id;

/*4. Full join*/
-- Get all the data even if the data doesn't exists in each customer, order table

SELECT 
	c.first_name,
	c.country,
	o.order_date,
	o.sales
FROM customers AS c
FULL JOIN orders AS o
ON c.id = o.customer_id;

/*5. Left-anti join*/
SELECT *
FROM customers AS c
LEFT JOIN orders AS o
ON c.id = o.customer_id
WHERE o.customer_id IS NULL;

/*6. Right-anti join*/
SELECT *
FROM customers AS c
RIGHT JOIN orders AS o
ON c.id = o.customer_id
WHERE c.id IS NULL;

/*7. Full-anti join*/
SELECT * 
FROM customers AS c
FULL JOIN orders AS o
ON c.id = o.customer_id
WHERE c.id IS NULL OR o.customer_id IS NULL;


/*8. Cross join*/
SELECT *
FROM customers
CROSS JOIN orders;

/*9. Multi joins*/
USE SalesDB;

SELECT 
	o.OrderID,
	CONCAT(c.FirstName, ' ', c.LastName) AS Customer_name,
	p.Product AS Product_name,
	o.Sales AS Order_sales,
	p.Price AS Product_Price,
	CONCAT(e.FirstName, ' ', e.LastName) AS Salesperson_name
FROM Sales.Orders AS o
LEFT JOIN Sales.Customers AS c
ON o.CustomerID = c.CustomerID
LEFT JOIN Sales.Products AS p
ON p.ProductID = o.ProductID
LEFT JOIN Sales.Employees as e
ON o.SalesPersonID = e.EmployeeID;


-- Set operators:
/*1. Union*/

-- Combine all the data of Customers and Employees
SELECT 
	FirstName AS first_name,
	LastName AS last_name
FROM Sales.Customers
UNION
SELECT 
	FirstName,
	LastName
FROM Sales.Employees;

/*2. Union all*/
-- Combine all the data of Customers and Employees including duplicates
SELECT 
	FirstName AS first_name,
	LastName AS last_name
FROM Sales.Customers
UNION ALL
SELECT 
	FirstName,
	LastName
FROM Sales.Employees;

/*3. Except*/

-- Find the employees who are not customers

SELECT 
	FirstName AS first_name,
	LastName AS last_name
FROM Sales.Employees
EXCEPT
SELECT 
	FirstName,
	LastName
FROM Sales.Customers;

/*4. Intersect*/

-- Find the employees who are also customers.
SELECT 
	FirstName AS first_name,
	LastName AS last_name
FROM Sales.Employees
INTERSECT
SELECT 
	FirstName,
	LastName
FROM Sales.Customers;

-- FUNCTIONS:
/* 1. String fns*/
/**Manupulation **/
SELECT 
	first_name,
	country,
	CONCAT(first_name, ' ', country) AS name_country,
	LOWER(first_name) AS low_name,
	UPPER(first_name) AS up_name
FROM customers;

-- Get all the customers names who have leading or trailing whitespaces
SELECT
	first_name
FROM customers
WHERE LEN(first_name) - LEN(TRIM(first_name))>0;
--WHERE first_name != TRIM(first_name);

-- Replace all '-' in plone numbers
SELECT
	'123-456-7890' AS phone_number,
	REPLACE('123-456-7890', '-', '') AS clean_phone;

/** Calculations**/
SELECT 
	first_name,
	LEN(first_name) AS name_len
FROM customers;

/** String extraction**/
SELECT
	first_name,
	LEFT(TRIM(first_name), 2) AS first_2_char,
	RIGHT(TRIM(first_name), 2) AS last_2_char
FROM customers;

-- Retrives the list list of first_name from customers removing the first character
SELECT
	TRIM(first_name) AS first_name,
	SUBSTRING(TRIM(first_name), 2, LEN(first_name)) AS sub_name
FROM customers;

/*2. Numeric fns*/
/**a. ROUND**/
SELECT
	3.516 AS deci_number,
	ROUND(3.516, 2) AS round_2, -- 3.52
	ROUND(3.516, 1) AS round_1, -- 3.5
	ROUND(3.516, 0) AS round_0, -- 4
	ABS(10) AS abs_number, -- 10
	ABS(-10) AS abs_number_neg; -- 10

/*3. Date & Time*/
SELECT
	OrderID,
	CreationTime,
	'2026-06-20' AS HardCoded,
	GETDATE()  Today
FROM Sales.Orders;
/**a. Part Extraction**/
SELECT
	OrderID,
	CreationTime,
	YEAR(CreationTime) Year,
	MONTH(CreationTime) Month,
	DAY(CreationTime) Day,
	DATEPART(year, CreationTime) Year_dp,
	DATEPART(month, CreationTime) Month_dp,
	DATEPART(week, CreationTime) Week_Day_dp,
	DATEPART(hour, CreationTime) Hour_dp,
	DATEPART(quarter, CreationTime) Quarter_dp,
	DATENAME(month, CreationTime) Month_dn,
	DATENAME(weekday, CreationTime) Week_Day_dn,
	DATENAME(year, CreationTime) Year_dn,
	DATENAME(day, CreationTime) Day_dn,
	DATETRUNC(minute, CreationTime) Year_dt,
	DATETRUNC(hour, CreationTime) Month_dt,
	EOMONTH(CreationTime) End_Of_Month
FROM Sales.Orders;

-- How many orders are place each year
SELECT
	YEAR(OrderDate) Year,
	COUNT(*) Orders_Count
FROM Sales.Orders
GROUP BY YEAR(OrderDate);

-- How many orders are placed in each month
SELECT
	DATENAME(month, OrderDate) Month,
	COUNT(*) Orders_Count
FROM Sales.Orders
GROUP BY DATENAME(month, OrderDate);

-- Show all the orders that are placed in the month of Febrary
SELECT *
FROM Sales.Orders
WHERE MONTH(OrderDate) = 2;

/**Formatting fns**/
SELECT
	CreationTime,
	FORMAT(CreationTime, 'dd/MM/yyyy') date,
	FORMAT(CreationTime, 'MM') MM,
	FORMAT(CreationTime, 'MMM') MMM,
	FORMAT(CreationTime, 'MMMM') MMMM,
	FORMAT(CreationTime, 'dd') dd,
	FORMAT(CreationTime, 'ddd') ddd,
	FORMAT(CreationTime, 'dddd') dddd,
	'Day ' + FORMAT(CreationTime, 'ddd MMM') + ' Q' + DATENAME(QUARTER, CreationTime) + ' ' + FORMAT(CreationTime, 'yyyy hh:mm:ss tt') CustomFormat
FROM Sales.Orders;

SELECT
	FORMAT(OrderDate, 'MMM yy') Date,
	COUNT(*) Order_Count
FROM Sales.Orders 
GROUP BY FORMAT(OrderDate, 'MMM yy');

SELECT
	CreationTime,
	CONVERT(INT, '123') [String to Int],
	CONVERT(DATE, '2025-08-21') [String to Date],
	CONVERT(DATE, CreationTime) [Date-time to Date],
	CONVERT(VARCHAR, CreationTime, 32) [USA Standard Style:32],
	CONVERT(VARCHAR, CreationTime, 34) [EURO Standard Style:34]
FROM Sales.Orders;

SELECT
	CAST('123' AS INT) [String to Int],
	CAST('2025-10-10' AS DATE) [String to Date],
	CAST('2025-10-10' AS DATETIME2) [String to Datetime],
	CreationTime,
	CAST(CreationTime AS DATE) Date,
	DATEADD(month, -10, CreationTime) TenDaysBefore,
	DATEADD(month, 3, CreationTime) ThreeMonthsLater,
	DATEADD(year, 2, CreationTime) TwoYearsLater,
	DATEDIFF(month, OrderDate, ShipDate) Date_diff
FROM Sales.Orders;

-- Get all the ages of employees
SELECT 
	EmployeeID,
	CONCAT(FirstName, ' ', LastName) FullName,
	BirthDate,
	DATEDIFF(year, BirthDate, GETDATE()) Age
FROM Sales.Employees;

-- Get average shipping duration in days in each month
SELECT
	MONTH(OrderDate) OrderDate,
	AVG(DATEDIFF(day, OrderDate, ShipDate)) AvgShip
FROM Sales.Orders
GROUP BY MONTH(OrderDate);

-- Get the diffrence between the days in 2 orders
SELECT
	OrderID,
	OrderDate,
	LAG(OrderDate) OVER (ORDER BY OrderDate) AS PrevOrderDate,
	DATEDIFF(day, LAG(OrderDate) OVER (ORDER BY OrderDate), OrderDate) diffInDays
FROM Sales.Orders;

/*nuLL Fns*/

SELECT
	ISDATE('123') DateCheck,
	ISDATE('2025-12-19') DateCheck2,
	ISDATE('2025-22-12') DateCheck3,
	ISDATE('2025') DateCheck4,
	ISDATE('1749') DateCheck5, -- last date it will not recognize
	ISDATE('2025-08') DateCheck6

-- Find the avg score for the customers

SELECT 
	CustomerID,
	Score,
	AVG(Score) OVER() AVG,
	AVG(COALESCE(Score, 0)) OVER() AVG2
FROM Sales.Customers;

-- Dispaly the full name of the customers in a single feild by merging their first and last names and add 10 bonus points to each customers score.
SELECT
	CONCAT(FirstName, ' ', LastName) FullName,
	COALESCE(Score, 0)+10 Score
FROM Sales.Customers;

-- Sort the customers from lowest to hight scores, with nulls appearing at last.
SELECT
	CustomerID,
	Score
FROM Sales.Customers
ORDER BY CASE WHEN Score IS NULL THEN 1 ELSE 0 END, Score;

-- Find the sales price for each order by diving sales by quantity
SELECT
	OrderID,
	Quantity,
	Sales,
	Sales/NULLIF(Quantity, 0) AS Price
FROM Sales.Orders;

-- Identify the customers who have no score:
SELECT 
	*
FROM Sales.Customers
WHERE Score IS NOT NULL;

-- List all the customers who have not placed any orders.
SELECT 
	c.CustomerID,
	c.FirstName,
	c.LastName,
	o.OrderID
FROM Sales.Customers AS c
LEFT JOIN Sales.Orders AS o
ON c.CustomerID = o.CustomerID
WHERE o.CustomerID IS NULL;

-- CASE Statements:
-- Generate a report showing total sales of each category high >50, medium Between 20 and 50 and low <=20 also sort the resulkyt from lowest to highest

SELECT 
	Category,
	SUM(Sales) total_sales
FROM (
	SELECT
		CASE 
			WHEN Sales>50 THEN 'High'
			WHEN Sales > 20 THEN 'Medium'
			ELSE 'Low'
		END AS Category,
		Sales
	FROM Sales.Orders
) salesData -- any name but it is required
GROUP BY Category
ORDER BY SUM(Sales) DESC;

-- Retrive employee details with gender displayed as full text
SELECT 
	EmployeeID,
	FirstName,
	LastName,
	Gender,
	CASE WHEN Gender = 'M' THEN 'Male' ELSE 'Female' END AS GenderFullText
FROM Sales.Employees;

-- Count how many times a customer has made a order greater than 30
SELECT
 CustomerID,
 SUM(CASE WHEN Sales>30 THEN 1 ELSE 0 END) AS TotalOrdersHighSales,
 COUNT(*) AS TotalOrders
FROM Sales.Orders
GROUP BY CustomerID
ORDER BY CustomerID;

-- Aggregation fns
USE MyDatabase;
SELECT
	customer_id,
	COUNT(*) AS total_nr_orders,
	SUM(Sales) AS total_sales,
	AVG(Sales) AS avg_sales,
	MAX(Sales) AS highest_sales,
	MIN(Sales) AS lowest_sales
FROM orders
GROUP BY customer_id;

-- Window fns

-- Find the total sales across all orders.
USE SalesDB;
SELECT
	SUM(Sales) total_sales
FROM Sales.Orders;

-- Find the total sales of each product
SELECT
	ProductID,
	SUM(Sales) totalSales
FROM Sales.Orders
GROUP BY ProductID;

-- Also add additional details here
SELECT
	OrderID,
	OrderDate,
	ProductID,
	SUM(Sales) OVER(PARTITION BY ProductID) TotalSalesByProduct
FROM Sales.Orders;

-- Provide total sales across all orders and we havd to provide additional details such as order id, order date
SELECT
	OrderID,
	ProductID,
	OrderStatus,
	OrderDate,
	SUM(Sales) OVER() TotalSales,
	SUM(Sales) OVER(PARTITION BY ProductID) TotalSalesByProduct,
	SUM(Sales) OVER(PARTITION BY ProductID, OrderStatus) TotalSalesByProductAndStatus
FROM Sales.Orders;

-- Rank each order based on the sales from highest to lowest additionally provide details such as order id, order date
SELECT
	OrderID,
	OrderDate,
	Sales,
	RANK() OVER(ORDER BY Sales DESC) rankSales
FROM Sales.Orders;

SELECT
	OrderID,
	OrderDate,
	OrderStatus,
	Sales,
	ProductID,
	-- SUM(Sales) OVER(PARTITION BY OrderStatus ORDER BY OrderDate ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) AS next2RowsTillSum
	SUM(Sales) OVER(PARTITION BY OrderStatus) TotalSales
FROM Sales.Orders
WHERE ProductID IN(101, 102);

-- Rank the customers based on total sales
SELECT
	CustomerID,
	SUM(Sales) TotalSales,
	RANK() OVER(ORDER BY SUM(Sales) DESC) RankCustomers
FROM Sales.Orders
GROUP BY CustomerID;

-- Find the total number of orders and proovide details such as OrderID and OrderDate
-- for each customer
SELECT
	OrderID,
	OrderDate,
	CustomerID,
	COUNT(*) OVER() TotalOrders,
	COUNT(*) OVER(PARTITION BY CustomerID) OrdersByCustomers
FROM Sales.Orders;

-- get all the duplicte orderIds from orderArchive
SELECT 
	OrderID,
	idCount
FROM (SELECT
	*,
	COUNT(*) OVER(PARTITION BY OrderID) idCount
FROM Sales.OrdersArchive) t
WHERE idCount>1;

-- Find total sales across each order and find sales for each product additionally provide details such as order ID and Order Date.
SELECT
	OrderID,
	OrderDate,
	ProductID,
	Sales,
	SUM(Sales) OVER() AS TotalSales,
	SUM(Sales) OVER(PARTITION BY ProductID) AS ProductSales,
	ROUND(CAST(Sales AS FLOAT)/SUM(Sales) OVER() * 100, 1) AS PercentageTotal
FROM Sales.Orders;

-- Find the avearge sales across all orders and each product, additionally provide details such as orderId, OrderDate.
SELECT
	OrderID,
	OrderDate,
	Sales,
	ProductID,
	AVG(Sales) OVER() TotalAvgSales,
	AVG(Sales) OVER(PARTITION BY ProductID) ProductAvgSales
FROM Sales.Orders;

-- Find all orders where sales is higher than avg sales
SELECT 
	OrderID,
	ProductID,
	Sales
FROM (SELECT
	*,
	AVG(Sales) OVER() AvgSales
FROM Sales.Orders) t
WHERE Sales>AvgSales;

-- Find the higest and lowest sales cross all orders and also find the highest and lowest sales for each product. Additionally provide details such as orderId and orderDate
SELECT
	OrderID,
	OrderDate,
	Sales,
	ProductID,
	MAX(Sales) OVER() MaxSales,
	MIN(Sales) OVER() MinSales,
	MAX(Sales) OVER(PARTITION BY ProductID) MaxProductSales,
	MIN(Sales) OVER(PARTITION BY ProductID) MinProductSales
FROM Sales.Orders;

-- Show the employees who have the higest salaries
SELECT
	*
FROM Sales.Employees
WHERE (SELECT 
	MAX(Salary) 
FROM Sales.Employees) = Salary;


SELECT *
FROM (SELECT
	*,
	MAX(Salary) OVER() maxSalary
FROM Sales.Employees) t
WHERE Salary = maxSalary;

-- Find the Find the deviatin of each sales from the minimum and maximum ammount
SELECT
	OrderID,
	OrderDate,
	Sales,
	MIN(Sales) OVER() LowestSales,
	MAX(Sales) OVER() HighestSales,
	Sales - MIN(Sales) OVER() DeviationMinSales,
	MAX(Sales) OVER() - Sales DeviationMaxSales
FROM Sales.Orders;

-- Rank the orders based on the sales  from highest to lowest
SELECT
	0rderID,
	OrderDate,
	Sales,
	ROW_NUMBER() OVER(ORDER BY Sales DESC) SalesRank_Row,
	RANK() OVER(ORDER BY Sales DESC) SalesRank_Rank,
	DENSE_RANK() OVER(ORDER BY Sales DESC) SalesRank_Dense
FROM Sales.Orders;

-- find top highest sales in each product

SELECT
	ProductID,
	OrderID,
	Sales
FROM (SELECT
	*,
	ROW_NUMBER() OVER(PARTITION BY ProductID ORDER BY Sales DESC) rank_Row
FROM Sales.Orders) t
WHERE rank_Row = 1;

-- Assign unique ids to the rows in OrdersArchive
SELECT *
FROM Sales.OrdersArchive;

-- Show the non required data in ordersArchive

SELECT
	*
FROM (SELECT
	*,
	ROW_NUMBER() OVER(PARTITION BY OrderID ORDER BY CreationTime DESC) row_rank
FROM Sales.OrdersArchive
) t
WHERE row_rank = 1;

-- NTILE
SELECT
	OrderID,
	Sales,
	NTILE(1) OVER(ORDER BY Sales DESC) oneBucket,
	NTILE(2) OVER(ORDER BY Sales DESC) twoBucket,
	NTILE(3) OVER(ORDER BY Sales DESC) threeBucket,
	NTILE(4) OVER(ORDER BY Sales DESC) fourBucket
FROM Sales.Orders;

-- Categorize the data into high medium and low based on sales
SELECT
	OrderID,
	Sales,
	CASE WHEN Bucket=1 THEN 'High' WHEN Bucket=2 THEN 'Medium' ELSE 'Low' END SalesSegmentation
FROM (SELECT
	OrderID,
	Sales,
	NTILE(3) OVER(ORDER BY Sales DESC) Bucket
FROM Sales.Orders) t;

-- Find the products that fall within highest 40% of the prices
SELECT
	*
FROM (SELECT
	ProductID,
	Product,
	price,
	CUME_DIST() OVER(ORDER BY price DESC) perRank
FROM Sales.Products) t
WHERE perRank<=0.4;

-- Value fns:
-- Analyze the month over month perfoirmance by finding the percentage change in sales between curr month and prev month
SELECT
	*,
	CurrentMonthTotalSales - PreviousMonthSales AS MOM_Change,
	ROUND((CAST(CurrentMonthTotalSales AS FLOAT) - PreviousMonthSales)/PreviousMonthSales * 100, 2) AS Percentage_Change
FROM (SELECT
	MONTH(OrderDate) month,
	SUM(Sales) CurrentMonthTotalSales,
	LAG(SUM(Sales)) OVER(ORDER BY MONTH(OrderDate)) PreviousMonthSales
FROM Sales.Orders
GROUP BY MONTH(OrderDate)) t;

-- In order to analyze customer loyalty rank customers based on their avg between their orders
SELECT
	CustomerID,
	AVG(DaysUntilNextOrder) AvgDays,
	RANK() OVER(ORDER BY COALESCE(AVG(DaysUntilNextOrder), 9999)) RankAvg
FROM (SELECT
	OrderID,
	OrderDate,
	CustomerID,
	Sales,
	LEAD(OrderDate) OVER(PARTITION BY CustomerID ORDER BY OrderDate) nextOrderDate,
	DATEDIFF(day, OrderDate, LEAD(OrderDate) OVER(PARTITION BY CustomerID ORDER BY OrderDate)) DaysUntilNextOrder
FROM Sales.Orders) t
GROUP BY CustomerID; 

-- Info about anything in database
SELECT DISTINCT
	TABLE_NAME
FROM INFORMATION_SCHEMA.COLUMNS;

-- Find the products higher than the average price of all products
SELECT
	ProductID,
	Price
FROM Sales.Products 
WHERE Price>(SELECT
	AVG(Price)
FROM Sales.Products);


-- OR
SELECT
	ProductID,
	Price
FROM 
	(SELECT
		ProductID,
		Price,
		AVG(Price) OVER() AvgPrice
	FROM Sales.Products) t
WHERE Price > AvgPrice;

-- Rank the customers based n therir total ammount of sales
SELECT
	*,
	ROW_NUMBER() OVER(ORDER BY totalSales DESC) SalesRank
FROM (SELECT
	CustomerID,
	SUM(Sales) totalSales
FROM Sales.Orders
GROUP BY CustomerID) t;

-- Show all customer details and find the total orders of each customer
SELECT
	c.CustomerID,
	c.FirstName,
	c.LastName,
	c.Score,
	COALESCE(t.totalOrders, 0) AS totalOrders
FROM Sales.Customers AS c
LEFT JOIN (SELECT
	CustomerID,
	COUNT(*) totalOrders
FROM Sales.Orders
GROUP BY CustomerID) AS t
ON c.CustomerID = t.CustomerID;

-- Show the orders for customers who are not from Germany
SELECT
	*
FROM Sales.Orders
WHERE CustomerID NOT IN(
	SELECT
		CustomerID
	FROM Sales.Customers
	WHERE Country= 'Germany'
);

-- OR
SELECT
	*
FROM Sales.Orders AS o
WHERE NOT EXISTS(
	SELECT 1
	FROM Sales.Customers AS c
	WHERE Country = 'Germany' AND o.CustomerID = c.CustomerID
);

-- Find the female emmployees whose salaries are greater than any male employee
SELECT
	*
FROM Sales.Employees
WHERE Gender = 'F' AND Salary > ANY(
	SELECT
		Salary
	FROM Sales.Employees
	WHERE Gender = 'M'
);

-- Find the total sales per customer
WITH CTE_Total_Sales AS (SELECT
	CustomerID,
	SUM(Sales) AS totalSales
FROM Sales.Orders
GROUP BY CustomerID)

SELECT 
	c.CustomerID,
	c.FirstName,
	c.LastName,
	ts.totalSales
FROM Sales.Customers AS c
LEFT JOIN CTE_Total_Sales AS ts
ON c.CustomerID = ts.CustomerID;

-- Step 1: Find the total Sales per customer
-- Step 2: Find the last order per customer
-- Step 3: Rank the customers based omn totalSales per customers
WITH CTE_Total_Sales AS (SELECT
	CustomerID,
	SUM(Sales) AS totalSales
FROM Sales.Orders
GROUP BY CustomerID), CTE_Last_Order AS (
	SELECT 
		CustomerID,
		MAX(OrderDate) LastOrder
	FROM Sales.Orders
	GROUP BY CustomerID
), CTE_Rank_Customers AS (
	SELECT 
		CustomerID,
		RANK() OVER(ORDER BY totalSales DESC) rank_customers
	FROM CTE_Total_Sales
), CTE_Customer_Segments AS (
	SELECT
		CustomerID,
		CASE WHEN totalSales > 100 THEN 'High'
		WHEN totalSales > 80 THEN 'Medium'
		ELSE 'Low'
		END SalesSegment
	FROM CTE_Total_Sales
)

SELECT 
	c.CustomerID,
	c.FirstName,
	c.LastName,
	ts.totalSales,
	clo.LastOrder,
	crc.rank_customers,
	ccs.SalesSegment
FROM Sales.Customers AS c
LEFT JOIN CTE_Total_Sales AS ts
ON c.CustomerID = ts.CustomerID
LEFT JOIN CTE_Last_Order AS clo
ON clo.CustomerID = c.CustomerID
LEFT JOIN CTE_Rank_Customers AS crc
ON crc.CustomerID = c.CustomerID
LEFT JOIN CTE_Customer_Segments AS ccs
ON ccs.CustomerID = c.CustomerID;

-- Generate a sequence of numbers from 1 to 20
WITH Series AS(
	SELECT
	1 AS MyNumber

	UNION ALL

	SELECT
		MyNumber + 1 
	FROM Series
	WHERE MyNumber < 200
)

SELECT 
	* 
FROM Series
OPTION(MAXRECURSION 200); /* Default value of maxRecurssion is 100 only*/ 

-- Show employee heirarchy by displaying each employee level withinin the organization
WITH CTE_Emp_Hirarchy AS(
SELECT 
	EmployeeID,
	FirstName,
	ManagerID,
	1 AS Level
FROM Sales.Employees
WHERE ManagerID IS NULL

UNION ALL

SELECT 
	e.EmployeeID,
	e.FirstName,
	e.ManagerID,
	Level + 1
FROM Sales.Employees AS e
INNER JOIN CTE_Emp_Hirarchy AS ceh
ON e.ManagerID = ceh.EmployeeID
)

SELECT * FROM CTE_Emp_Hirarchy;

-- Views:
CREATE VIEW Sales.V_MONTHLY_SUMMARY AS( -- USE schema name with view names as default will be dbo
SELECT 
	DATETRUNC(month, OrderDate) OrderMonth,
	SUM(Sales) TotalSales,
	COUNT(OrderID) TotalOrders,
	SUM(Quantity) TotalQuantities
FROM Sales.Orders
GROUP BY DATETRUNC(month, OrderDate));

SELECT * FROM Sales.V_MONTHLY_SUMMARY;

IF OBJECT_ID('Sales.V_MONTHLY_SUMMARY', 'V') IS NOT NULL
	DROP VIEW Sales.V_MONTHLY_SUMMARY
GO
CREATE VIEW Sales.V_MONTHLY_SUMMARY AS( -- USE schema name with view names as default will be dbo
SELECT 
	DATETRUNC(month, OrderDate) OrderMonth,
	SUM(Sales) TotalSales,
	COUNT(OrderID) TotalOrders,
	SUM(Quantity) TotalQuantities
FROM Sales.Orders
GROUP BY DATETRUNC(month, OrderDate));


-- CTAS:
SELECT
	DATENAME(month, OrderDate) AS OrderMonth,
	COUNT(OrderID) AS totalOrders
INTO Sales.MonthlyOrders
FROM Sales.Orders
GROUP BY DATENAME(month, OrderDate);

SELECT * FROM Sales.MonthlyOrders;