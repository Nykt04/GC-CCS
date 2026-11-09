import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  Cpu,
  Gamepad2,
  Terminal,
  Menu,
  X,
  ChevronDown,
  UserCheck,
  ArrowRight,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { PROGRAMS_DATA } from '../utils/college-data';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onSelectProgram: (programId: string) => void;
  onOpenPortal: () => void;
  onOpenAIAdvisor: () => void;
  onOpenBadgeStudio?: () => void;
  onOpenApplyModal: () => void;
}

export default function Navbar({
  activeTab,
  onNavigate,
  onSelectProgram,
  onOpenPortal,
  onOpenAIAdvisor,
  onOpenApplyModal,
}: NavbarProps) {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const programIcons: Record<string, React.ReactNode> = {
    bscs: <Terminal className="w-4 h-4 text-orange-500" />,
    bsit: <Cpu className="w-4 h-4 text-orange-500" />,
    bsemc: <Gamepad2 className="w-4 h-4 text-orange-500" />,
    act: <Code className="w-4 h-4 text-orange-500" />,
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Academic Programs', hasDropdown: true },
    { id: 'faculty', label: 'Faculty Directory' },
    { id: 'news', label: 'News & Events' },
    { id: 'contact', label: 'Admissions & Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors shadow-xs">
      {/* Institutional Top Utility Ribbon */}
      <div className="bg-orange-600 text-xs font-mono text-white px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold text-white tracking-wide">
              Gordon College • CCS
            </span>
            <span className="text-orange-200 hidden sm:inline">|</span>
            <span className="text-orange-100 hidden sm:inline">
              Olongapo City Sports Complex, East Tapinac
            </span>
            <span className="text-orange-200 hidden md:inline">|</span>
            <span className="text-white hidden md:inline font-medium">
              RA 10931 100% Free Higher Education
            </span>
          </div>

          <div className="flex items-center space-x-4 shrink-0 font-medium">
            <button
              onClick={onOpenAIAdvisor}
              className="inline-flex items-center space-x-1.5 text-orange-100 hover:text-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Academic Advisor</span>
            </button>
            <span className="text-orange-300">·</span>
            <button
              onClick={onOpenPortal}
              className="inline-flex items-center space-x-1.5 text-orange-100 hover:text-white transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-white" />
              <span>Student Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Brand Wordmark & Seal */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3.5 group text-left focus:outline-none shrink-0"
            aria-label="Gordon College College of Computer Studies Home"
          >
            {/* Official Department Seal */}
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/assets/ccs_logo_transparent.png"
                alt="Gordon College College of Computer Studies official seal"
                className="w-12 h-12 object-contain drop-shadow-xs"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-orange-600 transition-colors">
                  GORDON COLLEGE
                </span>
              </div>
              <div className="text-[11px] font-sans font-semibold text-slate-600 tracking-wider uppercase mt-1">
                College of Computer Studies
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-heading text-sm font-medium">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setIsProgramsOpen(true)}
                    onMouseLeave={() => setIsProgramsOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate('programs')}
                      className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-md transition-colors ${
                        activeTab === 'programs'
                          ? 'text-orange-600 font-bold bg-orange-50 border border-orange-200'
                          : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/60'
                      }`}
                      aria-expanded={isProgramsOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isProgramsOpen ? 'rotate-180 text-orange-600' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Animated Dropdown Menu */}
                    <AnimatePresence>
                      {isProgramsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.16 }}
                          className="absolute left-0 mt-1 w-88 bg-white border border-slate-200 rounded-xl p-3 shadow-xl z-50"
                        >
                          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-3 py-1.5 border-b border-slate-100 mb-2 flex justify-between items-center">
                            <span>Degree Offerings</span>
                            <span className="text-orange-600 font-bold">CHED Accredited</span>
                          </div>

                          <div className="space-y-1">
                            {PROGRAMS_DATA.map((prog) => (
                              <button
                                key={prog.id}
                                onClick={() => {
                                  setIsProgramsOpen(false);
                                  onNavigate('programs');
                                  onSelectProgram(prog.id);
                                }}
                                className="w-full text-left p-2.5 rounded-lg flex items-start space-x-3 hover:bg-orange-50/70 transition-colors group"
                              >
                                <div className="p-2 rounded-md bg-orange-50 border border-orange-200 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                  {programIcons[prog.id]}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-heading font-semibold text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
                                      {prog.code}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500">
                                      {prog.duration}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-600 line-clamp-1 font-body mt-0.5">
                                    {prog.name}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center px-3">
                            <button
                              onClick={() => {
                                setIsProgramsOpen(false);
                                onNavigate('programs');
                              }}
                              className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
                            >
                              <span>View Curricula Breakdown</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                            <span className="text-[11px] font-mono text-slate-500">4 Programs</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3.5 py-2 rounded-md transition-colors ${
                    activeTab === link.id
                      ? 'text-orange-600 font-bold bg-orange-50 border border-orange-200'
                      : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Button: Admissions */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenApplyModal}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-semibold text-sm rounded-lg shadow-sm shadow-orange-600/25 hover:shadow-orange-600/35 transition-all flex items-center space-x-2"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-orange-600 rounded-lg hover:bg-orange-50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-3 text-left font-heading font-medium text-sm rounded-lg ${
                    activeTab === link.id
                      ? 'bg-orange-50 text-orange-600 font-bold border border-orange-200'
                      : 'text-slate-700 hover:bg-orange-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-2.5 bg-slate-100 text-slate-800 font-semibold text-xs rounded-lg flex items-center justify-center space-x-2 border border-slate-200"
              >
                <UserCheck className="w-4 h-4 text-orange-600" />
                <span>Student Portal (SIS)</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenApplyModal();
                }}
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-heading font-semibold text-sm rounded-lg shadow-sm"
              >
                Apply for Admission (AY 2026-2027)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
