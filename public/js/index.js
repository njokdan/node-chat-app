var socket = io();
socket.on('connect', function() {
    console.log('Connected to the server ...');
});
socket.emit('createMessage', {
    from: 'Andrew',
    text: 'Yup. That works for me!'
});
socket.on('newMessage', function(message) {
    console.log('newMessage', message);
})
socket.on('disconnect', () => {
    console.log('Disconnected from the server ...');
});