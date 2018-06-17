var socket = io();
socket.on('connect', function() {
    console.log('Connected to the server ...');
    socket.emit('createEmail', {
        to: 'interglobalmedia@gmail.com',
        text: 'Hey! This is Andrew.'
    });
});
socket.on('newEmail', function(email) {
    console.log('NewEmail', email);
})
socket.on('createEmail', function(newEmail) {
    console.log('createEmail', newEmail);
})
socket.on('disconnect', () => {
    console.log('Disconnected from the server ...');
});