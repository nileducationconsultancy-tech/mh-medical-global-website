import { University } from '../models/University.js';
import { universitiesData } from '../data/universitiesData.js';

// @desc    Get all medical universities with filtering, sorting, and search
// @route   GET /api/universities
// @access  Public
export const getUniversities = async (req, res, next) => {
  try {
    const { type, city, maxTuition, search, featured } = req.query;

    if (University.db.readyState === 1) {
      const query = {};

      if (type && type !== 'all') {
        query.type = type;
      }

      if (city && city !== 'all') {
        query.city = { $regex: city, $options: 'i' };
      }

      if (featured === 'true') {
        query.featured = true;
      }

      if (maxTuition) {
        query['fees.annualTuitionUSD'] = { $lte: Number(maxTuition) };
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { officialName: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } }
        ];
      }

      const universities = await University.find(query).sort({ rating: -1, establishedYear: 1 });

      return res.status(200).json({
        success: true,
        count: universities.length,
        data: universities
      });
    } else {
      // Memory Filter from verified dataset
      let filtered = [...universitiesData];

      if (type && type !== 'all') {
        filtered = filtered.filter((u) => u.type.toLowerCase() === type.toLowerCase());
      }

      if (city && city !== 'all') {
        filtered = filtered.filter((u) => u.city.toLowerCase() === city.toLowerCase());
      }

      if (featured === 'true') {
        filtered = filtered.filter((u) => u.featured);
      }

      if (maxTuition) {
        filtered = filtered.filter((u) => u.fees.annualTuitionUSD <= Number(maxTuition));
      }

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.name.toLowerCase().includes(s) ||
            u.city.toLowerCase().includes(s) ||
            u.officialName?.toLowerCase().includes(s)
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

// @desc    Get single university by slug
// @route   GET /api/universities/:slug
// @access  Public
export const getUniversityBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (University.db.readyState === 1) {
      const uni = await University.findOne({
        $or: [{ slug: slug.toLowerCase() }, { id: slug }]
      });

      if (!uni) {
        return res.status(404).json({
          success: false,
          message: `University with slug '${slug}' not found.`
        });
      }

      return res.status(200).json({
        success: true,
        data: uni
      });
    } else {
      const uni = universitiesData.find(
        (u) => u.slug === slug || u.id === slug
      );

      if (!uni) {
        return res.status(404).json({
          success: false,
          message: `University with slug '${slug}' not found.`
        });
      }

      return res.status(200).json({
        success: true,
        data: uni
      });
    }
  } catch (err) {
    next(err);
  }
};
