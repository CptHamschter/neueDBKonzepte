import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';

const authorize = roles => async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error();
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!roles.includes(user.role)) {
      return res.status(403).send({ error: 'Nicht genügend Rechte' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Bitte authentifizieren' });
  }
};

export default authorize;
