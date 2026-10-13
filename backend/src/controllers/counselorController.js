// Smart counselor query answering engine for AI Admissions Assistant
export const askCounselor = async (req, res, next) => {
  try {
    const { question, userContext } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please ask a valid MBBS abroad or Uzbekistan admission question'
      });
    }

    const q = question.toLowerCase();

    let reply = '';
    let followUpSuggestions = [];

    if (q.includes('nmc') || q.includes('fmgl') || q.includes('rule') || q.includes('valid') || q.includes('india')) {
      reply = `All leading medical universities in Uzbekistan (such as Tashkent Medical Academy, Samarkand State Medical University, and Bukhara State Medical Institute) follow the 54-month coursework + 12-month in-house internship requirement with 100% English medium instruction, fully satisfying NMC FMGL 2021 regulations. Graduates are eligible to appear for the NExT (National Exit Test) licensing exam upon return to India.`;
      followUpSuggestions = [
        "What is the total fee in Uzbekistan?",
        "What is the minimum NEET score required?",
        "Which university is best: TMA or SSMU?"
      ];
    } else if (q.includes('fee') || q.includes('cost') || q.includes('budget') || q.includes('price') || q.includes('lakh')) {
      reply = `The annual tuition fee in government medical universities in Uzbekistan ranges from $3,500 to $4,200 USD (~₹2.95L - ₹3.55L INR per year). Total 6-year cost including university hostel, Indian mess food, visa, and insurance is typically ₹24 Lakhs to ₹32 Lakhs — less than one-third the cost of Indian private medical colleges.`;
      followUpSuggestions = [
        "Calculate my exact 6-year MBBS budget",
        "Check eligibility for 2026 intake",
        "Apply for conditional seat booking"
      ];
    } else if (q.includes('neet') || q.includes('eligib') || q.includes('marks') || q.includes('age') || q.includes('pcb')) {
      reply = `To be eligible for MBBS in Uzbekistan (2026 Intake):\n1. Must have qualified NEET (minimum 50th percentile for General / 40th percentile for OBC/SC/ST).\n2. Minimum 50% in Physics, Chemistry & Biology (40% for Reserved categories) in Class 12.\n3. Must be at least 17 years old by December 31, 2026.`;
      followUpSuggestions = [
        "Check my eligibility instantly",
        "List of documents required",
        "How to apply step-by-step"
      ];
    } else if (q.includes('food') || q.includes('mess') || q.includes('indian') || q.includes('hostel')) {
      reply = `Yes! All major partner universities (TMA, Samarkand, Bukhara, Andijan, CAU) feature dedicated Indian mess facilities serving North and South Indian vegetarian and non-vegetarian meals prepared by Indian chefs. Hostels have 2/3 sharing heated rooms with 24/7 CCTV and biometric access.`;
      followUpSuggestions = [
        "Explore university hostels",
        "What is the annual hostel fee?",
        "Talk to an Indian student in Tashkent"
      ];
    } else {
      reply = `Thank you for your question about medical education in Uzbekistan! Uzbekistan offers premier government medical universities compliant with NMC FMGL 2021, high cadaveric dissection exposure, and affordable tuition fees (~₹25L total). Would you like our senior counselor to call you or share the official fee structures on WhatsApp?`;
      followUpSuggestions = [
        "Compare top Uzbekistan medical universities",
        "Check 6-year fee calculator",
        "Book a 1-on-1 free counseling call"
      ];
    }

    return res.status(200).json({
      success: true,
      data: {
        reply,
        suggestions: followUpSuggestions
      }
    });
  } catch (err) {
    next(err);
  }
};
