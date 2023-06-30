const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mqtt = require("mqtt");

// MQTT settings
const brokerUrl = "mqtt://localhost"; 
const topic = "measurement";

// Connection with MQTT broker
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(topic);
});

// Storing messages
const messages = [];

// Handling MQTT messages
client.on("message", (topic, message) => {
  console.log(`Received message on topic: ${topic}`);
  console.log(`Message: ${message.toString()}`);

  const resultArray = splitStringBySpace(message.toString());
  console.log(resultArray);

  if (topic === topic) {
    messages.push({
      degree0: resultArray[0],
      degree30: resultArray[1],
      degree60: resultArray[2],
      degree90: resultArray[3],
      degree120: resultArray[4],
      degree150: resultArray[5],
      degree180: resultArray[6],
      positionx: resultArray[7],
      positiony: resultArray[8],
      density: resultArray[9],
      time: resultArray[10],
      message: message.toString()
    });
  }

});

// Setting ejs as a view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// Setting path for the staticfiles
app.use(express.static(path.join(__dirname, 'public')));

// Routing for main page
app.get('/', (req, res) => {
  res.render('index', { messages: messages }); // Set messages to the view
});

// Run the server
app.listen(port, () => {
  console.log(`Area Explorer Dashboard listening on port ${port}`);
});


function splitStringBySpace(str) {
  const result = [];

  let currentVar = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    if (char === ' ') {
      if (currentVar !== '') {
        result.push(currentVar);
        currentVar = '';
      }
    } else {
      currentVar += char;
    }
  }
  if (currentVar !== '') {
    result.push(currentVar);
  }

  return result;
}