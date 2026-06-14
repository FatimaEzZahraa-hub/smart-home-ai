#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

#define DHTPIN 15
#define DHTTYPE DHT22

#define LED_PIN 13

DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "Wokwi-GUEST";
const char* password = "";

void setup() {

  Serial.begin(115200);

  pinMode(LED_PIN, OUTPUT);

  dht.begin();

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected");
}

void loop() {

  float temp = dht.readTemperature();

  Serial.print("Temperature: ");
  Serial.println(temp);

  // Envoi température au serveur
  if (WiFi.status() == WL_CONNECTED) {

    WiFiClient client;
    HTTPClient http;

    http.begin(client,
    "http://impeach-desktop-haven.ngrok-free.dev/temperature");

    http.addHeader("Content-Type", "application/json");

    String json =
      "{\"temperature\":" + String(temp) + "}";

    int code = http.POST(json);

    Serial.print("POST Temp: ");
    Serial.println(code);

    http.end();
  }

  // Lecture état lumière
  if (WiFi.status() == WL_CONNECTED) {

    WiFiClient client;
    HTTPClient http;

    http.begin(client,
    "http://impeach-desktop-haven.ngrok-free.dev/esp");

    int code = http.GET();

    if (code == 200) {

      String payload = http.getString();

      DynamicJsonDocument doc(256);
      deserializeJson(doc, payload);

      bool light = doc["light"];

      digitalWrite(
        LED_PIN,
        light ? HIGH : LOW
      );

      Serial.print("Light: ");
      Serial.println(light);
    }

    http.end();
  }

  delay(5000);
}