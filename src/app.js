import express from 'express';
import { connectDB } from './config/db';

const app = express()
const port = 3000


//MiddleWare


//Connect DB
connectDB('mongodb://localhost:27017/my_db');



//Routes

app.get('/', (req, res) => {
    return res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Website listening at http://localhost:${port}`);
});