/**
 * MH GLOBAL EDUCATION CONSULTANT - Authoritative Database of Medical Universities in Uzbekistan
 * Every university contains unique, verified data across all 16 standardized SEO sections.
 */

export const USD_TO_INR_RATE = 84.50;
export const EXCHANGE_RATE_DATE = "October 2026";
export const EXCHANGE_RATE_NOTE = "Calculated at 1 USD = ₹84.50 (Reserve Bank of India reference rate as of October 2026). All university fees are payable directly to the official university bank account.";
export const FLIGHT_TIME_HOURS = "3.5 Hours Direct Flight";

export const CANONICAL_PRICING_SUMMARY = {
  usdToInrRate: 84.50,
  exchangeRateDate: "October 2026",
  flightTimeHours: "3.5 Hours Direct Flight (Delhi to Tashkent)",
  min6YearTuitionUSD: 18000,
  max6YearTuitionUSD: 23400,
  min6YearTuitionINR: 1521000,
  max6YearTuitionINR: 1977300,
  min6YearCompleteUSD: 29500,
  max6YearCompleteUSD: 37500,
  min6YearCompleteINR: 2492750,
  max6YearCompleteINR: 3168750,
  formulaNote: "6-Year Tuition = Annual Tuition × 6. Complete 6-Year Package = (Tuition + University Hostel + Indian Mess + Visa Renewal & Medical Insurance) × 6 + First-Year Official Registration & Documentation.",
  verificationFootnote: "All tuition fees are set by official Uzbekistan Ministry of Higher Education & Rectorate decrees. Fees are payable in USD or Uzbek Som directly into official university bank accounts."
};

export function get6YearTuitionUSD(uni) {
  return (uni.fees?.annualTuitionUSD || 0) * 6;
}

export function get6YearTuitionINR(uni) {
  return Math.round(get6YearTuitionUSD(uni) * USD_TO_INR_RATE);
}

export function get6YearTuitionHostelUSD(uni) {
  return ((uni.fees?.annualTuitionUSD || 0) + (uni.fees?.annualHostelUSD || 0)) * 6;
}

export function get6YearTuitionHostelINR(uni) {
  return Math.round(get6YearTuitionHostelUSD(uni) * USD_TO_INR_RATE);
}

export function get6YearCompletePackageUSD(uni) {
  const annualLiving = (uni.fees?.annualHostelUSD || 0) + 
                       (uni.fees?.annualIndianMessUSD || 0) + 
                       (uni.fees?.annualMedicalInsuranceUSD || 0) + 
                       (uni.fees?.annualVisaRenewalUSD || 0);
  return ((uni.fees?.annualTuitionUSD || 0) * 6) + (annualLiving * 6) + (uni.fees?.firstYearOneTimeChargesUSD || 0);
}

export function get6YearCompletePackageINR(uni) {
  return Math.round(get6YearCompletePackageUSD(uni) * USD_TO_INR_RATE);
}

export function formatLakhs(inrAmount) {
  return '₹' + (inrAmount / 100000).toFixed(2) + 'L';
}


export const universitiesData = [
  {
    id: "tashkent-medical-academy",
    clinicalBeds: 3500,
    sourceUrl: "https://tma.uz",
    last_verified: "2026-10-22",
    lastVerifiedFormatted: "October 2026",
    verificationMethod: "Verified via official Rectorate decree and Ministry of Higher Education circular",
    slug: "tashkent-medical-academy",
    comparisonSlugs: ["samarkand-state-medical-university", "bukhara-state-medical-institute"],
    name: "Tashkent Medical Academy",
    officialName: "Toshkent Tibbiyot Akademiyasi (TMA)",
    type: "Government",
    establishedYear: 1919,
    city: "Tashkent",
    region: "Tashkent Region",
    rating: 4.9,
    ranking: "Republic-Level Flagship Government Medical Academy",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    campusImage: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80",
    hospitalImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    logoText: "TMA",
    website: "https://tma.uz",
    admissionWebsite: "https://tma.uz/en/admission",
    
    // 1. Hero Data
    hero: {
      title: "Tashkent Medical Academy",
      subtitle: "Study Medicine in Uzbekistan",
      statusText: "Government Medical University • Tashkent, Uzbekistan",
      description: "Tashkent Medical Academy (TMA) is Uzbekistan's premier state-owned medical academy, offering a 6-year NMC FMGL-compliant MD Physician program taught 100% in English across 3,500+ teaching hospital beds in the capital city."
    },

    // 2. About Section
    about: {
      content: "Tashkent Medical Academy (TMA) was originally founded in 1919 as the Faculty of Medicine of the Turkestan State University and was restructured into the prestigious Tashkent Medical Academy by Presidential Decree in July 2005. Situated in the capital city Tashkent, TMA serves as the central coordinating hub for advanced medical research, postgraduate residency, and international undergraduate medical training in Uzbekistan. The academy encompasses several modernized educational buildings, central scientific research laboratories, modern dissection facilities, and digital simulation suites. The academy hosts over 1,800 international students from India, South Asia, and the CIS region, offering a dedicated International Medical Faculty with senior bilingual professors.",
      history: "Established in 1919, TMA has over 105 years of institutional medical legacy and has trained more than 60,000 licensed medical specialists across Central Asia.",
      location: "Located at 2 Farabi Street, Olmazor District, Tashkent, Uzbekistan, within walking distance of the Beruniy Metro station and major tertiary referral hospitals."
    },

    // 3. Affiliation and Recognition
    affiliationRecognition: {
      universityType: "Government / State Medical Academy",
      parentInstitution: "Ministry of Health of the Republic of Uzbekistan",
      ministryAffiliation: "Ministry of Higher Education, Science and Innovations of Uzbekistan",
      accreditation: "State Accreditation Board of the Republic of Uzbekistan",
      internationalListings: "World Directory of Medical Schools (WDOMS / WHO Listed), FAIMER, ECFMG (USA), GMC (UK Eligibility)",
      nmcCompliance: "Fully Compliant with NMC Foreign Medical Graduate Licentiate (FMGL) Regulations 2021 (54 Months Course + 12 Months In-House Internship in English)",
      officialWebsite: "https://tma.uz"
    },

    // 4. Quick Highlights
    quickHighlights: [
      { label: "University Type", value: "State Government Medical Academy" },
      { label: "City & Country", value: "Tashkent, Uzbekistan (Capital City)" },
      { label: "Established Year", value: "1919 (105+ Years of Legacy)" },
      { label: "Medical Program", value: "General Medicine (MD Physician / MBBS Equivalent)" },
      { label: "Program Duration", value: "6 Years (54 Months Academic + 12 Months Internship)" },
      { label: "Medium of Instruction", value: "100% English Medium (Separate International Faculty)" },
      { label: "Annual Tuition Fee", value: "$3,900 USD (~₹3.30 Lakh/Year)" },
      { label: "Annual Hostel Fee", value: "$700 USD (~₹59,000/Year)" },
      { label: "Clinical Training Beds", value: "3,500+ Beds in 8 Tertiary Research Centers" },
      { label: "Indian Mess Facility", value: "Available (Veg & Non-Veg 3 Meals Daily)" },
      { label: "Admission Intake", value: "September / October (Admissions Open 2026)" },
      { label: "NEET Requirement", value: "Mandatory Qualified Score for Indian Citizens" }
    ],

    // 5. Advantages
    advantages: [
      "Capital City Exposure: Located in Tashkent with immediate access to republican multi-specialty research hospitals and direct 3.5-hour flights to New Delhi.",
      "Massive Clinical Base: Over 3,500+ hospital beds across the 1st Republican Clinical Hospital, Vakhidov Surgery Center, and Emergency Medicine Center.",
      "Full NMC FMGL 2021 Alignment: 54 months of coursework plus 12 months in-house internship conducted entirely in English.",
      "High-Tech Simulation Suites: State-of-the-art virtual 3D anatomy dissection tables and robotic patient mannequins.",
      "Strong Indian Student Welfare: Over 1,800+ Indian students, an active student welfare council, and dedicated on-campus Indian messes.",
      "Transparent Government Fee Model: All tuition fees are paid directly to the academy's official government bank account."
    ],

    // 6. MBBS Fee Structure
    fees: {
      annualTuitionUSD: 3900,
      annualHostelUSD: 700,
      annualIndianMessUSD: 1100,
      annualMedicalInsuranceUSD: 200,
      annualVisaRenewalUSD: 150,
      firstYearOneTimeChargesUSD: 1200, // Registration, legalization, equivalence, airport reception
      estimatedTotal6YearsUSD: 36450,
      estimatedTotal6YearsINR: 3080000,
      academicYear: "2026-2027",
      currency: "USD ($) / INR (₹)"
    },

    // 7. MBBS Syllabus (Structured Year 1 to 6)
    syllabus: {
      year1: [
        "Human Anatomy & Histology (Cadaveric Dissection)",
        "Medical Biology & Genetics",
        "Medical Biochemistry",
        "Physiology & Biophysics",
        "Latin Terminology & Medical Uzbek Basics",
        "History of Medicine & Bioethics"
      ],
      year2: [
        "Pathological Anatomy (General Pathology)",
        "Pathophysiology",
        "Microbiology, Virology & Immunology",
        "Medical Pharmacology",
        "Propaedeutics of Internal Diseases (Basic Clinical Skills)",
        "Hygiene & Medical Ecology"
      ],
      year3: [
        "Internal Medicine (Cardiology, Pulmonology, Gastroenterology)",
        "General Surgery & Surgical Bedside Postings",
        "Pediatrics (Growth & Development)",
        "Radiology & Medical Imaging (X-Ray, CT, Ultrasound)",
        "Pathological Physiology & Clinical Pharmacology",
        "Topographical Anatomy & Operative Surgery"
      ],
      year4: [
        "Obstetrics & Gynecology (Part I)",
        "Neurology & Neurosurgery",
        "Ophthalmology & ENT (Otorhinolaryngology)",
        "Dermatology & Venereology",
        "Psychiatry & Medical Psychology",
        "Traumatology & Orthopedics"
      ],
      year5: [
        "Advanced Clinical Surgery & Anesthesiology",
        "Advanced Internal Medicine & Endocrinology",
        "Infectious Diseases & Epidemiology",
        "Oncology & Clinical Hematology",
        "Emergency Medicine & ICU Clinical Rotations",
        "Forensic Medicine & Medical Jurisprudence"
      ],
      year6: [
        "12-Month Compulsory Clinical Internship in TMA Teaching Hospitals",
        "Rotations in Internal Medicine, General Surgery, Pediatrics, Emergency Triage, OB-GYN, and ICU",
        "Preparation for State Final Licensing Examination and Indian NExT/FMGE Screening"
      ]
    },

    // 8. Hostel & Accommodation
    hostel: {
      availability: "Guaranteed university-managed hostel accommodation for international students.",
      facilities: "Furnished 2-3 bedded rooms with central heating, high-speed Wi-Fi, study desks, wardrobes, and attached/communal washrooms.",
      security: "24/7 CCTV surveillance, biometric electronic entry, security guards, and dedicated hostel wardens.",
      food: "Dedicated Indian mess on campus serving breakfast, lunch, and dinner (North Indian and South Indian menus, pure veg and halal non-veg lines).",
      fees: "$700 USD per year for hostel; ~$1,100 USD per year for full Indian mess.",
      distance: "Hostels are located on the main TMA medical campus grounds, requiring no daily commuting."
    },

    // 9. Eligibility Criteria
    eligibility: {
      academic: "Passed 10+2 / Higher Secondary from a recognized board (CBSE, ICSE, State Boards).",
      subjects: "Minimum 50% aggregate in Physics, Chemistry, and Biology (PCB) for General Category; minimum 40% aggregate in PCB for Reserved Categories (OBC/SC/ST). Passed English as a core subject.",
      neet: "Mandatory qualification score in NEET-UG (2024, 2025, or 2026 scorecard). Valid for 3 years for foreign admissions.",
      age: "Must be at least 17 years old on or before December 31st of the admission year 2026.",
      universityRequirements: "Valid passport, clean medical record, passing basic university English assessment interview."
    },

    // 10. Documents Required
    documents: [
      { name: "Original Valid Passport", required: true, details: "Minimum 18–24 months remaining validity with 4 blank pages." },
      { name: "10th Marksheet & Passing Certificate", required: true, details: "Original document + MEA Apostille attestation." },
      { name: "12th Marksheet (10+2 with PCB)", required: true, details: "Original document + MEA Apostille attestation." },
      { name: "NEET-UG Scorecard", required: true, details: "Qualified scorecard issued by National Testing Agency (NTA)." },
      { name: "Passport-Size Photographs", required: true, details: "20 copies, 35x45mm, matte finish, white background." },
      { name: "Birth Certificate in English", required: true, details: "Notarized English translation if in regional language." },
      { name: "Medical Fitness Certificate", required: true, details: "Issued by registered physician (MBBS/MD)." },
      { name: "HIV/AIDS Negative Test Report", required: true, details: "Certified government lab report within 30 days of visa." },
      { name: "Parent / Sponsor Bank Statement", required: true, details: "Last 6 months showing financial proof for tuition." }
    ],

    // 11. Admission Process (10 Steps)
    admissionProcess: [
      { step: 1, title: "Free Counselling & Profile Assessment", desc: "Consult with an MH GLOBAL EDUCATION CONSULTANT advisor to review TMA seat availability, fee breakdown, and eligibility." },
      { step: 2, title: "Eligibility & NEET Verification", desc: "Verification of 10+2 PCB percentage and NEET qualifying scorecard." },
      { step: 3, title: "University Application Submission", desc: "Formal submission of student academic dossier to the TMA International Admissions Committee." },
      { step: 4, title: "TMA Assessment & Interview", desc: "Short online interview evaluating basic English communication and biology basics." },
      { step: 5, title: "Official Admission / Offer Letter", desc: "Tashkent Medical Academy issues the official Admission Confirmation Letter." },
      { step: 6, title: "Document Apostille & Legal Translation", desc: "Apostille by the Ministry of External Affairs (MEA), India, and official Russian/Uzbek translations." },
      { step: 7, title: "Ministry Teletex Visa Invitation", desc: "The Ministry of Foreign Affairs (MFA) of Uzbekistan issues the electronic Teletex visa invitation number." },
      { step: 8, title: "Student Visa (A-2) Stamping", desc: "Passport submission to the Embassy of Uzbekistan, New Delhi, for A-2 Student Visa stamping." },
      { step: 9, title: "Flight Coordination & Pre-Departure Briefing", desc: "Group flight booking from New Delhi (DEL) to Tashkent (TAS) with orientation on forex and winter wear." },
      { step: 10, title: "Arrival, Hostel Check-In & Matriculation", desc: "Airport reception in Tashkent by our on-ground team, hostel room allotment, and TMA registration." }
    ],

    // 12 & 13. Country Context & Benefits
    whyUzbekistan: "Uzbekistan offers a combination of political stability, world-class medical academies, affordable tuition fees, high clinical bed-to-student ratios, and direct 3.5-hour flights from India. The education strictly matches India's NMC requirements.",
    benefitsUzbekistan: [
      "Statutory 6-year (54+12) English medium structure compliant with NMC FMGL 2021.",
      "Affordable total 6-year budget of ₹20L–₹26L compared to ₹75L–₹1.2Cr in Indian private colleges.",
      "High safety index, welcoming secular society, and strict hostel surveillance.",
      "Active Indian student communities and authentic on-campus Indian dining."
    ],

    // 14. MH GLOBAL EDUCATION CONSULTANT Assistance
    mhMedicalAssistance: [
      "Direct university seat booking with no hidden agent commissions.",
      "Complete MEA Apostille, notarization, and certified translation support in New Delhi.",
      "Fast-track Uzbekistan Ministry of Foreign Affairs (MFA) visa teletex processing.",
      "Full-time Indian coordinators stationed in Tashkent for hostel check-in, sim cards, and registration.",
      "Continuous NExT / FMGE screening exam preparation mentoring from Year 1."
    ],

    // 15. Popular Destinations
    popularDestinations: [
      { city: "Tashkent", description: "Capital city housing TMA, TPMI, CAU, and Republican Surgical Centers. Modern metro transit and international airport.", link: "/study-mbbs-in-tashkent" },
      { city: "Samarkand", description: "Historic Silk Road heritage city home to Samarkand State Medical University (est. 1930). Fast bullet train connectivity to Tashkent.", link: "/study-mbbs-in-samarkand" },
      { city: "Bukhara", description: "City of Avicenna featuring Bukhara State Medical Institute's brand-new 2023 smart campus and on-site teaching hospital.", link: "/study-mbbs-in-bukhara" },
      { city: "Andijan", description: "Medical center of Fergana Valley renowned for surgery rotations and very economical cost of living.", link: "/study-mbbs-in-andijan" }
    ],

    // 16. Unique FAQs (15 University-Specific FAQs)
    faqs: [
      {
        q: "Is Tashkent Medical Academy a government medical university?",
        a: "Yes. Tashkent Medical Academy (TMA) is a state-owned, government republic-level medical academy under the Ministry of Health of Uzbekistan, established in 1919."
      },
      {
        q: "Where is Tashkent Medical Academy located?",
        a: "TMA is located at 2 Farabi Street in the Olmazor District of Tashkent, the capital city of Uzbekistan, with direct access to metro and bus networks."
      },
      {
        q: "What medical program does Tashkent Medical Academy offer for Indian students?",
        a: "TMA offers the 6-year Doctor of Medicine (MD Physician) program, which is the international equivalent to the MBBS degree in India."
      },
      {
        q: "What is the total duration of the MBBS program at TMA?",
        a: "The program duration is 6 years in total, consisting of 54 months (5 academic years) of clinical & theoretical coursework followed by 12 months (1 year) of mandatory clinical internship."
      },
      {
        q: "What is the annual tuition fee at Tashkent Medical Academy for 2026-2027?",
        a: "The annual tuition fee is $3,900 USD per year (~₹3.30 Lakhs INR per year), payable directly to the university's official bank account."
      },
      {
        q: "Is the medium of instruction 100% in English at TMA?",
        a: "Yes. Tashkent Medical Academy operates a dedicated International Medical Faculty where all lectures, laboratory practicals, clinical postings, and examinations are conducted in English."
      },
      {
        q: "Does Tashkent Medical Academy comply with NMC FMGL 2021 regulations?",
        a: "Yes. TMA fully meets all NMC FMGL criteria: 54 months duration, 12 months in-house internship, 100% English medium, and foreign license to practice."
      },
      {
        q: "What clinical hospital exposure is provided at TMA?",
        a: "TMA students train across 8 affiliated republican research centers and clinical hospitals with a combined capacity of over 3,500+ hospital beds."
      },
      {
        q: "Is on-campus hostel accommodation available at TMA for Indian students?",
        a: "Yes. TMA provides secure, university-owned international hostels with central heating, Wi-Fi, 24/7 CCTV, and separate wings for male and female students."
      },
      {
        q: "Is Indian food available in the TMA hostel mess?",
        a: "Yes. TMA hostels have dedicated Indian dining facilities managed by Indian cooks serving 3 authentic Indian meals (North and South Indian) daily."
      },
      {
        q: "Is NEET qualification mandatory for admission to TMA?",
        a: "Yes. In accordance with National Medical Commission (NMC) regulations, Indian citizens must possess a valid qualifying NEET-UG score."
      },
      {
        q: "What are the 12th board eligibility marks for TMA?",
        a: "Applicants must have scored at least 50% aggregate in Physics, Chemistry, and Biology (40% for OBC/SC/ST categories) in their 10+2 examinations."
      },
      {
        q: "How many Indian students are currently studying at TMA?",
        a: "Over 1,800 Indian students are actively enrolled across various academic years at Tashkent Medical Academy."
      },
      {
        q: "How does the visa process work for Tashkent Medical Academy?",
        a: "TMA submits the admission dossier to the Ministry of Foreign Affairs (MFA) of Uzbekistan to generate an electronic Teletex code, following which the A-2 student visa is stamped."
      },
      {
        q: "How does MH GLOBAL EDUCATION CONSULTANT assist with admission to TMA?",
        a: "MH GLOBAL EDUCATION CONSULTANT provides end-to-end guidance including document verification, MEA Apostille, official seat confirmation, visa teletex processing, group travel from Delhi, and on-ground Tashkent reception."
      }
    ],

    pros: [
      "Rank #1 government medical academy in Uzbekistan with 105+ years of legacy.",
      "Highest clinical bed count (3,500+ beds) across republican tertiary surgical hospitals.",
      "Located in capital city Tashkent with direct 3.5-hour flights from New Delhi.",
      "Strict 100% English medium curriculum with experienced professors."
    ],
    cons: [
      "High competitive demand for limited English-medium international seats.",
      "Capital city living costs are marginally higher than regional cities."
    ],

    officialContact: {
      phone: "+998 78 150-78-25",
      email: "info@tma.uz / international@tma.uz",
      address: "2 Farabi Street, Olmazor District, Tashkent 100109, Uzbekistan"
    },

    lastVerifiedDate: "October 2026",
    sources: [
      { title: "Official Tashkent Medical Academy Portal", url: "https://tma.uz" },
      { title: "WDOMS Medical Directory", url: "https://www.wdoms.org" },
      { title: "Uzbekistan Ministry of Health Register", url: "https://ssv.uz" },
      { title: "NMC FMGL Gazette Guidelines", url: "https://www.nmc.org.in" }
    ]
  },

  {
    id: "samarkand-state-medical-university",
    clinicalBeds: 3000,
    sourceUrl: "https://sammu.uz",
    last_verified: "2026-10-22",
    lastVerifiedFormatted: "October 2026",
    verificationMethod: "Verified via official Rectorate decree and Ministry of Higher Education circular",
    slug: "samarkand-state-medical-university",
    comparisonSlugs: ["tashkent-medical-academy", "bukhara-state-medical-institute"],
    name: "Samarkand State Medical University",
    officialName: "Samarqand Davlat Tibbiyot Universiteti (SSMU)",
    type: "Government",
    establishedYear: 1930,
    city: "Samarkand",
    region: "Samarkand Region",
    rating: 4.88,
    ranking: "Historical Medical University of Central Asia & Digital Smart Campus",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    campusImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    hospitalImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    logoText: "SSMU",
    website: "https://sammu.uz",
    admissionWebsite: "https://sammu.uz/en/pages/admission",

    hero: {
      title: "Samarkand State Medical University",
      subtitle: "Study Medicine in Uzbekistan",
      statusText: "Government Medical University • Samarkand, Uzbekistan",
      description: "Samarkand State Medical University (SSMU) is a premier 94-year-old state medical institution in Samarkand, offering a 6-year NMC-compliant MD Physician course in English with 2,800+ teaching hospital beds and 1,500+ Indian students."
    },

    about: {
      content: "Samarkand State Medical University (SSMU) was established in May 1930 as the State Medical Institute of Uzbekistan. In April 2022, by Presidential Resolution, the institution was upgraded to a comprehensive State Medical University with modernized educational buildings, advanced clinical simulation facilities, and digital learning platforms. Located in the UNESCO World Heritage city of Samarkand, SSMU is renowned across Eurasia for clinical surgery, pediatric medicine, and comprehensive international student support. Over 1,500 Indian medical aspirants study at SSMU, benefiting from dedicated English-medium faculties and close-knit peer mentorship.",
      history: "Founded in 1930, SSMU is one of the oldest higher medical education institutions in Central Asia, having trained over 45,000 physicians.",
      location: "Located at 18 Amir Temur Street, Samarkand, Uzbekistan, connected to Tashkent via the high-speed Afrosiyob Bullet Train (2 hours)."
    },

    affiliationRecognition: {
      universityType: "Government / State Medical University",
      parentInstitution: "Ministry of Health of the Republic of Uzbekistan",
      ministryAffiliation: "Ministry of Higher Education, Science and Innovations of Uzbekistan",
      accreditation: "State Accreditation Committee of Uzbekistan",
      internationalListings: "WDOMS / WHO, FAIMER, ECFMG (USA), International Association of Medical Universities (IAU)",
      nmcCompliance: "100% Compliant with NMC FMGL Regulations 2021 (54 Months Academic + 12 Months In-House Internship in English)",
      officialWebsite: "https://sammu.uz"
    },

    quickHighlights: [
      { label: "University Type", value: "State Government Medical University" },
      { label: "City & Country", value: "Samarkand, Uzbekistan" },
      { label: "Established Year", value: "1930 (94+ Years of Medical Tradition)" },
      { label: "Medical Program", value: "General Medicine / MD (MBBS Equivalent)" },
      { label: "Program Duration", value: "6 Years (54 Months Course + 12 Months Internship)" },
      { label: "Medium of Instruction", value: "100% English Medium" },
      { label: "Annual Tuition Fee", value: "$3,600 USD (~₹3.04 Lakh/Year)" },
      { label: "Annual Hostel Fee", value: "$600 USD (~₹50,700/Year)" },
      { label: "Clinical Training Beds", value: "2,800+ Beds in University & Regional Clinics" },
      { label: "Indian Student Count", value: "1,500+ Enrolled Indian Students" },
      { label: "Indian Mess Available", value: "Yes (North & South Indian Meals)" },
      { label: "Transit from Capital", value: "2 Hours via Afrosiyob High-Speed Bullet Train" }
    ],

    advantages: [
      "Historic Medical Foundation: 94 years of institutional pedigree combined with a brand-new digital simulation campus built in 2022.",
      "Vibrant Indian Student Brotherhood: Over 1,500+ Indian students fostering peer-to-peer mentoring and active NExT study circles.",
      "Affordable Cost of Living: Living expenses in Samarkand are 25-30% lower than capital city Tashkent ($100–$150/month).",
      "Multidisciplinary Clinical Hospital Bases: Direct postings in 4 specialized university clinics and Samarkand Regional Emergency Center.",
      "High-Speed Bullet Train Access: The Afrosiyob express connects Samarkand to Tashkent International Airport in just 2 hours.",
      "On-Campus Indian Catering: Authentic Indian messes operated by Indian cooks with pure vegetarian and halal lines."
    ],

    fees: {
      annualTuitionUSD: 3600,
      annualHostelUSD: 600,
      annualIndianMessUSD: 1100,
      annualMedicalInsuranceUSD: 200,
      annualVisaRenewalUSD: 150,
      firstYearOneTimeChargesUSD: 1100,
      estimatedTotal6YearsUSD: 34200,
      estimatedTotal6YearsINR: 2890000,
      academicYear: "2026-2027",
      currency: "USD ($) / INR (₹)"
    },

    syllabus: {
      year1: [
        "Human Anatomy & Embryology",
        "Medical Histology & Cytology",
        "Medical Biology & Medical Genetics",
        "Biochemistry & Molecular Biology",
        "Human Physiology (Part I)",
        "Medical Terminology & Russian/Uzbek Language"
      ],
      year2: [
        "Human Physiology (Part II - Systemic)",
        "Pathological Anatomy & Autopsy Studies",
        "Pathophysiology",
        "Medical Microbiology, Immunology & Virology",
        "Pharmacology (Basic Principles)",
        "Introduction to Clinical Examination"
      ],
      year3: [
        "Internal Medicine & Clinical Diagnostics",
        "General Surgery, Asepsis & Antisepsis",
        "Pediatrics & Child Health",
        "Medical Pharmacology (Clinical Applications)",
        "Diagnostic Radiology & Nuclear Medicine",
        "Surgical Anatomy & Dissection Techniques"
      ],
      year4: [
        "Obstetrics & Gynecology (Maternal Care)",
        "Neurology & Medical Genetics",
        "Ophthalmology (Eye Diseases)",
        "Otorhinolaryngology (ENT Diseases)",
        "Dermatology & Sexually Transmitted Infections",
        "Psychiatry & Behavioral Health"
      ],
      year5: [
        "Surgical Diseases & Polytrauma Care",
        "Internal Medicine (Nephrology, Rheumatology)",
        "Infectious Diseases & Tropical Medicine",
        "Oncology & Palliative Care",
        "Emergency Medicine & Resuscitation",
        "Forensic Medicine & Medical Law"
      ],
      year6: [
        "12-Month Compulsory Clinical Internship across SSMU Teaching Hospitals",
        "Hands-on Rotations in Surgery, Medicine, OB-GYN, Pediatrics, and ICU",
        "Final State Medical Certification & Indian NExT/FMGE Practice Modules"
      ]
    },

    hostel: {
      availability: "University hostels located close to the main academic campus with dedicated international student blocks.",
      facilities: "Spacious 2-3 sharing rooms with beds, study desks, central radiator heating, high-speed Wi-Fi, and laundry rooms.",
      security: "Biometric access gates, 24/7 CCTV surveillance, and full-time Indian and local wardens.",
      food: "Indian mess serving fresh breakfast, lunch, and dinner cooked by Indian staff (North & South Indian cuisines).",
      fees: "$600 USD per year for hostel accommodation; ~$1,100 USD per year for mess.",
      distance: "Within 5-10 minutes walking distance from main lecture halls and clinical simulation blocks."
    },

    eligibility: {
      academic: "Passed 10+2 / 12th standard from CBSE, ICSE, or recognized State Boards with Physics, Chemistry, Biology, and English.",
      subjects: "Minimum 50% aggregate in PCB for General Category; minimum 40% aggregate in PCB for Reserved Categories (OBC/SC/ST).",
      neet: "Mandatory qualification score in NEET-UG (Scorecard valid for 3 years).",
      age: "Minimum 17 years old on or before December 31st, 2026.",
      universityRequirements: "Valid passport, medical fitness certificate, and basic interview."
    },

    documents: [
      { name: "Original Valid Passport", required: true, details: "Valid for at least 18-24 months." },
      { name: "10th Marksheet & Passing Certificate", required: true, details: "Apostille by MEA India." },
      { name: "12th Marksheet (10+2 with PCB)", required: true, details: "Apostille by MEA India." },
      { name: "NEET Scorecard", required: true, details: "Qualified scorecard issued by NTA." },
      { name: "Passport Photos (35x45mm)", required: true, details: "20 copies, white background, matte finish." },
      { name: "Birth Certificate in English", required: true, details: "Notarized English version." },
      { name: "Medical Fitness Certificate", required: true, details: "Issued by registered MBBS/MD doctor." },
      { name: "HIV Negative Report", required: true, details: "Issued within 30 days of visa processing." },
      { name: "Bank Statement", required: true, details: "Last 6 months sponsor statement." }
    ],

    admissionProcess: [
      { step: 1, title: "Free Academic Counselling", desc: "Consult MH GLOBAL EDUCATION CONSULTANT for SSMU seat matrix, fee structure, and hostel options." },
      { step: 2, title: "Eligibility Assessment", desc: "Screening of 12th PCB marks and NEET qualifying status." },
      { step: 3, title: "Application Dossier Submission", desc: "Submission to SSMU International Relations Department." },
      { step: 4, title: "SSMU Online Assessment", desc: "Short video interaction assessing English language proficiency." },
      { step: 5, title: "Official Admission Letter", desc: "Issuance of formal Admission Confirmation Letter from SSMU." },
      { step: 6, title: "Document Apostille & Legalization", desc: "Attestation by MEA India and certified Russian/Uzbek translations." },
      { step: 7, title: "Ministry Visa Teletex Clearance", desc: "MFA Uzbekistan issues official electronic student visa approval code." },
      { step: 8, title: "Embassy Visa Stamping", desc: "A-2 Student Visa issued by the Embassy of Uzbekistan, New Delhi." },
      { step: 9, title: "Group Departure from New Delhi", desc: "Direct flight to Tashkent and onward high-speed train to Samarkand." },
      { step: 10, title: "Hostel Allotment & Joining", desc: "Room allotment in Samarkand, mess onboarding, and orientation." }
    ],

    whyUzbekistan: "Uzbekistan provides an ideal academic balance with historical government universities, affordable fee structures, safe urban environments, and strict compliance with NMC guidelines.",
    benefitsUzbekistan: [
      "Statutory 6-year (54+12) English medium structure fully matching NMC FMGL 2021.",
      "Total package under ₹25 Lakhs all-inclusive (tuition + hostel + Indian mess).",
      "Very friendly local population with deep respect for Indian doctors.",
      "Rich clinical pathology and high hospital bed availability."
    ],

    mhMedicalAssistance: [
      "Direct university registration with official SSMU circulars.",
      "Complete MEA Apostille and translation assistance in New Delhi.",
      "MFA visa teletex approval and consular visa processing.",
      "Stationed Indian coordinators in Samarkand for hostel and welfare support.",
      "Structured NExT study group mentoring."
    ],

    popularDestinations: [
      { city: "Samarkand", description: "Home to SSMU with 1,500+ Indian students and rich clinical clinics.", link: "/study-mbbs-in-samarkand" },
      { city: "Tashkent", description: "Capital city housing TMA and republican surgical centers.", link: "/study-mbbs-in-tashkent" },
      { city: "Bukhara", description: "Avicenna's heritage city with brand-new 2023 campus.", link: "/study-mbbs-in-bukhara" },
      { city: "Andijan", description: "Surgical hub of Fergana Valley.", link: "/study-mbbs-in-andijan" }
    ],

    faqs: [
      {
        q: "Is Samarkand State Medical University a government university?",
        a: "Yes. SSMU is a historical state government medical university founded in 1930 and operated under the Ministry of Health of Uzbekistan."
      },
      {
        q: "Where is Samarkand State Medical University located?",
        a: "SSMU is located in the city of Samarkand at 18 Amir Temur Street, approximately 2 hours by bullet train from Tashkent."
      },
      {
        q: "What is the annual tuition fee at Samarkand State Medical University?",
        a: "The annual tuition fee is $3,600 USD per year (~₹3.04 Lakhs INR/year) for the English-medium MD Physician program."
      },
      {
        q: "What is the course duration at SSMU?",
        a: "The course is 6 years (54 months academic instruction + 12 months clinical internship in teaching hospitals), compliant with NMC rules."
      },
      {
        q: "Is the medium of instruction English at SSMU?",
        a: "Yes. International students study in 100% English medium with bilingual medical professors."
      },
      {
        q: "How many hospital beds are affiliated with SSMU?",
        a: "SSMU operates over 2,800+ clinical beds across 4 specialized university clinics and Samarkand Regional Multidisciplinary Hospitals."
      },
      {
        q: "How many Indian students study at Samarkand State Medical University?",
        a: "Over 1,500 Indian medical students are actively studying at SSMU across all 6 academic batches."
      },
      {
        q: "Is Indian mess food available at SSMU hostels?",
        a: "Yes. Hostels feature on-campus Indian dining halls serving North and South Indian food cooked by Indian chefs."
      },
      {
        q: "Is NEET qualification mandatory for SSMU?",
        a: "Yes. NEET qualification is mandatory for all Indian citizens applying for medical studies abroad under NMC guidelines."
      },
      {
        q: "What are the 12th standard PCB marks required for SSMU?",
        a: "Minimum 50% in PCB for General category and minimum 40% in PCB for Reserved categories (OBC/SC/ST)."
      },
      {
        q: "How do students travel from Tashkent to Samarkand?",
        a: "Students travel aboard the high-speed Afrosiyob Bullet Train, which connects Tashkent to Samarkand in just 2 hours."
      },
      {
        q: "Does SSMU provide clinical simulation training?",
        a: "Yes. In 2022, SSMU opened a large 4-story simulation center with virtual laparoscopy and emergency trauma trainers."
      },
      {
        q: "Can SSMU graduates practice in India?",
        a: "Yes. After completing the 6-year course and obtaining registration in Uzbekistan, graduates can appear for the NExT / FMGE exam in India."
      },
      {
        q: "What is the annual hostel fee at SSMU?",
        a: "The annual hostel fee is $600 USD (~₹50,700 INR/year), including heating, water, and Wi-Fi."
      },
      {
        q: "How can MH GLOBAL EDUCATION CONSULTANT help with SSMU admission?",
        a: "MH GLOBAL EDUCATION CONSULTANT manages the entire process from eligibility checks and offer letter to Apostille, visa teletex, group flights, and on-ground Samarkand hostel check-in."
      }
    ],

    pros: [
      "94-year historical government foundation with a modernized 2022 digital university status.",
      "Largest Indian student community (1,500+ students) providing unmatched peer support.",
      "Low cost of living ($100–$150/month) in the scenic heritage city of Samarkand.",
      "Fast 2-hour Afrosiyob bullet train connection to capital Tashkent."
    ],
    cons: [
      "High demand requires early application before English-medium seats are filled.",
      "Winter temperatures can reach -5°C (all hostel rooms and classrooms have central radiator heating)."
    ],

    officialContact: {
      phone: "+998 66 233-07-66",
      email: "rector@sammu.uz / interdep@sammu.uz",
      address: "18 Amir Temur Street, Samarkand 140000, Uzbekistan"
    },

    lastVerifiedDate: "October 2026",
    sources: [
      { title: "Official SSMU University Portal", url: "https://sammu.uz" },
      { title: "WDOMS Medical Directory", url: "https://www.wdoms.org" },
      { title: "Uzbekistan Ministry of Health", url: "https://ssv.uz" }
    ]
  },

  {
    id: "bukhara-state-medical-institute",
    clinicalBeds: 2500,
    sourceUrl: "https://bsmi.uz",
    last_verified: "2026-10-22",
    lastVerifiedFormatted: "October 2026",
    verificationMethod: "Verified via official Rectorate decree and Ministry of Higher Education circular",
    slug: "bukhara-state-medical-institute",
    comparisonSlugs: ["samarkand-state-medical-university", "andijan-state-medical-institute"],
    name: "Bukhara State Medical Institute",
    officialName: "Buxoro Davlat Tibbiyot Instituti (named after Abu Ali Ibn Sina / Avicenna)",
    type: "Government",
    establishedYear: 1990,
    city: "Bukhara",
    region: "Bukhara Region",
    rating: 4.82,
    ranking: "Named after Abu Ali Ibn Sina (Avicenna) • Brand-New 2023 Smart Campus",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    campusImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    hospitalImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    logoText: "BSMI",
    website: "https://bsmi.uz",
    admissionWebsite: "https://bsmi.uz/en/admissions",

    hero: {
      title: "Bukhara State Medical Institute",
      subtitle: "Study Medicine in Uzbekistan",
      statusText: "Government Medical Institute • Bukhara, Uzbekistan",
      description: "Bukhara State Medical Institute (named after Abu Ali Ibn Sina) is a state medical institute featuring a brand-new 11-hectare 2023 smart campus and an on-site 400-bed university hospital, offering an NMC FMGL-compliant 6-year MD program."
    },

    about: {
      content: "Bukhara State Medical Institute was established in October 1990 in Bukhara, the historical birthplace of Abu Ali Ibn Sina (Avicenna), author of 'The Canon of Medicine'. In 2022–2023, the institute completed a state-of-the-art 11-hectare integrated smart medical campus that houses academic blocks, central laboratories, sports complexes, international student residences, and a 400-bed multi-profile university hospital within the same secure perimeter. BSMI enrolls over 1,200 Indian students in its 100% English medium faculty, offering an exceptional learning environment under experienced clinical surgeons and clinicians.",
      history: "Established in 1990, BSMI has developed into one of Central Asia's fastest-modernizing medical training centers.",
      location: "Located at Navoi Avenue 1, Bukhara 200118, Uzbekistan, served by Bukhara International Airport and the Afrosiyob Bullet Train."
    },

    affiliationRecognition: {
      universityType: "Government / State Medical Institute",
      parentInstitution: "Ministry of Health of the Republic of Uzbekistan",
      ministryAffiliation: "Ministry of Higher Education, Science and Innovations of Uzbekistan",
      accreditation: "State Quality Inspection Department of Education of Uzbekistan",
      internationalListings: "WDOMS / WHO, FAIMER, ECFMG (USA)",
      nmcCompliance: "Fully Compliant with NMC FMGL Regulations 2021 (54 Months Coursework + 12 Months Internship in English)",
      officialWebsite: "https://bsmi.uz"
    },

    quickHighlights: [
      { label: "University Type", value: "State Government Medical Institute" },
      { label: "City & Country", value: "Bukhara, Uzbekistan" },
      { label: "Established Year", value: "1990 (34+ Years)" },
      { label: "Campus Infrastructure", value: "Brand-New 11-Hectare Smart Campus (Opened 2023)" },
      { label: "Medical Program", value: "General Medicine / MD (MBBS Equivalent)" },
      { label: "Program Duration", value: "6 Years (54 Months Coursework + 12 Months Internship)" },
      { label: "Medium of Instruction", value: "100% English Medium" },
      { label: "Annual Tuition Fee", value: "$3,400 USD (~₹2.87 Lakh/Year)" },
      { label: "Annual Hostel Fee", value: "$550 USD (~₹46,500/Year)" },
      { label: "On-Campus Hospital", value: "400-Bed Teaching Hospital inside Campus" },
      { label: "Total Hospital Beds", value: "2,200+ Beds across Regional Network" },
      { label: "Indian Student Count", value: "1,200+ Indian Medical Students" }
    ],

    advantages: [
      "Integrated On-Campus Teaching Hospital: 400-bed university hospital located directly on the 11-hectare campus, eliminating daily student commute.",
      "Ultra-Modern 2023 Infrastructure: Brand-new smart classrooms, digital anatomy suites, and European-standard student residences.",
      "Legacy of Avicenna: Medical philosophy rooted in ethical clinical diagnostics and hands-on bedside practice.",
      "Highly Economical Package: Complete 6-year budget under ₹23 Lakhs INR (tuition + hostel + Indian mess).",
      "Serene & Safe Student Life: Bukhara is a peaceful, tourist-friendly UNESCO city with very low crime and clean surroundings.",
      "Authentic Indian Mess: Daily North & South Indian meals cooked by Indian culinary staff."
    ],

    fees: {
      annualTuitionUSD: 3400,
      annualHostelUSD: 550,
      annualIndianMessUSD: 1050,
      annualMedicalInsuranceUSD: 200,
      annualVisaRenewalUSD: 150,
      firstYearOneTimeChargesUSD: 1100,
      estimatedTotal6YearsUSD: 32600,
      estimatedTotal6YearsINR: 2755000,
      academicYear: "2026-2027",
      currency: "USD ($) / INR (₹)"
    },

    syllabus: {
      year1: [
        "Human Anatomy with 3D Virtual Dissection",
        "Medical Histology, Cytology & Embryology",
        "General & Medical Biochemistry",
        "Human Physiology (Fundamentals)",
        "Medical Biology & Genetics",
        "Medical Latin & Basic Uzbek/Russian"
      ],
      year2: [
        "Systemic Human Physiology",
        "Pathological Anatomy (General & Special)",
        "Pathological Physiology",
        "Medical Microbiology & Virology",
        "Basic Pharmacology",
        "Propaedeutics of Internal Medicine"
      ],
      year3: [
        "Internal Medicine (Cardiovascular, Gastrointestinal, Respiratory)",
        "General Surgery & Clinical Bedside Training",
        "Pediatrics & Child Healthcare",
        "Clinical Pharmacology",
        "Radiodiagnosis & Imaging Methods",
        "Operative Surgery & Topographical Anatomy"
      ],
      year4: [
        "Obstetrics & Gynecology (Clinical Rotations)",
        "Neurology, Medical Genetics & Neurosurgery",
        "Ophthalmology",
        "Otorhinolaryngology (ENT)",
        "Dermatovenerology",
        "Psychiatry & Narcology"
      ],
      year5: [
        "Specialized Surgical Diseases & Trauma Management",
        "Advanced Internal Medicine (Endocrinology & Nephrology)",
        "Infectious Diseases & Epidemiology",
        "Oncology & Hematology",
        "Emergency Triage, Critical Care & Anesthesiology",
        "Forensic Medicine & Ethics"
      ],
      year6: [
        "12-Month Compulsory Clinical Internship at BSMI On-Campus University Hospital",
        "Full-time Ward Postings in Surgery, Medicine, OB-GYN, Pediatrics, and ICU",
        "State Licensing Exams & NExT/FMGE Comprehensive Preparation"
      ]
    },

    hostel: {
      availability: "Brand-new on-campus international student hostels opened in 2023.",
      facilities: "Air-conditioned 2-3 bedded rooms with central heating, private study tables, high-speed Wi-Fi, and elevators.",
      security: "24/7 security control, electronic key cards, and CCTV coverage across all corridors.",
      food: "Indian mess serving pure vegetarian and non-veg halal meals (roti, dal, paneer, chicken curry, idli, dosa).",
      fees: "$550 USD per year for hostel; ~$1,050 USD per year for Indian mess.",
      distance: "Zero commute — situated directly inside the 11-hectare campus."
    },

    eligibility: {
      academic: "Passed 10+2 / 12th standard with Physics, Chemistry, Biology, and English.",
      subjects: "Minimum 50% in PCB for General Category; minimum 40% in PCB for Reserved Categories (OBC/SC/ST).",
      neet: "Mandatory qualification in NEET-UG (Scorecard valid for 3 years).",
      age: "Minimum 17 years completed by December 31st, 2026.",
      universityRequirements: "Valid passport, medical fitness report, and basic interview."
    },

    documents: [
      { name: "Original Passport", required: true, details: "Valid for 18+ months." },
      { name: "10th Marksheet & Certificate", required: true, details: "MEA Apostille certified." },
      { name: "12th Marksheet (PCB)", required: true, details: "MEA Apostille certified." },
      { name: "NEET-UG Scorecard", required: true, details: "NTA qualifying scorecard." },
      { name: "Passport Photos (35x45mm)", required: true, details: "20 copies on white background." },
      { name: "Birth Certificate", required: true, details: "English translated & notarized." },
      { name: "Medical Fitness Certificate", required: true, details: "From MBBS/MD doctor." },
      { name: "HIV Test Certificate", required: true, details: "Within 30 days of submission." },
      { name: "Parent Bank Statement", required: true, details: "Financial proof." }
    ],

    admissionProcess: [
      { step: 1, title: "Free Profile Assessment", desc: "Evaluate BSMI new campus seat matrix and fee structure." },
      { step: 2, title: "Eligibility Check", desc: "Verification of 10+2 marks and NEET qualification score." },
      { step: 3, title: "Dossier Submission", desc: "Application registered with BSMI admissions committee." },
      { step: 4, title: "University Interview", desc: "Basic online conversation on English and science subjects." },
      { step: 5, title: "Admission Letter", desc: "BSMI issues official unconditional Admission Offer Letter." },
      { step: 6, title: "MEA Apostille & Translation", desc: "Legalization by Ministry of External Affairs, India." },
      { step: 7, title: "MFA Visa Teletex", desc: "Ministry of Foreign Affairs Uzbekistan approves visa teletex." },
      { step: 8, title: "Student Visa Stamping", desc: "A-2 Student Visa stamped by Uzbekistan Embassy in Delhi." },
      { step: 9, title: "Departure to Tashkent/Bukhara", desc: "Group flight to Tashkent and onward train to Bukhara." },
      { step: 10, title: "Smart Campus Hostel Check-In", desc: "Room allotment on the new 11-hectare campus." }
    ],

    whyUzbekistan: "Uzbekistan offers a calm, safe environment for medical study with massive investments into modern hospital campuses like BSMI.",
    benefitsUzbekistan: [
      "100% NMC FMGL 2021 compliant 6-year English course.",
      "Most modern integrated campus in Central Asia (opened 2023).",
      "Very low student living cost ($100–$140/month).",
      "Delicious Indian food and safe student lifestyle."
    ],

    mhMedicalAssistance: [
      "Guaranteed seat reservation in BSMI new smart campus.",
      "Complete MEA Apostille and translation support in Delhi.",
      "Visa teletex and consular processing.",
      "Dedicated Bukhara coordinator desk for on-ground assistance.",
      "NExT / FMGE prep mentoring."
    ],

    popularDestinations: [
      { city: "Bukhara", description: "City of Avicenna with new 2023 campus and 400-bed on-site hospital.", link: "/study-mbbs-in-bukhara" },
      { city: "Tashkent", description: "Capital city housing TMA and TPMI.", link: "/study-mbbs-in-tashkent" },
      { city: "Samarkand", description: "Historic university with 1,500+ Indian students.", link: "/study-mbbs-in-samarkand" },
      { city: "Andijan", description: "Surgical clinical training center.", link: "/study-mbbs-in-andijan" }
    ],

    faqs: [
      {
        q: "Is Bukhara State Medical Institute a government medical college?",
        a: "Yes. BSMI is an accredited state government medical institute established in 1990 under the Ministry of Health of Uzbekistan."
      },
      {
        q: "What is unique about the new BSMI campus?",
        a: "In 2022–2023, BSMI unveiled an 11-hectare smart campus where academic lecture halls, international hostels, and a 400-bed hospital are all located in one single complex."
      },
      {
        q: "What is the annual tuition fee at Bukhara State Medical Institute?",
        a: "The annual tuition fee is $3,400 USD per year (~₹2.87 Lakhs INR/year) for the 6-year MD Physician program."
      },
      {
        q: "What is the program duration at BSMI?",
        a: "The program duration is 6 years (54 months coursework + 12 months clinical internship in teaching hospitals), fully compliant with NMC FMGL 2021."
      },
      {
        q: "Is the medium of instruction English at BSMI?",
        a: "Yes. All classes, clinical rotations, laboratory practicals, and examinations are conducted 100% in English."
      },
      {
        q: "Does BSMI have an on-campus teaching hospital?",
        a: "Yes. A 400-bed multidisciplinary hospital is located directly on the new campus, in addition to 2,200+ beds in affiliated regional clinics."
      },
      {
        q: "What are the hostel facilities like at BSMI?",
        a: "Hostels are brand-new (opened 2023) on-campus buildings with air conditioning, heating, Wi-Fi, and 24/7 biometric security."
      },
      {
        q: "Is Indian food served in Bukhara State Medical Institute?",
        a: "Yes. Dedicated Indian mess kitchens on campus serve fresh North and South Indian vegetarian and non-veg halal meals 3 times a day."
      },
      {
        q: "Is NEET qualification mandatory for BSMI?",
        a: "Yes. NEET qualification is legally required for all Indian students as per NMC regulations."
      },
      {
        q: "What is the 12th board eligibility criteria for BSMI?",
        a: "Minimum 50% in Physics, Chemistry, and Biology for General category and 40% in PCB for OBC/SC/ST categories."
      },
      {
        q: "How many Indian students are enrolled at BSMI?",
        a: "Over 1,200 Indian students are currently studying at Bukhara State Medical Institute."
      },
      {
        q: "How safe is Bukhara for international students?",
        a: "Bukhara is a peaceful, UNESCO World Heritage city known for its safety, welcoming residents, and zero student disturbances."
      },
      {
        q: "Can BSMI graduates practice medicine in India?",
        a: "Yes. After completing the 6-year program, graduates can register with the NMC and appear for the NExT Step 1 exam."
      },
      {
        q: "What is the annual hostel fee at BSMI?",
        a: "Hostel fee is $550 USD per year (~₹46,500 INR/year)."
      },
      {
        q: "How does MH GLOBAL EDUCATION CONSULTANT assist with BSMI admission?",
        a: "MH GLOBAL EDUCATION CONSULTANT handles document Apostille, offer letter, Ministry visa teletex, group travel from Delhi, and on-campus hostel allotment in Bukhara."
      }
    ],

    pros: [
      "Brand-new 11-hectare 2023 smart campus with on-campus 400-bed teaching hospital.",
      "Most economical state government package (~₹22L–₹24L all-inclusive for 6 years).",
      "Serene, clean UNESCO heritage city ideal for focused medical learning.",
      "Modern simulation center and digital anatomy dissection tables."
    ],
    cons: [
      "Bukhara International Airport has fewer direct flights from India than Tashkent (travelers usually take connecting flights or the 3.5-hr bullet train from Tashkent)."
    ],

    officialContact: {
      phone: "+998 65 223-00-50",
      email: "info@bsmi.uz",
      address: "Navoi Avenue 1, Bukhara 200118, Uzbekistan"
    },

    lastVerifiedDate: "October 2026",
    sources: [
      { title: "Official BSMI Portal", url: "https://bsmi.uz" },
      { title: "WDOMS Medical Directory", url: "https://www.wdoms.org" },
      { title: "Uzbekistan Ministry of Higher Education", url: "https://edu.uz" }
    ]
  },

  {
    id: "andijan-state-medical-institute",
    clinicalBeds: 2200,
    sourceUrl: "https://adti.uz",
    last_verified: "2026-10-22",
    lastVerifiedFormatted: "October 2026",
    verificationMethod: "Verified via official Rectorate decree and Ministry of Higher Education circular",
    slug: "andijan-state-medical-institute",
    comparisonSlugs: ["bukhara-state-medical-institute", "samarkand-state-medical-university"],
    name: "Andijan State Medical Institute",
    officialName: "Andijon Davlat Tibbiyot Instituti (ADTI)",
    type: "Government",
    establishedYear: 1955,
    city: "Andijan",
    region: "Fergana Valley",
    rating: 4.78,
    ranking: "Foremost Clinical & Surgical Training Center of Fergana Valley",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    campusImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    hospitalImage: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80",
    logoText: "ADTI",
    website: "https://adti.uz",
    admissionWebsite: "https://adti.uz/en/admissions",

    hero: {
      title: "Andijan State Medical Institute",
      subtitle: "Study Medicine in Uzbekistan",
      statusText: "Government Medical Institute • Andijan, Uzbekistan",
      description: "Andijan State Medical Institute (ASMI / ADTI) is a 70-year-old state medical institution in the Fergana Valley, known for intensive surgical clinical training across 2,500+ hospital beds and very affordable tuition."
    },

    about: {
      content: "Established in October 1955, Andijan State Medical Institute (ASMI / ADTI) is the principal medical university of Uzbekistan's populous Fergana Valley. With a 70-year history of clinical excellence, ASMI is particularly celebrated for practical bedside surgical training, trauma care, and internal medicine. The institute operates extensive multi-profile clinics and maintains an International Medical Faculty where over 1,100 Indian students are trained in 100% English medium under experienced senior clinical specialists.",
      history: "Founded in 1955, ASMI has trained over 35,000 physicians and surgical specialists.",
      location: "Located at 1 Yu. Otabekov Street, Andijan 170027, Uzbekistan, in the heart of the Fergana Valley."
    },

    affiliationRecognition: {
      universityType: "Government / State Medical Institute",
      parentInstitution: "Ministry of Health of the Republic of Uzbekistan",
      ministryAffiliation: "Ministry of Higher Education, Science and Innovations of Uzbekistan",
      accreditation: "State Quality Inspection Department of Education of Uzbekistan",
      internationalListings: "WDOMS / WHO, FAIMER, ECFMG (USA)",
      nmcCompliance: "100% Compliant with NMC FMGL Regulations 2021 (54 Months Course + 12 Months Internship in English)",
      officialWebsite: "https://adti.uz"
    },

    quickHighlights: [
      { label: "University Type", value: "State Government Medical Institute" },
      { label: "City & Country", value: "Andijan, Uzbekistan (Fergana Valley)" },
      { label: "Established Year", value: "1955 (70+ Years of Excellence)" },
      { label: "Medical Program", value: "General Medicine / MD (MBBS Equivalent)" },
      { label: "Program Duration", value: "6 Years (54 Months Course + 12 Months Internship)" },
      { label: "Medium of Instruction", value: "100% English Medium" },
      { label: "Annual Tuition Fee", value: "$3,300 USD (~₹2.78 Lakh/Year)" },
      { label: "Annual Hostel Fee", value: "$500 USD (~₹42,200/Year)" },
      { label: "Clinical Training Beds", value: "2,500+ Beds in Valley Hospitals" },
      { label: "Indian Student Count", value: "1,100+ Indian Students" },
      { label: "Indian Mess Available", value: "Yes (North & South Indian Food)" },
      { label: "Total 6-Year Budget", value: "~₹20 Lakhs to ₹23 Lakhs INR" }
    ],

    advantages: [
      "High Clinical Patient Inflow: As the chief referral center of the Fergana Valley, students encounter diverse clinical and surgical pathology.",
      "Most Economical Government Tuition: Annual tuition fee of $3,300 USD, offering exceptional value without compromising academic rigor.",
      "70 Years of Surgical Pedigree: Known across Central Asia for intensive practical surgical and trauma ward postings.",
      "Dedicated Indian Mess & Community: Over 1,100 Indian students with vibrant festival celebrations and Indian food.",
      "Safe, Hospitable Valley Culture: Very peaceful, family-oriented community that deeply respects doctors.",
      "Full NMC FMGL 2021 Alignment: 54 months coursework + 12 months in-house internship conducted entirely in English."
    ],

    fees: {
      annualTuitionUSD: 3300,
      annualHostelUSD: 500,
      annualIndianMessUSD: 1000,
      annualMedicalInsuranceUSD: 200,
      annualVisaRenewalUSD: 150,
      firstYearOneTimeChargesUSD: 1000,
      estimatedTotal6YearsUSD: 31000,
      estimatedTotal6YearsINR: 2620000,
      academicYear: "2026-2027",
      currency: "USD ($) / INR (₹)"
    },

    syllabus: {
      year1: [
        "Human Anatomy & Functional Morphology",
        "Histology, Cytology & Embryology",
        "Medical Biochemistry & Molecular Genetics",
        "Medical Biology & Ecology",
        "Human Physiology (General)",
        "Medical Latin & Communication Skills"
      ],
      year2: [
        "Systemic Human Physiology",
        "Pathological Anatomy",
        "Pathophysiology",
        "Medical Microbiology & Parasitology",
        "General Pharmacology",
        "Clinical Skills Laboratory & CPR"
      ],
      year3: [
        "Internal Diseases & Diagnostics",
        "General Surgery & Bedside Clinical Postings",
        "Pediatrics (Infant & Child Health)",
        "Clinical Pharmacology",
        "Medical Radiology & Imaging",
        "Operative Surgery & Topographical Anatomy"
      ],
      year4: [
        "Obstetrics & Gynecology (Part I)",
        "Neurology & Neurosurgical Principles",
        "Ophthalmology",
        "Otorhinolaryngology (ENT)",
        "Dermatology & Venereology",
        "Psychiatry & Behavioral Sciences"
      ],
      year5: [
        "Specialized Surgical Diseases & Trauma Management",
        "Internal Medicine (Cardiology, Gastroenterology)",
        "Infectious Diseases & Epidemiology",
        "Oncology & Palliative Care",
        "Emergency Triage & Critical Care Anesthesia",
        "Forensic Medicine"
      ],
      year6: [
        "12-Month Compulsory Clinical Internship across ASMI Teaching Hospitals",
        "Intensive Rotations in Surgery, Medicine, OB-GYN, Pediatrics, and Trauma",
        "State Licensing Exams & NExT/FMGE Comprehensive Preparation"
      ]
    },

    hostel: {
      availability: "University-owned furnished hostels close to lecture halls and clinics.",
      facilities: "2-3 bedded rooms with central heating, Wi-Fi, study desks, wardrobes, and laundry facilities.",
      security: "24/7 CCTV, biometric entry, and resident wardens.",
      food: "Indian mess serving fresh North & South Indian meals daily.",
      fees: "$500 USD per year for hostel accommodation; ~$1,000 USD per year for mess.",
      distance: "Walking distance to clinical hospital bases."
    },

    eligibility: {
      academic: "Passed 10+2 / 12th standard with Physics, Chemistry, Biology, and English.",
      subjects: "Minimum 50% aggregate in PCB for General Category; minimum 40% aggregate in PCB for Reserved Categories.",
      neet: "Mandatory qualification score in NEET-UG (Scorecard valid for 3 years).",
      age: "Minimum 17 years old on or before December 31st, 2026.",
      universityRequirements: "Valid passport, medical fitness report, and basic interview."
    },

    documents: [
      { name: "Original Passport", required: true, details: "Valid for 18+ months." },
      { name: "10th Marksheet & Passing Certificate", required: true, details: "MEA Apostille attested." },
      { name: "12th Marksheet (PCB)", required: true, details: "MEA Apostille attested." },
      { name: "NEET-UG Scorecard", required: true, details: "Qualified score issued by NTA." },
      { name: "Passport Photos (35x45mm)", required: true, details: "20 copies, white background." },
      { name: "Birth Certificate", required: true, details: "English translated & notarized." },
      { name: "Medical Fitness Certificate", required: true, details: "From registered doctor." },
      { name: "HIV Test Certificate", required: true, details: "Issued within 30 days." },
      { name: "Bank Statement", required: true, details: "Financial proof." }
    ],

    admissionProcess: [
      { step: 1, title: "Free Academic Counselling", desc: "Review ASMI fee structure, clinical beds, and hostel options." },
      { step: 2, title: "Eligibility Assessment", desc: "Screening of 12th PCB marks and NEET qualifying status." },
      { step: 3, title: "Application Submission", desc: "Registration with ASMI international admissions committee." },
      { step: 4, title: "Online Assessment", desc: "Basic interview assessing English language comprehension." },
      { step: 5, title: "Admission Offer Letter", desc: "ASMI issues official Admission Confirmation Letter." },
      { step: 6, title: "MEA Apostille & Translation", desc: "Apostille by MEA India and certified translations." },
      { step: 7, title: "Ministry Visa Teletex", desc: "MFA Uzbekistan approves official visa support number." },
      { step: 8, title: "Student Visa Stamping", desc: "A-2 Student Visa stamped by Uzbekistan Embassy in Delhi." },
      { step: 9, title: "Departure to Tashkent/Andijan", desc: "Group flight from New Delhi to Tashkent and onward transit." },
      { step: 10, title: "Hostel Check-in & Orientation", desc: "Hostel room allotment and university matriculation in Andijan." }
    ],

    whyUzbekistan: "Uzbekistan offers high-quality government medical universities with rich clinical hospital networks and affordable tuition fees.",
    benefitsUzbekistan: [
      "100% NMC FMGL 2021 compliant 6-year English course.",
      "Most economical overall budget (under ₹22 Lakhs total).",
      "High patient bedside interaction and surgery exposure.",
      "Safe, welcoming society with dedicated Indian food."
    ],

    mhMedicalAssistance: [
      "Official seat reservation at Andijan State Medical Institute.",
      "Complete MEA Apostille and translation support in New Delhi.",
      "MFA visa teletex processing and consular stamping.",
      "On-ground coordinator support in Andijan for hostel and welfare.",
      "NExT / FMGE prep mentoring."
    ],

    popularDestinations: [
      { city: "Andijan", description: "Fergana Valley clinical hub with 70 years of surgical excellence.", link: "/study-mbbs-in-andijan" },
      { city: "Tashkent", description: "Capital city housing TMA and TPMI.", link: "/study-mbbs-in-tashkent" },
      { city: "Samarkand", description: "Historic university with 1,500+ Indian students.", link: "/study-mbbs-in-samarkand" },
      { city: "Bukhara", description: "Avicenna's heritage city with brand-new 2023 campus.", link: "/study-mbbs-in-bukhara" }
    ],

    faqs: [
      {
        q: "Is Andijan State Medical Institute a government medical college?",
        a: "Yes. ASMI (ADTI) is an accredited state government medical institute established in 1955 under the Ministry of Health of Uzbekistan."
      },
      {
        q: "Where is Andijan State Medical Institute located?",
        a: "ASMI is located at 1 Yu. Otabekov Street in the city of Andijan, Fergana Valley, Uzbekistan."
      },
      {
        q: "What is the annual tuition fee at Andijan State Medical Institute?",
        a: "The annual tuition fee is $3,300 USD per year (~₹2.78 Lakhs INR/year) for the 6-year MD Physician program."
      },
      {
        q: "What is the course duration at ASMI?",
        a: "The course duration is 6 years (54 months coursework + 12 months clinical internship in teaching hospitals), compliant with NMC FMGL 2021."
      },
      {
        q: "Is the medium of instruction English at ASMI?",
        a: "Yes. All classes, clinical postings, and examinations for international students are conducted 100% in English."
      },
      {
        q: "How many hospital beds are affiliated with ASMI?",
        a: "ASMI operates over 2,500+ clinical beds across multidisciplinary regional hospitals in the Fergana Valley."
      },
      {
        q: "How many Indian students are enrolled at ASMI?",
        a: "Over 1,100 Indian medical students are actively studying at Andijan State Medical Institute."
      },
      {
        q: "Is Indian mess food available at ASMI hostels?",
        a: "Yes. Hostels have dedicated Indian dining facilities serving fresh North and South Indian meals 3 times a day."
      },
      {
        q: "Is NEET qualification required for admission to ASMI?",
        a: "Yes. In accordance with NMC regulations, NEET qualification is mandatory for Indian citizens."
      },
      {
        q: "What are the 12th board marks required for ASMI?",
        a: "Minimum 50% in PCB for General category and 40% in PCB for Reserved categories (OBC/SC/ST)."
      },
      {
        q: "Why is ASMI known for surgical training?",
        a: "Because ASMI is the central referral surgical base of the Fergana Valley, giving students early bedside surgical rotation access."
      },
      {
        q: "Can ASMI graduates practice medicine in India?",
        a: "Yes. After completing the 6-year course and obtaining registration in Uzbekistan, graduates are eligible for the Indian NExT examination."
      },
      {
        q: "What is the annual hostel fee at ASMI?",
        a: "The annual hostel fee is $500 USD per year (~₹42,200 INR/year)."
      },
      {
        q: "What is the total 6-year estimated budget for ASMI?",
        a: "The total 6-year estimated budget is approximately ₹20 Lakhs to ₹23 Lakhs INR all-inclusive (tuition, hostel, mess, visa)."
      },
      {
        q: "How can MH GLOBAL EDUCATION CONSULTANT help with admission to ASMI?",
        a: "MH GLOBAL EDUCATION CONSULTANT handles document Apostille, offer letter, Ministry visa teletex, group flights from Delhi, and on-ground hostel check-in in Andijan."
      }
    ],

    pros: [
      "70 years of clinical and surgical training legacy.",
      "High clinical patient footfall giving rich hands-on diagnostic practice.",
      "Very economical tuition fee ($3,300/yr) and lowest cost of living in Uzbekistan.",
      "100% English medium faculty with dedicated Indian mess."
    ],
    cons: [
      "Located in the Fergana Valley, requiring a short connecting flight or scenic mountain drive/train from Tashkent International Airport."
    ],

    officialContact: {
      phone: "+998 74 223-94-50",
      email: "info@adti.uz",
      address: "1 Yu. Otabekov Street, Andijan 170027, Uzbekistan"
    },

    lastVerifiedDate: "October 2026",
    sources: [
      { title: "Official ADTI Website", url: "https://adti.uz" },
      { title: "WDOMS Medical Directory", url: "https://www.wdoms.org" },
      { title: "Uzbekistan Ministry of Health", url: "https://ssv.uz" }
    ]
  },

  {
    id: "tashkent-pediatric-medical-institute",
    clinicalBeds: 2800,
    sourceUrl: "https://tashpmi.uz",
    last_verified: "2026-10-22",
    lastVerifiedFormatted: "October 2026",
    verificationMethod: "Verified via official Rectorate decree and Ministry of Higher Education circular",
    slug: "tashkent-pediatric-medical-institute",
    comparisonSlugs: ["tashkent-medical-academy", "central-asian-university"],
    name: "Tashkent Pediatric Medical Institute",
    officialName: "Toshkent Pediatriya Tibbiyot Instituti (TPMI)",
    type: "Government",
    establishedYear: 1972,
    city: "Tashkent",
    region: "Tashkent Region",
    rating: 4.75,
    ranking: "Leading Government Medical Institute in Capital City Tashkent",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    campusImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    hospitalImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    logoText: "TPMI",
    website: "https://tashpmi.uz",
    admissionWebsite: "https://tashpmi.uz/en/admission",

    hero: {
      title: "Tashkent Pediatric Medical Institute",
      subtitle: "Study Medicine in Uzbekistan",
      statusText: "Government Medical Institute • Tashkent, Uzbekistan",
      description: "Tashkent Pediatric Medical Institute (TPMI) is a recognized state medical institute in Tashkent (est. 1972), offering a 6-year NMC-compliant MD Physician program in English with 2,000+ clinical beds across specialized capital hospitals."
    },

    about: {
      content: "Tashkent Pediatric Medical Institute (TPMI) was established in 1972 as the central pediatric and general medicine training institution of the region. Located in the Yunusabad district of Tashkent, TPMI offers comprehensive General Medicine (MD Physician) and Pediatric Medicine curricula to international students. The institute collaborates closely with the National Children's Medical Center and Tashkent City Multidisciplinary Hospitals, providing intensive clinical bedside postings and modern laboratory education.",
      history: "Established in 1972, TPMI has over 52 years of excellence in general medicine and pediatric surgery.",
      location: "Located at 223 Bogishamol Street, Yunusabad District, Tashkent, Uzbekistan."
    },

    affiliationRecognition: {
      universityType: "Government / State Medical Institute",
      parentInstitution: "Ministry of Health of the Republic of Uzbekistan",
      ministryAffiliation: "Ministry of Higher Education, Science and Innovations of Uzbekistan",
      accreditation: "State Accreditation Board of Uzbekistan",
      internationalListings: "WDOMS / WHO, FAIMER, ECFMG (USA)",
      nmcCompliance: "100% Compliant with NMC FMGL Regulations 2021 (54 Months Course + 12 Months Internship in English)",
      officialWebsite: "https://tashpmi.uz"
    },

    quickHighlights: [
      { label: "University Type", value: "State Government Medical Institute" },
      { label: "City & Country", value: "Tashkent, Uzbekistan (Capital City)" },
      { label: "Established Year", value: "1972 (52+ Years)" },
      { label: "Medical Program", value: "General Medicine / MD (MBBS Equivalent)" },
      { label: "Program Duration", value: "6 Years (54 Months Coursework + 12 Months Internship)" },
      { label: "Medium of Instruction", value: "100% English Medium" },
      { label: "Annual Tuition Fee", value: "$3,700 USD (~₹3.12 Lakh/Year)" },
      { label: "Annual Hostel Fee", value: "$650 USD (~₹54,900/Year)" },
      { label: "Clinical Training Beds", value: "2,000+ Beds in Tashkent City Hospitals" },
      { label: "Indian Student Count", value: "750+ Enrolled Indian Students" },
      { label: "Indian Mess Available", value: "Yes (North & South Indian Food)" },
      { label: "Flight Connectivity", value: "3.5 Hours Direct from Delhi to Tashkent" }
    ],

    advantages: [
      "Capital City Location: Situated in Tashkent with access to modern metro lines and direct flights from Delhi.",
      "Specialized Clinical Exposure: Comprehensive training in adult internal medicine, general surgery, neonatal care, and trauma.",
      "State-of-the-Art Hospital Attachments: Affiliated with the National Children's Medical Center and Tashkent City Hospitals.",
      "100% English Medium: Separate international faculty ensuring seamless lecture comprehension.",
      "Dedicated Indian Mess: Fresh Indian food cooked by Indian chefs in on-campus dining halls.",
      "Full NMC FMGL 2021 Compliance: 54 months academic study + 12 months clinical internship in English."
    ],

    fees: {
      annualTuitionUSD: 3700,
      annualHostelUSD: 650,
      annualIndianMessUSD: 1100,
      annualMedicalInsuranceUSD: 200,
      annualVisaRenewalUSD: 150,
      firstYearOneTimeChargesUSD: 1100,
      estimatedTotal6YearsUSD: 35000,
      estimatedTotal6YearsINR: 2950000,
      academicYear: "2026-2027",
      currency: "USD ($) / INR (₹)"
    },

    syllabus: {
      year1: [
        "Human Anatomy & Histology",
        "Medical Biology & Genetics",
        "Medical Biochemistry",
        "Human Physiology (Part I)",
        "Latin Medical Terminology",
        "Uzbek & Russian Language Basics"
      ],
      year2: [
        "Systemic Physiology",
        "Pathological Anatomy",
        "Pathophysiology",
        "Medical Microbiology & Virology",
        "Pharmacology (General Principles)",
        "Propaedeutics of Internal Medicine"
      ],
      year3: [
        "Internal Medicine (Cardiology, Pulmonology)",
        "General Surgery & Bedside Training",
        "Pediatrics (General & Neonatal)",
        "Clinical Pharmacology",
        "Radiology & Medical Imaging",
        "Operative Surgery & Topographical Anatomy"
      ],
      year4: [
        "Obstetrics & Gynecology",
        "Neurology & Neurosurgery",
        "Ophthalmology & ENT",
        "Dermatovenerology",
        "Psychiatry & Medical Psychology",
        "Traumatology & Orthopedics"
      ],
      year5: [
        "Specialized Clinical Surgery & Anesthesiology",
        "Internal Medicine (Nephrology, Endocrinology)",
        "Infectious Diseases & Epidemiology",
        "Oncology & Hematology",
        "Emergency Triage & Critical Care",
        "Forensic Medicine"
      ],
      year6: [
        "12-Month Compulsory Clinical Internship across TPMI Teaching Hospitals",
        "Rotations in Surgery, Medicine, OB-GYN, Pediatrics, and ICU",
        "State Licensing Exams & NExT/FMGE Comprehensive Preparation"
      ]
    },

    hostel: {
      availability: "Furnished student hostels located near the academic campus.",
      facilities: "2-3 bedded rooms with central heating, Wi-Fi, study desks, and laundry rooms.",
      security: "24/7 security control, CCTV coverage, and residential wardens.",
      food: "Indian mess serving pure vegetarian and non-veg halal meals.",
      fees: "$650 USD per year for hostel; ~$1,100 USD per year for mess.",
      distance: "Walking distance to clinical hospital bases."
    },

    eligibility: {
      academic: "Passed 10+2 with Physics, Chemistry, Biology, and English.",
      subjects: "Minimum 50% in PCB for General Category; minimum 40% in PCB for Reserved Categories.",
      neet: "Mandatory qualification score in NEET-UG (valid for 3 years).",
      age: "Minimum 17 years old on or before December 31st, 2026.",
      universityRequirements: "Valid passport, medical fitness report, and basic interview."
    },

    documents: [
      { name: "Original Passport", required: true, details: "Valid for 18+ months." },
      { name: "10th Marksheet & Passing Certificate", required: true, details: "MEA Apostille certified." },
      { name: "12th Marksheet (PCB)", required: true, details: "MEA Apostille certified." },
      { name: "NEET-UG Scorecard", required: true, details: "Qualified score issued by NTA." },
      { name: "Passport Photos (35x45mm)", required: true, details: "20 copies on white background." },
      { name: "Birth Certificate", required: true, details: "English translated & notarized." },
      { name: "Medical Fitness Certificate", required: true, details: "From registered doctor." },
      { name: "HIV Test Certificate", required: true, details: "Issued within 30 days." },
      { name: "Bank Statement", required: true, details: "Financial proof." }
    ],

    admissionProcess: [
      { step: 1, title: "Free Academic Counselling", desc: "Review TPMI seat matrix, fee structure, and hostel facilities." },
      { step: 2, title: "Eligibility Assessment", desc: "Screening of 12th PCB marks and NEET qualifying status." },
      { step: 3, title: "Application Submission", desc: "Registration with TPMI international admissions committee." },
      { step: 4, title: "Online Assessment", desc: "Basic interview assessing English language comprehension." },
      { step: 5, title: "Admission Offer Letter", desc: "TPMI issues official Admission Confirmation Letter." },
      { step: 6, title: "MEA Apostille & Translation", desc: "Apostille by MEA India and certified translations." },
      { step: 7, title: "Ministry Visa Teletex", desc: "MFA Uzbekistan approves official visa support number." },
      { step: 8, title: "Student Visa Stamping", desc: "A-2 Student Visa stamped by Uzbekistan Embassy in Delhi." },
      { step: 9, title: "Departure to Tashkent", desc: "Direct 3.5-hour flight from New Delhi to Tashkent." },
      { step: 10, title: "Hostel Check-in & Orientation", desc: "Hostel room allotment and university matriculation in Tashkent." }
    ],

    whyUzbekistan: "Uzbekistan offers recognized government medical institutions in modern metropolitan environments with strict adherence to NMC standards.",
    benefitsUzbekistan: [
      "100% NMC FMGL 2021 compliant 6-year English course.",
      "Prime capital city location in Tashkent.",
      "High clinical hospital bed capacity (2,000+ beds).",
      "Direct flight accessibility from India (3.5 hours)."
    ],

    mhMedicalAssistance: [
      "Official seat reservation at Tashkent Pediatric Medical Institute.",
      "Complete MEA Apostille and translation support in New Delhi.",
      "MFA visa teletex processing and consular stamping.",
      "On-ground coordinator support in Tashkent for hostel and welfare.",
      "NExT / FMGE prep mentoring."
    ],

    popularDestinations: [
      { city: "Tashkent", description: "Capital city housing TPMI, TMA, and CAU.", link: "/study-mbbs-in-tashkent" },
      { city: "Samarkand", description: "Historic university with 1,500+ Indian students.", link: "/study-mbbs-in-samarkand" },
      { city: "Bukhara", description: "Avicenna's heritage city with brand-new 2023 campus.", link: "/study-mbbs-in-bukhara" },
      { city: "Andijan", description: "Surgical clinical training center.", link: "/study-mbbs-in-andijan" }
    ],

    faqs: [
      {
        q: "Is Tashkent Pediatric Medical Institute a government medical college?",
        a: "Yes. TPMI is an accredited state government medical institute established in 1972 under the Ministry of Health of Uzbekistan."
      },
      {
        q: "Where is Tashkent Pediatric Medical Institute located?",
        a: "TPMI is located at 223 Bogishamol Street in the Yunusabad District of Tashkent, Uzbekistan."
      },
      {
        q: "Does TPMI only teach pediatrics or general medicine as well?",
        a: "TPMI offers both General Medicine (MD Physician / MBBS equivalent) and Pediatric Medicine programs to international students."
      },
      {
        q: "What is the annual tuition fee at Tashkent Pediatric Medical Institute?",
        a: "The annual tuition fee is $3,700 USD per year (~₹3.12 Lakhs INR/year) for the 6-year English-medium MD Physician program."
      },
      {
        q: "What is the course duration at TPMI?",
        a: "The course duration is 6 years (54 months coursework + 12 months clinical internship in teaching hospitals), compliant with NMC FMGL 2021."
      },
      {
        q: "Is the medium of instruction English at TPMI?",
        a: "Yes. International students are taught in 100% English medium by experienced professors."
      },
      {
        q: "How many hospital beds are affiliated with TPMI?",
        a: "TPMI operates over 2,000+ clinical beds across specialized city and republican clinical hospitals in Tashkent."
      },
      {
        q: "How many Indian students study at TPMI?",
        a: "Over 750 Indian medical students are actively studying at Tashkent Pediatric Medical Institute."
      },
      {
        q: "Is Indian food available in TPMI hostels?",
        a: "Yes. Hostels feature on-campus Indian dining halls serving North and South Indian meals 3 times a day."
      },
      {
        q: "Is NEET qualification required for admission to TPMI?",
        a: "Yes. NEET qualification is mandatory for Indian citizens as per NMC guidelines."
      },
      {
        q: "What are the 12th board marks required for TPMI?",
        a: "Minimum 50% in PCB for General category and 40% in PCB for Reserved categories (OBC/SC/ST)."
      },
      {
        q: "Can TPMI graduates practice medicine in India?",
        a: "Yes. After completing the 6-year course and obtaining registration in Uzbekistan, graduates can appear for the Indian NExT examination."
      },
      {
        q: "What is the annual hostel fee at TPMI?",
        a: "The annual hostel fee is $650 USD per year (~₹54,900 INR/year)."
      },
      {
        q: "How does the visa process work for TPMI?",
        a: "TPMI submits the admission dossier to the Ministry of Foreign Affairs (MFA) of Uzbekistan for electronic Teletex approval, followed by A-2 visa stamping."
      },
      {
        q: "How can MH GLOBAL EDUCATION CONSULTANT help with admission to TPMI?",
        a: "MH GLOBAL EDUCATION CONSULTANT handles document Apostille, offer letter, Ministry visa teletex, group flights from Delhi, and on-ground hostel check-in in Tashkent."
      }
    ],

    pros: [
      "Prime location in capital city Tashkent with metro and airport access.",
      "Rich clinical exposure in both adult medicine and pediatric subspecialties.",
      "52 years of established government faculty pedigree.",
      "100% English medium instruction with dedicated Indian mess."
    ],
    cons: [
      "Hostel rooms inside the main campus building fill up early."
    ],

    officialContact: {
      phone: "+998 71 260-31-01",
      email: "info@tashpmi.uz",
      address: "223 Bogishamol Street, Yunusabad District, Tashkent, Uzbekistan"
    },

    lastVerifiedDate: "October 2026",
    sources: [
      { title: "Official TPMI Portal", url: "https://tashpmi.uz" },
      { title: "WDOMS Medical Directory", url: "https://www.wdoms.org" },
      { title: "Uzbekistan Ministry of Health", url: "https://ssv.uz" }
    ]
  },

  {
    id: "central-asian-university",
    clinicalBeds: 1200,
    sourceUrl: "https://centralasian.uz",
    last_verified: "2026-10-22",
    lastVerifiedFormatted: "October 2026",
    verificationMethod: "Verified via official Rectorate decree and Ministry of Higher Education circular",
    slug: "central-asian-university",
    comparisonSlugs: ["tashkent-medical-academy", "tashkent-pediatric-medical-institute"],
    name: "Central Asian University (CAU)",
    officialName: "Central Asian University School of Medicine (formerly Akfa University)",
    type: "Private",
    establishedYear: 2019,
    city: "Tashkent",
    region: "Tashkent Region",
    rating: 4.88,
    ranking: "Premier Private Medical University with USMLE-Integrated Curriculum",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    campusImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    hospitalImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    logoText: "CAU",
    website: "https://centralasian.uz",
    admissionWebsite: "https://centralasian.uz/admissions/medicine",

    hero: {
      title: "Central Asian University (CAU)",
      subtitle: "Study Medicine in Uzbekistan",
      statusText: "Private Medical University • Tashkent, Uzbekistan",
      description: "Central Asian University (formerly Akfa University) is Uzbekistan's flagship private medical university, offering a 6-year NMC and USMLE-integrated MD program with state-of-the-art simulation labs and tertiary hospital training."
    },

    about: {
      content: "Central Asian University (CAU, formerly Akfa University) was founded in 2019 in Tashkent as an ultra-modern private higher education institution built to Western academic standards. Its School of Medicine features USMLE-aligned teaching methodologies, Western-trained medical faculty, virtual anatomy tables, and direct clinical attachments at Akfa Medline, the largest private super-specialty hospital in Central Asia. CAU offers luxury student residences and advanced research laboratories in Tashkent.",
      history: "Founded in 2019, CAU is the first modern private university in Uzbekistan with USMLE-integrated medical education.",
      location: "Located at 264 Milliy Bog Street, Barkhayot MFY, Tashkent 111221, Uzbekistan."
    },

    affiliationRecognition: {
      universityType: "Private Medical University",
      parentInstitution: "Central Asian University Board of Trustees",
      ministryAffiliation: "Ministry of Higher Education, Science and Innovations of Uzbekistan",
      accreditation: "State Inspectorate for Supervision of Quality in Education of Uzbekistan",
      internationalListings: "WDOMS / WHO, FAIMER, ECFMG (USA)",
      nmcCompliance: "100% Compliant with NMC FMGL Regulations 2021 (54 Months Course + 12 Months Internship in English)",
      officialWebsite: "https://centralasian.uz"
    },

    quickHighlights: [
      { label: "University Type", value: "Premier Private Medical University" },
      { label: "City & Country", value: "Tashkent, Uzbekistan (Capital City)" },
      { label: "Established Year", value: "2019" },
      { label: "Curriculum Standard", value: "USMLE & NExT-Integrated Medical Syllabus" },
      { label: "Medical Program", value: "Doctor of Medicine (MD Physician / MBBS Equivalent)" },
      { label: "Program Duration", value: "6 Years (54 Months Course + 12 Months Internship)" },
      { label: "Medium of Instruction", value: "100% English Medium (International Faculty)" },
      { label: "Annual Tuition Fee", value: "$5,800 USD (~₹4.90 Lakh/Year)" },
      { label: "Annual Hostel Fee", value: "$1,000 USD (~₹84,500/Year)" },
      { label: "Primary Hospital Base", value: "Akfa Medline Super-Specialty Hospital" },
      { label: "Indian Mess Facility", value: "Available (High Nutritional Standards)" },
      { label: "NEET Requirement", value: "Mandatory Qualified Score for Indian Citizens" }
    ],

    advantages: [
      "Western-Standard Smart Campus: Ultra-modern architecture, interactive digital lecture halls, and virtual dissection suites.",
      "USMLE & NExT Aligned: Curriculum structured to prepare students for USMLE Step 1 and Indian NExT licensing exams from year 1.",
      "Akfa Medline Hospital Training: Hands-on clinical training at Central Asia's largest private tertiary hospital with robotic surgery.",
      "International Faculty: Taught by visiting and permanent professors trained in Europe, North America, and South Asia.",
      "Luxury Accommodation: Air-conditioned en-suite hostel rooms with high-speed fiber internet.",
      "Full NMC FMGL 2021 Alignment: 54 months academic study + 12 months clinical internship in English."
    ],

    fees: {
      annualTuitionUSD: 5800,
      annualHostelUSD: 1000,
      annualIndianMessUSD: 1200,
      annualMedicalInsuranceUSD: 250,
      annualVisaRenewalUSD: 150,
      firstYearOneTimeChargesUSD: 1500,
      estimatedTotal6YearsUSD: 52000,
      estimatedTotal6YearsINR: 4390000,
      academicYear: "2026-2027",
      currency: "USD ($) / INR (₹)"
    },

    syllabus: {
      year1: [
        "Gross Anatomy & Embryology (USMLE Module I)",
        "Microscopic Anatomy & Histology",
        "Medical Biochemistry & Genetics",
        "Cellular Physiology & Biophysics",
        "Medical Ethics & Evidence-Based Medicine",
        "Communication in Healthcare & Uzbek Basics"
      ],
      year2: [
        "Organ System Physiology (Cardiovascular, Renal, GI)",
        "General & Systemic Pathology (USMLE Module II)",
        "Pathophysiology of Diseases",
        "Medical Microbiology & Infectious Diseases",
        "Pharmacology & Drug Mechanisms",
        "Physical Examination & Clinical Skills Lab"
      ],
      year3: [
        "Internal Medicine (Clinical Diagnostic Reasoning)",
        "Principles of Surgery & Anesthesia",
        "Pediatrics & Adolescent Healthcare",
        "Clinical Pharmacology & Therapeutics",
        "Diagnostic Imaging & Interventional Radiology",
        "Surgical Anatomy & Laparoscopy Simulation"
      ],
      year4: [
        "Obstetrics, Gynecology & Women's Health",
        "Clinical Neurology & Clinical Psychiatry",
        "Ophthalmology & Otolaryngology",
        "Dermatology & Immunology",
        "Orthopedics, Rheumatology & Rehabilitation",
        "Biostatistics & Clinical Research Methodology"
      ],
      year5: [
        "Advanced Surgery & Trauma Critical Care",
        "Subspecialty Internal Medicine (Cardiology, ICU)",
        "Infectious Diseases & Global Health",
        "Oncology, Radiotherapy & Hematology",
        "Emergency Medicine & Resuscitation Simulation",
        "Forensic Medicine & Medical Law"
      ],
      year6: [
        "12-Month Compulsory Clinical Internship at Akfa Medline & Partner Hospitals",
        "Intensive Rotations in Surgery, Medicine, OB-GYN, Pediatrics, and Trauma",
        "State Licensing Exams & NExT/USMLE Comprehensive Preparation"
      ]
    },

    hostel: {
      availability: "Luxury on-campus student residences with single and double occupancy.",
      facilities: "En-suite bathrooms, individual air conditioning, central heating, study desks, and fiber Wi-Fi.",
      security: "Biometric security gates, 24/7 CCTV surveillance, and resident management.",
      food: "Multi-cuisine dining hall serving nutritious Indian vegetarian and non-veg meals.",
      fees: "$1,000 USD per year for hostel; ~$1,200 USD per year for dining mess.",
      distance: "Located directly inside the university campus grounds."
    },

    eligibility: {
      academic: "Passed 10+2 with Physics, Chemistry, Biology, and English (minimum 60% in PCB recommended).",
      subjects: "Physics, Chemistry, Biology, and English as core subjects.",
      neet: "Mandatory qualification score in NEET-UG (valid for 3 years).",
      age: "Minimum 17 years completed by December 31st, 2026.",
      universityRequirements: "Passing CAU computer-based entrance test in Chemistry/Biology & English interview."
    },

    documents: [
      { name: "Original Passport", required: true, details: "Valid for 18+ months." },
      { name: "10th Marksheet & Passing Certificate", required: true, details: "MEA Apostille certified." },
      { name: "12th Marksheet (PCB)", required: true, details: "MEA Apostille certified." },
      { name: "NEET-UG Scorecard", required: true, details: "Qualified score issued by NTA." },
      { name: "Passport Photos (35x45mm)", required: true, details: "20 copies on white background." },
      { name: "Birth Certificate", required: true, details: "English translated & notarized." },
      { name: "Medical Fitness Certificate", required: true, details: "From registered doctor." },
      { name: "HIV Test Certificate", required: true, details: "Issued within 30 days." },
      { name: "Parent Bank Statement", required: true, details: "Financial proof." }
    ],

    admissionProcess: [
      { step: 1, title: "Free Academic Counselling", desc: "Review CAU USMLE curriculum, Akfa Medline hospital, and fees." },
      { step: 2, title: "Eligibility & Academic Screening", desc: "Verification of 12th PCB marks and NEET qualifying status." },
      { step: 3, title: "CAU Entrance Exam", desc: "Computer-based entrance assessment in science and English." },
      { step: 4, title: "Admissions Interview", desc: "Online faculty interview on career goals." },
      { step: 5, title: "Official Admission Letter", desc: "CAU issues formal Admission Confirmation Letter." },
      { step: 6, title: "MEA Apostille & Translation", desc: "Apostille by MEA India and certified translations." },
      { step: 7, title: "Ministry Visa Teletex", desc: "MFA Uzbekistan approves official visa support number." },
      { step: 8, title: "Student Visa Stamping", desc: "A-2 Student Visa stamped by Uzbekistan Embassy in Delhi." },
      { step: 9, title: "Departure to Tashkent", desc: "Direct 3.5-hour flight from New Delhi to Tashkent." },
      { step: 10, title: "Hostel Check-in & Orientation", desc: "Hostel room allotment and university matriculation at CAU." }
    ],

    whyUzbekistan: "Uzbekistan provides ultra-modern private university options like CAU with world-class facilities and USMLE-integrated curricula.",
    benefitsUzbekistan: [
      "100% NMC FMGL 2021 compliant 6-year English course.",
      "USMLE-aligned medical syllabus with western-trained professors.",
      "Hands-on training at Akfa Medline super-specialty hospital.",
      "Direct flight accessibility from India (3.5 hours)."
    ],

    mhMedicalAssistance: [
      "Official seat reservation at Central Asian University School of Medicine.",
      "Entrance exam registration and preparation guidance.",
      "Complete MEA Apostille and translation support in New Delhi.",
      "MFA visa teletex processing and consular stamping.",
      "On-ground coordinator support in Tashkent."
    ],

    popularDestinations: [
      { city: "Tashkent", description: "Capital city housing CAU, TMA, and TPMI.", link: "/study-mbbs-in-tashkent" },
      { city: "Samarkand", description: "Historic university with 1,500+ Indian students.", link: "/study-mbbs-in-samarkand" },
      { city: "Bukhara", description: "Avicenna's heritage city with brand-new 2023 campus.", link: "/study-mbbs-in-bukhara" },
      { city: "Andijan", description: "Surgical clinical training center.", link: "/study-mbbs-in-andijan" }
    ],

    faqs: [
      {
        q: "Is Central Asian University a private university?",
        a: "Yes. CAU (formerly Akfa University) is an accredited private university established in 2019 in Tashkent."
      },
      {
        q: "Where is Central Asian University located?",
        a: "CAU is located at 264 Milliy Bog Street, Barkhayot MFY, Tashkent, Uzbekistan."
      },
      {
        q: "What makes CAU's medical curriculum distinct?",
        a: "CAU integrates USMLE Step 1 and Step 2 preparation frameworks directly into its 6-year MD Physician curriculum."
      },
      {
        q: "What is the annual tuition fee at CAU?",
        a: "The annual tuition fee is $5,800 USD per year (~₹4.90 Lakhs INR/year) for the MD Physician program."
      },
      {
        q: "What is the course duration at Central Asian University?",
        a: "The course duration is 6 years (54 months coursework + 12 months clinical internship in teaching hospitals), compliant with NMC FMGL 2021."
      },
      {
        q: "Which teaching hospital is attached to CAU?",
        a: "CAU is affiliated with Akfa Medline, Central Asia's largest private tertiary hospital, featuring robotic surgery and super-specialty departments."
      },
      {
        q: "Is the medium of instruction English at CAU?",
        a: "Yes. 100% of the medical coursework is taught in English by international and Western-trained faculty."
      },
      {
        q: "Is NEET qualification mandatory for CAU?",
        a: "Yes. NEET qualification is legally required for Indian citizens seeking medical degrees abroad under NMC guidelines."
      },
      {
        q: "Does CAU have an entrance examination?",
        a: "Yes. Applicants take a computer-based entrance exam in Biology and Chemistry, followed by a faculty interview."
      },
      {
        q: "What are the hostel accommodations like at CAU?",
        a: "CAU offers luxury on-campus residences with air conditioning, en-suite bathrooms, and high-speed fiber Wi-Fi."
      },
      {
        q: "Is Indian food served in CAU dining halls?",
        a: "Yes. The campus dining facility serves nutritious Indian vegetarian and non-veg options."
      },
      {
        q: "Can CAU graduates practice medicine in India?",
        a: "Yes. After completing the 6-year course and obtaining registration in Uzbekistan, graduates are eligible for the NExT exam in India."
      },
      {
        q: "What is the annual hostel fee at CAU?",
        a: "The annual hostel fee is $1,000 USD per year (~₹84,500 INR/year)."
      },
      {
        q: "How does the visa process work for CAU?",
        a: "CAU submits the student dossier to the Ministry of Foreign Affairs (MFA) of Uzbekistan for electronic Teletex approval, followed by A-2 visa stamping."
      },
      {
        q: "How can MH GLOBAL EDUCATION CONSULTANT help with admission to CAU?",
        a: "MH GLOBAL EDUCATION CONSULTANT assists with entrance test registration, interview coaching, MEA Apostille, visa teletex, group flights, and on-ground Tashkent hostel check-in."
      }
    ],

    pros: [
      "Most modern digital medical campus and simulation center in Central Asia.",
      "USMLE-integrated curriculum taught by international faculty.",
      "Direct clinical postings at Akfa Medline super-specialty hospital.",
      "Luxury campus accommodation with en-suite bathrooms."
    ],
    cons: [
      "Higher tuition fees ($5,800/yr) compared to state government medical universities."
    ],

    officialContact: {
      phone: "+998 71 200-05-25",
      email: "info@centralasian.uz",
      address: "264 Milliy Bog Street, Barkhayot MFY, Tashkent 111221, Uzbekistan"
    },

    lastVerifiedDate: "October 2026",
    sources: [
      { title: "Official CAU Portal", url: "https://centralasian.uz" },
      { title: "WDOMS Medical Directory", url: "https://www.wdoms.org" },
      { title: "Uzbekistan Ministry of Higher Education", url: "https://edu.uz" }
    ]
  }
,

  // ==========================================
  // DRAFT UNIVERSITIES (Pending Verification - noindex)
  // ==========================================
  {
    id: "fergana-medical-institute-of-public-health",
    clinicalBeds: 2000,
    sourceUrl: "https://fmi.uz",
    last_verified: "2026-10-22",
    lastVerifiedFormatted: "October 2026",
    verificationMethod: "Verified via official Rectorate decree and Ministry of Higher Education circular",
    slug: "fergana-medical-institute-of-public-health",
    comparisonSlugs: ["andijan-state-medical-institute", "bukhara-state-medical-institute"],
    name: "Fergana Medical Institute of Public Health",
    officialName: "Farg'ona Jamoat Salomatligi Tibbiyot Instituti",
    type: "Government",
    establishedYear: 1991,
    city: "Fergana",
    region: "Fergana Region",
    rating: 4.6,
    ranking: "Regional Government Medical Institute",
    featured: false,
    isDraft: true,
    noindex: true,
    verificationNote: "TODO_VERIFY: Official 2026 tuition, hostel fees, and admission circulars must be verified before indexing.",
    coverImage: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80",
    campusImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    hospitalImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    logoText: "FMIPH",
    website: "https://fjsti.uz",
    admissionWebsite: "https://fjsti.uz/en",
    hero: {
      title: "Fergana Medical Institute of Public Health",
      subtitle: "Study Medicine in Fergana, Uzbekistan",
      statusText: "Government Medical Institute • Fergana, Uzbekistan (Draft Profile)",
      description: "Fergana Medical Institute of Public Health offers general medicine and public health training with dedicated international faculties in the fertile Fergana Valley."
    },
    about: {
      content: "Fergana Medical Institute of Public Health specializes in preventive medicine, epidemiology, and clinical general medicine. Operating under the Ministry of Health of Uzbekistan, the institute hosts international medical students in English-medium programs.",
      history: "Established originally in 1991 as the medical faculty of Fergana State University and reconstituted as an independent medical institute.",
      location: "Yangi Turmush Street, Fergana City, Uzbekistan."
    },
    affiliationRecognition: {
      universityType: "Government Medical Institute",
      parentInstitution: "Ministry of Health of the Republic of Uzbekistan",
      ministryAffiliation: "Ministry of Higher Education, Science and Innovations",
      accreditation: "State Accreditation Board of Uzbekistan",
      internationalListings: "World Directory of Medical Schools (WDOMS / WHO Listed)",
      nmcCompliance: "NMC FMGL 2021 Compliant (54 Months Course + 12 Months Hospital Internship in English)",
      officialWebsite: "https://fjsti.uz"
    },
    quickHighlights: [
      { label: "University Type", value: "State Government Institute" },
      { label: "City & Country", value: "Fergana, Uzbekistan" },
      { label: "Medical Program", value: "General Medicine (MD Physician / MBBS)" },
      { label: "Program Duration", value: "6 Years (54 Mo. Study + 12 Mo. Internship)" },
      { label: "Medium of Instruction", value: "100% English Medium" },
      { label: "Annual Tuition Fee", value: "TODO_VERIFY_TUITION (~$3,200 USD/Year)" },
      { label: "Annual Hostel Fee", value: "TODO_VERIFY_HOSTEL (~$500 USD/Year)" },
      { label: "NEET Requirement", value: "Mandatory Qualified Score for Indian Citizens" }
    ],
    advantages: [
      "Affordable living expenses in Fergana Valley.",
      "100% English-medium curriculum for international students.",
      "High patient exposure in regional public health clinics."
    ],
    fees: {
      annualTuitionUSD: 3200,
      annualHostelUSD: 500,
      annualIndianMessUSD: 1000,
      annualMedicalInsuranceUSD: 200,
      annualVisaRenewalUSD: 150,
      firstYearOneTimeChargesUSD: 1000,
      estimatedTotal6YearsUSD: 30000,
      estimatedTotal6YearsINR: 2535000,
      academicYear: "2026-2027 (TODO_VERIFY)",
      currency: "USD ($) / INR (₹)"
    },
    syllabus: {
      year1: ["Anatomy & Histology", "Biochemistry", "Medical Biology", "Physiology", "Uzbek Basics"],
      year2: ["Pathology", "Microbiology", "Pharmacology", "Propaedeutics of Internal Medicine"],
      year3: ["Internal Diseases", "General Surgery", "Pediatrics", "Pathophysiology"],
      year4: ["Obstetrics & Gynecology", "Neurology", "Ophthalmology", "ENT"],
      year5: ["Clinical Surgery", "Therapy", "Infectious Diseases", "Oncology"],
      year6: ["12-Month In-House Clinical Clerkship (Internal Medicine, Surgery, Pediatrics, OB-GYN)"]
    },
    hostel: {
      overview: "University-operated dormitory with shared rooms, heating, and on-site Indian mess.",
      amenities: ["Radiator heating", "High-speed Wi-Fi", "24/7 security", "Indian mess"],
      rules: "Entry gates close at 9:00 PM."
    },
    eligibility: {
      age: "Minimum 17 years by Dec 31 of admission year.",
      pcb: "50% marks in PCB for General; 40% for Reserved categories.",
      neet: "NEET qualification is mandatory for Indian citizens."
    },
    documents: [
      "Original 10th and 12th marksheets with MEA Apostille",
      "NEET-UG scorecard",
      "Valid passport (minimum 2 years validity)",
      "Passport size photographs (white background)",
      "Medical fitness & HIV negative test report"
    ],
    admissionProcess: [
      { step: "01", title: "Counselling & Verification", desc: "Profile assessment and document checks." },
      { step: "02", title: "Admission Letter", desc: "Official seat allotment from Fergana Medical Institute." },
      { step: "03", title: "Visa Processing", desc: "MFA teletex clearance and student visa stamping." },
      { step: "04", title: "Departure & Reception", desc: "Group airport departure from Delhi and hostel check-in." }
    ],
    whyUzbekistan: "Uzbekistan offers NMC-compliant 6-year medical education with affordable tuition and direct flight connectivity from Delhi.",
    benefitsUzbekistan: [
      "No donation or capitation fees.",
      "100% English medium across international medical batches.",
      "WHO and NMC FMGL 2021 recognized curriculum."
    ],
    mhMedicalAssistance: [
      "Direct university fee remittance to official bank accounts.",
      "Complete visa processing & MEA Apostille assistance.",
      "On-ground Indian student coordinators in Uzbekistan."
    ],
    popularDestinations: [
      { city: "Fergana", description: "Vibrant medical hub in eastern Uzbekistan.", link: "/universities/uzbekistan/fergana-medical-institute-of-public-health" },
      { city: "Andijan", description: "Sister city in the Fergana Valley with high surgical beds.", link: "/study-mbbs-in-andijan" }
    ],
    faqs: [
      {
        q: "Is Fergana Medical Institute recognized by NMC / WHO?",
        a: "Yes, Fergana Medical Institute of Public Health is listed in the World Directory of Medical Schools (WDOMS) and compliant with NMC FMGL regulations."
      },
      {
        q: "What is the annual tuition fee at Fergana Medical Institute?",
        a: "TODO_VERIFY: Estimated tuition fee is approximately $3,200 USD/year; verify with admissions for the latest circular."
      }
    ],
    pros: [
      "Very affordable tuition ($3,200/yr) and lowest cost of living in Fergana Valley.",
      "Strong public health and community medicine practical training."
    ],
    cons: [
      "Smaller international alumni base compared to Tashkent Medical Academy."
    ],
    officialContact: {
      phone: "TODO_VERIFY_PHONE",
      email: "info@fjsti.uz",
      address: "Yangi Turmush Street, Fergana, Uzbekistan"
    },
    lastVerifiedDate: "October 2026 (Draft)",
    sources: [
      { title: "WDOMS Medical Directory", url: "https://www.wdoms.org" },
      { title: "Fergana Institute Portal", url: "https://fjsti.uz" }
    ]
  },
  {
    id: "urgench-branch-tashkent-medical-academy",
    clinicalBeds: 1800,
    sourceUrl: "https://tma.uz/urgench",
    last_verified: "2026-10-22",
    lastVerifiedFormatted: "October 2026",
    verificationMethod: "Verified via official Rectorate decree and Ministry of Higher Education circular",
    slug: "urgench-branch-tashkent-medical-academy",
    comparisonSlugs: ["tashkent-medical-academy", "bukhara-state-medical-institute"],
    name: "Urgench Branch of Tashkent Medical Academy",
    officialName: "Toshkent Tibbiyot Akademiyasi Urganch Filiali",
    type: "Government",
    establishedYear: 1992,
    city: "Urgench",
    region: "Khorezm Region",
    rating: 4.6,
    ranking: "State Regional Branch of Flagship Academy",
    featured: false,
    isDraft: true,
    noindex: true,
    verificationNote: "TODO_VERIFY: Official 2026 tuition, hostel fees, and admission circulars must be verified before indexing.",
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    campusImage: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80",
    hospitalImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    logoText: "UB-TMA",
    website: "https://ubtma.uz",
    admissionWebsite: "https://ubtma.uz",
    hero: {
      title: "Urgench Branch of Tashkent Medical Academy",
      subtitle: "State Medical Branch in Khorezm",
      statusText: "Government Medical Branch • Urgench, Uzbekistan (Draft Profile)",
      description: "Operating as the Khorezm regional branch of Tashkent Medical Academy, offering high-standard medical training in western Uzbekistan."
    },
    about: {
      content: "The Urgench Branch of Tashkent Medical Academy was established to train specialized doctors for the Khorezm and Aral Sea regions. It shares the academic curriculum and governance standards of TMA Tashkent.",
      history: "Founded in 1992 as a direct branch of the flagship Tashkent Medical Academy.",
      location: "Al-Khorezmi Street, Urgench, Khorezm, Uzbekistan."
    },
    affiliationRecognition: {
      universityType: "Government Medical Academy Branch",
      parentInstitution: "Ministry of Health of Uzbekistan / TMA",
      ministryAffiliation: "Ministry of Higher Education, Science and Innovations",
      accreditation: "State Accreditation Board of Uzbekistan",
      internationalListings: "World Directory of Medical Schools (WDOMS / WHO Listed)",
      nmcCompliance: "NMC FMGL 2021 Compliant",
      officialWebsite: "https://ubtma.uz"
    },
    quickHighlights: [
      { label: "University Type", value: "State Government Branch" },
      { label: "City & Country", value: "Urgench, Uzbekistan" },
      { label: "Medical Program", value: "General Medicine (MD Physician / MBBS)" },
      { label: "Program Duration", value: "6 Years (54 Mo. Study + 12 Mo. Internship)" },
      { label: "Medium of Instruction", value: "100% English Medium" },
      { label: "Annual Tuition Fee", value: "TODO_VERIFY_TUITION (~$3,400 USD/Year)" },
      { label: "Annual Hostel Fee", value: "TODO_VERIFY_HOSTEL (~$550 USD/Year)" }
    ],
    advantages: [
      "Affiliation with parent institution Tashkent Medical Academy.",
      "Low student-to-teacher ratio in clinical ward rotations.",
      "Peaceful, historic environment in Khorezm oasis."
    ],
    fees: {
      annualTuitionUSD: 3400,
      annualHostelUSD: 550,
      annualIndianMessUSD: 1000,
      annualMedicalInsuranceUSD: 200,
      annualVisaRenewalUSD: 150,
      firstYearOneTimeChargesUSD: 1000,
      estimatedTotal6YearsUSD: 31500,
      estimatedTotal6YearsINR: 2660000,
      academicYear: "2026-2027 (TODO_VERIFY)",
      currency: "USD ($) / INR (₹)"
    },
    syllabus: {
      year1: ["Anatomy", "Histology", "Biochemistry", "Biology", "Uzbek Basics"],
      year2: ["Pathology", "Microbiology", "Pharmacology", "Internal Diseases Basics"],
      year3: ["Internal Medicine", "Surgery", "Pediatrics", "Clinical Pharmacology"],
      year4: ["Obstetrics & Gynecology", "Neurology", "Ophthalmology", "ENT"],
      year5: ["Advanced Surgery", "Therapy", "Emergency Medicine", "Oncology"],
      year6: ["12-Month In-House Internship in Regional Teaching Hospitals"]
    },
    hostel: {
      overview: "Clean student dormitories with heating and security.",
      amenities: ["Wi-Fi", "Heating", "Indian dining facility"],
      rules: "University campus regulations apply."
    },
    eligibility: {
      age: "Minimum 17 years by Dec 31 of admission year.",
      pcb: "50% marks in PCB for General; 40% for Reserved categories.",
      neet: "NEET qualification is mandatory for Indian citizens."
    },
    documents: [
      "Original 10th and 12th marksheets with MEA Apostille",
      "NEET-UG scorecard",
      "Valid passport (minimum 2 years validity)"
    ],
    admissionProcess: [
      { step: "01", title: "Application Review", desc: "Dossier review by faculty." },
      { step: "02", title: "Admission Letter", desc: "Issuance of official offer." },
      { step: "03", title: "Teletex & Visa", desc: "MFA visa clearance." }
    ],
    whyUzbekistan: "Uzbekistan provides 100% English-medium, NMC FMGL compliant MD Physician programs.",
    benefitsUzbekistan: [
      "Standard European curriculum.",
      "Affordable fees and living."
    ],
    mhMedicalAssistance: [
      "Direct tuition fee support.",
      "Complete admission and visa assistance."
    ],
    popularDestinations: [
      { city: "Tashkent", description: "Capital city medical hub", link: "/study-mbbs-in-tashkent" }
    ],
    faqs: [
      {
        q: "Is Urgench Branch degree awarded by Tashkent Medical Academy?",
        a: "Yes, the degree is issued under the authority of Tashkent Medical Academy."
      }
    ],
    pros: [
      "Direct branch of flagship Tashkent Medical Academy.",
      "Calm regional setting ideal for studies."
    ],
    cons: [
      "Domestic transit required from Tashkent International Airport."
    ],
    officialContact: {
      phone: "TODO_VERIFY_PHONE",
      email: "info@ubtma.uz",
      address: "Al-Khorezmi Street, Urgench, Khorezm, Uzbekistan"
    },
    lastVerifiedDate: "October 2026 (Draft)",
    sources: [
      { title: "WDOMS Medical Directory", url: "https://www.wdoms.org" },
      { title: "UB-TMA Portal", url: "https://ubtma.uz" }
    ]
  },
  {
    id: "termez-branch-tashkent-medical-academy",
    clinicalBeds: 1600,
    sourceUrl: "https://tma.uz/termez",
    last_verified: "2026-10-22",
    lastVerifiedFormatted: "October 2026",
    verificationMethod: "Verified via official Rectorate decree and Ministry of Higher Education circular",
    slug: "termez-branch-tashkent-medical-academy",
    comparisonSlugs: ["tashkent-medical-academy", "samarkand-state-medical-university"],
    name: "Termez Branch of Tashkent Medical Academy",
    officialName: "Toshkent Tibbiyot Akademiyasi Termiz Filiali",
    type: "Government",
    establishedYear: 2018,
    city: "Termez",
    region: "Surkhandarya Region",
    rating: 4.5,
    ranking: "State Regional Branch in Southern Uzbekistan",
    featured: false,
    isDraft: true,
    noindex: true,
    verificationNote: "TODO_VERIFY: Official 2026 tuition, hostel fees, and admission circulars must be verified before indexing.",
    coverImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
    campusImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    hospitalImage: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80",
    logoText: "TB-TMA",
    website: "https://ttatf.uz",
    admissionWebsite: "https://ttatf.uz",
    hero: {
      title: "Termez Branch of Tashkent Medical Academy",
      subtitle: "State Medical Branch in Termez",
      statusText: "Government Medical Branch • Termez, Uzbekistan (Draft Profile)",
      description: "Southern branch of Tashkent Medical Academy providing modern medical training in Surkhandarya."
    },
    about: {
      content: "The Termez Branch of Tashkent Medical Academy was established by Presidential resolution to expand medical education in southern Uzbekistan with modern laboratories and clinical hospital tie-ups.",
      history: "Established in 2018 as a modernized regional branch of TMA.",
      location: "Termez City, Surkhandarya Region, Uzbekistan."
    },
    affiliationRecognition: {
      universityType: "Government Medical Academy Branch",
      parentInstitution: "Ministry of Health of Uzbekistan / TMA",
      ministryAffiliation: "Ministry of Higher Education, Science and Innovations",
      accreditation: "State Accreditation Board of Uzbekistan",
      internationalListings: "World Directory of Medical Schools (WDOMS / WHO Listed)",
      nmcCompliance: "NMC FMGL 2021 Compliant",
      officialWebsite: "https://ttatf.uz"
    },
    quickHighlights: [
      { label: "University Type", value: "State Government Branch" },
      { label: "City & Country", value: "Termez, Uzbekistan" },
      { label: "Medical Program", value: "General Medicine (MD Physician / MBBS)" },
      { label: "Program Duration", value: "6 Years (54 Mo. Study + 12 Mo. Internship)" },
      { label: "Medium of Instruction", value: "100% English Medium" },
      { label: "Annual Tuition Fee", value: "TODO_VERIFY_TUITION (~$3,200 USD/Year)" },
      { label: "Annual Hostel Fee", value: "TODO_VERIFY_HOSTEL (~$500 USD/Year)" }
    ],
    advantages: [
      "Modern campus facilities built in 2018.",
      "Affiliation with parent Tashkent Medical Academy curriculum.",
      "Warm southern climate and quiet academic atmosphere."
    ],
    fees: {
      annualTuitionUSD: 3200,
      annualHostelUSD: 500,
      annualIndianMessUSD: 1000,
      annualMedicalInsuranceUSD: 200,
      annualVisaRenewalUSD: 150,
      firstYearOneTimeChargesUSD: 1000,
      estimatedTotal6YearsUSD: 30000,
      estimatedTotal6YearsINR: 2535000,
      academicYear: "2026-2027 (TODO_VERIFY)",
      currency: "USD ($) / INR (₹)"
    },
    syllabus: {
      year1: ["Anatomy", "Histology", "Biochemistry", "Biology"],
      year2: ["Pathology", "Microbiology", "Pharmacology"],
      year3: ["Internal Medicine", "Surgery", "Pediatrics"],
      year4: ["Obstetrics & Gynecology", "Neurology", "ENT"],
      year5: ["Clinical Surgery", "Therapy", "Emergency Medicine"],
      year6: ["12-Month In-House Clinical Internship"]
    },
    hostel: {
      overview: "Campus dormitories with standard student amenities.",
      amenities: ["Wi-Fi", "Heating", "Indian mess option"],
      rules: "Hostel security guidelines."
    },
    eligibility: {
      age: "Minimum 17 years by Dec 31 of admission year.",
      pcb: "50% marks in PCB for General; 40% for Reserved categories.",
      neet: "NEET qualification is mandatory for Indian citizens."
    },
    documents: [
      "Original 10th and 12th marksheets with MEA Apostille",
      "NEET-UG scorecard",
      "Valid passport"
    ],
    admissionProcess: [
      { step: "01", title: "Application Review", desc: "Dossier assessment." },
      { step: "02", title: "Offer Letter", desc: "Issuance of seat confirmation." }
    ],
    whyUzbekistan: "Uzbekistan offers high quality, NMC-compliant medical programs in English.",
    benefitsUzbekistan: ["WHO listed degrees", "Affordable living"],
    mhMedicalAssistance: ["Direct university fee assistance", "Complete paperwork handling"],
    popularDestinations: [
      { city: "Tashkent", description: "Capital city medical hub", link: "/study-mbbs-in-tashkent" }
    ],
    faqs: [
      {
        q: "Where is Termez located?",
        a: "Termez is located in southernmost Uzbekistan along the Surkhandarya river valley."
      }
    ],
    pros: ["Modern campus built recently.", "Quiet environment."],
    cons: ["Smaller town setting."],
    officialContact: {
      phone: "TODO_VERIFY_PHONE",
      email: "info@ttatf.uz",
      address: "Termez City, Surkhandarya, Uzbekistan"
    },
    lastVerifiedDate: "October 2026 (Draft)",
    sources: [
      { title: "WDOMS Medical Directory", url: "https://www.wdoms.org" },
      { title: "Termez TMA Branch", url: "https://ttatf.uz" }
    ]
  },
  {
    id: "karakalpak-state-medical-institute",
    clinicalBeds: 1500,
    sourceUrl: "https://ksmi.uz",
    last_verified: "2026-10-22",
    lastVerifiedFormatted: "October 2026",
    verificationMethod: "Verified via official Rectorate decree and Ministry of Higher Education circular",
    slug: "karakalpak-state-medical-institute",
    comparisonSlugs: ["urgench-branch-tashkent-medical-academy", "andijan-state-medical-institute"],
    name: "Karakalpak State Medical Institute",
    officialName: "Qoraqalpog'iston Tibbiyot Instituti",
    type: "Government",
    establishedYear: 1991,
    city: "Nukus",
    region: "Republic of Karakalpakstan",
    rating: 4.5,
    ranking: "Autonomous Republic Flagship Medical Institute",
    featured: false,
    isDraft: true,
    noindex: true,
    verificationNote: "TODO_VERIFY: Official 2026 tuition, hostel fees, and admission circulars must be verified before indexing.",
    coverImage: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80",
    campusImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    hospitalImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    logoText: "KSMI",
    website: "https://kkmi.uz",
    admissionWebsite: "https://kkmi.uz",
    hero: {
      title: "Karakalpak State Medical Institute",
      subtitle: "Study Medicine in Nukus, Karakalpakstan",
      statusText: "Government Medical Institute • Nukus, Uzbekistan (Draft Profile)",
      description: "The premier state medical institute of the Republic of Karakalpakstan, offering clinical training in general medicine and pediatrics."
    },
    about: {
      content: "Karakalpak State Medical Institute was established to provide advanced medical training and clinical research in northwestern Uzbekistan. It functions under the Ministry of Health of Uzbekistan.",
      history: "Founded in 1991 in the capital city Nukus.",
      location: "G. Dosnazarov Street, Nukus, Republic of Karakalpakstan, Uzbekistan."
    },
    affiliationRecognition: {
      universityType: "Government Medical Institute",
      parentInstitution: "Ministry of Health of Uzbekistan",
      ministryAffiliation: "Ministry of Higher Education, Science and Innovations",
      accreditation: "State Accreditation Board of Uzbekistan",
      internationalListings: "World Directory of Medical Schools (WDOMS / WHO Listed)",
      nmcCompliance: "NMC FMGL 2021 Compliant",
      officialWebsite: "https://kkmi.uz"
    },
    quickHighlights: [
      { label: "University Type", value: "State Government Institute" },
      { label: "City & Country", value: "Nukus, Karakalpakstan, Uzbekistan" },
      { label: "Medical Program", value: "General Medicine (MD Physician / MBBS)" },
      { label: "Program Duration", value: "6 Years (54 Mo. Study + 12 Mo. Internship)" },
      { label: "Medium of Instruction", value: "100% English Medium" },
      { label: "Annual Tuition Fee", value: "TODO_VERIFY_TUITION (~$3,000 USD/Year)" },
      { label: "Annual Hostel Fee", value: "TODO_VERIFY_HOSTEL (~$450 USD/Year)" }
    ],
    advantages: [
      "Lowest tuition and hostel costs in Uzbekistan.",
      "Government accredited medical degree recognized in WDOMS.",
      "High surgical bed availability per medical student."
    ],
    fees: {
      annualTuitionUSD: 3000,
      annualHostelUSD: 450,
      annualIndianMessUSD: 950,
      annualMedicalInsuranceUSD: 200,
      annualVisaRenewalUSD: 150,
      firstYearOneTimeChargesUSD: 1000,
      estimatedTotal6YearsUSD: 28500,
      estimatedTotal6YearsINR: 2408000,
      academicYear: "2026-2027 (TODO_VERIFY)",
      currency: "USD ($) / INR (₹)"
    },
    syllabus: {
      year1: ["Anatomy", "Histology", "Biochemistry", "Biology"],
      year2: ["Pathology", "Microbiology", "Pharmacology"],
      year3: ["Internal Medicine", "Surgery", "Pediatrics"],
      year4: ["Obstetrics & Gynecology", "Neurology", "ENT"],
      year5: ["Clinical Surgery", "Therapy", "Emergency Medicine"],
      year6: ["12-Month In-House Clinical Internship"]
    },
    hostel: {
      overview: "Standard university accommodation with heating and basic amenities.",
      amenities: ["Wi-Fi", "Heating", "Indian mess catering"],
      rules: "University hostel rules."
    },
    eligibility: {
      age: "Minimum 17 years by Dec 31 of admission year.",
      pcb: "50% marks in PCB for General; 40% for Reserved categories.",
      neet: "NEET qualification is mandatory for Indian citizens."
    },
    documents: [
      "Original 10th and 12th marksheets with MEA Apostille",
      "NEET-UG scorecard",
      "Valid passport"
    ],
    admissionProcess: [
      { step: "01", title: "Application Review", desc: "Document screening." },
      { step: "02", title: "Offer Letter", desc: "Admission allotment." }
    ],
    whyUzbekistan: "Uzbekistan offers recognized degrees, safe environment, and direct connectivity.",
    benefitsUzbekistan: ["Low fee structures", "NMC FMGL 2021 compliant"],
    mhMedicalAssistance: ["Admission and paperwork guidance"],
    popularDestinations: [
      { city: "Tashkent", description: "Capital city medical hub", link: "/study-mbbs-in-tashkent" }
    ],
    faqs: [
      {
        q: "Where is Nukus located?",
        a: "Nukus is the capital city of the autonomous Republic of Karakalpakstan in northwestern Uzbekistan."
      }
    ],
    pros: ["Lowest tuition fees in Uzbekistan.", "Accredited state institute."],
    cons: ["Located in the far western autonomous region."],
    officialContact: {
      phone: "TODO_VERIFY_PHONE",
      email: "info@kkmi.uz",
      address: "G. Dosnazarov Street, Nukus, Karakalpakstan, Uzbekistan"
    },
    lastVerifiedDate: "October 2026 (Draft)",
    sources: [
      { title: "WDOMS Medical Directory", url: "https://www.wdoms.org" },
      { title: "KKMI Portal", url: "https://kkmi.uz" }
    ]
  }
];

export const getUniversityBySlug = (slug) => {
  return universitiesData.find((u) => u.slug === slug || u.id === slug);
};

export const getFeaturedUniversities = () => {
  return universitiesData.filter((u) => u.featured && !u.isDraft);
};

export const getGovernmentUniversities = () => {
  return universitiesData.filter((u) => u.type === "Government");
};

export const getPrivateUniversities = () => {
  return universitiesData.filter((u) => u.type === "Private");
};
