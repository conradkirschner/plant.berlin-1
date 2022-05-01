import { app } from "./app";

const port = process.env.APP_PORT || 3000;

var server = app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
server.on('connection', function(socket) {
    console.log("A new connection was made by a client.");
    socket.setTimeout(30 * 1000);
    // 30 second timeout. Change this as you see fit.
});
server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;
