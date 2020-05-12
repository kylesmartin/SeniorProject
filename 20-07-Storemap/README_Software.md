# Software

The software for our project is dispersed across three folders: ESP_CODE, CPU, and WebApp.  The ESP_CODE folder contains the Arduino sketch used to calibrate the shelf, connect to Wifi, and emit weight readings.  The CPU folder contains the node.js server file ran on the Raspberry Pi to recieve readings from the shelves and update item counts.  The WebApp folder contains the code for the application.

## ESP_CODE

Calibration_Sketch.ino provides instructions for determining the calibration factor of the load cells. Calibration_Sketch.ino should be utilized to determine the calibration factor of the load cells. This calibration factor should be inputted into the Final_Sketch.ino. Final_Sketch.ino should be loaded onto the ESP32 of each smart shelving unit. This sketch determines the weight of the shelf using the HX711 library in the Arduino IDE. Once the readings are stable (when the change in weight between readings is less than 0.05lbs: abs(weight - previousweight) < 0.05) the ESP32 sends the readings to the database through WIFI. This is done by specifying the WIFI network name and password:

const char * ssid = "Blitz";
const char * pwd = "EC464Team7";

and by creating a UDP instance:

const char * udpAddress = "192.168.1.117";
const int udpPort = 3333;

WiFiUDP udp;

When the abs(weight - previousweight) < 0.05, we send the reading via a udp instance: udp.print(scalestringval);

All of the files within the ESP_Code folder are Arduino (.ino) files. These files can be compiled and uploaded to the ESP32 for use. Any of these testing sketches can be uploaded onto the ESP32 for calibration or testing. Once Final_Sketch.ino is loaded onto the ESP32, the shelf should be fully functioning.

## CPU 

The main server file is server.js.  The file is divided into 5 sections: "Modules", "API Endpoints", "SQL Connection", "Socket Message Reader", and "Host, Socket, and Express Initializations".

The modules section imports any required libraries, applies JSON and URL parsers to the express variable, and defines the ip address and the port.

The API endpoints section declares the update and ping functions, which are required to communicate with the application.  This section is unfinished.

The SQL connection section establishes a connection the the database as the root user.  

The socket message reader contains the item-update algorithm that runs every time a UDP message is recieved.  The algorithm steps are as follows:

1. Load previous shelf weight from shelves table using SELECT sql statement
2. Calculate the absolute value of the difference between old shelf weight and new shelf weight and assign to delta 
3. Store the sign of delta
4. Calculate the absolute value of the difference between the weight of each item on the shelf and delta and assign the result    to the item’s error
5. If the minimum error is greater than |0-delta|, then assume no item was added 
6. If the minimum error is less than |0-delta|, then predict that the item with the minimum error was added or removed,          depending on the sign of delta
7. Update the count of the predicted item in the database unless the item was deemed to be removed and the count of that item    is already at zero	

The iniitializations section starts the server on the declared port.

To start the server, follow the following procedure:

Install mySQL onto the Rapsberry Pi. To install mySQL, use the following commands (full tutorial found at https://pimylifeup.com/raspberry-pi-mysql/):

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

Finally, run the server with node server.js. If you are missing any libraries, run npm install --save "lib_name" to install the required libraries. The server will run on port 3333, but you can easily change that by editing the PORT variable in the server.js file.

## WebApp

Frontend: The frontend was created using the Angular framework. The Material Design standard components were used to create a appealing and uniform theme over the whole application.  

Backend: The backend was hosted as a Node.JS application. The backend was the backbone that conjoined all other components. All SQL traffic, shelf communication, and frontend api requests were done through the Node.JS server.

Deployment: The three key components (Angular, Node, and SQL) where all deployed in a single Kubernetes pod using 3 separate containers. This allowed a shared network between all the major components, easy building/destroying of resources, and fast scalability. The Pod has a single IP with a few open ports for outside communication. 
