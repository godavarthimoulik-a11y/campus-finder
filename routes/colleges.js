const express = require('express');
const router = express.Router();
const { allAsync, getAsync, runAsync } = require('../db');
const { ensureAdmin } = require('../middleware/auth');

// List colleges with optional search and filters
router.get('/', async (req, res) => {
  try{
    const q = (req.query.q || '').trim();
    let sql = 'SELECT id, name, shortname, city, state, avg_rating, reviews_count, gradient, streams FROM colleges';
    const params = [];
    if(q){
      sql += ' WHERE name LIKE ? OR shortname LIKE ? OR city LIKE ? OR streams LIKE ?';
      const like = `%${q}%`;
      params.push(like, like, like, like);
    }
    sql += ' ORDER BY avg_rating DESC, reviews_count DESC LIMIT 200';
    const rows = await allAsync(sql, params);
    res.json(rows.map(r=>({ ...r, streams: r.streams ? JSON.parse(r.streams) : [] })));
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a college by ID
router.get('/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const college = await getAsync('SELECT * FROM colleges WHERE id = ?', [id]);
    if(!college) return res.status(404).json({ error: 'Not found' });
    college.streams = college.streams ? JSON.parse(college.streams) : [];
    college.facilities = college.facilities ? JSON.parse(college.facilities) : [];
    const courses = await allAsync('SELECT * FROM courses WHERE college_id = ?', [id]);
    const reviews = await allAsync('SELECT * FROM reviews WHERE college_id = ? ORDER BY created_at DESC LIMIT 50', [id]);
    res.json({ college, courses, reviews });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new college (admin)
router.post('/', ensureAdmin, async (req, res) => {
  try{
    const payload = req.body;
    const streams = JSON.stringify(payload.streams || []);
    const facilities = JSON.stringify(payload.facilities || []);
    const result = await runAsync(`INSERT INTO colleges (name, shortname, description, city, state, email, phone, website, gradient, streams, facilities) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [payload.name, payload.shortname, payload.description, payload.city, payload.state, payload.email, payload.phone, payload.website, payload.gradient, streams, facilities]);
    const id = result.lastID;
    // insert courses if provided
    if(Array.isArray(payload.courses)){
      for(const c of payload.courses){
        await runAsync('INSERT INTO courses (college_id, title, duration, annual_fee) VALUES (?,?,?,?)', [id, c.title, c.duration, c.annual_fee || 0]);
      }
    }
    const created = await getAsync('SELECT * FROM colleges WHERE id = ?', [id]);
    res.status(201).json({ created });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update college (admin)
router.put('/:id', ensureAdmin, async (req, res) => {
  try{
    const id = req.params.id;
    const payload = req.body;
    const streams = JSON.stringify(payload.streams || []);
    const facilities = JSON.stringify(payload.facilities || []);
    await runAsync(`UPDATE colleges SET name=?, shortname=?, description=?, city=?, state=?, email=?, phone=?, website=?, gradient=?, streams=?, facilities=? WHERE id=?`, [payload.name, payload.shortname, payload.description, payload.city, payload.state, payload.email, payload.phone, payload.website, payload.gradient, streams, facilities, id]);
    // For simplicity, do not update courses here (could be implemented separately)
    const updated = await getAsync('SELECT * FROM colleges WHERE id = ?', [id]);
    res.json({ updated });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete college (admin)
router.delete('/:id', ensureAdmin, async (req, res) => {
  try{
    const id = req.params.id;
    await runAsync('DELETE FROM colleges WHERE id = ?', [id]);
    res.json({ success: true });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit review
router.post('/:id/reviews', async (req, res) => {
  try{
    const id = req.params.id;
    const { author, rating, comment } = req.body;
    if(!rating || rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating 1-5 required' });
    await runAsync('INSERT INTO reviews (college_id, author, rating, comment) VALUES (?,?,?,?)', [id, author || 'Anonymous', rating, comment || '']);
    // update average rating and count
    const stats = await getAsync('SELECT AVG(rating) as avg, COUNT(*) as cnt FROM reviews WHERE college_id = ?', [id]);
    const avg = stats.avg || 0;
    const cnt = stats.cnt || 0;
    await runAsync('UPDATE colleges SET avg_rating=?, reviews_count=? WHERE id=?', [avg, cnt, id]);
    res.json({ success: true, avg_rating: avg, reviews_count: cnt });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
