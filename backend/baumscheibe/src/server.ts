import { app } from "./app";
import {createConnection} from "typeorm";
import {setDependency} from "./DI";
import {BaumscheibenService} from "./Service/BaumscheibenService";
import {BaumscheibenAccountService} from "./Service/BaumscheibenAccountService";
import {PictureService} from "./Service/PictureService";
import {VoteService} from "./Service/VoteService";
import {MessageService} from "./Service/MessageService";
(async () => {
// connect to database
    await createConnection();
    const port = process.env.APP_PORT || 3000;

    // DI
    setDependency("BaumscheibenAccountService", new BaumscheibenAccountService());

    setDependency("BaumscheibenService", new BaumscheibenService());
    setDependency("PictureService", new PictureService());
    setDependency("VoteService", new VoteService());
    setDependency("MessageService", new MessageService());

    const server = app.listen(port, () =>
        console.log(`Example app listening at http://localhost:${port}`)
    );
    server.on('connection', function(socket) {
        console.log("A new connection was made by a client.");
        socket.setTimeout(30 * 1000);
        // 30 second timeout. Change this as you see fit.
    });
    server.keepAliveTimeout = 30 * 1000;
    server.headersTimeout = 35 * 1000;
})();
