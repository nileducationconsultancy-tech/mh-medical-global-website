import React, { useState } from "react";
import { BrowserRouter, StaticRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { WhatsAppFloat, LeadCaptureModal } from "./components/common/LeadCaptureModal";
import { AICounselorWidget } from "./components/common/AICounselorWidget";

// Pages
import { HomePage } from "./pages/HomePage";
import { MbbsInUzbekistanPage } from "./pages/MbbsInUzbekistanPage";
import { UniversitiesPage } from "./pages/UniversitiesPage";
import { UniversityDetailPage } from "./pages/UniversityDetailPage";
import {
  CompareUniversitiesPage,
  FeeCalculatorPage,
  EligibilityCheckerPage
} from "./pages/ToolPages";
import {
  AdmissionProcessPage,
  DocumentChecklistPage,
  VisaGuidePage,
  NmcGuidelinesPage,
  GovtVsPrivatePage
} from "./pages/GuidePages";
import { CityGuidePage } from "./pages/CityGuidePage";
import { BlogPage, BlogPostPage } from "./pages/BlogPages";
import { AboutUsPage, ContactPage, PrivacyPolicyPage } from "./pages/CompanyPages";
import { AdminDashboardPage, NotFoundPage } from "./pages/AdminDashboardPage";

// Scroll to top helper (safe for SSR)
function ScrollToTop() {
  const location = useLocation();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [location?.pathname]);
  return null;
}

export default function App({ url }) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Book Free MBBS Counselling");

  const handleOpenLeadModal = (title = "Book Free MBBS Abroad Counselling") => {
    setModalTitle(title);
    setIsLeadModalOpen(true);
  };

  const handleCloseLeadModal = () => {
    setIsLeadModalOpen(false);
  };

  const appContent = (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
      <ScrollToTop />
      <Navbar onOpenLeadModal={handleOpenLeadModal} />

      <main className="flex-1">
        <Routes>
          {/* Core Pillars */}
          <Route path="/" element={<HomePage onOpenLeadModal={handleOpenLeadModal} />} />
          <Route
            path="/mbbs-in-uzbekistan"
            element={<MbbsInUzbekistanPage onOpenLeadModal={handleOpenLeadModal} />}
          />

          {/* University Discovery & Detail */}
          <Route
            path="/universities/uzbekistan"
            element={<UniversitiesPage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/universities/uzbekistan/:slug"
            element={<UniversityDetailPage onOpenLeadModal={handleOpenLeadModal} />}
          />

          {/* Interactive Decision Tools */}
          <Route
            path="/compare-universities"
            element={<CompareUniversitiesPage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/mbbs-fee-calculator"
            element={<FeeCalculatorPage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/mbbs-eligibility"
            element={<EligibilityCheckerPage onOpenLeadModal={handleOpenLeadModal} />}
          />

          {/* Guides & Procedures */}
          <Route
            path="/mbbs-admission-uzbekistan"
            element={<AdmissionProcessPage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/document-checklist"
            element={<DocumentChecklistPage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/uzbekistan-student-visa"
            element={<VisaGuidePage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/nmc-guidelines-for-mbbs-abroad"
            element={<NmcGuidelinesPage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/government-vs-private-medical-universities-uzbekistan"
            element={<GovtVsPrivatePage onOpenLeadModal={handleOpenLeadModal} />}
          />

          {/* City Guides */}
          <Route
            path="/study-mbbs-in-tashkent"
            element={<CityGuidePage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/study-mbbs-in-samarkand"
            element={<CityGuidePage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/study-mbbs-in-bukhara"
            element={<CityGuidePage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/study-mbbs-in-andijan"
            element={<CityGuidePage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/cities/:citySlug"
            element={<CityGuidePage onOpenLeadModal={handleOpenLeadModal} />}
          />

          {/* Blog & Knowledge Hub */}
          <Route path="/blog" element={<BlogPage />} />
          <Route
            path="/blog/:slug"
            element={<BlogPostPage onOpenLeadModal={handleOpenLeadModal} />}
          />

          {/* Company & Trust */}
          <Route
            path="/about-us"
            element={<AboutUsPage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/contact"
            element={<ContactPage onOpenLeadModal={handleOpenLeadModal} />}
          />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicyPage />}
          />

          {/* Admin CRM Portal */}
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* 404 Catch-all */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer onOpenLeadModal={handleOpenLeadModal} />

      {/* Global Floating Elements */}
      <AICounselorWidget onOpenLeadModal={handleOpenLeadModal} />
      <WhatsAppFloat onOpenLeadModal={handleOpenLeadModal} />
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={handleCloseLeadModal}
        initialTitle={modalTitle}
      />
    </div>
  );

  if (url) {
    return <StaticRouter location={url}>{appContent}</StaticRouter>;
  }

  return <BrowserRouter>{appContent}</BrowserRouter>;
}
