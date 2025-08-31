# 🗄️ MongoDB Setup Guide

## ❌ **Current Issue**
MongoDB is not installed or running on your system. The server cannot connect to `mongodb://localhost:27017/techcareer`.

## 🚀 **Solution Options**

### **Option A: Install MongoDB Locally (Recommended for Development)**

#### **1. Download MongoDB Community Server**
- Visit: https://www.mongodb.com/try/download/community
- Select: Windows, Version 7.0 (latest), MSI package
- Download and run the installer

#### **2. Installation Steps**
1. Run the `.msi` installer as Administrator
2. Choose "Complete" setup type
3. ✅ **Check "Install MongoDB as a Service"**
4. ✅ **Check "Run service as Network Service user"**
5. ✅ **Install MongoDB Compass** (GUI tool)
6. Complete the installation

#### **3. Verify Installation**
```bash
# Open Command Prompt as Administrator
mongod --version
mongo --version
```

#### **4. Start MongoDB Service**
```bash
# Option 1: Start as Windows Service (should auto-start)
net start MongoDB

# Option 2: Manual start (if service doesn't work)
mongod --dbpath "C:\data\db"
```

#### **5. Test Connection**
```bash
# Connect to MongoDB shell
mongosh
# or older versions:
mongo
```

### **Option B: Use MongoDB Atlas (Cloud - Easiest)**

#### **1. Create Free Atlas Account**
- Visit: https://www.mongodb.com/atlas
- Sign up for free (no credit card required)
- Create a new cluster (free tier available)

#### **2. Get Connection String**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password

#### **3. Update Your .env File**
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/techcareer?retryWrites=true&w=majority
JWT_SECRET=supersecretkey2025
PORT=5000
```

### **Option C: Use Docker (Alternative)**

#### **1. Install Docker Desktop**
- Download from: https://www.docker.com/products/docker-desktop

#### **2. Run MongoDB Container**
```bash
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_DATABASE=techcareer mongo:latest
```

## 🧪 **Test Your Connection**

After setting up MongoDB (any option above), test the connection:

1. **Start your server:**
```bash
cd server
npm run dev
```

2. **Check connection status:**
Visit: http://localhost:5000/api/test-db

You should see:
```json
{
  "mongodb_status": "connected",
  "connection_string": "mongodb://localhost:27017/techcareer",
  "database_name": "techcareer"
}
```

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **"MongoDB is not running"**
   - Start MongoDB service: `net start MongoDB`
   - Or run: `mongod` in Command Prompt

2. **"Access denied" errors**
   - Run Command Prompt as Administrator
   - Check Windows Services for MongoDB

3. **Port 27017 in use**
   - Check what's using the port: `netstat -ano | findstr 27017`
   - Kill the process or use different port

4. **Connection timeout**
   - Check firewall settings
   - Verify MongoDB is listening: `netstat -an | findstr 27017`

### **Quick Fixes:**

```bash
# Restart MongoDB service
net stop MongoDB
net start MongoDB

# Check MongoDB service status
sc query MongoDB

# Manual MongoDB start
mongod --dbpath "C:\data\db" --logpath "C:\data\log\mongod.log"
```

## 💡 **Recommendation**

For **quick testing**: Use **MongoDB Atlas** (Option B) - it's free, requires no installation, and works immediately.

For **development**: Install **MongoDB locally** (Option A) for full control and offline development.

## 🎯 **Next Steps**

1. Choose your preferred option above
2. Set up MongoDB using the chosen method
3. Update your `.env` file with the correct connection string
4. Restart your server: `npm run dev`
5. Test the connection: http://localhost:5000/api/test-db

Your MERN stack will be fully functional once MongoDB is connected! 🚀
