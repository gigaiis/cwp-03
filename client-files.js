const net = require('net');
const fs = require('fs');
const path = require('path');
const port = 8124;
const dirs = process.argv;
const client = new net.Socket();

let ARRFILES = [];

client.setEncoding('utf8');
client.connect(port, () => {
    client.write('FILES');
});

client.on('data', (data) => {
    console.log(data);
    
});

client.on('close', function () {
    console.log('Connection closed');
});