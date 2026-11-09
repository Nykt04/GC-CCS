import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Target,
  ShieldCheck,
  Cpu,
  GraduationCap,
  BookOpen
} from 'lucide-react';

interface PillarItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  summary: string;
  details: string[];
  quote: string;
}

const PILLARS: PillarItem[] = [
  {
    id: 'dean',
    tag: 'LEADERSHIP MESSAGE',
    title: "Dean's Welcome",
    subtitle: 'From the Office of the Dean, College of Computer Studies',
    icon: <GraduationCap className="w-5 h-5 text-orange-400" />,
    summary:
      'Welcome to Gordon College College of Computer Studies. In an era shaped by artificial intelligence, cloud scale, and rapid digital disruption, our sacred obligation is to anchor students in enduring computational foundations, ethical discernment, and hands-on craftsmanship. We do not simply teach tools—we cultivate architects who make IT happen.',
    details: [
      'Over 1,160 active scholars supported by 100% Free Higher Education under Republic Act 10931.',
      'Comprehensive CHED-aligned curriculum paired with Cisco, AWS, and Oracle Academy certifications.',
      'Active industry practicum pipelines linking students directly with Subic Bay Freeport and global tech employers.',
    ],
    quote: '"Making IT Happen through relentless curiosity, technical discipline, and civic responsibility."',
  },
  {
    id: 'vision',
    tag: 'INSTITUTIONAL HORIZON',
    title: 'Institutional Vision',
    subtitle: 'The Premier Regional Center of Computing Excellence',
    icon: <Compass className="w-5 h-5 text-orange-400" />,
    summary:
      'The College of Computer Studies envisions itself as the leading regional hub of computing education, algorithmic innovation, and ethical leadership in Central Luzon, producing globally competitive technologists who uplift society.',
    details: [
      'Foster world-class software engineers, data scientists, and creative digital developers.',
      'Establish sustainable research programs addressing regional municipal and industry transformation.',
      'Maintain continuous CHED Level accreditation and international standard alignment across all degree offerings.',
    ],
    quote: '"Shaping visionary technologists who pioneer ethical innovation for community and nation."',
  },
  {
    id: 'mission',
    tag: 'DAILY MANDATE',
    title: 'Core Mission',
    subtitle: 'Instruction, Applied Research & Community Extension',
    icon: <Target className="w-5 h-5 text-orange-400" />,
    summary:
      'To provide accessible, high-caliber, and industry-calibrated computing education that empowers students with rigorous computational thinking, ethical discernment, and specialized technical mastery.',
    details: [
      'Deliver student-centered instruction integrating modern cloud environments and real-world software workflows.',
      'Stimulate student and faculty research leading to recognized publications, open-source code, and civic applications.',
      'Champion community extension through digital literacy programs and tech empowerment for local government and SMEs.',
    ],
    quote: '"From theoretical foundations to real-world deployment—built for the frontiers of technology."',
  },
  {
    id: 'goals',
    tag: 'STRATEGIC OUTCOMES',
    title: 'Academic Goals',
    subtitle: 'Four Pillars of Graduate Excellence',
    icon: <Cpu className="w-5 h-5 text-orange-400" />,
    summary:
      'Graduates of Gordon College CCS are engineered to immediately spearhead complex technological solutions in multinational enterprises, public sector agencies, and research institutions.',
    details: [
      'Technical Mastery: 100% of graduating cohorts pass international credentials (CCNA, AWS, Unity, Oracle).',
      'Systematic Problem-Solving: Ability to design resilient, fault-tolerant distributed systems and algorithms.',
      'Ethical Stewardship: Deep commitment to data privacy, digital rights, and community welfare.',
    ],
    quote: '"Character defines true intelligence; code executes our civic responsibility."',
  },
  {
    id: 'values',
    tag: 'INSTITUTIONAL CODE',
    title: 'Core Values',
    subtitle: 'The Gordon College CCS Creed',
    icon: <ShieldCheck className="w-5 h-5 text-orange-400" />,
    summary:
      'Every Gordon College computing scholar operates under the tenets of Competence, Integrity, Innovation, and Social Accountability.',
    details: [
      'Competence: Mastery of technical fundamentals, continuous learning, and adherence to professional standards.',
      'Integrity: Academic honesty, ethical architecture, and transparent data practices.',
      'Innovation & Service: Developing software solutions that directly empower Olongapo City and surrounding communities.',
    ],
    quote: '"Excellence in instruction, integrity in research, compassion in public service."',
  },
];

export default function VisionMissionAccordion() {
  const [activePillarId, setActivePillarId] = useState<string>('dean');
  const activePillar = PILLARS.find((p) => p.id === activePillarId) || PILLARS[0];

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 pb-4 border-b border-slate-200">
          <div className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-1">
            Foundational Charter & Leadership
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Vision, Mission & Academic Charter
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl font-body mt-1">
            Explore the leadership mandate, institutional vision, and ethical principles guiding Gordon College College of Computer Studies.
          </p>
        </div>

        {/* Tabbed Institutional Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Tabs */}
          <div className="lg:col-span-4 space-y-2">
            {PILLARS.map((pillar) => {
              const isActive = pillar.id === activePillarId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${
                    isActive
                      ? 'bg-white border-orange-500 shadow-md ring-1 ring-orange-500/20'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <div
                    className={`p-2.5 rounded-lg border shrink-0 transition-colors ${
                      isActive
                        ? 'bg-orange-50 border-orange-200 text-orange-600'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    {pillar.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-orange-600 font-bold">
                      {pillar.tag}
                    </div>
                    <div className="font-heading font-bold text-sm text-slate-900 mt-0.5 truncate">
                      {pillar.title}
                    </div>
                    <div className="text-xs text-slate-500 font-body line-clamp-1 mt-0.5">
                      {pillar.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Editorial View */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold">
                      {activePillar.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1">
                      {activePillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-body mt-0.5">
                      {activePillar.subtitle}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 hidden sm:block">
                    {activePillar.icon}
                  </div>
                </div>

                {/* Narrative Text */}
                <div className="text-sm sm:text-base text-slate-700 font-body leading-relaxed mb-6">
                  {activePillar.summary}
                </div>

                {/* Actionable Directives */}
                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
                    Core Institutional Objectives:
                  </div>

                  {activePillar.details.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs sm:text-sm text-slate-700 font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-orange-600 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Pull Quote */}
                <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs sm:text-sm font-body italic text-orange-950 font-medium">
                  {activePillar.quote}
                </div>

                {/* Institutional Note */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-mono text-slate-400 font-medium">
                  <span>Gordon College Charter • Resolution No. 04</span>
                  <span>CHED Regional Quality Standards</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
