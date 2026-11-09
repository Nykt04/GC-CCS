import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { PROGRAMS_DATA } from '../utils/college-data';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramCode?: string;
}

export default function ApplyModal({ isOpen, onClose, defaultProgramCode = 'BSIT' }: ApplyModalProps) {
  const [selectedProgram, setSelectedProgram] = useState(defaultProgramCode);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [shsStrand, setShsStrand] = useState('STEM (Science, Technology, Engineering, Math)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationRef, setApplicationRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setApplicationRef(`GCAT-CCS-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-900"
      >
        {/* Header */}
        <div className="bg-orange-600 px-6 py-4 flex items-center justify-between shrink-0 text-white shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center font-bold shadow-xs shrink-0">
              <img
                src="/assets/ccs_logo_transparent.png"
                alt="Gordon College CCS Seal"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-heading font-extrabold text-white text-base">
                Gordon College CCS Application
              </div>
              <p className="text-xs font-mono text-orange-100 mt-0.5">
                Admissions for Academic Year 2026–2027
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close application modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {applicationRef ? (
            <div className="text-center space-y-4 py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-extrabold text-slate-900">
                  Application Registered!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-body max-w-md mx-auto mt-1 leading-relaxed">
                  Congratulations, <strong className="text-slate-900 font-bold">{applicantName}</strong>. Your preliminary application for <strong>{selectedProgram}</strong> has been logged with the College of Computer Studies.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 inline-block font-mono text-xs text-left space-y-1.5 text-slate-700 shadow-2xs">
                <div>
                  <span className="text-slate-500">GCAT Examination Ticket: </span>
                  <span className="text-orange-600 font-bold">{applicationRef}</span>
                </div>
                <div>
                  <span className="text-slate-500">Selected Program: </span>
                  <span className="text-slate-900 font-semibold">{selectedProgram}</span>
                </div>
                <div>
                  <span className="text-slate-500">Tuition Subsidy: </span>
                  <span className="text-emerald-600 font-semibold">100% Free Tuition Eligible (RA 10931)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
                >
                  Done & Return to Site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  1. Choose Your Degree Program *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PROGRAMS_DATA.map((prog) => (
                    <button
                      type="button"
                      key={prog.code}
                      onClick={() => setSelectedProgram(prog.code)}
                      className={`p-3 rounded-lg text-left border transition-all ${
                        selectedProgram === prog.code
                          ? 'bg-orange-50 border-orange-500 text-orange-950 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-heading font-extrabold text-xs text-slate-900">{prog.code}</div>
                      <div className="text-[11px] text-slate-500 truncate">{prog.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Juan Dela Cruz"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="juan@gmail.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="0917-123-4567"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Senior High School Strand
                </label>
                <select
                  value={shsStrand}
                  onChange={(e) => setShsStrand(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                >
                  <option value="STEM">STEM (Science, Technology, Engineering, Math)</option>
                  <option value="TVL-ICT">TVL-ICT (Information & Communications Tech)</option>
                  <option value="ABM">ABM (Accountancy, Business & Management)</option>
                  <option value="HUMSS">HUMSS (Humanities & Social Sciences)</option>
                  <option value="GAS">GAS (General Academic Strand)</option>
                  <option value="Transferee">College Transferee / Second Degree</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-heading font-semibold text-sm rounded-lg shadow-xs transition-all flex items-center justify-center space-x-2"
                >
                  <span>{isSubmitting ? 'Registering Application...' : 'Submit Application for GCAT 2026'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
