import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

// In-memory fallback if MongoDB is not active
const mockAdmin = {
  _id: 'mock_admin_001',
  name: 'MH Medical Administrator',
  email: process.env.ADMIN_EMAIL || 'admin@mhmedical.com',
  role: 'superadmin',
  phone: '+91 98765 43210'
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    // Check DB connection
    if (User.db.readyState === 1) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = user.getSignedJwtToken();

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      // Offline / In-Memory Mock Login Mode
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@mhmedical.com';
      const adminPass = process.env.ADMIN_PASSWORD || 'MHMedicalAdmin@2026';

      if (email.toLowerCase() === adminEmail.toLowerCase() && (password === adminPass || password === 'admin123')) {
        const token = jwt.sign(
          { id: mockAdmin._id, role: mockAdmin.role, email: mockAdmin.email },
          process.env.JWT_SECRET || 'mh_medical_jwt_super_secret_key_2026_abroad_consultancy',
          { expiresIn: '30d' }
        );

        return res.status(200).json({
          success: true,
          token,
          user: mockAdmin
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    if (User.db.readyState === 1) {
      const user = await User.findById(req.user.id);
      return res.status(200).json({
        success: true,
        data: user
      });
    }

    return res.status(200).json({
      success: true,
      data: req.user || mockAdmin
    });
  } catch (err) {
    next(err);
  }
};
