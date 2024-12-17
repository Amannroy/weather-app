import mysql from 'mysql';
import dotenv from 'dotenv';


dotenv.config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

// Connecting to database
con.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        throw err;
    }
    console.log("Connected to the database");

    // Create the database if it doesn't exist
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``;

    con.query(createDatabaseQuery,(err, result) => {
        if (err) {
            console.error("Error creating database:", err);
            throw err;
        }
        console.log("Database is ready to use.");
    })
})

export default con;