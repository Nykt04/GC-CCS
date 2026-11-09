import React, { useState } from 'react';
import {
  Terminal,
  Cpu,
  Gamepad2,
  Layers,
  ArrowRight,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { PROGRAMS_DATA, ProgramInfo } from '../utils/college-data';
import ProgramDrawer from './ProgramDrawer';

interface ProgramsBentoProps {
  onApplyForProgram: (code: string) => void;
  selectedProgramId?: string | null;
}

export default function ProgramsBento({ onApplyForProgram, selectedProgramId }: ProgramsBentoProps) {
  const [activeDrawerProgram, setActiveDrawerProgram] = useState<ProgramInfo | null>(() => {
    if (selectedProgramId) {
      return PROGRAMS_DATA.find((p) => p.id === selectedProgramId) || null;
    }
    return null;
  });

  const bscs = PROGRAMS_DATA.find((p) => p.id === 'bscs')!;
  const bsit = PROGRAMS_DATA.find((p) => p.id === 'bsit')!;
  const bsemc = PROGRAMS_DATA.find((p) => p.id === 'bsemc')!;
  const act = PROGRAMS_DATA.find((p) => p.id === 'act')!;

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b border-slate-200">
          <div className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-1">
            Academic Catalog & Degree Programs
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Undergraduate Computing Curricula
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl font-body mt-2 leading-relaxed">
            Every degree program at Gordon College CCS is calibrated to CHED Memorandum Orders, international accreditation standards, and direct Subic Bay & global IT workforce demands. Click any program to inspect its year-by-year syllabus.
          </p>
        </div>

        {/* Academic Degree Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: BSIT (Flagship Program - 7 Columns) */}
          <div className="md:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-orange-500 hover:shadow-xl transition-all shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-orange-700 font-semibold uppercase">
                    Flagship Program • 498 Active Scholars
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 font-medium">{bsit.duration}</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                  {bsit.code} — {bsit.name}
                </h2>
                <p className="text-xs font-mono text-orange-600 font-medium mt-1">
                  {bsit.tagline}
                </p>
                <p className="text-sm text-slate-600 font-body leading-relaxed mt-2.5">
                  {bsit.description}
                </p>
              </div>

              {/* Core Competencies */}
              <div className="pt-2 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                  Key Curriculum Pillars:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-body text-slate-700">
                  <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-100 flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Cisco CCNA Networking Racks</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-100 flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>AWS Cloud & Serverless Infrastructure</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-100 flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Full-Stack Web & Mobile Architecture</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-100 flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Cyber Defense & Security Sandbox</span>
                  </div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {bsit.techStack.map((t, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveDrawerProgram(bsit)}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-semibold text-xs rounded-lg transition-colors flex items-center space-x-2 shadow-sm"
              >
                <span>Inspect BSIT Syllabus</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onApplyForProgram('BSIT')}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Apply for BSIT →
              </button>
            </div>
          </div>

          {/* Card 2: BSCS (Computer Science - 5 Columns with Lab Photo) */}
          <div className="md:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500 hover:shadow-xl transition-all shadow-sm">
            <div className="space-y-4">
              {/* Photo Preview */}
              <div className="relative rounded-xl overflow-hidden h-40 border border-slate-200">
                <img
                  src="/src/assets/images/computing_research_lab_1794195397346.jpg"
                  alt="Computer Science algorithmic and data science research lab"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-mono text-white font-semibold">
                    Theoretical & Applied AI Lab
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-orange-700 font-semibold uppercase">
                    377 Scholars • CHED CMO 25
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-medium">{bscs.duration}</span>
                </div>
                <h2 className="text-2xl font-heading font-extrabold text-slate-900">
                  {bscs.code} — Computer Science
                </h2>
                <p className="text-xs font-mono text-orange-600 font-medium mt-1">
                  {bscs.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed mt-2">
                  {bscs.description}
                </p>
              </div>

              {/* Research Toolchains */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {bscs.techStack.map((t, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveDrawerProgram(bscs)}
                className="px-4 py-2 bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-700 border border-orange-200 font-heading font-semibold text-xs rounded-lg transition-colors flex items-center space-x-1.5"
              >
                <span>Inspect BSCS Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onApplyForProgram('BSCS')}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Apply for BSCS →
              </button>
            </div>
          </div>

          {/* Card 3: BSEMC (Entertainment & Multimedia Computing - 6 Columns with Studio Photo) */}
          <div className="md:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500 hover:shadow-xl transition-all shadow-sm">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden h-40 border border-slate-200">
                <img
                  src="/src/assets/images/game_multimedia_studio_1794195397715.jpg"
                  alt="Multimedia Computing and Game Development Studio"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-mono text-white font-semibold">
                    Digital Arts & 3D Game Engine Lab
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-orange-700 font-semibold uppercase">
                    Game Dev & Digital Animation • 288 Scholars
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-medium">{bsemc.duration}</span>
                </div>
                <h2 className="text-2xl font-heading font-extrabold text-slate-900">
                  {bsemc.code} — Multimedia Computing
                </h2>
                <p className="text-xs font-mono text-orange-600 font-medium mt-1">
                  {bsemc.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed mt-2">
                  {bsemc.description}
                </p>
              </div>

              {/* Game Toolchains */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {bsemc.techStack.map((t, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveDrawerProgram(bsemc)}
                className="px-4 py-2 bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-700 border border-orange-200 font-heading font-semibold text-xs rounded-lg transition-colors flex items-center space-x-1.5"
              >
                <span>Inspect BSEMC Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onApplyForProgram('BSEMC')}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Apply for BSEMC →
              </button>
            </div>
          </div>

          {/* Card 4: ACT (Associate in Computer Technology - 6 Columns) */}
          <div className="md:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500 hover:shadow-xl transition-all shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-orange-700 font-semibold uppercase">
                    Ladderized Program • 142 Scholars
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 font-medium">{act.duration}</span>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-extrabold text-slate-900">
                  {act.code} — Associate in Computer Technology
                </h2>
                <p className="text-xs font-mono text-orange-600 font-medium mt-1">
                  {act.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed mt-2">
                  {act.description}
                </p>
              </div>

              {/* Direct Ladderization Pathway Notice */}
              <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 text-xs font-body text-slate-700 leading-relaxed">
                <strong className="text-orange-700 font-semibold">100% Credit Transfer:</strong> Graduating from this 2-year technical diploma program permits students to seamlessly ladderize directly into 3rd Year of Bachelor of Science in Information Technology (BSIT).
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveDrawerProgram(act)}
                className="px-4 py-2 bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-700 border border-orange-200 font-heading font-semibold text-xs rounded-lg transition-colors flex items-center space-x-1.5"
              >
                <span>Inspect ACT Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onApplyForProgram('ACT')}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Apply for ACT →
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Program Details Sliding Right Drawer */}
      <ProgramDrawer
        program={activeDrawerProgram}
        isOpen={Boolean(activeDrawerProgram)}
        onClose={() => setActiveDrawerProgram(null)}
        onApplyForProgram={(code) => {
          setActiveDrawerProgram(null);
          onApplyForProgram(code);
        }}
      />
    </section>
  );
}
