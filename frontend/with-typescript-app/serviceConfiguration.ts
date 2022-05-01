export const serviceMap = {
    BaumscheibenService: {
        name: 'baumscheibe',
        server: process.env.BAUMSCHEIBEN_SERVICE_SERVER,
    },
    UserService: {
        name: 'user',
        server: process.env.USER_SERVICE_SERVER,
    },
    TileService: {
        name: 'tiles',
        server: process.env.TILES_SERVICE_SERVER,
    }
};
