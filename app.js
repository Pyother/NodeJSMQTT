const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mqtt = require("mqtt");

// Ustawienia MQTT
const brokerUrl = "mqtt://localhost"; // Lokalny adres brokera MQTT
const topic = "topic";

// Połączenie z brokerem MQTT
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(topic);
});

// Przechowywanie odebranych wiadomości
const messages = [];

// Obsługa wiadomości MQTT
client.on("message", (topic, message) => {
  console.log(`Received message on topic: ${topic}`);
  console.log(`Message: ${message.toString()}`);
  
  // Dodaj wiadomość do tablicy
  messages.push({
    topic: topic,
    message: message.toString()
  });
});

// Ustawienie EJS jako widoku
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// Ustawienie ścieżki dla plików statycznych
app.use(express.static(path.join(__dirname, 'public')));

// Routing dla strony głównej
app.get('/', (req, res) => {
  res.render('index', { messages: messages }); // Przekazanie tablicy messages do widoku
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Area Explorer Dashboard listening on port ${port}`);
});