import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import con from '../database.js';
import dotenv from 'dotenv';

dotenv.config();

export const createUser = async (username, email, password) => {
    try {
        // Validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        // Validating password strength (e.g., at least 6 characters)
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into the database
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        await con.query(sql, [username, email, hashedPassword]);
        return "User created successfully";
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            throw new Error('Email already exists');
        } else {
            throw err;
        }
    }
};


export const loginUser = async(email, password) => {
    try {
        // Validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        // Preparing the SQL query
        const sql = "SELECT * FROM users WHERE email = ?";

        // Executing the query and waiting for the result
        const results = await con.query(sql, [email]);

        if(results.length === 0){
            throw new Error("User not found");
        }

        // Validating password
        const isPasswordValid = await bcrypt.compare(password, results[0]?.password);

        if(!isPasswordValid){
            throw new Error("Invalid credentials");
        }

        // Generating JWT token if credentials are valid
        const token = jwt.sign({id: results[0].id}, process.env.JWT_SECRET, {expiresIn: '1hr'});

        // Returning the token
        return token;
    }catch(err){
        throw err;
    }
};
