Campus Finder - India
Premium College Search & Discovery Platform
📌 Project Overview
Campus Finder - India is a comprehensive college search and discovery platform designed to simplify the higher education selection process for students and parents across India. With over 40,000 colleges and 200+ universities in the country, navigating the complex education landscape can be overwhelming. This platform serves as a one-stop destination for college exploration, comparison, and personalized recommendations.

The system leverages advanced search and filtering capabilities, predictive analytics for JEE/NEET/12th score-based college predictions, and a user-friendly interface to enhance the college selection experience.

🚀 Key Features
For Students & Users:
Advanced Search & Filtering - Search colleges by name, location, course, entrance exam, fees range, and rankings

Personalized Predictor - Get college recommendations based on JEE/NEET/12th scores

College Comparison - Side-by-side comparison of multiple colleges across key metrics

College Details - Comprehensive information including courses, fees, admission criteria, and rankings

Enquiry Management - Submit enquiries about colleges directly through the platform

Responsive Design - Optimized for desktop, tablet, and mobile devices

For Administrators:
Admin Dashboard - Secure backend for managing college listings

CRUD Operations - Add, edit, and delete college entries

Analytics View - Real-time metrics on user engagement and popular colleges

Data Management - Update predictor data and admission criteria

🛠️ Technology Stack
Component	Technology	Purpose
Backend	Express.js (Node.js)	RESTful API development, routing, middleware
Database	SQLite	Relational data storage, lightweight, efficient
Frontend	HTML, CSS, JavaScript	Responsive user interfaces, client-side interactions
Authentication	JWT (JSON Web Tokens)	Secure admin access and session management
Development Tools	Git, VS Code, Postman	Version control, development, API testing
📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14.x or higher)

npm or yarn package manager

Git (for version control)

🔧 Installation & Setup
1. Clone the Repository
bash
git clone https://github.com/yourusername/campus-finder.git
cd campus-finder
2. Install Dependencies
bash
npm install
3. Environment Configuration
Create a .env file in the root directory and add the following:

env
PORT=3000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
DATABASE_URL=./data/campusfinder.db
4. Database Setup
Initialize the database and seed with initial data:

bash
npm run db:migrate
npm run db:seed
5. Run Development Server
bash
npm run dev
6. Access the Application
Main Application: http://localhost:3000

Admin Dashboard: http://localhost:3000/admin

📁 Project Structure
text
campus-finder/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication & validation
│   ├── utils/           # Helper functions
│   └── services/        # Business logic
├── public/
│   ├── css/             # Stylesheets
│   ├── js/              # Client-side JavaScript
│   └── images/          # Static assets
├── views/               # HTML templates
├── data/                # SQLite database
├── config/              # Configuration files
├── tests/               # Test files
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
🔌 API Endpoints
Public Routes
Method	Endpoint	Description
GET	/api/colleges	Fetch colleges with search/filter
GET	/api/colleges/:id	Get college details by ID
GET	/api/colleges/predict	Get personalized predictions
GET	/api/courses	Get all courses
GET	/api/exams	Get all entrance exams
POST	/api/enquiry	Submit user enquiry
POST	/api/admin/login	Admin authentication
Admin Routes (Authentication Required)
Method	Endpoint	Description
GET	/api/admin/colleges	Get all colleges
POST	/api/admin/colleges	Add new college
PUT	/api/admin/colleges/:id	Update college
DELETE	/api/admin/colleges/:id	Delete college
GET	/api/admin/analytics	Get dashboard metrics
📊 Database Schema
The platform uses SQLite with the following main tables:

colleges - Core college information

courses - Course details linked to colleges

exams - Entrance examinations

college_exams - Junction table with cut-off scores

enquiries - User enquiries for colleges

admin_users - Admin credentials and roles

👨‍💻 How to Use
For Students
Search for Colleges - Use the search bar to find colleges by name, location, or course

Apply Filters - Refine results using the sidebar filters (state, city, exam, fees, ranking)

View Details - Click on any college card to view comprehensive information

Check Predictions - Navigate to the "Predictor" section to get personalized college recommendations

Compare Colleges - Add colleges to the comparison dock for side-by-side comparison

Submit Enquiry - Fill out the enquiry form on any college page

For Administrators
Login - Access the admin dashboard at /admin

Manage Colleges - Add, edit, or delete college listings

View Analytics - Monitor user engagement and platform performance

Update Data - Maintain predictor data and admission criteria

🔐 Admin Credentials
Default Login:

Username: admin

Password: campusfinder2026

⚠️ IMPORTANT: Change the default password immediately after first login for security purposes.

🧪 Testing
Manual Testing
The application has been tested for:

Search functionality and filter combinations

Predictor accuracy against historical data

Comparison feature and side-by-side view

CRUD operations in admin panel

Authentication and session management

Responsive design across devices

Browser compatibility (Chrome, Firefox, Safari)

Performance Testing
Search and filter operations achieve sub-second response time

Database queries optimized for large datasets

System remains stable under concurrent user load

📈 Future Enhancements
Planned Features
ML-Based Recommendations - Machine learning for more personalized college recommendations

Institute Verification - Verification badges for authenticated colleges

Student Reviews - Student reviews and ratings for colleges

Entrance Exam Prep - Integration of exam preparation resources

Alumni Network - Connect students with alumni for mentorship

Scholarship Database - Comprehensive scholarship information

Technical Improvements
Cloud Deployment - Deploy on cloud infrastructure for scalability

Containerization - Docker implementation for easier deployment

CI/CD Pipeline - Automated testing and deployment

Advanced Analytics - User behavior analytics and heatmaps

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is submitted as part of the Summer Internship Program at Cloud Counselage Pvt. Ltd. for the partial fulfilment of the B.Tech degree from Universal AI University.

📧 Contact
Project Developer:

Name: Moulik Godavarthi

Roll No: UAI05BT12533

Batch: 2025-2029

Email: [Your Email]

Phone: +91 7386562527

Faculty Guide:

Name: Prof. Sagar Kulkarni

Designation: Assistant Professor, SAiFT

Institution: Universal AI University, Karjat

Industry Mentor:

Name: Harshada Topale

Designation: Director & Project Manager

Organization: Cloud Counselage Pvt. Ltd.

🙏 Acknowledgements
Cloud Counselage Pvt. Ltd. - For providing this valuable internship opportunity

Prof. Sagar Kulkarni - For his continuous guidance and support

Harshada Topale - For industry mentorship and project supervision

Universal AI University - For the academic framework and support

Family & Friends - For their constant encouragement and support

📖 References
Express.js Documentation - https://expressjs.com/

SQLite Documentation - https://www.sqlite.org/docs.html

Node.js Documentation - https://nodejs.org/en/docs/

JWT Documentation - https://jwt.io/

Universal AI University - SIP Handbook 2025-2029

AISHE 2024-2025 - Ministry of Education, Government of India

📌 Status
✅ Project Complete

The project was successfully delivered and deployed during the Summer Internship Program from 15th April 2026 to 14th July 2026 at Cloud Counselage Pvt. Ltd.

Made with ❤️ by Moulik Godavarthi

Universal AI University, Mumbai (Karjat), 410201


