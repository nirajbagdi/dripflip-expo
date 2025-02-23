import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.listen(PORT, () =>
    console.log(`HTTP Server running on http://localhost:${PORT}`)
);
