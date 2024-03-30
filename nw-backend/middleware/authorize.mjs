import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';

const authorize = roles => async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Kein Autorisierungsheader');
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!roles.includes(decoded.role)) {
      return res.status(403).send({ error: 'Nicht genügend Rechte' });
    }

    req.user = { _id: decoded.userId, role: decoded.role };
    console.log(decoded.role);
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Bitte authentifizieren' });
  }
};

export default authorize;
