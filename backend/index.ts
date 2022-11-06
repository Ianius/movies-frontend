import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Express + typescript server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});