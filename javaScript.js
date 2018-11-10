
$(document).ready(function () {
    $('#myModal').modal('show');
});

// make connection on client side
var sockets = io.connect('http://localhost:3000');

var handle = document.getElementById('handle');
var message = document.getElementById('message');
var output = document.getElementById('output');
var btn = document.getElementById('submit');
var typing = document.getElementById('typing');

//functionality of btn
btn.onclick = function () {
    sockets.emit('chat', {
        message: message.value,
        handle: handle.value
    });

    message.value = "";
}

//to braodacast typing msg
message.onkeypress = function () {
    sockets.emit('typing', handle.value);
};

sockets.on('typing', function (data) {

    if (data[0] == data[0].toLowerCase()) {
        data = data[0].toUpperCase() + data.slice(1);
    }
    typing.innerHTML = '<span>' + data + ' is typing a message....</span>';
});

//to output data on screen
sockets.on('chat', function (data) {
    typing.innerHTML = '';

    if (data.handle[0] == data.handle[0].toLowerCase()) {
        data.handle = data.handle[0].toUpperCase() + data.handle.slice(1);
    }
    if (data.message[0] == data.message[0].toLowerCase()) {
        data.message = data.message[0].toUpperCase() + data.message.slice(1);
    }
    output.innerHTML += '<p><strong><i>' + data.handle + ': </i></strong>' + data.message + '</p>';
    message.value = '';
});