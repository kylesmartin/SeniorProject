#include "HX711.h"
#include <WiFi.h>
#include <WiFiUDP.h>

#define DOUT  19
#define CLK  18

HX711 scale;

float calibration_factor = -12000; // -12000 // -20800.0;

/* WiFi network name and password */
const char * ssid = "Blitz";
const char * pwd = "EC464Team7";

// IP address to send UDP data to.
// it can be ip address of the server or 
// a network broadcast address
// here is broadcast address
const char * udpAddress = "192.168.1.117";
const int udpPort = 3333;

float previousweight = 0;

//create UDP instance
WiFiUDP udp;


void setup() {

  Serial.begin(115200);
  WiFi.begin(ssid, pwd);
  scale.begin(DOUT, CLK);
  scale.set_scale();
  scale.tare(); // reset the scale to 0

  while (WiFi.status() != WL_CONNECTED) {
    //delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  udp.begin(udpPort);
 
    
} // end setup

void loop() {

  scale.set_scale(calibration_factor); // adjusted calibration factor  
  udp.beginPacket(udpAddress, udpPort);
  float weight = scale.get_units(10);
  String scalestringval = String(weight);
  if (abs(weight - previousweight) < 0.1) {
    udp.print(scalestringval);
    Serial.println(scalestringval);
  }
  //Serial.println(scalestringval);
  udp.endPacket();
  udp.parsePacket();

  previousweight = weight;
} // end loop
