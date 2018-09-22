// server.js
const net = require('net');
const fs = require('fs');
const port = 8124;
let seed = 0;
let targ = 0;
let ARRQ = require('./qa.json');
let FILES = [];
let connections = 0;
const log = fs.createWriteStream('client_id.txt');

const DEFAULT_DIR = process.env.DEFAULT_DIR;
const MAX_CONNECTIONS = parseInt(process.env.M_CONN);

const server = net.createServer((client) => {
	if (++connections === MAX_CONNECTIONS) client.destroy();

	client.id = Date.now() + seed++;
	client.setEncoding('utf8');

	console.log('[' + formatDate() + ']: ' +'Client #' + client.id + ' connected\n');
	log.write('[' + formatDate() + ']: ' +'Client #' + client.id + ' connected\n');

	client.on('data', (data) => {
		if ((data === 'NEXT') || (data === 'QA')) {
			if (data === 'NEXT') {
				FILES[client.id] = [];
                fs.mkdir(DEFAULT_DIR + path.sep + client.id);
			}
		}
        else if (client.id === undefined) {
            client.write(resBad);
            client.destroy();
        }

        if (clients[client.id] === 'QA' && data !== 'QA') {     	
		    let answr = "Bad answer";
		    if (Math.floor(Math.random() * 2) === 1) {
		    	let QID = -1;
	        	for (let i = 0; i < ARRQ.length; i++)
			        if (arr[i].question === data) {
			        	QID = i;
			        	break;
			        }
		    	answr = ARRQ[QID].g;
		    }
        	log.write('[' + formatDate() + '][#' + client.id + '] > Data: ' + data + '; Answer: ' + answr + '\n');
	        client.write(answr);	
	    } else if (clients[client.id] === 'FILES' && data !== 'FILES') {
            FILES[client.id].push(data);
            targ++;
            if (targ === 2) {
                let buf = Buffer.from(files[client.id][0], 'hex');
                let filePath = defaultDir + path.sep + client.id + path.sep + files[client.id][1];
                //console.log(filePath);
                let fr = fs.createWriteStream(filePath);
                fr.write(buf);
                targ = 0;
                files[client.id] = [];
                fr.close();
                client.write('FILES');
            }
        }
	});

	client.on('end', () => {
		connections--;
		console.log('[' + formatDate() + ']: ' +'Client #' + client.id + ' disconnected\n');
		log.write('[' + formatDate() + ']: ' +'Client #' + client.id + ' disconnected\n');
	});
});

server.listen(port, () => {
	console.log(`Server listening on localhost:${port}`);
});

function formatDate() {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}