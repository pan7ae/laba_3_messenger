var min = 1;
var max = 6;
var random = Math.floor(Math.random() * (max - min)) + min;

console.log("Client");

var alertClass;
switch (random) {
    case 1:
        alertClass = 'secondary';
        break;
    case 2:
        alertClass = 'danger';
        break;
    case 3:
        alertClass = 'success';
        break;
    case 4:
        alertClass = 'warning';
        break;
    case 5:
        alertClass = 'info';
        break;
    case 6:
        alertClass = 'light';
        break;
}


$(function () {
    var socket = io.connect();
    var $form = $("#messForm");
    var $textarea = $("#message");
    var $name = $("#name");
    var $all_messages = $("#all_mess");

    $form.submit(function (event) {
        event.preventDefault();
        socket.emit("Send message", { message: $textarea.val(), name: $name.val(), className: alertClass });
        $textarea.val('');
    });

    socket.on('Add message', function (data) {
        $all_messages.append("<div class='alert alert-" + data.className + "'><b>" + data.name + "</b>: " + data.message + "</div>")
    });
});