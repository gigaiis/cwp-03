const net = require('net');
const fs = require('fs');
const path = require('path');
const port = 8124;
const dirs = process.argv;
const client = new net.Socket();

let ARRFILES = [];

client.setEncoding('utf8');

process.argv.slice(2).forEach((dir) => {
    LOAD_ALL_FILES(dir);
});

function LOAD_ALL_FILES(dir) {
    fs.readdir(dir, (err, files) => {
        files.forEach((file) => {
            file = dir + path.sep + file;
            fs.lstat(file, (err, stats) => {
                if (stats.isFile()) ARRFILES.push(file);
                else LOAD_ALL_FILES(file);
            })
        });
    });
}

client.connect(port, () => {
    client.write('FILES');
});

client.on('data', (data) => {
    console.log(data);
    
});

client.on('close', function () {
    console.log('Connection closed');
});