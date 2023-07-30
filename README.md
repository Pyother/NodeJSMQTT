# NodeJS and MQTT broker communication 

This is a Node.js project that creates a web-based dashboard for the Area Explorer system. The dashboard displays measurements received from an MQTT broker and allows users to visualize and analyze the data.

## Getting started

To run application clone this repository, install neccessary dependecies in the package.json directory and run application:
This is a Node.js project that creates a web-based dashboard for the Area Explorer system. The dashboard displays measurements received from an MQTT broker and allows users to visualize and analyze the data.

```node
npm install
node app
```
Application will available at: `localhost:3000`.

Then run the MQTT broker (mosquitto) on your host by typing basic publish command. 

For UNIX platforms:

```sh
mosquitto_pub -t 'measurement' -m '0 0 0 0 0 0 0 0 0 0 0'
```

For Windows platforms:
```powershell
.\mosquitto_pub -t 'measurement' -m '0 0 0 0 0 0 0 0 0 0 0'
```


The string of characters in the message above represents each measurement: 

```
0° 30° 60° 90° 120° 150° 180° Position_X Position_Y Density Time
↓   ↓   ↓   ↓   ↓    ↓    ↓       ↓          ↓         ↓      ↓
0   0   0   0   0    0    0       0          0         0      0   
```

After publishing correct message table on the site should be filled with typed values. 




