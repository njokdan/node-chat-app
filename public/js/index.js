var socket = io();

socket.on('connect', function() {
    console.log('Connected to the server ...');
});
socket.on('disconnect', function() {
    console.log('Disconnected from the server ...');
});
socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('H:mm:ss a');
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.html(`<span class="message-name">${message.from}</span> <span class="message-time">${formattedTime}:</span> ${message.text}`);
    jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('')
    })
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        // adding coords object in users position
        socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            // for creating location url
        socket.on('newLocationMessage', function(message) {
            var formattedTime = moment(message.createdAt).format('H:mm:ss a')
            var li = jQuery('<li></li>');
            var a = jQuery(`<a class="current-location" target="_blank">My current location</a>`);
            li.text(`${message.from} ${formattedTime}: `)
            a.attr('href', message.url);
            li.append(a);
            jQuery('#messages').append(li);
        })
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
})