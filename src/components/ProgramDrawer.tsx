import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  Briefcase,
  Award,
  CheckCircle2,
  ArrowRight,
  Code2
} from 'lucide-react';
import { ProgramInfo } from '../utils/college-data';

interface ProgramDrawerProps {
  program: ProgramInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyForProgram: (programCode: string) => void;
}

export default function ProgramDrawer({
  program,
  isOpen,
  onClose,
  onApplyForProgram,
}: ProgramDrawerProps) {
  if (!program) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Sliding Right Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-2xl z-50 bg-white border-l border-slate-200 shadow-2xl overflow-y-auto flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="program-drawer-title"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 bg-orange-600 text-white font-mono text-xs font-bold rounded">
                  {program.code}
                </span>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  Curriculum & Syllabus Guide
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Close program details drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">
              {/* Title & Tagline */}
              <div>
                <h2 id="program-drawer-title" className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                  {program.name}
                </h2>
                <p className="text-sm font-mono text-orange-600 mt-1 font-semibold">
                  {program.tagline}
                </p>
                <p className="text-sm text-slate-600 font-body leading-relaxed mt-3">
                  {program.overview}
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 bg-orange-50/50 border border-orange-100 rounded-xl p-4 text-center">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-medium">Duration</div>
                  <div className="text-base font-heading font-bold text-slate-900 mt-0.5">{program.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-medium">Total Units</div>
                  <div className="text-base font-heading font-bold text-orange-600 mt-0.5">{program.stats.units} Units</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-medium">Enrolled</div>
                  <div className="text-base font-heading font-bold text-slate-800 mt-0.5">{program.stats.enrolled} Scholars</div>
                </div>
              </div>

              {/* Program Highlights */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  <span>Curriculum Highlights & Laboratory Training</span>
                </h3>
                <div className="space-y-2">
                  {program.highlights.map((h, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0 mt-2" />
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Tech Stack */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-orange-600" />
                  <span>Core Tech Stack & Development Toolchains</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {program.techStack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white border border-slate-200 hover:border-orange-500 transition-colors shadow-xs"
                    >
                      <div className="text-[10px] font-mono text-orange-600 uppercase font-semibold">{tech.category}</div>
                      <div className="font-heading font-bold text-xs sm:text-sm text-slate-900 mt-0.5">{tech.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Breakdown by Academic Year */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-orange-600" />
                  <span>Curriculum Syllabus by Academic Year</span>
                </h3>
                <div className="space-y-3">
                  {program.curriculumYears.map((yearBlock, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-heading font-bold text-sm text-slate-900">
                          {yearBlock.year}
                        </span>
                        <span className="text-[11px] font-mono text-orange-600 font-semibold">
                          {yearBlock.focus}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {yearBlock.courses.map((course, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-xs font-mono bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-700 shadow-2xs"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Paths */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-orange-600" />
                  <span>Graduate Career Roles & Employment Paths</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {program.careerPaths.map((career, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-body text-slate-700 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>{career}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embedded Certifications */}
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 space-y-2">
                <div className="text-xs font-mono uppercase text-orange-700 font-bold flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Embedded Industry Certifications</span>
                </div>
                <div className="text-xs text-slate-600 font-body">
                  Students in {program.code} complete subsidized preparation examinations for:
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {program.certificationTracks.map((cert, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono bg-white border border-orange-300 text-orange-700 px-2.5 py-1 rounded font-medium shadow-xs"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-5 flex items-center space-x-3">
              <button
                onClick={() => {
                  onClose();
                  onApplyForProgram(program.code);
                }}
                className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-heading font-semibold text-sm rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-sm"
              >
                <span>Apply for {program.code}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg border border-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
