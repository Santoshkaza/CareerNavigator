import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔧 Testing MongoDB Connection...');
console.log('📍 MongoDB URI:', process.env.MONGO_URI?.replace(/\/\/.*:.*@/, '//***:***@') || 'Not configured');

async function testConnection() {
  try {
    console.log('⏳ Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techcareer');
    
    console.log('✅ Successfully connected to MongoDB!');
    console.log('📊 Database name:', mongoose.connection.name);
    console.log('🔗 Connection host:', mongoose.connection.host);
    console.log('🚪 Connection port:', mongoose.connection.port);
    console.log('📈 Connection ready state:', mongoose.connection.readyState);
    
    // Test a simple operation
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'Hello MongoDB!', timestamp: new Date() });
    console.log('✅ Test document inserted successfully!');
    
    const testDoc = await testCollection.findOne({ test: 'Hello MongoDB!' });
    console.log('✅ Test document retrieved:', testDoc);
    
    console.log('🎉 MongoDB connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💡 Possible solutions:');
    console.log('   1. Check your MONGO_URI in .env file');
    console.log('   2. Ensure MongoDB is running (local) or accessible (cloud)');
    console.log('   3. Check network connectivity');
    console.log('   4. Verify credentials (for Atlas)');
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

testConnection();
