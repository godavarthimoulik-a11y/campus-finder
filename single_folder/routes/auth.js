const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAsync, runAsync } = require('../db');
require('dotenv').config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'adminpass'; // instruct user to change
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// Ensure admin user exists in DB (hashed)
(async function ensureAdminUser(){
  try{
    const row = await getAsync('SELECT * FROM admins WHERE username = ?', [ADMIN_USERNAME]);
    if(!row){
      const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await runAsync('INSERT INTO admins (username, password_hash) VALUES (?,?)', [ADMIN_USERNAME, hash]);
      console.log('Admin user created:', ADMIN_USERNAME);
    }
  }catch(err){
    console.error('Error ensuring admin user', err);
  }
})();

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if(!username || !password) return res.status(400).json({ error: 'username and password required' });
  try{
    const admin = await getAsync('SELECT * FROM admins WHERE username = ?', [username]);
    if(!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, admin.password_hash);
    if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
