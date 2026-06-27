const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const fs = require('fs');
// messages persisted to messages.json in this folder
const DATA_FILE = path.join(__dirname, 'messages.json');
let messages = [];
try{
  if(fs.existsSync(DATA_FILE)){
    const raw = fs.readFileSync(DATA_FILE, 'utf8') || '[]';
    messages = JSON.parse(raw);
  }
}catch(err){
  console.error('Failed to read messages file:', err);
  messages = [];
}

app.post('/api/contact', (req, res) => {
  const {name, email, message} = req.body || {};
  if(!name || name.length < 2) return res.status(400).json({message: 'Name is required.'});
  if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({message:'Valid email required.'});
  if(!message || message.length < 5) return res.status(400).json({message:'Message is too short.'});
  const entry = {id: messages.length+1, name, email, message, receivedAt: new Date().toISOString()};
  messages.push(entry);
  // persist to disk (best-effort)
  fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), (err) => {
    if(err) console.error('Failed to save message:', err);
  });
  console.log('New message:', entry);
  res.json({message: 'Message received and saved (demo).'});
});

// endpoint to list messages (demo only)
app.get('/api/messages', (req,res)=>{
  res.json({count: messages.length, messages});
});

// Serve static site files from this folder
app.use('/', express.static(path.join(__dirname)));

app.listen(PORT, ()=>{
  console.log(`Deliverable site server running on http://localhost:${PORT}`);
});
