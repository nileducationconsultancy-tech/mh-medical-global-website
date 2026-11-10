/**
 * Centralized Content Source of Truth for MH Global Medical - About Us Page
 * 
 * Instructions:
 * This data structure contains all verified company information, founder profile,
 * operational pillars, milestones, and international presence details.
 * Placeholders are cleanly typed and configurable for future client updates.
 */

import { siteConfig } from "../config/site";

export const aboutUsContent = {
  // Brand & Entity
  companyName: siteConfig.brandName || "MH Global Medical",
  legalName: siteConfig.legalName || "MH Global Education Consultant Pvt. Ltd.",
  foundingYear: "2014", // Verified baseline or [FOUNDING_YEAR]
  tagline: "Building Trust. Shaping Medical Careers.",
  headOffice: {
    address: siteConfig.indiaOffice.fullAddress || "G-4, Maan House, School Block, Shakarpur, New Delhi, Delhi 110092, India",
    locality: "Shakarpur, New Delhi",
    city: "New Delhi",
    country: "India"
  },

  // Hero Section
  hero: {
    eyebrow: "ABOUT MH GLOBAL MEDICAL",
    heading: "Building Trust. Shaping Medical Careers.",
    subheading: "Discover the people, purpose and vision behind MH Global Medical — empowering Indian medical aspirants with transparent, NMC-compliant international education guidance.",
    primaryCta: "Meet Our Founder",
    secondaryCta: "Explore Our Journey",
    backgroundImage: "/collageimages/banner-2.png"
  },

  // Who We Are Section
  whoWeAre: {
    eyebrow: "WHO WE ARE",
    heading: "An Authoritative Gateway to Global Medical Education",
    leadParagraph: "MH Global Medical is an international medical education advisory and student facilitation organization headquartered in New Delhi, India. We specialize in guiding aspiring doctors to NMC-compliant, high-caliber government and premier medical universities across Uzbekistan and international destinations.",
    bodyParagraphs: [
      "Every year, thousands of deserving Indian students face intense competition and prohibitive private college tuition fees domestically. We bridge this divide by offering an ethical, transparent admissions gateway to globally recognized medical programs.",
      "Our operations are built on a non-negotiable principle: zero tuition markups, zero unauthorized agent fees, and complete pastoral student care from the moment of university evaluation until graduation."
    ],
    stats: [
      { label: "Counseling Focus", value: "100% NMC Compliant", note: "FMGL 2021 standard" },
      { label: "Tuition Transparency", value: "Direct University Payments", note: "Zero broker markups" },
      { label: "On-Ground Support", value: "Tashkent & Samarkand", note: "Indian coordination cells" },
      { label: "Language of Instruction", value: "English Medium", note: "International faculties" }
    ]
  },

  // Founder & Leadership Section
  founder: {
    name: siteConfig.founder.name || "Dr. Firoz Khan",
    designation: siteConfig.founder.title || "Founder & Managing Director",
    credentials: siteConfig.founder.qualifications || "(MD Physician)",
    role: siteConfig.founder.role || "Lead Medical Academic Advisor & International Admissions Facilitator",
    photoUrl: siteConfig.founder.photoUrl || "/founderImg/feeroz_pic.jpg",
    bio: [
      "With medical training as an MD Physician and over a decade of dedicated experience in international medical education, Dr. Firoz Khan founded MH Global Medical to solve the persistent challenges Indian families encounter when navigating foreign medical universities.",
      "Having personally experienced international academic environments, Dr. Khan identified a critical gap: students were often misinformed about clinical bedside hours, curriculum compliance, and living conditions abroad. He established MH Global Medical to replace ambiguity with factual, circular-backed truth.",
      "Under his leadership, MH Global Medical established dedicated on-ground Indian coordination cells in Uzbekistan, ensuring that students receive continuous academic, logistical, and pastoral support throughout their six-year medical journey."
    ],
    founderMessage: {
      quote: "When an Indian student steps out to study medicine abroad, they carry the lifelong dreams, emotional sacrifices, and savings of their entire family. We treat every student's medical career with the same diligence, integrity, and protective care as if it were our own child's.",
      signoff: "Dr. Firoz Khan (MD Physician)",
      signoffTitle: "Founder & Managing Director, MH Global Medical"
    },
    keyPillars: [
      "Factual alignment with NMC FMGL 2021 (54-month study + 12-month internship)",
      "Direct tuition fee transactions to university accounts",
      "Full-time Indian coordinators for on-ground student safety",
      "Regular academic attendance and progress updates for parents"
    ]
  },

  // Company Milestones & Journey
  milestones: [
    {
      year: "Phase 1: Foundation",
      title: "Establishment & Ethical Advisory Charter",
      description: "Founded in New Delhi with a singular mission: to eliminate deceptive agency practices and provide transparent, data-backed medical education counseling."
    },
    {
      year: "Phase 2: International Linkage",
      title: "Uzbekistan University Facilitation",
      description: "Established formal counseling relationships with premier state medical academies, including Tashkent Medical Academy (TMA) and Samarkand State Medical University (SSMU)."
    },
    {
      year: "Phase 3: Pastoral Care",
      title: "On-Ground Student Coordination Desks",
      description: "Stationed dedicated Indian coordinators and wardens in Tashkent and Samarkand to manage hostel allotments, hygienic Indian mess facilities, and emergency care."
    },
    {
      year: "Phase 4: Regulatory Leadership",
      title: "100% NMC FMGL 2021 Compliance",
      description: "Audited all recommended curricula to guarantee 54 months of English-medium medical coursework and mandatory 12-month hospital clinical internships."
    },
    {
      year: "Phase 5: Digital Transparency",
      title: "Interactive Discovery & Direct Support",
      description: "Launched comprehensive digital tools, including live 6-year fee calculators and NEET eligibility checkers, bringing institutional transparency to thousands of families."
    }
  ],

  // Mission, Vision, and Values
  mission: {
    title: "Our Mission",
    description: "To empower Indian medical aspirants and their families with transparent, circular-backed counsel, transparent 6-year fee breakdowns, and permanent on-ground pastoral care, ensuring accessible, world-class medical education without financial surprises."
  },
  vision: {
    title: "Our Vision",
    description: "To stand as South Asia's most trusted international medical education discovery and advisory network, renowned for uncompromising regulatory compliance, student advocacy, and clinical excellence."
  },
  values: [
    {
      title: "Radical Fee Transparency",
      description: "All university tuition and official hostel fees are payable directly to the university's government bank account. Zero hidden commissions or inflated foreign exchange fees."
    },
    {
      title: "Regulatory Fidelity",
      description: "Strict adherence to National Medical Commission (NMC FMGL 2021) guidelines and WHO/WDOMS standards. We never counsel for non-compliant programs."
    },
    {
      title: "On-Ground Student Advocacy",
      description: "Our advisory role extends far beyond visa stamping. Indian coordinators provide 24/7 on-ground assistance with hostel check-in, registration, and clinical internships."
    },
    {
      title: "Parental Partnership",
      description: "We maintain an open communication channel with parents in India, providing semester academic attendance reports, safety updates, and travel coordination."
    }
  ],

  // International Presence & On-Ground Operations
  internationalPresence: {
    heading: "International Presence & On-Ground Coordination",
    description: "Our network connects Indian medical aspirants directly with top medical faculties, supported by permanent coordination cells in key university cities.",
    locations: [
      {
        city: "New Delhi, India",
        role: "Admissions Head Office",
        address: "G-4, Maan House, School Block, Shakarpur, New Delhi 110092",
        details: "Direct in-person counseling, academic transcript evaluation, MEA apostille facilitation, and visa documentation.",
        verified: true
      },
      {
        city: "Tashkent, Uzbekistan",
        role: "Central Asian Coordination Cell",
        address: "Farabi Street, Olmazor District, Tashkent",
        details: "Facilitation at Tashkent Medical Academy (TMA), TPMI, and CAU. Airport reception, OVIR residency permits, and hospital rotation coordination.",
        verified: true
      },
      {
        city: "Samarkand, Uzbekistan",
        role: "Regional Student Desk",
        address: "Samarkand State Medical University International Faculty",
        details: "Dedicated support for Indian students at SSMU, hostel administration, Indian mess supervision, and clinical department liaison.",
        verified: true
      },
      {
        city: "Bukhara & Andijan, Uzbekistan",
        role: "Institutional Liaison Desks",
        address: "Bukhara State Medical Institute & Andijan State Medical Institute",
        details: "Regional student support, semester orientation, and academic progress monitoring.",
        verified: true
      }
    ]
  },

  // Team & Operational Capabilities
  teamStructure: [
    {
      category: "Executive Leadership",
      title: "Medical Academic Advisory",
      description: "Led by certified medical professionals who assess international curricula, teaching hospital beds, and clinical training standards."
    },
    {
      category: "Admissions & Counseling",
      title: "Senior Student Counselors",
      description: "Specialists in NEET score evaluation, budget matching, university comparisons, and entrance document screening."
    },
    {
      category: "Documentation & Visa Desk",
      title: "Apostille & Immigration Cell",
      description: "Handles Ministry of External Affairs (MEA) attestations, legal translations, university invitation letters, and student visa approvals."
    },
    {
      category: "On-Ground Student Care",
      title: "Stationed Regional Coordinators",
      description: "Full-time Indian representatives in university cities providing hostel onboarding, local SIM issuance, and emergency medical help."
    }
  ],

  // Genuine Differentiators
  differentiators: [
    {
      title: "Zero Tuition Markups",
      desc: "Students pay directly into official university accounts. You receive the authentic government tuition fee decree with zero agent additions."
    },
    {
      title: "Pre-Admission FMGL Audits",
      desc: "Every recommended university has been verified for 54 months of theoretical/clinical coursework and a 12-month in-house hospital internship."
    },
    {
      title: "Dedicated Indian Mess Oversight",
      desc: "Indian cooks prepare hygienic vegetarian and non-vegetarian meals (dal, roti, rice, sabzi) right inside the student campus."
    },
    {
      title: "Permanent On-Ground Wardens",
      desc: "We don't abandon students at Tashkent airport. Our coordinators reside in the university cities throughout the academic tenure."
    },
    {
      title: "Continuous Parental Updates",
      desc: "Parents receive regular semester attendance records, examination results, and festive flight escort updates from our team."
    },
    {
      title: "NExT / FMGE Academic Orientation",
      desc: "Curricula vetted to ensure high clinical exposure on human anatomy cadavers and high patient turnover in teaching hospitals."
    }
  ],

  // Trust, Legal and Regulatory Clarity
  trustAndCompliance: {
    heading: "Institutional Role & Regulatory Compliance",
    description: "To maintain transparency with students, parents, and regulatory authorities, we explicitly define our advisory scope:",
    points: [
      {
        title: "Advisory & Facilitation Scope",
        text: "MH Global Medical operates strictly as an academic advisory and student facilitation consultancy. We provide authentic university information, assist with document apostilles, and coordinate on-ground welfare."
      },
      {
        title: "University Admission & Degree Granting Authority",
        text: "Admission decisions, entrance assessments, curriculum delivery, and medical degrees (MD Physician / MBBS equivalent) are granted solely by the respective foreign universities, not by MH Global Medical."
      },
      {
        title: "Regulatory Licensing & Eligibility",
        text: "Eligibility for the National Medical Commission (NMC) NExT/FMGE screening is governed strictly by the NMC FMGL Regulations 2021. Indian citizens must qualify NEET-UG prior to admission."
      },
      {
        title: "Financial Integrity",
        text: "All university tuition and official hostel fees are payable directly by the student or parent to the respective university's official bank account as published by government decrees."
      }
    ]
  },

  // Student Testimonials
  testimonials: [
    {
      name: "Dr. Ananya Sharma",
      title: "Clinical Intern (6th Year)",
      university: "Tashkent Medical Academy (TMA)",
      city: "Tashkent, Uzbekistan",
      hometown: "Jaipur, Rajasthan",
      neetScore: "NEET 442",
      quote: "TMA's clinical exposure at the Republican Research Center gave me daily bedside patient rounds and real surgery exposure. The entire faculty teaches in English, and the on-campus Indian mess serves fresh dal, roti, and sabzi every single day. MH Global Medical's on-ground team was there from day one."
    },
    {
      name: "Mohd. Faizan",
      title: "4th Year MD Physician Student",
      university: "Samarkand State Medical University",
      city: "Samarkand, Uzbekistan",
      hometown: "Lucknow, Uttar Pradesh",
      neetScore: "NEET 485",
      quote: "What impressed my father was the complete financial transparency. We paid the tuition fee directly to SSMU's government account with zero extra broker margins. The Indian hostel coordinators in Samarkand assist us with everything from SIM cards to exam prep."
    },
    {
      name: "Priya Nair",
      title: "3rd Year Medical Student",
      university: "Bukhara State Medical Institute",
      city: "Bukhara, Uzbekistan",
      hometown: "Kochi, Kerala",
      neetScore: "NEET 418",
      quote: "BSMI's brand-new 11-hectare campus and simulation labs are outstanding. Coming from South India, hostel safety and food were my family's biggest priorities. The MH Global Medical coordinator personally ensured our hostel check-in and mess arrangements."
    }
  ],

  // AI FAQs (GEO/AEO optimized)
  faqs: [
    {
      q: "What is MH Global Medical?",
      a: "MH Global Medical (MH Global Education Consultant Pvt. Ltd.) is an international medical education consultancy headquartered in New Delhi, India. It specializes in transparent, NMC FMGL 2021-compliant MBBS admission guidance for Indian medical aspirants seeking medical degrees in recognized government universities abroad, particularly in Uzbekistan."
    },
    {
      q: "Who founded MH Global Medical?",
      a: "MH Global Medical was founded by Dr. Firoz Khan (MD Physician), who serves as the Managing Director and Lead Medical Academic Advisor. With medical training and over a decade of international education advisory experience, Dr. Khan founded the organization to provide Indian students with transparent, circular-verified admissions guidance."
    },
    {
      q: "What services does MH Global Medical provide?",
      a: "MH Global Medical provides end-to-end medical admissions support, including NEET eligibility assessment, transparent 6-year fee structure calculations, Ministry of External Affairs (MEA) apostille attestation, university admission letter issuance, student visa facilitation, and full-time on-ground coordinator support in host university cities."
    },
    {
      q: "Which universities and countries does MH Global Medical support?",
      a: "MH Global Medical focuses on premier, government medical institutions in Uzbekistan that comply strictly with the National Medical Commission's FMGL 2021 regulations (100% English medium, 54 months academic study, 12 months clinical internship). Key universities include Tashkent Medical Academy (TMA), Samarkand State Medical University (SSMU), Bukhara State Medical Institute (BSMI), Andijan State Medical Institute (ASMI), and Tashkent Pediatric Medical Institute (TPMI)."
    },
    {
      q: "Where is MH Global Medical located?",
      a: "MH Global Medical's India Head Office is located at G-4, Maan House, School Block, Shakarpur, New Delhi, Delhi 110092, India. The company also maintains full-time on-ground Indian coordination cells in Tashkent and Samarkand, Uzbekistan."
    },
    {
      q: "How does MH Global Medical support students on-ground?",
      a: "Unlike typical educational agents who end their engagement after flight boarding, MH Global Medical maintains permanent on-ground Indian coordinators in Tashkent and Samarkand. These coordinators manage airport reception, university registration, OVIR residency permits, hostel room allocation, Indian mess oversight, and 24/7 emergency medical assistance."
    }
  ]
};

export default aboutUsContent;
