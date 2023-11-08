const http = require('http');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Pronto!');
});

client.on('message', message => {
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'pong');
	}
});

client.initialize();

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Server is running...');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000...');
});
