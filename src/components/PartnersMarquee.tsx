import React, { useState } from 'react';
import { ExternalLink, CheckCircle, X } from 'lucide-react';
import { INDUSTRY_PARTNERS, IndustryPartner } from '../utils/college-data';

export default function PartnersMarquee() {
  const [selectedPartner, setSelectedPartner] = useState<IndustryPartner | null>(null);

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...INDUSTRY_PARTNERS, ...INDUSTRY_PARTNERS];

  return (
    <section className="py-14 bg-white border-b border-slate-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center sm:text-left sm:flex sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-1">
            Industry Alliances & Certification Alliances
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            Curriculum Partners & Global Technology Providers
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-2 sm:mt-0 font-body">
          Embedded certifications, enterprise laboratories, and direct graduate hiring pipelines.
        </p>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full py-2 overflow-hidden">
        <div className="animate-marquee flex items-center space-x-4">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              onClick={() => setSelectedPartner(partner)}
              className="shrink-0 group cursor-pointer"
            >
              <div className="w-64 sm:w-72 p-4 rounded-xl bg-white border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all shadow-xs">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 group-hover:text-orange-600 transition-colors font-semibold">
                    {partner.category}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: partner.color }}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg border border-orange-200 bg-orange-50 flex items-center justify-center font-mono font-bold text-xs text-orange-700 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {partner.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                      {partner.name}
                    </h3>
                    <div className="text-[11px] text-slate-500 truncate">
                      {partner.badge}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-slate-700">
                  <span>Curriculum Integration</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-orange-600 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Detail Dialog Modal */}
      {selectedPartner && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedPartner.color }}
                />
                <span className="font-mono text-xs uppercase tracking-wider text-orange-600 font-bold">
                  {selectedPartner.badge}
                </span>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100"
                aria-label="Close partner details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-heading font-bold text-slate-900">
                {selectedPartner.name}
              </h3>
              <div className="text-xs font-mono text-slate-500 mt-0.5">
                {selectedPartner.category}
              </div>
            </div>

            <p className="text-sm text-slate-600 font-body leading-relaxed">
              {selectedPartner.description}. Through our formal academic alliance, Gordon College CCS students benefit from subsidized laboratory resources, official exam certifications, and preferred internship placement.
            </p>

            <div className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-100 space-y-2 text-xs font-body text-slate-700">
              <div className="flex items-center space-x-2 text-emerald-700 font-medium">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Integrated in 3rd & 4th Year Course Curricula</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700 font-medium">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Subsidized Examination Vouchers for Scholars</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700 font-medium">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Priority Industry Practicum & Internship Roster</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPartner(null)}
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
