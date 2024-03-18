import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Überprüfen, ob die E-Mail bereits verwendet wird
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'E-Mail wird bereits verwendet.' });
    }

    const user = new User({ username, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body; // login kann entweder Benutzername oder E-Mail sein
  try {
    const user = await User.findOne({
      $or: [{ username: login }, { email: login }]
    });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Anmeldefehler');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Anmeldefehler' });
  }
});

export default router;



