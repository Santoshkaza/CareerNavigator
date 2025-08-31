# MERN Stack Tech Career Platform

A full-stack application built with MongoDB, Express.js, React, and Node.js for exploring tech career paths, roadmaps, and company information.

## 🚀 Features

- **Authentication**: JWT-based user registration and login
- **DSA Practice Sheets**: Dynamic problem sets with progress tracking
  - 25+ curated problems across 5 categories
  - Mark problems as completed
  - Filter by difficulty and category
  - Password-protected admin interface to add new problems
- **Career Paths**: Explore different tech career options
- **Roadmaps**: Detailed learning paths for various technologies
- **Companies**: Information about tech companies and their requirements
- **Dashboard**: Personalized user dashboard with progress tracking
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 18 or higher)
- **MongoDB** (running locally or MongoDB Atlas)
- **npm** or **yarn**

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Start MongoDB

#### Option A: Local MongoDB
```bash
mongod
```

#### Option B: MongoDB Atlas
Update the `MONGO_URI` in `server/.env` to your Atlas connection string.

### 3. Start the Application

#### Quick Start (Both servers)
```bash
# Windows
./start-mern.bat

# Manual start
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
├── public/                 # Static files
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── auth/           # Authentication components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI components
│   ├── context/            # React context providers
│   ├── data/               # Static data files (deprecated)
│   ├── pages/              # Page components
│   │   └── DSASheetsPage.tsx # DSA problems interface
│   └── services/           # API services
│       └── apiService.ts   # API service with DSA methods
├── server/                 # Backend source code
│   ├── models/             # MongoDB models
│   │   └── DSAProblem.js   # DSA problem model
│   ├── routes/             # Express routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── dsa.js          # DSA problem routes
│   │   └── progress.js     # User progress routes
│   ├── seed-dsa.js         # Database seeding script
│   ├── .env                # Environment variables
│   └── index.js            # Server entry point
└── README.md
```

## 🔑 Environment Variables

Create a `server/.env` file with:

```env
MONGO_URI=mongodb://localhost:27017/techcareer
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

## 🧪 Testing the Application

1. **Check Server Status**: Run `./check-mern-status.bat`
2. **Seed DSA Problems**: Run `cd server && node seed-dsa.js` to populate the database with sample problems
3. **Register**: Create a new account at http://localhost:5173/signup
4. **Login**: Sign in with your credentials
5. **Explore**: Navigate through career paths, roadmaps, and companies
6. **DSA Practice**: Visit the DSA Sheets page to practice problems and track progress
7. **Add Problems**: Use password "virus@123" to access the admin interface for adding new problems

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check the `MONGO_URI` in `server/.env`

2. **Port Already in Use**
   - Frontend (5173): Kill the process using the port
   - Backend (5000): Change `PORT` in `server/.env`

3. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in `server/.env`

### Logs and Debugging

- Backend logs appear in the server terminal
- Frontend logs appear in browser console
- Check network tab for API request/response details

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
- Set environment variables
- Deploy the 'server' folder
- Ensure MongoDB Atlas is configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy coding!** 🎉

### Frontend (React + TypeScript + Vite)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: JWT-based authentication
- **UI Components**: Custom components with Lucide React icons

### Backend (Spring Boot + MySQL)
- **Framework**: Spring Boot 3.2.0
- **Security**: Spring Security with JWT
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA with Hibernate
- **API**: RESTful APIs with JSON responses

## 🚀 Features

### Core Features
- **User Authentication**: Secure login/signup with JWT tokens
- **Companies**: Browse tech companies and their interview questions
- **Roadmaps**: Technology learning paths and step-by-step guides
- **Career Paths**: Explore different tech career options with salary info
- **Search & Filtering**: Advanced search across all content
- **Responsive Design**: Mobile-first responsive UI
- **Dark/Light Mode**: Theme switching capability

### Technical Features
- **Real-time API Integration**: Frontend communicates with Spring Boot backend
- **Database Persistence**: All data stored in MySQL database
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Error Handling**: Comprehensive error handling on both client and server
- **Loading States**: User-friendly loading indicators
- **Data Validation**: Input validation on both frontend and backend

## 📁 Project Structure

```
tech-career-platform/
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── layout/      # Layout components (Header, Footer)
│   │   │   └── ui/          # UI components
│   │   ├── context/         # React Context providers
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   └── data/           # Static data (deprecated, now using API)
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
│
├── backend/                 # Spring Boot Backend
│   ├── src/main/java/com/techcareer/app/
│   │   ├── controller/     # REST API controllers
│   │   ├── model/          # JPA entity models
│   │   ├── repository/     # Data access layer
│   │   ├── security/       # Security configuration
│   │   ├── service/        # Business logic layer
│   │   └── dto/           # Data Transfer Objects
│   ├── src/main/resources/
│   │   └── application.properties  # App configuration
│   └── pom.xml            # Backend dependencies
│
└── README.md              # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- **Node.js** 18+ and npm
- **Java** 17+
- **MySQL** 8.0+
- **Maven** 3.6+ (or use included wrapper)

### Database Setup

1. Install and start MySQL
2. Create the database:
```sql
CREATE DATABASE tech_career_db;
CREATE USER 'tech_user'@'localhost' IDENTIFIED BY 'tech_password';
GRANT ALL PRIVILEGES ON tech_career_db.* TO 'tech_user'@'localhost';
FLUSH PRIVILEGES;
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Update database configuration in `src/main/resources/application.properties`:
```properties
spring.datasource.username=tech_user
spring.datasource.password=tech_password
```

3. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```

The backend will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to project root:
```bash
cd ../
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or another port if 5173 is busy)

## 🔧 Configuration

### Backend Configuration

Key configuration files:
- `application.properties`: Database and app configuration
- `WebSecurityConfig.java`: Security and CORS settings
- `pom.xml`: Dependencies and build configuration

### Frontend Configuration

Key configuration files:
- `vite.config.ts`: Vite build configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### DSA Problems
- `GET /api/dsa` - Get all DSA problems
- `GET /api/dsa/categories` - Get all DSA categories
- `POST /api/dsa` - Create new DSA problem (Authenticated users)
- `POST /api/dsa/progress` - Mark problem as completed (Authenticated users)
- `GET /api/progress` - Get user progress (Authenticated users)

### Companies
- `GET /api/companies` - Get all companies (with optional search)
- `GET /api/companies/{id}` - Get company by ID
- `POST /api/companies` - Create company (Admin only)
- `PUT /api/companies/{id}` - Update company (Admin only)
- `DELETE /api/companies/{id}` - Delete company (Admin only)

### Roadmaps
- `GET /api/roadmaps` - Get all roadmaps (with optional search)
- `GET /api/roadmaps/{id}` - Get roadmap by ID
- `POST /api/roadmaps` - Create roadmap (Admin only)
- `PUT /api/roadmaps/{id}` - Update roadmap (Admin only)
- `DELETE /api/roadmaps/{id}` - Delete roadmap (Admin only)

### Career Paths
- `GET /api/career-paths` - Get all career paths (with optional search)
- `GET /api/career-paths/{id}` - Get career path by ID
- `POST /api/career-paths` - Create career path (Admin only)
- `PUT /api/career-paths/{id}` - Update career path (Admin only)
- `DELETE /api/career-paths/{id}` - Delete career path (Admin only)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users register/login via the frontend
2. Backend validates credentials and returns a JWT token
3. Frontend stores the token in localStorage
4. Token is sent with each API request in the Authorization header
5. Backend validates the token for protected endpoints

## 🗄️ Database Schema

### Key Tables
- `users` - User accounts with authentication info
- `roles` - User roles (USER, ADMIN)
- `user_roles` - Many-to-many relationship between users and roles
- `companies` - Company information
- `company_questions` - Interview questions for each company
- `roadmaps` - Technology learning roadmaps
- `roadmap_steps` - Individual steps in each roadmap
- `resources` - Learning resources for roadmap steps
- `career_paths` - Career path information

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file: `./mvnw clean package`
2. Deploy the JAR to your server
3. Configure production database connection
4. Set up environment variables for JWT secret and database credentials

### Frontend Deployment
1. Build for production: `npm run build`
2. Deploy the `dist` folder to your web server
3. Configure the API base URL for production

## 🧪 Development

### Adding New Features

1. **Backend**: Add new endpoints in controllers, create/update models, repositories
2. **Frontend**: Create new pages/components, update API service, add routing

### Database Changes

1. Update JPA entities
2. Spring Boot will auto-update the schema (in development)
3. For production, create proper migration scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to your branch: `git push origin feature/new-feature`
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify MySQL is running
   - Check database credentials in application.properties
   - Ensure database exists

2. **CORS Issues**
   - Verify frontend URL in CORS configuration
   - Check that both frontend and backend are running

3. **JWT Token Issues**
   - Check token expiration
   - Verify JWT secret configuration
   - Clear localStorage and re-login

4. **Build Issues**
   - Ensure all dependencies are installed
   - Check Java and Node.js versions
   - Clear Maven/npm caches if needed

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the API documentation
