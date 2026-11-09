import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsCounter from './components/StatsCounter';
import VisionMissionAccordion from './components/VisionMissionAccordion';
import PartnersMarquee from './components/PartnersMarquee';
import ProgramsBento from './components/ProgramsBento';
import FacultyDirectory from './components/FacultyDirectory';
import NewsHub from './components/NewsHub';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIChatModal from './components/AIChatModal';
import BadgeStudioModal from './components/BadgeStudioModal';
import StudentPortalModal from './components/StudentPortalModal';
import ApplyModal from './components/ApplyModal';
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation tabs: 'home' | 'programs' | 'faculty' | 'news' | 'contact'
  const [activeTab, setActiveTab] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (['programs', 'faculty', 'news', 'contact'].includes(path)) {
      return path;
    }
    return 'home';
  });

  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [isBadgeStudioOpen, setIsBadgeStudioOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyProgramCode, setApplyProgramCode] = useState<string>('BSIT');

  // Sync tab changes with browser URL and scroll to top
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    const newPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser popstate (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (['programs', 'faculty', 'news', 'contact'].includes(path)) {
        setActiveTab(path);
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectProgramFromNav = (programId: string) => {
    setSelectedProgramId(programId);
    handleNavigate('programs');
  };

  const handleOpenApplyModal = (programCode: string = 'BSIT') => {
    setApplyProgramCode(programCode);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-body selection:bg-[#EA580C] selection:text-white">
      {/* 1. Global Navigation & Header (Persistent) */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onSelectProgram={handleSelectProgramFromNav}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        onOpenBadgeStudio={() => setIsBadgeStudioOpen(true)}
        onOpenApplyModal={() => handleOpenApplyModal('BSIT')}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onExplorePrograms={() => handleNavigate('programs')}
              onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
              onOpenApplyModal={() => handleOpenApplyModal('BSIT')}
            />

            {/* Live Data Population Counter */}
            <StatsCounter />

            {/* Vision, Mission & Goals Accordion */}
            <VisionMissionAccordion />

            {/* Industry Partners Marquee */}
            <PartnersMarquee />

            {/* Featured Programs Teaser on Homepage */}
            <section className="py-20 bg-orange-50/40 border-b border-orange-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-orange-200/60">
                  <div>
                    <div className="inline-flex items-center space-x-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
                      <span className="w-2 h-2 rounded-full bg-orange-600" />
                      <span>Academic Offerings & Degree Programs</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
                      Four Distinctive Pathways
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl font-normal">
                      Fully accredited computing curricula aligned with CHED standards, industry certifications, and real-world software engineering competencies.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('programs')}
                    className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-orange-500/25"
                  >
                    <span>View All Syllabi & Specializations</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* BSCS */}
                  <div
                    onClick={() => handleSelectProgramFromNav('bscs')}
                    className="academic-card p-6 bg-white rounded-xl border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-700 font-bold text-[11px]">
                          4 Years • 377 Scholars
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">CHED CMO 25</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2.5">
                        BS Computer Science
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        Algorithmic rigor, machine learning models, intelligent systems, distributed architectures, and discrete mathematics.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700 transition-colors">
                      <span>Explore BSCS Curriculum</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* BSIT */}
                  <div
                    onClick={() => handleSelectProgramFromNav('bsit')}
                    className="academic-card p-6 bg-white rounded-xl border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-700 font-bold text-[11px]">
                          4 Years • 498 Scholars
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">CHED CMO 25</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2.5">
                        BS Information Technology
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        Enterprise cloud infrastructure, Cisco CCNA networking, full-stack systems engineering, and cybersecurity operations.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700 transition-colors">
                      <span>Explore BSIT Curriculum</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* BSEMC */}
                  <div
                    onClick={() => handleSelectProgramFromNav('bsemc')}
                    className="academic-card p-6 bg-white rounded-xl border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-700 font-bold text-[11px]">
                          4 Years • 288 Scholars
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">CHED CMO 25</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2.5">
                        BS Entertainment & Multimedia
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        Real-time game engines (Unity & Unreal Engine 5), 3D procedural modeling, shader programming, and interactive media.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700 transition-colors">
                      <span>Explore BSEMC Curriculum</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* ACT */}
                  <div
                    onClick={() => handleSelectProgramFromNav('act')}
                    className="academic-card p-6 bg-white rounded-xl border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-700 font-bold text-[11px]">
                          2 Years • Ladderized
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">100% Transfer</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2.5">
                        Associate in Computer Tech
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        Applied hardware servicing, Linux enterprise administration, web fundamentals, and direct ladderized admission to 3rd-year BSIT.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700 transition-colors">
                      <span>Explore ACT Ladderization</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* 3. Program Offerings Page (/programs) */}
        {activeTab === 'programs' && (
          <ProgramsBento
            onApplyForProgram={handleOpenApplyModal}
            selectedProgramId={selectedProgramId}
          />
        )}

        {/* 4. Faculty Directory (/faculty) */}
        {activeTab === 'faculty' && <FacultyDirectory />}

        {/* 5. News & Events Hub (/news) */}
        {activeTab === 'news' && <NewsHub />}

        {/* 6. Contact Us (/contact) */}
        {activeTab === 'contact' && (
          <ContactSection initialProgramInterest={applyProgramCode} />
        )}
      </main>

      {/* Floating Action Triggers for AI Advisor & Badge Studio */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-3">
        <button
          onClick={() => setIsBadgeStudioOpen(true)}
          className="w-11 h-11 rounded-full bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-600 border border-slate-200 flex items-center justify-center shadow-lg transition-all hover:scale-105"
          title="Digital Crest & Seal Studio"
          aria-label="Open Digital Crest & Seal Studio"
        >
          <Sparkles className="w-5 h-5 text-orange-500" />
        </button>

        <button
          onClick={() => setIsAIAdvisorOpen(true)}
          className="px-4 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center space-x-2.5 shadow-lg transition-all hover:scale-105 font-semibold text-xs tracking-wide"
          title="Consult Turing Academic Advisor"
          aria-label="Consult Turing Academic Advisor"
        >
          <Bot className="w-4 h-4 text-white" />
          <span>Ask Turing Advisor</span>
        </button>
      </div>

      {/* 6. Global Multi-Column Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectProgram={handleSelectProgramFromNav}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
      />

      {/* AI Advisor Modal */}
      <AIChatModal
        isOpen={isAIAdvisorOpen}
        onClose={() => setIsAIAdvisorOpen(false)}
        onSelectProgram={handleSelectProgramFromNav}
      />

      {/* Badge Studio Modal */}
      <BadgeStudioModal
        isOpen={isBadgeStudioOpen}
        onClose={() => setIsBadgeStudioOpen(false)}
      />

      {/* Student Portal Modal */}
      <StudentPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        defaultProgramCode={applyProgramCode}
      />
    </div>
  );
}
