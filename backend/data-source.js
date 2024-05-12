const { createConnection } = require("typeorm");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const AppDataSource = createConnection({
  type: "mariadb",
  port: process.env.DB_MARIA_PORT,
  host: process.env.DB_MARIA_HOST,
  username: process.env.DB_MARIA_USER,
  password: process.env.DB_MARIA_PASSWORD,
  database: process.env.DB_MARIA_DB,
  entities: ['./entity/**'],
  synchronize: true,
});

module.exports = AppDataSource;
