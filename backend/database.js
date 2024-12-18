import mysql from "mysql";
import dotenv from "dotenv";
import { promisify } from "util";

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Promisify the query method
con.query = promisify(con.query);

const initializeDatabase = () => {
  con.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      throw err;
    }
    console.log("Connected to the database.");

    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``;
    con.query(createDatabaseQuery, (err) => {
      if (err) {
        console.error("Error creating database:", err);
        throw err;
      }
      console.log("Database is ready to use.");

      const useDatabaseQuery = `USE \`${process.env.DB_NAME}\``;
      con.query(useDatabaseQuery, (err) => {
        if (err) {
          console.error("Error selecting database:", err);
          throw err;
        }
        console.log("Using database:", process.env.DB_NAME);

        const createUsersTable = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
          );
        `;
        con.query(createUsersTable, (err) => {
          if (err) {
            console.error("Error creating users table:", err);
            throw err;
          }
          console.log("Users table created or already exists.");

          const createWeatherSearchesTable = `
            CREATE TABLE IF NOT EXISTS weather_searches (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              city VARCHAR(255) NOT NULL,
              weather_info TEXT NOT NULL,
              search_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(id)
            );
          `;
          con.query(createWeatherSearchesTable, (err) => {
            if (err) {
              console.error("Error creating weather_searches table:", err);
              throw err;
            }
            console.log("Weather searches table created or already exists.");
          });
        });
      });
    });
  });
};

initializeDatabase();

export default con;
