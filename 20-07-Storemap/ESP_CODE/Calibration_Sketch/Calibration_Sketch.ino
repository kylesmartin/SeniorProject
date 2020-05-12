#include "HX711.h"

#define DOUT  19
#define CLK  18

HX711 scale;

float calibration_factor = -12000; // -20800 correct calibration constant determined by using a quart of milk (2.15 lbs)

void setup() {
  Serial.begin(115200);
  Serial.println("HX711 Calibration Sketch");
  Serial.println("Please remove weight from scale");
  Serial.println("After readings begin, place known weight on scale");
  Serial.println("Press + or a to increase calibration factor");
  Serial.println("Press - or z to decrease calibration factor");
  
  scale.begin(DOUT, CLK);
  scale.set_scale();
  scale.tare(); // reset the scale to 0
  
  long zero_factor = scale.read_average(); // get a baseline reading
  Serial.print("Zero factor: "); // this can be used to remove the need to tare the scale
  Serial.println(zero_factor); // -2957804;
} // end setup

void loop() {

  scale.set_scale(calibration_factor); // adjusted calibration factor
  Serial.print("Reading: ");
  Serial.print(scale.get_units(10));
  Serial.print(" lbs"); // can change to kg
  Serial.print(" calibration_factor: ");
  Serial.print(calibration_factor);
  Serial.println();

  if(Serial.available()) // for adjusting calibration factor
  {
    char temp = Serial.read();
    if(temp == '+' || temp == 'a')
      calibration_factor += 100;
    else if(temp == '-' || temp == 'z')
      calibration_factor -= 100;
  }
}
