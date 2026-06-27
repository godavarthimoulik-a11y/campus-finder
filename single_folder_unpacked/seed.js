const { runAsync, allAsync, getAsync } = require('./db');

const cities = ['Mumbai','Delhi','Bengaluru','Chennai','Kolkata','Hyderabad','Pune','Ahmedabad','Lucknow','Jaipur','Kanpur','Nagpur','Indore','Thiruvananthapuram','Bhopal','Coimbatore','Vishakhapatnam','Surat','Patna','Ludhiana'];
const streamsPool = ['Engineering','Management','Medical','Science','Law','Humanities','Arts','Design','Commerce','Education'];
const facilitiesPool = ['Hostel','Wi-Fi Campus','Central Library','Research Labs','Sports Complex','Placement Cell','Cafeteria','Gym','Auditorium','Medical Center'];
const courseTitles = ['B.Tech Computer Science','B.Tech Mechanical','B.Com','B.Sc Physics','MBA','BBA','BA English','LLB','M.Tech','B.Des'];

function pickRandom(arr, count){
  const res = [];
  const copy = arr.slice();
  while(res.length < count && copy.length){
    const idx = Math.floor(Math.random()*copy.length);
    res.push(copy.splice(idx,1)[0]);
  }
  return res;
}

async function seed(n=50){
  for(let i=1;i<=n;i++){
    const name = `Sample College ${i}`;
    const shortname = `SC${i}`;
    const city = cities[i % cities.length];
    const state = 'State ' + ((i%10)+1);
    const description = `Sample College ${i} is a leading institution in ${city} offering quality education across multiple streams.`;
    const email = `info${i}@sample.edu`;
    const phone = `+91-9${(100000000 + i).toString().slice(1)}`;
    const website = `https://www.sample${i}.edu`;
    const gradient = 'linear-gradient(135deg, #1e3a8a, #3b82f6)';
    const streams = pickRandom(streamsPool, 2 + (i%3));
    const facilities = pickRandom(facilitiesPool, 3 + (i%4));
    try{
      const res = await runAsync(`INSERT INTO colleges (name, shortname, description, city, state, email, phone, website, gradient, streams, facilities) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [name, shortname, description, city, state, email, phone, website, gradient, JSON.stringify(streams), JSON.stringify(facilities)]);
      const id = res.lastID;
      // add 1-3 courses
      const coursesCount = 1 + (i % 3);
      for(let j=0;j<coursesCount;j++){
        const ctitle = courseTitles[(i + j) % courseTitles.length];
        const duration = (ctitle.startsWith('M') || ctitle.startsWith('MBA') || ctitle.startsWith('LLB')) ? '2 years' : '4 years';
        const fee = 30000 + ((i*7 + j*13) % 100) * 1000;
        await runAsync('INSERT INTO courses (college_id, title, duration, annual_fee) VALUES (?,?,?,?)', [id, ctitle, duration, fee]);
      }
    }catch(err){
      console.error('Insert error for', name, err.message);
    }
  }

  const total = await allAsync('SELECT COUNT(*) as cnt FROM colleges');
  const cnt = total && total[0] ? total[0].cnt : 0;
  console.log('Seeding complete. Total colleges:', cnt);
  const sample = await allAsync('SELECT id,name,city,avg_rating,reviews_count FROM colleges ORDER BY id DESC LIMIT 10');
  console.log('Latest entries:', sample);
}

seed(50).then(()=>process.exit(0)).catch(err=>{ console.error(err); process.exit(1); });
