import mongoose from 'mongoose';
import dns from 'dns';

// Configure public DNS resolvers to prevent Windows Node.js querySrv ECONNREFUSED with MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore in environments where setServers is restricted
}

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mh_medical_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log(`\n=======================================================`);
    console.log(` ✅ DATABASE STATUS: CONNECTED SUCCESSFULLY!`);
    console.log(` Database Host: ${conn.connection.host}`);
    console.log(` Database Name: ${conn.connection.name || 'default'}`);
    console.log(` Storage Mode : Live MongoDB Atlas Cluster`);
    console.log(`=======================================================\n`);
    return true;
  } catch (error) {
    isConnected = false;
    console.log(`\n=======================================================`);
    console.log(` ❌ DATABASE STATUS: NOT CONNECTED`);
    console.log(` Reason: ${error.message}`);
    console.log(` Fallback: Operating in In-Memory / LocalStorage Mode`);
    console.log(`=======================================================\n`);
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isConnected,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host || 'Offline / In-Memory Mock'
});
