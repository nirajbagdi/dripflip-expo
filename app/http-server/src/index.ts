import express from 'express';
import cors from 'cors';
import { router } from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors()); // Add this line before other middleware
app.use(express.json());

app.use('/api', router);

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});
