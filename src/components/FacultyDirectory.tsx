import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Mail,
  Calendar,
  Building,
  GraduationCap,
  Copy,
  Check,
  ExternalLink,
  X
} from 'lucide-react';
import { FACULTY_DATA, FacultyMember, filterFaculty } from '../utils/college-data';

export default function FacultyDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [activeConsultationFaculty, setActiveConsultationFaculty] = useState<FacultyMember | null>(null);

  const departments = [
    'All',
    'Leadership',
    'Computer Science',
    'Information Technology',
    'Multimedia & Game Dev',
  ];

  const filteredFaculty = filterFaculty(FACULTY_DATA, searchQuery, selectedDept);

  const handleCopyEmail = (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-1">
              Academic Faculty & Mentorship Roster
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
              Faculty Directory
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-body mt-2 leading-relaxed">
              Meet our distinguished professors, certified cloud architects, game engine specialists, and researchers dedicated to undergraduate academic excellence.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3 text-xs font-mono text-slate-600">
            <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              42 Faculty Members & Researchers
            </span>
          </div>
        </div>

        {/* Filter Controls: Search Bar & Department Tabs */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search faculty by name, specialization, or courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-body text-sm placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-700 font-semibold"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Department Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedDept === dept
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Cards Grid */}
        {filteredFaculty.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto my-12 space-y-3 shadow-xs">
            <GraduationCap className="w-10 h-10 text-orange-600 mx-auto" />
            <h3 className="text-lg font-heading font-bold text-slate-900">No Faculty Records Found</h3>
            <p className="text-xs text-slate-500 font-body">
              No faculty member matched your query in the "{selectedDept}" department.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('All');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-orange-600 hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredFaculty.map((member) => (
              <div
                key={member.id}
                onClick={() => setActiveConsultationFaculty(member)}
                className="rounded-2xl bg-white border border-slate-200 p-5 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  {/* Department & Role */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-orange-700 font-bold uppercase">
                      {member.department}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {member.office}
                    </span>
                  </div>

                  {/* Avatar Initials & Header */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 text-orange-800 flex items-center justify-center font-heading font-bold text-sm shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      {member.name
                        .replace('Dr. ', '')
                        .replace('Prof. ', '')
                        .replace('Engr. ', '')
                        .replace('Instr. ', '')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                        {member.name}
                      </h3>
                      <div className="text-xs text-slate-500 font-body mt-0.5 truncate">
                        {member.title}
                      </div>
                    </div>
                  </div>

                  {/* Specialization */}
                  <div className="p-3 rounded-lg bg-orange-50/50 border border-orange-100 mb-3 space-y-0.5">
                    <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                      Research & Specialization:
                    </div>
                    <div className="text-xs text-slate-800 font-body leading-snug">
                      {member.specialization}
                    </div>
                  </div>

                  {/* Credentials */}
                  <div className="text-xs text-slate-600 mb-3 flex items-start space-x-1.5 font-body">
                    <GraduationCap className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{member.credentials}</span>
                  </div>

                  {/* Courses */}
                  <div className="space-y-1 mb-4">
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Instruction:</div>
                    <div className="flex flex-wrap gap-1">
                      {member.featuredSubjects.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Email & Consultation Link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={(e) => handleCopyEmail(member.email, e)}
                    className="inline-flex items-center space-x-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                    title="Copy official email address"
                  >
                    {copiedEmail === member.email ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-mono text-[11px] font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email</span>
                      </>
                    )}
                  </button>

                  <span className="text-orange-600 hover:text-orange-700 font-semibold text-[11px] flex items-center space-x-1">
                    <span>Consultation</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Faculty Consultation Details Modal */}
      {activeConsultationFaculty && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setActiveConsultationFaculty(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-mono uppercase text-orange-600 font-bold">
                Faculty Consultation Profile
              </span>
              <button
                onClick={() => setActiveConsultationFaculty(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                {activeConsultationFaculty.name}
              </h2>
              <p className="text-xs font-mono text-orange-600 font-semibold mt-0.5">
                {activeConsultationFaculty.title} • {activeConsultationFaculty.role}
              </p>
              <p className="text-sm text-slate-600 font-body leading-relaxed mt-3">
                {activeConsultationFaculty.bio}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-100 space-y-2 text-xs font-mono text-slate-700">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Office: {activeConsultationFaculty.office}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Consultation Hours: {activeConsultationFaculty.consultationHours}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Email: {activeConsultationFaculty.email}</span>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={(e) => handleCopyEmail(activeConsultationFaculty.email, e)}
                className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{copiedEmail === activeConsultationFaculty.email ? 'Email Copied!' : 'Copy Faculty Email'}</span>
              </button>

              <button
                onClick={() => setActiveConsultationFaculty(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
