const { db, runAsync, allAsync } = require('./db');

const collegesData = [
  {
    name: 'Indian Institute of Technology Delhi',
    shortname: 'IIT Delhi',
    description: 'Premier engineering institute, consistently ranked among top universities in India',
    city: 'New Delhi',
    state: 'Delhi',
    email: 'admissions@iitd.ac.in',
    phone: '+91-11-2659-1001',
    website: 'https://www.iitd.ac.in',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    streams: 'Engineering, Research',
    facilities: 'World-class laboratories, Sports complex, Wi-Fi campus'
  },
  {
    name: 'Indian Institute of Technology Bombay',
    shortname: 'IIT Bombay',
    description: 'Top-ranked engineering university with strong industry connections',
    city: 'Mumbai',
    state: 'Maharashtra',
    email: 'admissions@iitb.ac.in',
    phone: '+91-22-2576-7000',
    website: 'https://www.iitb.ac.in',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    streams: 'Engineering, Management, Research',
    facilities: 'Advanced computing labs, Hostels, Placement opportunities'
  },
  {
    name: 'Indian Institute of Technology Madras',
    shortname: 'IIT Madras',
    description: 'Prestigious institute known for research and innovation',
    city: 'Chennai',
    state: 'Tamil Nadu',
    email: 'admissions@iitm.ac.in',
    phone: '+91-44-2257-1000',
    website: 'https://www.iitm.ac.in',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    streams: 'Engineering, Research, Consultancy',
    facilities: 'Modern laboratories, Workshops, Research centers'
  },
  {
    name: 'Indian Institute of Technology Kanpur',
    shortname: 'IIT Kanpur',
...truncated for brevity...
