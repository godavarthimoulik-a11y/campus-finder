const fs = require('fs');
const path = require('path');
const { allAsync, getAsync } = require('./db');

async function exportStatic() {
  console.log('Exporting static JSON files...');
  
  // Create api directories
  const apiDir = path.join(__dirname, 'api');
  const collegesDir = path.join(apiDir, 'colleges');
  
  if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir);
  if (!fs.existsSync(collegesDir)) fs.mkdirSync(collegesDir);

  try {
    // 1. Export all colleges list
    let sql = 'SELECT id, name, shortname, city, state, avg_rating, reviews_count, gradient, streams FROM colleges ORDER BY avg_rating DESC, reviews_count DESC';
    const rows = await allAsync(sql, []);
    const collegesList = rows.map(r => ({ ...r, streams: r.streams ? JSON.parse(r.streams) : [] }));
    
    fs.writeFileSync(path.join(apiDir, 'colleges.json'), JSON.stringify(collegesList, null, 2));
    console.log('Exported colleges.json');

    // 2. Export individual college details
    for (const college of rows) {
      const id = college.id;
      const fullCollege = await getAsync('SELECT * FROM colleges WHERE id = ?', [id]);
      fullCollege.streams = fullCollege.streams ? JSON.parse(fullCollege.streams) : [];
      fullCollege.facilities = fullCollege.facilities ? JSON.parse(fullCollege.facilities) : [];
      
      const courses = await allAsync('SELECT * FROM courses WHERE college_id = ?', [id]);
      const reviews = await allAsync('SELECT * FROM reviews WHERE college_id = ? ORDER BY created_at DESC LIMIT 50', [id]);
      
      const detailData = { college: fullCollege, courses, reviews };
      
      fs.writeFileSync(path.join(collegesDir, `${id}.json`), JSON.stringify(detailData, null, 2));
      console.log(`Exported college ${id}`);
    }
    
    console.log('Static export complete!');
    process.exit(0);
  } catch (error) {
    console.error('Export failed:', error);
    process.exit(1);
  }
}

exportStatic();
