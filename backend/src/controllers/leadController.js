import { Lead } from '../models/Lead.js';

// In-Memory storage fallback for local development when MongoDB is not running (production clean state: zero dummy leads)
let memoryLeads = [];

// @desc    Submit a new student inquiry / admission lead
// @route   POST /api/leads
// @access  Public
export const createLead = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      state,
      neetScore,
      neetStatus,
      category,
      pcbPercentage,
      preferredUniversity,
      budgetRange,
      targetYear,
      source,
      sourcePage,
      utmParams,
      initialNote
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide student name and contact phone number'
      });
    }

    // Clean phone number
    const cleanedPhone = phone.replace(/[\s\-()]/g, '');

    const leadData = {
      name: name.trim(),
      phone: cleanedPhone,
      email: email ? email.trim().toLowerCase() : undefined,
      state: state || 'Not Specified',
      neetScore: neetScore ? Number(neetScore) : undefined,
      neetStatus: neetStatus || (neetScore && Number(neetScore) >= 137 ? 'Qualified' : 'Appearing in 2026'),
      category: category || 'General',
      pcbPercentage: pcbPercentage ? Number(pcbPercentage) : undefined,
      preferredUniversity: preferredUniversity || 'Flexible / Expert Recommendation',
      budgetRange: budgetRange || '₹25 Lakhs - ₹35 Lakhs',
      targetYear: targetYear || '2026-2027',
      source: source || 'Website Form',
      sourcePage: sourcePage || '/',
      utmParams: utmParams || {},
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    if (initialNote) {
      leadData.notes = [
        {
          text: initialNote,
          author: 'Student / Lead Submission',
          createdAt: new Date()
        }
      ];
    }

    // If MongoDB is connected
    if (Lead.db.readyState === 1) {
      // Check for recent duplicate within last 24h
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const existingLead = await Lead.findOne({
        phone: cleanedPhone,
        createdAt: { $gte: oneDayAgo }
      });

      if (existingLead) {
        // Append note instead of duplicate entry
        existingLead.notes.push({
          text: `Repeated inquiry from ${sourcePage || 'website'} (Preferred Uni: ${preferredUniversity || 'N/A'})`,
          author: 'System Auto-Deduplication',
          createdAt: new Date()
        });
        if (preferredUniversity) existingLead.preferredUniversity = preferredUniversity;
        if (neetScore) existingLead.neetScore = Number(neetScore);
        await existingLead.save();

        return res.status(200).json({
          success: true,
          message: 'Thank you! Your updated admission consultation request has been received.',
          leadId: existingLead._id
        });
      }

      const newLead = await Lead.create(leadData);
      return res.status(201).json({
        success: true,
        message: 'Thank you! An MH Medical Senior Counselor will reach out to you on WhatsApp / Phone within 15 minutes.',
        leadId: newLead._id
      });
    } else {
      // In-Memory Fallback
      const newLeadMem = {
        _id: `lead_mem_${Date.now()}`,
        ...leadData,
        status: 'New',
        assignedTo: 'Senior Admission Counselor',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryLeads.unshift(newLeadMem);

      return res.status(201).json({
        success: true,
        message: 'Thank you! An MH Medical Senior Counselor will reach out to you on WhatsApp / Phone within 15 minutes.',
        leadId: newLeadMem._id
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get all leads with filtering, search, and pagination
// @route   GET /api/admin/leads
// @access  Private (Admin / Counselor)
export const getLeads = async (req, res, next) => {
  try {
    const { status, search, preferredUniversity, page = 1, limit = 50 } = req.query;

    if (Lead.db.readyState === 1) {
      const query = {};

      if (status && status !== 'all') {
        query.status = status;
      }

      if (preferredUniversity && preferredUniversity !== 'all') {
        query.preferredUniversity = { $regex: preferredUniversity, $options: 'i' };
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { state: { $regex: search, $options: 'i' } }
        ];
      }

      const total = await Lead.countDocuments(query);
      const leads = await Lead.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

      return res.status(200).json({
        success: true,
        count: leads.length,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        data: leads
      });
    } else {
      // Memory Filter
      let filtered = [...memoryLeads];

      if (status && status !== 'all') {
        filtered = filtered.filter((l) => l.status.toLowerCase() === status.toLowerCase());
      }

      if (preferredUniversity && preferredUniversity !== 'all') {
        filtered = filtered.filter((l) =>
          l.preferredUniversity?.toLowerCase().includes(preferredUniversity.toLowerCase())
        );
      }

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (l) =>
            l.name?.toLowerCase().includes(s) ||
            l.phone?.includes(s) ||
            l.email?.toLowerCase().includes(s) ||
            l.state?.toLowerCase().includes(s)
        );
      }

      return res.status(200).json({
        success: true,
        count: filtered.length,
        total: filtered.length,
        page: 1,
        pages: 1,
        data: filtered
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Update lead status & counselor notes
// @route   PUT /api/admin/leads/:id
// @access  Private (Admin / Counselor)
export const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, note, assignedTo } = req.body;

    if (Lead.db.readyState === 1) {
      const lead = await Lead.findById(id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found' });
      }

      if (status) lead.status = status;
      if (assignedTo) lead.assignedTo = assignedTo;

      if (note && note.trim()) {
        lead.notes.push({
          text: note.trim(),
          author: req.user?.name || 'Counselor',
          createdAt: new Date()
        });
      }

      await lead.save();

      return res.status(200).json({
        success: true,
        message: 'Lead updated successfully',
        data: lead
      });
    } else {
      const lead = memoryLeads.find((l) => l._id === id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found' });
      }

      if (status) lead.status = status;
      if (assignedTo) lead.assignedTo = assignedTo;

      if (note && note.trim()) {
        lead.notes.push({
          text: note.trim(),
          author: req.user?.name || 'Counselor',
          createdAt: new Date()
        });
      }

      lead.updatedAt = new Date();

      return res.status(200).json({
        success: true,
        message: 'Lead updated successfully',
        data: lead
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Export leads to CSV
// @route   GET /api/admin/leads/export
// @access  Private (Admin)
export const exportLeadsCSV = async (req, res, next) => {
  try {
    let leads = [];
    if (Lead.db.readyState === 1) {
      leads = await Lead.find().sort({ createdAt: -1 });
    } else {
      leads = memoryLeads;
    }

    const headers = [
      'ID',
      'Name',
      'Phone',
      'Email',
      'State',
      'NEET Score',
      'NEET Status',
      'Preferred University',
      'Budget',
      'Status',
      'Source',
      'Source Page',
      'Assigned To',
      'Created Date'
    ];

    const rows = leads.map((l) => [
      `"${l._id}"`,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.state || ''}"`,
      `"${l.neetScore || ''}"`,
      `"${l.neetStatus || ''}"`,
      `"${l.preferredUniversity || ''}"`,
      `"${l.budgetRange || ''}"`,
      `"${l.status || ''}"`,
      `"${l.source || ''}"`,
      `"${l.sourcePage || ''}"`,
      `"${l.assignedTo || ''}"`,
      `"${new Date(l.createdAt).toLocaleDateString('en-IN')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=MH_Medical_Leads_${Date.now()}.csv`);
    return res.status(200).send(csvContent);
  } catch (err) {
    next(err);
  }
};
