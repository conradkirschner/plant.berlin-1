module.exports = {
   "type": "postgres",
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   "synchronize": true,
   "logging": false,
   "entities": ["./build/src/Entity/**/*.js"],
   "migrations": ["./build/src/Migration/**/*.js"],
   "subscribers": ["./build/src/Subscriber/**/*.js"],
   "cli": {
      "entitiesDir": "src/Entity",
      "migrationsDir": "src/Migration",
      "subscribersDir": "src/Subscriber"
   }
};
