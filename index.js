let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io")(server);

server.listen(3000);

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.use(express.static('public'));

users = [];
connections = [];

io.sockets.on('connection', function(socket) {
    console.log('Successfully connected');
    connections.push(socket);
    
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Successfully disconnected');
    });

    socket.on('Send message', function(data) {
        io.sockets.emit('Add message', {message: data.message, name: data.name, className: data.className});
    });
});

