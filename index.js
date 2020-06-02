const easymidi = require('easymidi');
const express = require('express')
const WebSocket = require('ws');
const app = express();
const webPort = 3000;
const socketPort = 3001;

/* Setting up Midi */
var virtualOutput = new easymidi.Output('PoseToMidi', true);


app.get('/', (req, res) => {
    res.redirect(301, '/index.html');
});

app.use(express.static('public'));
app.listen(webPort, () => console.log(`Example app listening at http://localhost:${webPort}`));

const wss = new WebSocket.Server({ port: socketPort });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        virtualOutput.send('cc', JSON.parse(message));
    });

    ws.send('something');
});