require('dotenv').config();
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize database
const db = new sqlite3.Database(path.join(__dirname, 'db.sqlite'), (err) => {
  if (err) console.error('DB Error:', err);
  else console.log('Database connected');
});

// Middleware
app.use(express.json());
app.use(express.static(__dirname, { index: 'homepage.html' }));

// Helper functions
const getAsync = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => err ? reject(err) : resolve(row));
});

const allAsync = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows || []));
});

// API: Get all colleges
app.get('/api/colleges', async (req, res) => {
  try {
    const rows = await allAsync('SELECT id, name, shortname, city, state, avg_rating, reviews_count, gradient, streams FROM colleges ORDER BY avg_rating DESC, reviews_count DESC LIMIT 200');
    const data = rows.map(r => ({ ...r, streams: r.streams ? JSON.parse(r.streams) : [] }));
    res.json(data);
  } catch (err) {
    console.error('Error fetching colleges:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// API: Get college details
app.get('/api/colleges/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const college = await getAsync('SELECT * FROM colleges WHERE id = ?', [id]);
    if (!college) return res.status(404).json({ error: 'Not found' });
    
    const courses = await allAsync('SELECT * FROM courses WHERE college_id = ?', [id]);
    const reviews = await allAsync('SELECT * FROM reviews WHERE college_id = ? ORDER BY created_at DESC LIMIT 50', [id]);
    
    college.streams = college.streams ? JSON.parse(college.streams) : [];
    college.facilities = college.facilities ? JSON.parse(college.facilities) : [];
    
    res.json({ college, courses, reviews });
  } catch (err) {
    console.error('Error fetching college details:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// API: Submit review
app.post('/api/colleges/:id/reviews', async (req, res) => {
  try {
    const { author, rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating 1-5 required' });
    
    const id = req.params.id;
    db.run('INSERT INTO reviews (college_id, author, rating, comment) VALUES (?,?,?,?)', 
      [id, author || 'Anonymous', rating, comment || ''], 
      function(err) {
        if (err) return res.status(500).json({ error: 'Server error' });
        
        db.get('SELECT AVG(rating) as avg, COUNT(*) as cnt FROM reviews WHERE college_id = ?', [id], (err, stats) => {
          const avg = stats?.avg || 0;
          const cnt = stats?.cnt || 0;
          db.run('UPDATE colleges SET avg_rating=?, reviews_count=? WHERE id=?', [avg, cnt, id], () => {
            res.json({ success: true, avg_rating: avg, reviews_count: cnt });
          });
        });
      }
    );
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Visit: http://localhost:${PORT}/`);
});
