import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.mjs';
import postRoutes from './routes/posts.mjs';

dotenv.config();
const app = express();

app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/NachrichtenpageScharle');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 27017;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));


