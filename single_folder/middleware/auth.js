const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_SECRET || 'dev_secret_change_me';

function ensureAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ error: 'Missing authorization header' });
  const parts = auth.split(' ');
  if(parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid auth format' });
  const token = parts[1];
  try{
    const payload = jwt.verify(token, secret);
    req.admin = payload;
    next();
  }catch(err){
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { ensureAdmin };
