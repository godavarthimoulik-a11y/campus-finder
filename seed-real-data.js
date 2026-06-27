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
    description: 'Leading institute for engineering education and research',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    email: 'admissions@iitk.ac.in',
    phone: '+91-512-259-7777',
    website: 'https://www.iitk.ac.in',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    streams: 'Engineering, Technology, Research',
    facilities: 'Computing center, Gym, Library with digital resources'
  },
  {
    name: 'Delhi University',
    shortname: 'DU',
    description: 'Oldest university in India with 77 affiliated colleges',
    city: 'New Delhi',
    state: 'Delhi',
    email: 'webmaster@du.ac.in',
    phone: '+91-11-2721-1081',
    website: 'https://www.du.ac.in',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    streams: 'Arts, Science, Commerce, Law',
    facilities: 'Historic campuses, Sports grounds, Seminar halls'
  },
  {
    name: 'Jawaharlal Nehru University',
    shortname: 'JNU',
    description: 'Central university known for research and social sciences',
    city: 'New Delhi',
    state: 'Delhi',
    email: 'registrar@jnu.ac.in',
    phone: '+91-11-6704-6999',
    website: 'https://www.jnu.ac.in',
    gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    streams: 'Humanities, Social Sciences, Science, Languages',
    facilities: 'Research libraries, Auditorium, Cafeteria'
  },
  {
    name: 'Banaras Hindu University',
    shortname: 'BHU',
    description: 'Residential central university offering diverse programs',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    email: 'webmaster@bhu.ac.in',
    phone: '+91-542-2368-001',
    website: 'https://www.bhu.ac.in',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    streams: 'Engineering, Medicine, Arts, Science, Law',
    facilities: 'Hostels, Medical facilities, Sports complex'
  },
  {
    name: 'Presidency University Kolkata',
    shortname: 'Presidency',
    description: 'Historic liberal arts institution with excellence in academics',
    city: 'Kolkata',
    state: 'West Bengal',
    email: 'admissions@presiuniv.ac.in',
    phone: '+91-33-2241-2233',
    website: 'https://www.presiuniv.ac.in',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    streams: 'Arts, Science, Commerce',
    facilities: 'Heritage building, Seminar rooms, Library'
  },
  {
    name: 'Anna University',
    shortname: 'Anna University',
    description: 'Premier technological university in South India',
    city: 'Chennai',
    state: 'Tamil Nadu',
    email: 'registrar@annauniv.edu',
    phone: '+91-44-2235-8000',
    website: 'https://www.annauniv.edu',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    streams: 'Engineering, Technology',
    facilities: 'State-of-the-art labs, Design centers, Placement cell'
  },
  {
    name: 'Indian Institute of Science',
    shortname: 'IISc',
    description: 'Premier research institution offering postgraduate programs',
    city: 'Bangalore',
    state: 'Karnataka',
    email: 'admissions@iisc.ac.in',
    phone: '+91-80-2293-3000',
    website: 'https://www.iisc.ac.in',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    streams: 'Research, Engineering, Science',
    facilities: 'Research labs, Computing facilities, Hostels'
  }
];

const coursesData = [
  { college_id: 1, title: 'B.Tech in Computer Science', duration: '4 years', annual_fee: 8000 },
  { college_id: 1, title: 'M.Tech in AI & ML', duration: '2 years', annual_fee: 12000 },
  { college_id: 2, title: 'B.Tech in Mechanical Engineering', duration: '4 years', annual_fee: 8000 },
  { college_id: 2, title: 'MBA', duration: '2 years', annual_fee: 25000 },
  { college_id: 3, title: 'B.Tech in Electronics', duration: '4 years', annual_fee: 8000 },
  { college_id: 3, title: 'Ph.D in Engineering', duration: '5-6 years', annual_fee: 0 },
  { college_id: 4, title: 'B.Tech in Civil Engineering', duration: '4 years', annual_fee: 8000 },
  { college_id: 5, title: 'B.A in English', duration: '3 years', annual_fee: 5000 },
  { college_id: 5, title: 'B.Sc in Physics', duration: '3 years', annual_fee: 5500 },
  { college_id: 6, title: 'M.A in Political Science', duration: '2 years', annual_fee: 8000 },
  { college_id: 7, title: 'B.Tech in Biotechnology', duration: '4 years', annual_fee: 9000 },
  { college_id: 8, title: 'B.A Honours in Economics', duration: '3 years', annual_fee: 6000 },
  { college_id: 9, title: 'B.E in Electrical Engineering', duration: '4 years', annual_fee: 8500 },
  { college_id: 10, title: 'M.Sc in Physics', duration: '2 years', annual_fee: 10000 }
];

const reviewsData = [
  { college_id: 1, author: 'Raj Kumar', rating: 5, comment: 'Excellent infrastructure and world-class faculty. Great placement opportunities.' },
  { college_id: 1, author: 'Priya Singh', rating: 4, comment: 'Good academic environment but hostel facilities could be better.' },
  { college_id: 2, author: 'Amit Patel', rating: 5, comment: 'Amazing campus life and industry collaborations. Highly recommended!' },
  { college_id: 3, author: 'Sarah Khan', rating: 4, comment: 'Great research opportunities and supportive faculty.' },
  { college_id: 4, author: 'Vikram Sharma', rating: 5, comment: 'Best engineering education in the country. Worth the effort.' },
  { college_id: 5, author: 'Anjali Verma', rating: 4, comment: 'Historic campus with good academic programs. Perfect for humanities students.' },
  { college_id: 6, author: 'Rohit Gupta', rating: 4, comment: 'Excellent for research in social sciences. Great library resources.' },
  { college_id: 7, author: 'Meera Nath', rating: 5, comment: 'Beautiful campus in Varanasi. Diverse academic offerings.' },
  { college_id: 8, author: 'Arjun Desai', rating: 4, comment: 'Quality education with strong emphasis on critical thinking.' },
  { college_id: 9, author: 'Neha Singh', rating: 5, comment: 'Top-notch engineering programs with excellent placements.' },
  { college_id: 10, author: 'Akshay Reddy', rating: 5, comment: 'Premier research institution with world-class facilities.' }
];

async function seedDatabase() {
  try {
    console.log('Seeding database with real college data...');

    // Clear existing data
    await runAsync('DELETE FROM reviews');
    await runAsync('DELETE FROM courses');
    await runAsync('DELETE FROM colleges');

    // Insert colleges
    console.log('Inserting colleges...');
    for (const college of collegesData) {
      const streamsJson = JSON.stringify([college.streams]);
      const facilitiesJson = JSON.stringify([college.facilities]);
      await runAsync(
        `INSERT INTO colleges (name, shortname, description, city, state, email, phone, website, gradient, streams, facilities)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [college.name, college.shortname, college.description, college.city, college.state, 
         college.email, college.phone, college.website, college.gradient, streamsJson, facilitiesJson]
      );
    }

    // Insert courses
    console.log('Inserting courses...');
    for (const course of coursesData) {
      await runAsync(
        `INSERT INTO courses (college_id, title, duration, annual_fee) VALUES (?, ?, ?, ?)`,
        [course.college_id, course.title, course.duration, course.annual_fee]
      );
    }

    // Insert reviews
    console.log('Inserting reviews...');
    for (const review of reviewsData) {
      await runAsync(
        `INSERT INTO reviews (college_id, author, rating, comment) VALUES (?, ?, ?, ?)`,
        [review.college_id, review.author, review.rating, review.comment]
      );
    }

    // Update average ratings
    console.log('Updating average ratings...');
    const colleges = await allAsync('SELECT id FROM colleges');
    for (const college of colleges) {
      const ratingData = await allAsync(
        'SELECT AVG(rating) as avg_rating, COUNT(*) as count FROM reviews WHERE college_id = ?',
        [college.id]
      );
      const avgRating = ratingData[0]?.avg_rating || 0;
      const reviewsCount = ratingData[0]?.count || 0;
      await runAsync(
        'UPDATE colleges SET avg_rating = ?, reviews_count = ? WHERE id = ?',
        [avgRating, reviewsCount, college.id]
      );
    }

    console.log('✅ Database seeded successfully!');
    console.log(`✅ Inserted ${collegesData.length} colleges`);
    console.log(`✅ Inserted ${coursesData.length} courses`);
    console.log(`✅ Inserted ${reviewsData.length} reviews`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
