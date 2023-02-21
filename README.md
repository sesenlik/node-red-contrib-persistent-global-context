# node-red-contrib-persistent-global-context

A <a href="http://nodered.org" target="_new">Node-RED</a> Node that writes all data stored in Global Context to a to local filesystem to keep program data between Node-Red instance deployments and restarts.

## Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-persistent-global-context

## Usage

* This node will save the Global Context data into a local file when it receives input. 
* So user must define the frequency of local data storage by adjusting the frequency of trigger sent to the node.

## Example Flow

[{"id":"062d6b7526c1c316","type":"persistent-global-context","z":"2d2bad85f9c458c5","x":510,"y":280,
"wires":[]},{"id":"01d5b21fa1056c7e","type":"inject","z":"2d2bad85f9c458c5","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],
"repeat":"0.1","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":250,"y":280,"wires":[["062d6b7526c1c316"]]}]