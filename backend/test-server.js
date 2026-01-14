import express from 'express';
import { REAL_UNIVERSITIES } from './src/data/universitiesData.js';

const app = express();
app.use(express.json());

app.get('/test', (req, res) => {
    console.log('Test endpoint called');
    res.json({ success: true, count: REAL_UNIVERSITIES.length });
});

app.listen(5000, () => {
    console.log('Test server on 5000');
});
