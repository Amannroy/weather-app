import express from 'express';
import './database.js';
import dotenv from 'dotenv';


dotenv.config();


const app = express();

const PORT = process.env.PORT || 3300;

app.get('/', (req, res) => {
    res.send("Hello");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})