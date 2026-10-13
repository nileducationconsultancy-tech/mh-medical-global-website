import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['NMC Regulations', 'Fee Analysis', 'University Rankings', 'Student Life', 'NEXT / FMGE Strategy', 'Admission Guides'],
      default: 'NMC Regulations'
    },
    author: {
      name: {
        type: String,
        default: 'Dr. M. H. Siddiqui'
      },
      title: {
        type: String,
        default: 'Senior Medical Education Consultant'
      },
      avatar: String
    },
    publishedAt: {
      type: Date,
      default: Date.now
    },
    readTime: {
      type: String,
      default: '6 min read'
    },
    featuredImage: String,
    tags: [String],
    isFeatured: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ publishedAt: -1 });

export const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
