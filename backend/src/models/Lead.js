import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    phone: {
      type: String,
      required: [true, 'Please provide a valid contact number'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    state: {
      type: String,
      trim: true,
      default: 'Not Specified'
    },
    neetScore: {
      type: Number,
      min: [0, 'NEET score cannot be negative'],
      max: [720, 'NEET score cannot exceed 720']
    },
    neetStatus: {
      type: String,
      enum: ['Qualified', 'Appearing in 2026', 'Not Qualified', 'Planning Next Year'],
      default: 'Qualified'
    },
    category: {
      type: String,
      enum: ['General', 'OBC', 'SC', 'ST', 'EWS'],
      default: 'General'
    },
    pcbPercentage: {
      type: Number,
      min: [0, 'Percentage cannot be negative'],
      max: [100, 'Percentage cannot exceed 100']
    },
    preferredUniversity: {
      type: String,
      default: 'Flexible / Expert Recommendation'
    },
    budgetRange: {
      type: String,
      default: '₹25 Lakhs - ₹35 Lakhs'
    },
    targetYear: {
      type: String,
      default: '2026-2027'
    },
    source: {
      type: String,
      default: 'Website Form'
    },
    sourcePage: {
      type: String,
      default: '/'
    },
    utmParams: {
      utm_source: String,
      utm_medium: String,
      utm_campaign: String,
      utm_term: String
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Document Review', 'Eligible', 'Admission Letter Issued', 'Visa Processing', 'Enrolled', 'Closed / Lost'],
      default: 'New'
    },
    assignedTo: {
      type: String,
      default: 'Senior Admission Counselor'
    },
    notes: [
      {
        text: String,
        author: {
          type: String,
          default: 'System / Counselor'
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    ipAddress: String,
    userAgent: String
  },
  {
    timestamps: true
  }
);

// Indexing for quick search and lead prioritization
LeadSchema.index({ phone: 1 });
LeadSchema.index({ email: 1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ createdAt: -1 });

export const Lead = mongoose.model('Lead', LeadSchema);
