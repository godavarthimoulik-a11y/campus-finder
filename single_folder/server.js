require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const collegesRoutes = require('./routes/colleges');
const { db } = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

// Security & parsing
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Rate limiter
const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegesRoutes);

// Serve static site with caching for static assets
const staticDir = path.join(__dirname);
app.use(express.static(staticDir, {
  index: 'homepage.html',
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.min.css') || filePath.endsWith('.min.js') || filePath.endsWith('.css') || filePath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Basic health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
