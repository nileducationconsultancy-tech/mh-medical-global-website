/**
 * Categorized FAQs for SEO, Answer Engine Optimization (AEO), and AI-Overviews
 */

export const faqsData = [
  {
    category: "General & Uzbekistan Overview",
    questions: [
      {
        q: "Is Uzbekistan good for MBBS for Indian students?",
        a: "Yes. Uzbekistan has emerged as a top medical destination due to its 100% English-medium curriculum, full compliance with NMC FMGL 2021 regulations (54 months coursework + 12 months in-country internship), affordable total packages (₹18L–₹26L for 6 years), safe living conditions, and direct 3-hour flights from New Delhi to Tashkent."
      },
      {
        q: "What is the duration of the MBBS program in Uzbekistan?",
        a: "The standard medical program (MD Physician, equivalent to MBBS) is 6 years in total. This comprises 5 years (60 months) of rigorous theoretical and clinical training followed by 1 full year (12 months) of mandatory clinical internship in affiliated teaching hospitals in Uzbekistan, strictly compliant with NMC guidelines."
      },
      {
        q: "Is the medium of instruction really in English?",
        a: "Yes. Recognized medical universities in Uzbekistan have established separate International Medical Faculties where lectures, laboratory sessions, clinical case discussions, and final examinations are conducted 100% in English."
      }
    ]
  },
  {
    category: "NMC & Regulatory Compliance",
    questions: [
      {
        q: "Is NEET qualification mandatory for MBBS in Uzbekistan?",
        a: "Yes. As per the National Medical Commission (NMC) regulations, every Indian citizen or OCI candidate seeking admission to any foreign medical institution must have qualified the NEET-UG examination. The NEET result is valid for 3 years from the date of declaration for foreign study."
      },
      {
        q: "Can I practice medicine in India after completing MBBS from Uzbekistan?",
        a: "Yes. After completing the 6-year course (including the 1-year internship in Uzbekistan) and obtaining your MD Physician degree and license in Uzbekistan, you can register with the National Medical Commission (NMC) in India, appear for the National Exit Test (NExT Step 1), complete 1 year of internship (CRMI) in India, and clear NExT Step 2 for permanent medical practice registration."
      },
      {
        q: "Are Uzbekistan medical degrees recognized globally?",
        a: "Yes. Recognized Uzbekistan medical universities are listed in the World Directory of Medical Schools (WDOMS) / WHO, accredited by FAIMER, ECFMG (USA), and recognized by the Ministry of Higher Education and Ministry of Health of the Republic of Uzbekistan, making graduates eligible for USMLE, PLAB (UK), AMC (Australia), and NExT (India)."
      }
    ]
  },
  {
    category: "Fees, Budget & Accommodation",
    questions: [
      {
        q: "How much does MBBS in Uzbekistan cost for Indian students?",
        a: "The annual tuition fee in government medical universities ranges from $3,200 to $3,900 USD (~₹2.7 Lakhs to ₹3.3 Lakhs INR). Adding hostel accommodation ($500–$700/year) and authentic Indian mess food ($1,000–$1,100/year), the complete 6-year all-inclusive budget is typically ₹20 Lakhs to ₹26 Lakhs INR."
      },
      {
        q: "Is Indian food available in Uzbekistan medical universities?",
        a: "Yes. All major universities hosting Indian students (such as Tashkent Medical Academy, Samarkand State Medical University, and Bukhara State Medical Institute) have dedicated on-campus Indian messes with Indian cooks serving vegetarian and halal non-vegetarian meals 3 times a day."
      },
      {
        q: "What are the hostel conditions like?",
        a: "Hostels are university-owned, secure buildings with 2 or 3 students per room. Rooms are equipped with beds, study tables, wardrobes, high-speed Wi-Fi, and 24/7 central radiator heating systems for the winter months. Hostels feature CCTV surveillance and strict security wardens."
      }
    ]
  },
  {
    category: "Admission & Student Visa",
    questions: [
      {
        q: "What is the eligibility criteria for 10+2 / 12th board exams?",
        a: "Candidates must have passed 10+2 with Physics, Chemistry, Biology, and English as core subjects from a recognized board with at least 50% aggregate marks in PCB for General category (40% aggregate in PCB for SC/ST/OBC categories) and be at least 17 years old by December 31st of the admission year."
      },
      {
        q: "How long does the student visa process take for Uzbekistan?",
        a: "Once the university issues the admission letter and the Ministry of Foreign Affairs (MFA) issues the electronic teletex confirmation (visa support), the student visa (A-2) is typically processed within 10 to 15 working days."
      },
      {
        q: "What documents are required to apply?",
        a: "Original 10th and 12th marksheet/certificates (with MEA Apostille), NEET-UG scorecard, valid passport (minimum 18-24 months validity), birth certificate, medical fitness certificate, HIV negative report, and passport-size photographs on white background."
      }
    ]
  }
];

export const getAllFaqs = () => {
  return faqsData.flatMap((category) => category.questions);
};
