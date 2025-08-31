import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import careerPathsRoutes from './routes/careerPaths.js';
import companiesRoutes from './routes/companies.js';
import progressRoutes from './routes/progress.js';
import roadmapsRoutes from './routes/roadmaps.js';
import dsaRoutes from './routes/dsa.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'MERN Backend API Running!' }));

//
app.use('/api/auth', authRoutes);
app.use('/api/career-paths', careerPathsRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/roadmaps', roadmapsRoutes);
app.use('/api/dsa', dsaRoutes);


// Test endpoint to check MongoDB connection
app.get('/api/test-db', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      mongodb_status: states[dbState],
      connection_string: process.env.MONGO_URI?.replace(/\/\/.*:.*@/, '//***:***@') || 'Not configured',
      database_name: mongoose.connection.name || 'Not connected'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

// MongoDB connection with detailed logging
console.log('🔧 Starting server...');
console.log('📍 MongoDB URI:', process.env.MONGO_URI || 'Not configured');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techcareer')
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    console.log('📊 Database name:', mongoose.connection.name);
    console.log('🔗 Connection host:', mongoose.connection.host);
    console.log('🚪 Connection port:', mongoose.connection.port);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API available at http://localhost:${PORT}`);
      console.log(`🧪 Test MongoDB connection at http://localhost:${PORT}/api/test-db`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 Troubleshooting tips:');
    console.log('   1. Make sure MongoDB is running: mongod');
    console.log('   2. Check your MONGO_URI in .env file');
    console.log('   3. Verify MongoDB is installed and accessible');
    process.exit(1);
  });

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
});
