const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, 'db.sqlite');
const exists = fs.existsSync(dbPath);
const db = new sqlite3.Database(dbPath);

function runAsync(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err){
      if(err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function getAsync(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if(err) return reject(err);
      resolve(row);
    });
  });
}

function allAsync(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if(err) return reject(err);
      resolve(rows);
    });
  });
}

// Initialize schema
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password_hash TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS colleges (
    id INTEGER PRIMARY KEY,
    name TEXT,
    shortname TEXT,
    description TEXT,
    city TEXT,
    state TEXT,
    email TEXT,
    phone TEXT,
    website TEXT,
    gradient TEXT,
    streams TEXT,
    facilities TEXT,
    avg_rating REAL DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    college_id INTEGER,
    title TEXT,
    duration TEXT,
    annual_fee INTEGER,
    FOREIGN KEY(college_id) REFERENCES colleges(id) ON DELETE CASCADE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY,
    college_id INTEGER,
    author TEXT,
    rating INTEGER,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(college_id) REFERENCES colleges(id) ON DELETE CASCADE
  )`);

});

module.exports = { db, runAsync, getAsync, allAsync };
