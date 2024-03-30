import express from 'express';
import User from '../models/user.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

//Reg
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'E-Mail wird bereits verwendet.' });
    }

    const user = new User({ email, password });
    console.log(user);
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});//wird weitergeleitet zur Mainpage (weil token)

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password})
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send({ error: 'Login fehlgeschlagen' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: 'Ein Fehler ist aufgetreten' });
  }
});

export default router;



