# Minecraft Server Handshake

Spoof a Minecraft server handshake and write a motd, fake online and max player count and minecraft version number that will show up within the Minecraft Client.

## Installation

`npm install minecraft-server-handshake`

## Usage

Sample call for port `8124`:

```javascript
import McServer from "minecraft-server-handshake";

const response = {
    "version": {
        "name": "1.19",
        "protocol": 759 //1.19 protocol
    },
    "players": {
        "max": 100,
        "online": 0
    },
    "description": {
        "text": "Minecraft Server Motd"
    },
    "favicon": "data:image/png;base64,<data>"
};

new McServer(8124, response);
```

## Information

- Fill in the correct protocol number for the Minecraft version you are using. [Find protocols here.](https://wiki.vg/Protocol_version_numbers)
- The favicon must be a PNG image that is Base64 encoded and exactly 64x64 pixels
- More information about the response can be found at [wiki.vg](https://wiki.vg/Server_List_Ping#Response)