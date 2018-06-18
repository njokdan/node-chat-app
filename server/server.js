const path = require('path');
// need to configure express to work with this so that
// we can add socket.io support.
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public/');
const app = express();
// http used behind the scenes for Express. When we call
// app.listen, it calls the http method, passing
// in app as the argument for createServer(); http is
// integrated so much that you can just provide app as
// the arg.
const server = http.createServer(app);
// have access to socket.io http server via server variable. 
// we get back a websockets server. Now we can do anything
// we want in terms of emitting or listening to events.
// This is how we are going to communicate between server
// and client.
const io = socketIO(server);
app.use(express.static(publicPath));
//lets you register event listener
io.on('connection', (socket) => {
    console.log('New user connected ...');

    //socket.broadcast.emit from Admin text Welcome to chattrbox
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chattrbox!'));

    //socket.broadcast.emit from Admin text New user joined chat!
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user just joined chat!'));
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    })
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
    })

    socket.on('disconnect', function() {
        console.log('Disconnected from server ...');
    })
})

// use HTTP server instead of Express server beause of socket.io
server.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
})