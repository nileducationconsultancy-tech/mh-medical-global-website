import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mh_medical_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log(`[MongoDB Info] Local MongoDB offline or not detected. Operating in In-Memory / LocalStorage Persistence Mode.`);
    isConnected = false;
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isConnected,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host || 'Offline / In-Memory Mock'
});
