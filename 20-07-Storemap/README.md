# About Blitz

## Summary

Blitz simplifies grocery store managing and shopping. There are two parties that can greatly benefit from using Blitz: store managers and customers. Store management does not have an easy way to track grocery store item inventory; currently, either employees are walking through the store manually updating item inventory or item inventory is being updated when items are checked out. Through these methods, inventory is not updated in real-time. Another issue for management is when items change location or there are promotions: both require employees to manually change the item stickers on the front of each shelf (the pieces of paper that show item name, price, promotional info, etc.). Shoppers can also waste a lot of time walking through stores, looking for many items. Overall, we think that shopping can be made more efficient in terms of time and effort.

The purpose of Blitz is to create a total shopping platform for management and consumers. Both parties can greatly benefit from automated processes to aid in everyday tasks. For management, tracking inventory is extremely important and with Blitz, inventory is updated when an item is taken off or put on a shelf. Management can know immediately, before too much time has passed waiting for customers to check out, if an item is low or out of stock. Also, when items are moved or there are promotions, employees will not have to change the item stickers on the dedicated shelves themselves. To help the customer be more efficient, they can use our mobile application to create a shopping list and receive a populated, shortest-path route through their selected grocery store. Instead of wasting time, customers will know exactly where to go in the store to find exactly what they need in the shortest time possible. 

By employing simple shelving devices, Blitz is able to solve all of the issues management and consumers face. It is able to track inventory, give real-time alerts and updates, and generate optimized routes for shoppers. Through the use of four load cells and an ESP32 module, each shelf can keep track of inventory by telling when an item of known weight is taken off or put back on the shelf. The ESP device will process changes in weight data to determine any new products that have been. Updates to shelf inventory will be communicated to a central processing unit. The CPU will utilize a Raspberry Pi to process shelf inventory updates coming from around the store. The Raspberry Pi will update the store’s SQL database to reflect the new shelf inventories; this way, managers can see immediate changes in inventory and then act upon the information. Since every shelf has an ESP device, we can easily tap into a store’s database to find the location of items (which shelves they are on) to use the information to make the specific shopping routes for customers. Each shelf will have its own LED display so that the item name, pricing, and discounts can be changed remotely through the store’s web application.  

Our system will be designed to be scalable so that the user will be able to use the application at any Blitz-enabled grocery store. The mobile application will be aesthetically appealing, displaying product visuals and a comprehensive store map. We want to create a customizable system that benefits the shopper and the store. We want the shopper to be able to customize their shopping experience in the mobile application, and we want the store to be able to customize the shelving unit based on their specific needs and space requirements. We want this system to allow for efficient and enjoyable shopping and simplified store management.

## Quick Start

### Server

To start the server, pull the CPU folder onto a Raspberry Pi.  For our project, we use a Pi 3 Model B.  Then, install mySQL onto the Rapsberry Pi.  To install mySQL, use the following commands (full tutorial found at https://pimylifeup.com/raspberry-pi-mysql/):

- sudo apt update
- sudo apt upgrade
- sudo apt install mariadb-server
- sudo mysql_secure_installation (follow prompts)
- log in with sudo mysql -u root -p

To create the database and proper tables, log into the MariaDB interface and run the following commands:

- CREATE DATABASE store;
- USE store;
- CREATE TABLE shelves (ip VARCHAR(255), weight FLOAT);
- CREATE TABLE products (ip VARCHAR(255), weight FLOAT, count INT, price FLOAT, product VARCHAR(255));

Then, in CPU/server.js, edit lines 58-63 to match your username, password, and database name. 

Finally, run the server with node server.js.  If you are missing any libraries, run npm install --save "lib_name" to install the required libraries.  The server will run on port 3333, but you can easily change that by editing the PORT variable in the server.js file. 

To check inventory updates, log into the MariaDB interface and run SELECT statements on the "products" table

### Shelves

To calibrate the shelves, load Calibration_Sketch.ino (can be found in the ESP_Code folder in this directory) onto the ESP32. This sketch will instruct the user. Follow these instructions and determine the calibration factor. 

To setup the shelves with this calibration constant, load Final_Sketch.ino (can be found in the ESP_Code folder in this directory) and change the calibration constant to the calibration factor found using Calibration_Sketch.ino. Also, update the WIFI network name and password. Load this sketch onto the ESP32.

The shelves should now have accurate and stable weight readings and should be sending these weight readings via WIFI to the database.

Place grocery store items on the shelves and watch the inventory of these items update in the database.



