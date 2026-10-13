import { BlogPost } from '../models/BlogPost.js';
import { blogData } from '../data/blogData.js';

// @desc    Get all blog articles & guides
// @route   GET /api/blogs
// @access  Public
export const getBlogPosts = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    if (BlogPost.db.readyState === 1) {
      const query = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } }
        ];
      }

      const posts = await BlogPost.find(query).sort({ publishedAt: -1 });
      return res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
      });
    } else {
      let filtered = [...blogData];
      if (category && category !== 'all') {
        filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (p) => p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s)
        );
      }

      return res.status(200).json({
        success: true,
        count: filtered.length,
        data: filtered
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (BlogPost.db.readyState === 1) {
      const post = await BlogPost.findOne({ slug });
      if (!post) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }

      // Increment views
      post.views = (post.views || 0) + 1;
      await post.save();

      return res.status(200).json({
        success: true,
        data: post
      });
    } else {
      const post = blogData.find((p) => p.slug === slug);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }

      return res.status(200).json({
        success: true,
        data: post
      });
    }
  } catch (err) {
    next(err);
  }
};
