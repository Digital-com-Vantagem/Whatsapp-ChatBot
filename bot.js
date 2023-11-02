const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const app = express();

client.on('qr', qr => {
    // Pass the QR code data to a route that will display it on a web page
    app.get('/qr', (req, res) => {
        res.send(`<img src="${qr}">`);
    });
});

client.on('ready', () => {
    console.log('Pronto!');
});

client.on('message', message => {
    if (message.body === '!ping') {
        client.sendMessage(message.from, 'pong');
    }
});

client.initialize();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
