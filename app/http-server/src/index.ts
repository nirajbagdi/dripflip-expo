import express from 'express';

import { router } from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () =>
    console.log(`HTTP Server running on http://localhost:${PORT}`)
);
