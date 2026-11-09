import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Shield,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
  Facebook
} from 'lucide-react';
import { PROGRAMS_DATA } from '../utils/college-data';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onSelectProgram: (id: string) => void;
  onOpenAIAdvisor: () => void;
}

export default function Footer({ onNavigate, onSelectProgram, onOpenAIAdvisor }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t-2 border-orange-600 text-slate-700 relative z-20">
      {/* Top Banner Ribbon */}
      <div className="bg-orange-50 border-b border-orange-100 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-3 text-slate-600">
            <span className="font-bold text-slate-900">GORDON COLLEGE</span>
            <span>·</span>
            <span>COLLEGE OF COMPUTER STUDIES</span>
            <span>·</span>
            <span className="text-orange-600 font-bold">MAKING IT HAPPEN</span>
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-orange-600 flex items-center space-x-1.5 cursor-pointer text-slate-600 font-semibold transition-colors mt-1 sm:mt-0"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Institutional Identity & Logo (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src="/assets/ccs_logo_transparent.png"
                  alt="Gordon College College of Computer Studies official seal"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <div className="font-heading font-extrabold text-lg text-slate-900">
                  GORDON COLLEGE
                </div>
                <div className="text-xs font-mono text-orange-600 tracking-wider uppercase font-bold">
                  College of Computer Studies
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
              Gordon College College of Computer Studies (CCS) is a premier higher education institution in Olongapo City dedicated to excellence in Computer Science, Information Technology, Game Development, and Applied Computing.
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-500 uppercase mb-2 font-semibold">
                Official Channels:
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href="https://facebook.com/GordonCollegeCCS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-orange-500 hover:text-orange-600 text-slate-600 transition-colors"
                  aria-label="Gordon College CCS Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/gordoncollege-ccs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-orange-500 hover:text-orange-600 text-slate-600 transition-colors"
                  aria-label="Gordon College CCS GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/school/gordon-college"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-orange-500 hover:text-orange-600 text-slate-600 transition-colors"
                  aria-label="Gordon College LinkedIn Page"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://gordoncollege.edu.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-orange-500 hover:text-orange-600 text-slate-600 transition-colors"
                  aria-label="Gordon College Main Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Academic Programs (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold border-b border-slate-200 pb-2">
              Degree Offerings
            </div>
            <ul className="space-y-2 text-xs font-body">
              {PROGRAMS_DATA.map((prog) => (
                <li key={prog.id}>
                  <button
                    onClick={() => {
                      onNavigate('programs');
                      onSelectProgram(prog.id);
                    }}
                    className="text-slate-600 hover:text-orange-600 transition-colors text-left group flex items-baseline space-x-1.5"
                  >
                    <span className="text-orange-600 font-mono text-[11px] font-bold">[{prog.code}]</span>
                    <span className="group-hover:underline">{prog.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institutional Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold border-b border-slate-200 pb-2">
              Campus Navigation
            </div>
            <ul className="space-y-2 text-xs font-body">
              <li>
                <button onClick={() => onNavigate('home')} className="text-slate-600 hover:text-orange-600 transition-colors font-medium">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="text-slate-600 hover:text-orange-600 transition-colors font-medium">
                  Degree Programs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faculty')} className="text-slate-600 hover:text-orange-600 transition-colors font-medium">
                  Faculty Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('news')} className="text-slate-600 hover:text-orange-600 transition-colors font-medium">
                  News & Events
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-slate-600 hover:text-orange-600 transition-colors font-medium">
                  Admissions & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Office Coordinates (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold border-b border-slate-200 pb-2">
              Office Directory
            </div>
            <div className="space-y-2.5 text-xs text-slate-600 font-body">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Olongapo City Sports Complex, East Tapinac, Olongapo City, Zambales 2200</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="font-mono text-xs">(047) 224-2089 • Local 104</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="font-mono text-xs">info.ccs@gordoncollege.edu.ph</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200 text-[11px] font-mono text-slate-700">
                <span className="text-orange-700 font-bold">RA 10931 Compliant:</span> 100% Free Higher Education for Qualified Filipino Students.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Gordon College — College of Computer Studies. All rights reserved.
          </div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-4 font-medium">
            <span>Republic of the Philippines</span>
            <span>·</span>
            <span>Commission on Higher Education (CHED)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
