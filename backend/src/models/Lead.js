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
    city: {
      type: String,
      trim: true,
      default: ''
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
      default: 'Qualified'
    },
    category: {
      type: String,
      default: 'General'
    },
    pcbPercentage: {
      type: Number,
      min: [0, 'Percentage cannot be negative'],
      max: [100, 'Percentage cannot exceed 100']
    },
    preferredUniversity: {
      type: String,
      default: 'Flexible / General Inquiry'
    },
    budgetRange: {
      type: String,
      default: ''
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
    message: {
      type: String,
      default: ''
    },
    utmParams: {
      utm_source: String,
      utm_medium: String,
      utm_campaign: String,
      utm_term: String
    },
    status: {
      type: String,
      default: 'New'
    },
    assignedTo: {
      type: String,
      default: ''
    },
    notes: [
      {
        text: String,
        author: {
          type: String,
          default: 'System'
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    formData: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
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
