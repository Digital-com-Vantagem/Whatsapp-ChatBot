const http = require('http');
const qrcode = require('qrcode');
const { Client } = require('whatsapp-web.js');
const client = new Client();

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Generate QR code and serve it within the HTML response
  client.on('qr', (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
      if (err) {
        console.error(err);
        res.end('Error generating QR code');
      } else {
        const htmlWithQR = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>WhatsApp QR Code</title>
            </head>
            <body>
              <h1>WhatsApp QR Code</h1>
              <img src="${url}" alt="QR Code" />
            </body>
          </html>
        `;
        res.end(htmlWithQR);
      }
    });
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  if (message.body === '!ping') {
    client.sendMessage(message.from, 'pong');
  }
});

client.initialize();
