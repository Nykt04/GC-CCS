import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { Users, Cpu, Terminal, Gamepad2, Layers, Award, Laptop, CheckCircle2 } from 'lucide-react';
import { STUDENT_STATISTICS } from '../utils/college-data';

// Helper hook for smooth number counting animation
function useAnimatedCounter(targetValue: number, durationMs = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * targetValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue, durationMs, start]);

  return count;
}

export default function StatsCounter() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  // Animated tickers
  const totalCount = useAnimatedCounter(STUDENT_STATISTICS.total, 1600, isInView);
  const bsitCount = useAnimatedCounter(STUDENT_STATISTICS.bsit, 1400, isInView);
  const bscsCount = useAnimatedCounter(STUDENT_STATISTICS.bscs, 1400, isInView);
  const bsemcCount = useAnimatedCounter(STUDENT_STATISTICS.bsemc, 1400, isInView);
  const actCount = useAnimatedCounter(STUDENT_STATISTICS.act, 1200, isInView);
  const facultyCount = useAnimatedCounter(STUDENT_STATISTICS.facultyCount, 1000, isInView);
  const labsCount = useAnimatedCounter(STUDENT_STATISTICS.specializedLabs, 800, isInView);

  const programs = [
    {
      code: 'BSIT',
      name: 'Information Technology',
      count: bsitCount,
      percentage: Math.round((STUDENT_STATISTICS.bsit / STUDENT_STATISTICS.total) * 100),
      icon: <Cpu className="w-5 h-5 text-orange-400" />,
      descriptor: 'Enterprise Systems, Cloud & Networks',
    },
    {
      code: 'BSCS',
      name: 'Computer Science',
      count: bscsCount,
      percentage: Math.round((STUDENT_STATISTICS.bscs / STUDENT_STATISTICS.total) * 100),
      icon: <Terminal className="w-5 h-5 text-orange-400" />,
      descriptor: 'Algorithms, Systems & Artificial Intelligence',
    },
    {
      code: 'BSEMC',
      name: 'Entertainment & Multimedia',
      count: bsemcCount,
      percentage: Math.round((STUDENT_STATISTICS.bsemc / STUDENT_STATISTICS.total) * 100),
      icon: <Gamepad2 className="w-5 h-5 text-orange-400" />,
      descriptor: 'Game Development & Digital 3D Animation',
    },
    {
      code: 'ACT',
      name: 'Associate in Computer Tech',
      count: actCount,
      percentage: Math.round((STUDENT_STATISTICS.act / STUDENT_STATISTICS.total) * 100),
      icon: <Layers className="w-5 h-5 text-orange-400" />,
      descriptor: '2-Year Ladderized Technical Diploma',
    },
  ];

  return (
    <section ref={containerRef} className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-1">
              Official Enrollment & Performance Metrics
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Academic Population by Degree Program
            </h2>
            <p className="text-sm text-slate-600 max-w-xl font-body mt-1">
              Gordon College CCS hosts the largest computing scholar body in Olongapo City, supporting rigorous instruction across four distinct degree pathways.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-mono text-slate-700 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>CHED & University Registrar Verified</span>
          </div>
        </div>

        {/* Hero Metric: Total Population & Distribution Bar */}
        <div className="mb-8 rounded-xl bg-orange-50/40 border border-orange-100 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                <Users className="w-4 h-4 text-orange-600" />
                <span>Total Enrolled Scholars (AY 2026–2027)</span>
              </div>
              <div className="text-5xl sm:text-6xl font-extrabold font-heading text-slate-900 tracking-tight tabular-nums">
                {totalCount.toLocaleString()}
              </div>
              <p className="text-xs text-slate-600 font-body">
                Full-time undergraduate students enjoying 100% free tuition under Republic Act 10931 (Universal Access to Quality Tertiary Education).
              </p>
            </div>

            {/* Proportion Bar */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono text-slate-600 flex justify-between font-medium">
                <span>Enrollment Breakdown by Major:</span>
                <span className="text-slate-800 font-bold">100% Active Capacity</span>
              </div>

              {/* Clean Cohort Distribution Bar */}
              <div className="h-6 w-full bg-slate-200 rounded-lg border border-slate-300 flex overflow-hidden">
                <div
                  style={{ width: `${(STUDENT_STATISTICS.bsit / STUDENT_STATISTICS.total) * 100}%` }}
                  className="bg-orange-600 h-full flex items-center justify-center text-[10px] font-mono font-bold text-white transition-all duration-1000"
                  title="BSIT: 498"
                >
                  BSIT
                </div>
                <div
                  style={{ width: `${(STUDENT_STATISTICS.bscs / STUDENT_STATISTICS.total) * 100}%` }}
                  className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-mono font-bold text-slate-950 border-l border-white transition-all duration-1000"
                  title="BSCS: 377"
                >
                  BSCS
                </div>
                <div
                  style={{ width: `${(STUDENT_STATISTICS.bsemc / STUDENT_STATISTICS.total) * 100}%` }}
                  className="bg-orange-400 h-full flex items-center justify-center text-[10px] font-mono font-bold text-white border-l border-white transition-all duration-1000"
                  title="BSEMC: 288"
                >
                  BSEMC
                </div>
                <div
                  style={{ width: `${(STUDENT_STATISTICS.act / STUDENT_STATISTICS.total) * 100}%` }}
                  className="bg-orange-800 h-full flex items-center justify-center text-[10px] font-mono font-bold text-white border-l border-white transition-all duration-1000"
                  title="ACT: 142"
                >
                  ACT
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-700 pt-1 font-medium">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-orange-600 inline-block" />
                  <span>BSIT: 498 scholars</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" />
                  <span>BSCS: 377 scholars</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-orange-400 inline-block" />
                  <span>BSEMC: 288 scholars</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-orange-800 inline-block" />
                  <span>ACT: 142 scholars</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Program Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {programs.map((prog) => (
            <div
              key={prog.code}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-orange-500 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
                  {prog.icon}
                </div>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {prog.percentage}% of CCS
                </span>
              </div>

              <div className="text-3xl font-extrabold font-heading text-slate-900 tracking-tight tabular-nums mb-1">
                {prog.count.toLocaleString()}
              </div>

              <div className="font-heading font-bold text-sm text-slate-800">
                {prog.code}
              </div>
              <div className="text-xs text-slate-500 font-body line-clamp-1 mt-0.5">
                {prog.name}
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Institutional Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-heading text-slate-900 tabular-nums">
                {facultyCount} Certified Faculty
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Holding MSIT, PhD, CCNA, and AWS Industry Credentials.
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-heading text-slate-900 tabular-nums">
                {labsCount} Specialized Labs
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                AI Compute Suites, Cisco Racks, and Digital Media Studios.
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-heading text-slate-900 tabular-nums">
                94.6% Employability
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Employed within 6 months of graduation across multinational IT firms.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
