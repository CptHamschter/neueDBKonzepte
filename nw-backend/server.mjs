import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

dotenv.config();
const app = express();

app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); //MongoDB lokal oder cloudbasiert?

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));


