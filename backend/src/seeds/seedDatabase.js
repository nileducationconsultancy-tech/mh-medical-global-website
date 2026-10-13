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
      name: 'Dr. M. H. Siddiqui (Superadmin)',
      email: process.env.ADMIN_EMAIL || 'admin@mhmedical.com',
      password: process.env.ADMIN_PASSWORD || 'MHMedicalAdmin@2026',
      role: 'superadmin',
      phone: '+91 98765 43210'
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

    // 4. Seed Initial Leads
    await Lead.deleteMany();
    const sampleLeads = [
      {
        name: "Aarav Sharma",
        phone: "+91 98765 43210",
        email: "aarav.sharma@example.com",
        state: "Delhi NCR",
        neetScore: 485,
        neetStatus: "Qualified",
        category: "General",
        pcbPercentage: 82,
        preferredUniversity: "Tashkent Medical Academy",
        budgetRange: "₹25 Lakhs - ₹30 Lakhs",
        targetYear: "2026-2027",
        source: "Fee Calculator",
        sourcePage: "/mbbs-fee-calculator",
        status: "Document Review",
        assignedTo: "Dr. Siddiqui",
        notes: [
          {
            text: "Student called regarding TMA hostel & Indian mess quality. NEET 485 qualified in 1st attempt. Sent official brochure.",
            author: "Dr. Siddiqui",
            createdAt: new Date(Date.now() - 3600000 * 24)
          }
        ]
      },
      {
        name: "Pooja Patel",
        phone: "+91 98234 56789",
        email: "pooja.patel@example.com",
        state: "Gujarat",
        neetScore: 520,
        neetStatus: "Qualified",
        category: "OBC",
        pcbPercentage: 88,
        preferredUniversity: "Samarkand State Medical University",
        budgetRange: "₹20 Lakhs - ₹25 Lakhs",
        targetYear: "2026-2027",
        source: "Eligibility Checker",
        sourcePage: "/mbbs-eligibility",
        status: "Admission Letter Issued",
        assignedTo: "Priya Sharma",
        notes: [
          {
            text: "10th & 12th marksheet verified. Passport submitted. SSMU conditional admission letter generated.",
            author: "Priya Sharma",
            createdAt: new Date(Date.now() - 3600000 * 12)
          }
        ]
      },
      {
        name: "Mohammad Farhan",
        phone: "+91 97112 34567",
        email: "farhan.m@example.com",
        state: "Uttar Pradesh",
        neetScore: 390,
        neetStatus: "Qualified",
        category: "General",
        pcbPercentage: 74,
        preferredUniversity: "Bukhara State Medical Institute",
        budgetRange: "₹22 Lakhs - ₹28 Lakhs",
        targetYear: "2026-2027",
        source: "Floating AI Counselor",
        sourcePage: "/universities/uzbekistan/bukhara-state-medical-institute",
        status: "Contacted",
        assignedTo: "Rahul Verma",
        notes: [
          {
            text: "Inquired about Halal food & Indian community in Bukhara. Explained clinical rotation structure.",
            author: "Rahul Verma",
            createdAt: new Date(Date.now() - 3600000 * 6)
          }
        ]
      }
    ];

    await Lead.insertMany(sampleLeads);
    console.log(`[Seed] Successfully seeded ${sampleLeads.length} Sample Leads in CRM.`);

    console.log('[Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] Database seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
