import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { University } from '../models/University.js';
import { BlogPost } from '../models/BlogPost.js';
import { Lead } from '../models/Lead.js';
import { universitiesData } from '../data/universitiesData.js';
import { blogData } from '../data/blogData.js';

dotenv.config();

const seedDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mh_medical_db';

  try {
    await mongoose.connect(uri);
    console.log(`[Seed] Connected to MongoDB at ${uri}`);

    // 1. Seed Admin User
    await User.deleteMany();
    const adminUser = await User.create({
      name: 'Dr. M. H. Akhtar (Founder & Director)',
      email: process.env.ADMIN_EMAIL || 'admissions@mhglobalmedical.in',
      password: process.env.ADMIN_PASSWORD || 'MHMedicalAdmin@2026',
      role: 'superadmin',
      phone: process.env.ADMIN_PHONE || '+91 85955 85955'
    });
    console.log(`[Seed] Admin User Created: ${adminUser.email}`);

    // 2. Seed Universities
    await University.deleteMany();
    await University.insertMany(universitiesData);
    console.log(`[Seed] Successfully seeded ${universitiesData.length} Medical Universities.`);

    // 3. Seed Blogs
    await BlogPost.deleteMany();
    await BlogPost.insertMany(blogData);
    console.log(`[Seed] Successfully seeded ${blogData.length} Blog articles.`);

    // 4. Initial Leads (Clean production state: zero dummy leads)
    await Lead.deleteMany();
    console.log('[Seed] Lead collection reset to clean state (0 dummy leads).');

    console.log('[Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] Database seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
