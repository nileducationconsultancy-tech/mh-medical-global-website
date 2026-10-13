import mongoose from 'mongoose';

const UniversitySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    officialName: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      enum: ['Government', 'Private'],
      required: true
    },
    establishedYear: Number,
    city: {
      type: String,
      required: true
    },
    region: String,
    rating: {
      type: Number,
      default: 4.8
    },
    ranking: String,
    featured: {
      type: Boolean,
      default: false
    },
    coverImage: String,
    campusImage: String,
    hospitalImage: String,
    logoText: String,
    website: String,
    admissionWebsite: String,

    // 16 Sections Data Structures
    hero: {
      title: String,
      subtitle: String,
      statusText: String,
      description: String
    },
    about: {
      content: String,
      history: String,
      location: String
    },
    affiliationRecognition: {
      universityType: String,
      parentInstitution: String,
      ministryAffiliation: String,
      accreditation: String,
      internationalListings: String,
      nmcCompliance: String,
      officialWebsite: String
    },
    quickHighlights: [
      {
        label: String,
        value: String
      }
    ],
    advantages: [String],
    fees: {
      annualTuitionUSD: Number,
      annualHostelUSD: Number,
      annualIndianMessUSD: Number,
      annualMedicalInsuranceUSD: Number,
      annualVisaRenewalUSD: Number,
      firstYearOneTimeChargesUSD: Number,
      estimatedTotal6YearsUSD: Number,
      estimatedTotal6YearsINR: Number,
      academicYear: String,
      currency: String
    },
    syllabus: {
      year1: [String],
      year2: [String],
      year3: [String],
      year4: [String],
      year5: [String],
      year6: [String]
    },
    hostelAccommodation: {
      roomTypes: String,
      amenities: [String],
      indianMessAvailable: Boolean,
      indianMessDescription: String,
      hostelSecurity: String,
      annualHostelFeeUSD: Number,
      annualMessFeeUSD: Number
    },
    eligibility: {
      academicCriteria: String,
      pcbGeneral: String,
      pcbReserved: String,
      neetRequirement: String,
      minimumAge: String,
      maximumAge: String,
      admissionsIntake: String
    },
    documentsRequired: [String],
    admissionSteps: [
      {
        step: Number,
        title: String,
        duration: String,
        description: String
      }
    ],
    whyUzbekistanForThisUni: String,
    benefitsOfStudyingHere: [String],
    mhMedicalAssistance: [String],
    popularDestinationsNote: String,
    faqs: [
      {
        question: String,
        answer: String
      }
    ],
    pros: [String],
    cons: [String],
    officialContact: {
      phone: String,
      email: String,
      address: String
    },
    lastVerifiedDate: {
      type: String,
      default: 'October 2026'
    },
    sources: [
      {
        title: String,
        url: String
      }
    ]
  },
  {
    timestamps: true
  }
);

UniversitySchema.index({ type: 1 });
UniversitySchema.index({ city: 1 });
UniversitySchema.index({ 'fees.annualTuitionUSD': 1 });

export const University = mongoose.model('University', UniversitySchema);
