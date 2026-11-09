import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  BookOpen,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onExplorePrograms: () => void;
  onOpenAIAdvisor: () => void;
  onOpenApplyModal: () => void;
}

export default function Hero({ onExplorePrograms, onOpenAIAdvisor, onOpenApplyModal }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-white border-b border-orange-100 pt-8 pb-16 lg:py-20">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-tech opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Academic Heading & Core Institutional Purpose */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Institution Kicker */}
            <div className="flex items-center space-x-3 text-xs font-mono text-orange-600 uppercase tracking-widest font-bold">
              <img
                src="/assets/ccs_logo_transparent.png"
                alt="Gordon College CCS Seal"
                className="w-8 h-8 object-contain shrink-0 drop-shadow-xs"
              />
              <div className="flex items-center space-x-2">
                <span>Gordon College</span>
                <span className="text-slate-400">/</span>
                <span>College of Computer Studies</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-500">Est. 1999</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.1]">
                Empowering Leaders in <br />
                <span className="text-orange-600">
                  Computing & Technology.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-body leading-relaxed">
                Welcome to the College of Computer Studies (CCS). As the premier center of software
                engineering, data science, and interactive media in Olongapo City and Central Luzon,
                we prepare over 1,160 full-time scholars to build the software infrastructure of tomorrow.
              </p>
            </div>

            {/* Accreditation Badges (Clean, unboxed metadata with separators) */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-slate-700 pt-3 border-t border-slate-200">
              <span className="inline-flex items-center space-x-1.5 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>CHED-Aligned Curricula</span>
              </span>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span className="inline-flex items-center space-x-1.5 text-slate-700">
                <Zap className="w-4 h-4 text-orange-600" />
                <span>Cisco & AWS Academy Member</span>
              </span>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span className="inline-flex items-center space-x-1.5 text-slate-700">
                <Award className="w-4 h-4 text-orange-600" />
                <span>RA 10931 100% Free Tuition</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplorePrograms}
                className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-semibold text-sm rounded-lg shadow-md shadow-orange-600/25 hover:shadow-orange-600/35 transition-all flex items-center space-x-2"
              >
                <span>Explore Degree Programs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenApplyModal}
                className="px-6 py-3.5 bg-white hover:bg-orange-50 text-slate-800 font-heading font-semibold text-sm rounded-lg border border-slate-300 shadow-xs transition-all flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4 text-orange-600" />
                <span>Admissions Guide</span>
              </button>

              <button
                onClick={onOpenAIAdvisor}
                className="px-4 py-3 text-slate-600 hover:text-orange-600 font-semibold text-xs flex items-center space-x-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Consult Academic Advisor</span>
              </button>
            </div>

          </div>

          {/* Right Column: High-Fidelity Campus Photography Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl group">
              <img
                src="/assets/gordon_college_campus_edited.jpg"
                alt="Gordon College Main Campus Building at East Tapinac Olongapo City Sports Complex"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />

              {/* Floating Department Seal Badge */}
              <div className="absolute top-4 right-4 z-10 w-14 h-14 rounded-full bg-white/95 p-1.5 shadow-lg border border-orange-200 backdrop-blur-sm flex items-center justify-center">
                <img
                  src="/assets/ccs_logo_transparent.png"
                  alt="Gordon College CCS Seal"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Measured Scrim & Academic Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center space-x-2 text-xs font-mono text-orange-400 uppercase tracking-wider mb-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>East Tapinac Campus • Olongapo City</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white leading-tight">
                  Gordon College Main Campus & Academic Building
                </h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  Home of the College of Computer Studies, housing 8 dedicated computing laboratories, cloud testing servers, and direct access to Olongapo City Sports Complex.
                </p>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/15 text-center">
                  <div>
                    <div className="text-xs font-mono text-slate-300">Total Scholars</div>
                    <div className="text-base font-bold font-heading text-white">1,163</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-300">Accreditation</div>
                    <div className="text-base font-bold font-heading text-orange-400">CHED</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-300">Employability</div>
                    <div className="text-base font-bold font-heading text-emerald-400">94.6%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
