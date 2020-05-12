#include "HX711.h"

#define DOUT  19
#define CLK  18

HX711 scale;

float previousweight = 0;

float calibration_factor = -12000; // (first scale); //-11000 (first scale); //-20800.0;

void setup() {

  Serial.begin(115200);
  scale.begin(DOUT, CLK);
  scale.set_scale();
  scale.tare(); // reset the scale to 0

} // end setup

void loop() {

  //scale.set_scale(calibration_factor); // adjusted calibration factor
  //String scalestringval = String(scale.get_units(5));
  //Serial.println(scalestringval); // weight in lbs

  scale.set_scale(calibration_factor); // adjusted calibration factor  
  //udp.beginPacket(udpAddress, udpPort);
  float weight = scale.get_units(10);
  String scalestringval = String(weight);
  if (abs(weight - previousweight) < 0.1) {
    //udp.print(scalestringval);
    Serial.println(scalestringval);
  }

  previousweight = weight;
  
   
} // end loop
