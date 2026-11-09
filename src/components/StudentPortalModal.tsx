import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  UserCheck,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentPortalModal({ isOpen, onClose }: StudentPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'schedule' | 'grades' | 'clearance'>('schedule');

  if (!isOpen) return null;

  const mockEnrolledCourses = [
    { code: 'IT 311', title: 'Enterprise Cloud Architecture (AWS)', units: 3, room: 'Lab 4 (Cloud Sandbox)', time: 'Mon/Wed 8:00 AM - 10:30 AM', instructor: 'Engr. Jayson V. Ramos' },
    { code: 'CS 312', title: 'Automata & Compiler Theory', units: 3, room: 'Lecture Hall B', time: 'Tue/Thu 1:00 PM - 2:30 PM', instructor: 'Prof. Mary Ann Delos Santos' },
    { code: 'EMC 221', title: '3D Real-Time Shader Programming', units: 3, room: 'Game Studio Lab', time: 'Wed/Fri 10:30 AM - 1:00 PM', instructor: 'Prof. Carlo Reyes' },
    { code: 'CAP 411', title: 'CCS Capstone Research & Industry Project 1', units: 3, room: 'Research Hub', time: 'Friday 2:00 PM - 5:00 PM', instructor: 'Dr. Aris P. Marcelo' },
  ];

  const mockGrades = [
    { code: 'IT 221', title: 'Advanced Database Systems', grade: '1.25', remarks: 'Passed / Outstanding' },
    { code: 'CS 211', title: 'Design & Analysis of Algorithms', grade: '1.00', remarks: 'Passed / Top of Cohort' },
    { code: 'EMC 122', title: '3D Modeling & Environment Design', grade: '1.50', remarks: 'Passed / Superior' },
    { code: 'CCNA 1', title: 'Introduction to Cisco Networks', grade: '1.25', remarks: 'Certified Pass' },
  ];

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
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-900"
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
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-white text-base">
                  Gordon College Student Information System (SIS)
                </span>
              </div>
              <p className="text-xs font-mono text-orange-100 mt-0.5">
                ID: GCS-2024-0192 • Angela Marie Valdez (BSIT 3rd Year)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close portal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Student Quick Status Strip */}
        <div className="bg-orange-50 border-b border-orange-100 px-6 py-3 flex flex-wrap items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-3">
            <span className="text-slate-600">Semestral GWA: <strong className="text-orange-600 font-bold">1.25</strong></span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">Status: <strong className="text-emerald-600 font-bold">Enrolled</strong></span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700 font-semibold">RA 10931 Free Tuition</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">1st Sem AY 2026-2027</div>
        </div>

        {/* Tab Buttons */}
        <div className="px-6 pt-3 flex space-x-1.5 border-b border-slate-200 shrink-0 bg-white">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3.5 py-2 text-xs rounded-t-lg transition-colors ${
              activeTab === 'schedule'
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-600 font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            Class Schedule
          </button>
          <button
            onClick={() => setActiveTab('grades')}
            className={`px-3.5 py-2 text-xs rounded-t-lg transition-colors ${
              activeTab === 'grades'
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-600 font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            Official Grades
          </button>
          <button
            onClick={() => setActiveTab('clearance')}
            className={`px-3.5 py-2 text-xs rounded-t-lg transition-colors ${
              activeTab === 'clearance'
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-600 font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            Academic Clearance
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50/50">
          {activeTab === 'schedule' && (
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                Enrolled Classes (12 Units Current Load):
              </div>
              <div className="space-y-2">
                {mockEnrolledCourses.map((c, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-sm text-slate-900">{c.code} — {c.title}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-semibold border border-orange-200">{c.units} Units</span>
                    </div>
                    <div className="text-xs text-slate-600 font-body flex flex-wrap gap-x-3">
                      <span>Room: {c.room}</span>
                      <span>•</span>
                      <span>Time: {c.time}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-body">Professor: {c.instructor}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                Official Previous Semester Transcript:
              </div>
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                <table className="w-full text-left text-xs font-body">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Course Code</th>
                      <th className="p-3">Title</th>
                      <th className="p-3">Grade</th>
                      <th className="p-3">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {mockGrades.map((g, idx) => (
                      <tr key={idx} className="hover:bg-orange-50/40">
                        <td className="p-3 font-mono font-bold text-slate-900">{g.code}</td>
                        <td className="p-3 font-medium">{g.title}</td>
                        <td className="p-3 font-mono font-bold text-orange-600 tabular-nums">{g.grade}</td>
                        <td className="p-3 text-slate-600">{g.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'clearance' && (
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                University Clearance Status:
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5 text-xs text-slate-700 font-body shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>CCS Dean's Office & Laboratory Clearance:</span>
                  <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cleared</span>
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>University Library System:</span>
                  <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cleared (0 Overdue Books)</span>
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Accounting / RA 10931 Subsidy Billing:</span>
                  <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>100% Subsidized (PHP 0.00 Balance)</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Registrar's Office:</span>
                  <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cleared for 2nd Sem Enrolment</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 p-4 flex justify-between items-center text-xs font-mono">
          <span className="text-slate-500">Gordon College SIS • Secure Session</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
          >
            Close Session
          </button>
        </div>
      </motion.div>
    </div>
  );
}
