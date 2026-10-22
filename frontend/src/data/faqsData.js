/**
 * Categorized FAQs for SEO, Answer Engine Optimization (AEO), and AI-Overviews
 * All answers are grounded in canonical data and NMC FMGL 2021 regulatory guidelines.
 */

export const faqsData = [
  {
    category: "General & Uzbekistan Overview",
    questions: [
      {
        q: "Is Uzbekistan good for MBBS for Indian students?",
        a: "Yes. Uzbekistan has emerged as a premier medical study destination due to its 100% English-medium curriculum, strict alignment with NMC FMGL 2021 regulations (54 months coursework + 12 months in-house internship), government university tuition starting from ₹15.2 Lakhs ($18,000 USD) for 6 years, safe secular living conditions, and direct 3.5-hour flights from New Delhi to Tashkent."
      },
      {
        q: "What is the duration of the MBBS program in Uzbekistan?",
        a: "The standard medical program (MD Physician, recognized as equivalent to MBBS in India) is 6 years in total. This strictly comprises 54 months (4.5 years) of continuous theoretical and bedside clinical training followed by 12 full months (1 year) of mandatory clinical internship in affiliated state teaching hospitals, fully conforming to NMC Foreign Medical Graduate Licentiate (FMGL) Regulations 2021."
      },
      {
        q: "Is the medium of instruction really 100% English?",
        a: "Yes. Recognized medical universities in Uzbekistan have dedicated International Medical Faculties where lectures, laboratory practicals, case presentations, and semester examinations are conducted 100% in English. Basic conversational Uzbek/Russian is taught as a medical terminology subject during the first two years to help students comfortably interact with local patients during clinical postings."
      },
      {
        q: "How long is the flight from India to Uzbekistan?",
        a: "The flight duration from Indira Gandhi International Airport, New Delhi (DEL) to Islam Karimov Tashkent International Airport (TAS) is approximately 3.5 hours on direct, non-stop flights operated by Uzbekistan Airways and IndiGo. This makes Uzbekistan one of the closest and most accessible international MBBS destinations for Indian families."
      }
    ]
  },
  {
    category: "NMC & Regulatory Compliance",
    questions: [
      {
        q: "Is NEET qualification mandatory for MBBS in Uzbekistan?",
        a: "Yes. In accordance with National Medical Commission (NMC) regulations, every Indian citizen or OCI candidate seeking admission to any foreign medical institution must qualify the NEET-UG examination. The NEET-UG scorecard is valid for 3 years from the date of declaration for foreign medical admission."
      },
      {
        q: "Can I practice medicine in India after completing MBBS from Uzbekistan?",
        a: "Yes. Upon completing the 6-year course (including the 1-year clinical internship in Uzbekistan) and obtaining your MD Physician degree and license to practice in Uzbekistan, you are eligible to register with the National Medical Commission (NMC) in India, appear for the National Exit Test (NExT Step 1), complete 1 year of Compulsory Rotating Medical Internship (CRMI) in India, and clear NExT Step 2 for permanent medical license registration."
      },
      {
        q: "Are Uzbekistan medical universities recognized globally?",
        a: "Yes. Recognized Uzbekistan state medical universities are listed in the World Directory of Medical Schools (WDOMS / WHO), accredited by FAIMER, recognized by ECFMG (USA), and chartered by the Ministry of Higher Education and Ministry of Health of the Republic of Uzbekistan. Graduates are eligible to appear for USMLE (USA), PLAB / UKMLA (United Kingdom), AMC (Australia), and NExT (India)."
      },
      {
        q: "Do Uzbekistan universities provide in-house clinical internship?",
        a: "Yes. Unlike some foreign medical destinations where students must find third-party hospitals, state medical universities in Uzbekistan (such as Tashkent Medical Academy and Samarkand State Medical University) operate their own 2,000 to 3,500-bed tertiary teaching hospitals where the 12-month internship is conducted under direct faculty supervision."
      }
    ]
  },
  {
    category: "Fees, Budget & Accommodation",
    questions: [
      {
        q: "How much does MBBS in Uzbekistan cost for Indian students?",
        a: "Annual tuition in recognized government universities ranges between $3,000 and $3,900 USD (~₹2.53 Lakhs to ₹3.30 Lakhs INR). Over the complete 6-year program, total tuition fee ranges from ₹15.2 Lakhs to ₹19.8 Lakhs ($18,000 to $23,400 USD). The complete 6-year all-inclusive budget—including tuition, university hostel, Indian mess food, annual medical insurance, visa renewal, and first-year documentation—ranges from ₹24.9 Lakhs to ₹31.7 Lakhs INR (~$29,500 to $37,500 USD), calculated at the benchmark rate of 1 USD = ₹84.50."
      },
      {
        q: "Is Indian food available on campus?",
        a: "Yes. All major state medical universities hosting Indian students operate dedicated Indian mess facilities right on campus. Professional Indian chefs prepare fresh, hygienic breakfast, lunch, and dinner, offering both North Indian and South Indian cuisines with pure vegetarian, Jain food, and halal non-vegetarian options."
      },
      {
        q: "What are the hostel and winter heating facilities like?",
        a: "University hostels are secure, gated residential buildings with 2 or 3 students per room. Rooms are furnished with beds, study desks, wardrobes, and high-speed Wi-Fi. In winter, all hostels operate 24/7 centralized hot-water radiator heating systems. Hostels maintain strict biometric entry, round-the-clock CCTV surveillance, and dedicated Indian student wardens."
      },
      {
        q: "Are tuition fees paid directly to the university?",
        a: "Yes. 100% of all tuition and official hostel fees are payable directly by the student or parents into the official bank account of the respective medical university via international bank wire (Swift/TT). MH GLOBAL EDUCATION CONSULTANT charges zero tuition handling markups."
      }
    ]
  },
  {
    category: "Safety, Parents' Queries & Admission",
    questions: [
      {
        q: "Is Uzbekistan safe for female Indian medical students?",
        a: "Yes. Uzbekistan is globally recognized as one of the safest countries in Central Asia, with very low crime rates and a progressive, secular society. Medical campuses and student hostels feature separate female wings, biometric security, night curfews, and full-time female Indian caretakers."
      },
      {
        q: "What is the eligibility criteria for 10+2 / 12th board exams?",
        a: "Candidates must have passed 10+2 with Physics, Chemistry, Biology, and English as core subjects from a recognized board with at least 50% aggregate marks in PCB for General category (40% aggregate in PCB for OBC/SC/ST categories) and be at least 17 years of age by December 31st of the admission year."
      },
      {
        q: "How long does the student visa process take for Uzbekistan?",
        a: "After the university issues the provisional admission letter and the Ministry of Foreign Affairs (MFA) releases the electronic visa teletex code, the official student visa (A-2 category) is typically processed and stamped within 10 to 15 working days."
      }
    ]
  }
];

export const getAllFaqs = () => {
  return faqsData.flatMap((category) => category.questions);
};
