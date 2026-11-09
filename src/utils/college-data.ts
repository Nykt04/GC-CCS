export interface StudentStats {
  total: number;
  bsit: number;
  bscs: number;
  bsemc: number;
  act: number;
  facultyCount: number;
  specializedLabs: number;
  employmentRate: number;
}

export const STUDENT_STATISTICS: StudentStats = {
  total: 1163,
  bsit: 498,
  bscs: 377,
  bsemc: 288,
  act: 142,
  facultyCount: 42,
  specializedLabs: 8,
  employmentRate: 94.6,
};

export interface ProgramInfo {
  id: 'bscs' | 'bsit' | 'bsemc' | 'act';
  code: string;
  name: string;
  duration: string;
  tagline: string;
  description: string;
  overview: string;
  stats: {
    enrolled: number;
    units: number;
    careerDemand: string;
  };
  highlights: string[];
  techStack: { name: string; category: string }[];
  careerPaths: string[];
  curriculumYears: {
    year: string;
    focus: string;
    courses: string[];
  }[];
  certificationTracks: string[];
}

export const PROGRAMS_DATA: ProgramInfo[] = [
  {
    id: 'bscs',
    code: 'BSCS',
    name: 'Bachelor of Science in Computer Science',
    duration: '4 Years',
    tagline: 'Algorithmic Rigor, Artificial Intelligence & Computational Foundations',
    description: 'Prepares students to master algorithmic thinking, machine learning, systems architecture, and mathematical foundations for cutting-edge software research.',
    overview: 'The BSCS program at Gordon College equips future scientists and high-performance software engineers with theoretical computer science, algorithm design, artificial intelligence, and operating systems fundamentals.',
    stats: {
      enrolled: 377,
      units: 168,
      careerDemand: '98% High Demand',
    },
    highlights: [
      'CHED-aligned curriculum with AI, Machine Learning, and Distributed Computing electives',
      'Dedicated Algorithms, High Performance Computing, and Robotics laboratories',
      'Annual CSD Research Colloquium and Coding Olympics',
      'Mandatory double capstone research with peer-reviewed publication opportunities'
    ],
    techStack: [
      { name: 'Python', category: 'Language' },
      { name: 'C++', category: 'Systems' },
      { name: 'Rust', category: 'Systems' },
      { name: 'PyTorch / TensorFlow', category: 'AI/ML' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Docker / Linux', category: 'Infrastructure' }
    ],
    careerPaths: [
      'AI / Machine Learning Engineer',
      'Algorithms & Research Scientist',
      'Systems Software Engineer',
      'Data Scientist & Quant Analyst',
      'Cybersecurity Cryptographer',
      'Compiler & OS Developer'
    ],
    curriculumYears: [
      {
        year: 'First Year',
        focus: 'Foundations & Mathematical Thinking',
        courses: ['Discrete Mathematics', 'Introduction to Programming (C++)', 'Data Structures & Algorithms', 'Linear Algebra']
      },
      {
        year: 'Second Year',
        focus: 'Systems, Architectures & Object Modeling',
        courses: ['Object-Oriented Programming (Java/Python)', 'Computer Architecture & Assembly', 'Design & Analysis of Algorithms', 'Database Systems']
      },
      {
        year: 'Third Year',
        focus: 'Advanced Theory, Systems & Intelligence',
        courses: ['Operating Systems', 'Automata Theory & Formal Languages', 'Artificial Intelligence & Machine Learning', 'Software Engineering']
      },
      {
        year: 'Fourth Year',
        focus: 'Capstone Research & Industry Immersion',
        courses: ['CS Thesis / Capstone 1 & 2', 'Parallel & Distributed Computing', 'Industry Internship (600 Hours)', 'Professional Ethics']
      }
    ],
    certificationTracks: ['Google Professional Data Engineer', 'Oracle Certified Professional Java SE', 'AWS Certified Solutions Architect']
  },
  {
    id: 'bsit',
    code: 'BSIT',
    name: 'Bachelor of Science in Information Technology',
    duration: '4 Years',
    tagline: 'Enterprise Cloud, Full-Stack Architecture, Networking & Cyber Defense',
    description: 'Empowers students to design, implement, and secure enterprise information infrastructure, scalable web and mobile ecosystems, and corporate network fabrics.',
    overview: 'BSIT is the flagship program of Gordon College CCS with nearly 500 enrolled innovators. It delivers deep practical mastery in enterprise networking, cloud systems, web and mobile development, and cybersecurity.',
    stats: {
      enrolled: 498,
      units: 165,
      careerDemand: '99% Very High Demand',
    },
    highlights: [
      'Cisco Networking Academy and AWS Cloud Academy integrated curriculum',
      'Live Cyber Defense and Penetration Testing lab sandbox',
      'Industry-ready training in React, Node.js, Spring Boot, Flutter, and Kubernetes',
      'Strong regional partnerships with Subic Bay Freeport tech enterprises and DICT'
    ],
    techStack: [
      { name: 'TypeScript / React', category: 'Web' },
      { name: 'Node.js / Go', category: 'Backend' },
      { name: 'Flutter / Swift', category: 'Mobile' },
      { name: 'Cisco IOS', category: 'Networking' },
      { name: 'AWS & Cloudflare', category: 'Cloud' },
      { name: 'Kali Linux / Wireshark', category: 'Security' }
    ],
    careerPaths: [
      'Full-Stack Cloud Architect',
      'Network & Security Engineer',
      'DevOps & Site Reliability Engineer',
      'Mobile Application Developer',
      'Database Administrator',
      'Enterprise IT Solutions Consultant'
    ],
    curriculumYears: [
      {
        year: 'First Year',
        focus: 'Computing Essentials & Web Basics',
        courses: ['Introduction to Computing', 'Computer Programming (Python)', 'Interactive Web Systems', 'Digital Logic Design']
      },
      {
        year: 'Second Year',
        focus: 'Enterprise Networking & Database Management',
        courses: ['Networking 1 & 2 (CCNA Track)', 'Advanced Database Systems', 'Object-Oriented Programming', 'System Analysis & Design']
      },
      {
        year: 'Third Year',
        focus: 'Cloud Architecture & Cyber Defense',
        courses: ['Information Assurance & Security', 'Enterprise Systems Development', 'Mobile Computing', 'Cloud Infrastructure & DevOps']
      },
      {
        year: 'Fourth Year',
        focus: 'IT Capstone & Industry Practicum',
        courses: ['IT Capstone Project 1 & 2', 'Systems Administration', 'Industry Practicum / On-the-Job Training', 'Emerging Technologies']
      }
    ],
    certificationTracks: ['Cisco Certified Network Associate (CCNA)', 'CompTIA Security+', 'AWS Certified Cloud Practitioner']
  },
  {
    id: 'bsemc',
    code: 'BSEMC',
    name: 'Bachelor of Science in Entertainment and Multimedia Computing',
    duration: '4 Years',
    tagline: 'Game Development, 3D Interactive Worlds & Digital Animation',
    description: 'Blends artistic vision with high-level game physics, shader programming, 3D asset generation, and virtual reality production for global entertainment industries.',
    overview: 'BSEMC brings interactive entertainment and immersive virtual worlds to life. Gordon College students specialize in Game Development and Digital Animation using real-time game engines and 3D pipelines.',
    stats: {
      enrolled: 288,
      units: 166,
      careerDemand: '92% Fast Growing',
    },
    highlights: [
      'Specialized Game Development Laboratory with high-tier GPU workstations and VR headsets',
      'Hands-on game engine mastery with Unity, Unreal Engine 5, and Godot',
      'End-to-end 3D modeling, rigging, texturing, and cinematic animation pipelines',
      'Annual GameJam and Showcase with indie studio mentors'
    ],
    techStack: [
      { name: 'Unity & C#', category: 'Game Engine' },
      { name: 'Unreal Engine 5 & C++', category: 'Game Engine' },
      { name: 'Blender & Maya', category: '3D Art' },
      { name: 'HLSL / GLSL Shaders', category: 'Graphics' },
      { name: 'Substance Painter', category: 'Texturing' },
      { name: 'Godot Engine', category: 'Indie Dev' }
    ],
    careerPaths: [
      'Lead Gameplay Programmer',
      '3D Technical Artist & Rigging Specialist',
      'Shader & Graphics Engineer',
      'Game Level & Narrative Designer',
      'VR / AR Experience Developer',
      'Interactive Media Producer'
    ],
    curriculumYears: [
      {
        year: 'First Year',
        focus: 'Visual Design, Drawing & Scripting Fundamentals',
        courses: ['Design & Color Theory', 'Programming for Interactive Media', '2D Animation Fundamentals', 'Vector & Bitmap Graphics']
      },
      {
        year: 'Second Year',
        focus: '3D Modeling & Game Physics Foundations',
        courses: ['3D Modeling & Sculpting (Blender)', 'Game Programming 1 (2D Games)', 'Data Structures for Games', 'Audio Engineering']
      },
      {
        year: 'Third Year',
        focus: 'Real-Time 3D Engines & Shader Programming',
        courses: ['Game Programming 2 (3D Engines)', 'Lighting, Rendering & Shaders', 'Character Rigging & Animation', 'UI/UX for Games']
      },
      {
        year: 'Fourth Year',
        focus: 'Full Commercial Game Capstone & Studio Immersion',
        courses: ['EMC Capstone Project 1 & 2', 'Game Production & Publishing', 'Industry Internship (Studio)', 'Portfolio Exhibition']
      }
    ],
    certificationTracks: ['Unity Certified Programmer', 'Epic Games Unreal Fellow', 'Autodesk Certified Professional']
  },
  {
    id: 'act',
    code: 'ACT',
    name: 'Associate in Computer Technology',
    duration: '2 Years',
    tagline: 'Fast-Track Technical Career Pathway & Professional Ladderization',
    description: 'A 2-year diploma equipping students with immediate technical proficiencies in computer hardware, networking, technical support, and web application development with ladderization to BSIT.',
    overview: 'ACT provides a swift, high-impact stepping stone for students seeking immediate industry employment or ladderized transition into our 4-year BSIT degree.',
    stats: {
      enrolled: 142,
      units: 84,
      careerDemand: '90% Entry Ready',
    },
    highlights: [
      'Full ladderization: 100% credit transfer into 3rd year of BS Information Technology',
      'Hands-on PC assembly, hardware troubleshooting, and small-office networking',
      'Fundamental front-end web development and database management skills',
      'TESDA National Certificate (NC II/NC III) competency assessment'
    ],
    techStack: [
      { name: 'HTML5 & CSS3 & JavaScript', category: 'Web' },
      { name: 'Python Basics', category: 'Scripting' },
      { name: 'MySQL', category: 'Database' },
      { name: 'Hardware Diagnostic Tools', category: 'Hardware' },
      { name: 'Windows Server & Ubuntu', category: 'OS' }
    ],
    careerPaths: [
      'IT Support Specialist',
      'Junior Web Developer',
      'Network Technician',
      'Help Desk Analyst',
      'Computer Maintenance Technician',
      'Database Support Associate'
    ],
    curriculumYears: [
      {
        year: 'First Year',
        focus: 'Hardware, OS & Fundamental Programming',
        courses: ['Computer Hardware Servicing', 'Introductory Computer Programming', 'Web Technologies', 'Operating Systems Installation']
      },
      {
        year: 'Second Year',
        focus: 'Networking, Database & Practical Immersion',
        courses: ['Local Area Network Configuration', 'Database Management Fundamentals', 'IT Technical Support Practicum (300 Hours)', 'Capstone Project']
      }
    ],
    certificationTracks: ['TESDA Computer Systems Servicing NC II', 'CompTIA A+']
  }
];

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  role: string;
  department: 'Leadership' | 'Computer Science' | 'Information Technology' | 'Multimedia & Game Dev';
  specialization: string;
  credentials: string;
  email: string;
  office: string;
  consultationHours: string;
  bio: string;
  avatarSeed: string;
  featuredSubjects: string[];
}

export const FACULTY_DATA: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. Aris P. Marcelo',
    title: 'Dean, College of Computer Studies',
    role: 'Dean & Associate Professor V',
    department: 'Leadership',
    specialization: 'Distributed Systems & Educational Tech Governance',
    credentials: 'PhD in Information Technology, MSCS, PSITE Fellow',
    email: 'dean.ccs@gordoncollege.edu.ph',
    office: 'CCS Dean’s Office, 3rd Floor',
    consultationHours: 'Tue & Thu 1:00 PM – 4:00 PM',
    bio: 'Dedicated to steering Gordon College CCS towards regional dominance in technological research, student innovation, and industry alignment.',
    avatarSeed: 'aris-marcelo',
    featuredSubjects: ['Advanced Systems Architecture', 'Computing Ethics & Research Colloquium']
  },
  {
    id: 'fac-2',
    name: 'Prof. Mary Ann Delos Santos',
    title: 'Program Chair, BS Computer Science',
    role: 'Assistant Professor IV',
    department: 'Computer Science',
    specialization: 'Artificial Intelligence, Machine Learning & Algorithms',
    credentials: 'MS in Computer Science (UP Diliman), BSCS Cum Laude',
    email: 'm.delossantos@gordoncollege.edu.ph',
    office: 'CS Department Faculty Room',
    consultationHours: 'Mon & Wed 9:00 AM – 12:00 PM',
    bio: 'Pioneers research in natural language processing and algorithmic graph models with active publications in IEEE and Philippine Computing Society.',
    avatarSeed: 'mary-delossantos',
    featuredSubjects: ['Design & Analysis of Algorithms', 'Artificial Intelligence', 'Automata & Formal Languages']
  },
  {
    id: 'fac-3',
    name: 'Engr. Jayson V. Ramos',
    title: 'Program Chair, BS Information Technology',
    role: 'Assistant Professor III',
    department: 'Information Technology',
    specialization: 'Cloud Infrastructure, Cybersecurity & CCNA Networking',
    credentials: 'Master in Information Technology, CCNA Instructor, AWS Solutions Architect',
    email: 'j.ramos@gordoncollege.edu.ph',
    office: 'IT Faculty Hub & Cisco Lab',
    consultationHours: 'Wed & Fri 1:30 PM – 4:30 PM',
    bio: 'Certified Cisco Academy Instructor with 12+ years of enterprise network engineering and cloud security consulting.',
    avatarSeed: 'jayson-ramos',
    featuredSubjects: ['Advanced Computer Networking (CCNA)', 'Cloud Infrastructure & DevOps', 'Information Security']
  },
  {
    id: 'fac-4',
    name: 'Prof. Carlo Emmanuel Reyes',
    title: 'Program Chair, BS Entertainment & Multimedia Computing',
    role: 'Assistant Professor II',
    department: 'Multimedia & Game Dev',
    specialization: 'Game Physics Engines, 3D Shaders & Unity Architecture',
    credentials: 'MFA Digital Arts, Unity Certified Programmer, Indie Game Developer',
    email: 'c.reyes@gordoncollege.edu.ph',
    office: 'EMC Game Studio Lab',
    consultationHours: 'Tue & Fri 10:00 AM – 1:00 PM',
    bio: 'Commercial game creator and technical artist whose indie titles have placed in global Game Jams. Leads student teams in commercial game publishing.',
    avatarSeed: 'carlo-reyes',
    featuredSubjects: ['3D Game Programming', 'Graphics & Shaders', 'Virtual Reality Development']
  },
  {
    id: 'fac-5',
    name: 'Instr. Kristine Joy Mendoza',
    title: 'Faculty Lead, Web & Mobile Systems',
    role: 'Instructor III',
    department: 'Information Technology',
    specialization: 'Modern Full-Stack Engineering (React, Node, TypeScript) & UX',
    credentials: 'Master in Information Technology (Candidate), Google Certified Web Developer',
    email: 'k.mendoza@gordoncollege.edu.ph',
    office: 'IT Faculty Room',
    consultationHours: 'Mon & Thu 2:00 PM – 5:00 PM',
    bio: 'Passionate about modern web standards, progressive web apps, and mentoring student hackathon winners across Central Luzon.',
    avatarSeed: 'kristine-mendoza',
    featuredSubjects: ['Full-Stack Web Development', 'Mobile Systems Development', 'Human-Computer Interaction']
  },
  {
    id: 'fac-6',
    name: 'Instr. Mark Anthony Bautista',
    title: 'Faculty Lead, Data Science & Database Systems',
    role: 'Instructor II',
    department: 'Computer Science',
    specialization: 'Big Data Analytics, SQL Optimization & Distributed Databases',
    credentials: 'MSCS Candidate, Oracle Certified Professional (OCP-DBA)',
    email: 'm.bautista@gordoncollege.edu.ph',
    office: 'CS Faculty Room',
    consultationHours: 'Tue & Wed 8:00 AM – 11:00 AM',
    bio: 'Consults for provincial e-governance databases and guides students on high-throughput database systems and data modeling.',
    avatarSeed: 'mark-bautista',
    featuredSubjects: ['Database Management Systems', 'Data Warehousing & Mining', 'Python for Data Science']
  },
  {
    id: 'fac-7',
    name: 'Instr. Rochelle S. Lim',
    title: 'Faculty Lead, Digital Animation & 3D Art',
    role: 'Instructor II',
    department: 'Multimedia & Game Dev',
    specialization: '3D Character Rigging, Motion Capture & Concept Art',
    credentials: 'BS EMC Magna Cum Laude, Autodesk Certified Maya Professional',
    email: 'r.lim@gordoncollege.edu.ph',
    office: 'EMC Animation Lab',
    consultationHours: 'Wed & Fri 9:00 AM – 12:00 PM',
    bio: 'Specialist in 3D character design, visual storytelling, and cinematic rendering pipelines. Mentors award-winning student animated shorts.',
    avatarSeed: 'rochelle-lim',
    featuredSubjects: ['3D Modeling & Sculpting', 'Digital Character Rigging', '2D/3D Animation']
  },
  {
    id: 'fac-8',
    name: 'Instr. Gerald D. Castro',
    title: 'Coordinator, Associate in Computer Technology',
    role: 'Instructor I',
    department: 'Information Technology',
    specialization: 'Computer Hardware Servicing, Operating Systems & Linux Admin',
    credentials: 'BSIT, TESDA TM I, CSS NC II Lead Assessor',
    email: 'g.castro@gordoncollege.edu.ph',
    office: 'Hardware & Maintenance Lab',
    consultationHours: 'Mon & Fri 1:00 PM – 4:00 PM',
    bio: 'Expert in hardware diagnostics, enterprise virtualization, and guiding ACT students through TESDA certifications and BSIT ladderization.',
    avatarSeed: 'gerald-castro',
    featuredSubjects: ['Hardware Maintenance & Diagnostics', 'Linux System Administration', 'LAN Deployment']
  }
];

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: 'Events' | 'Student Life' | 'Academics' | 'Competitions' | 'Announcements';
  summary: string;
  excerpt?: string;
  readTime: string;
  author: string;
  highlightBadge?: string;
  fullContent: string;
  content?: string;
  tags?: string[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'CCS Week 2026: "Code the Future" Annual Tech Festival Unleashed',
    date: 'Nov 12, 2026',
    category: 'Events',
    summary: 'The biggest college celebration of the year featuring 48-hour hackathons, robotics battle, esports arena, and tech exhibits at the GC Gymnasium.',
    readTime: '3 min read',
    author: 'CCS Student Council & Media Bureau',
    highlightBadge: 'Flagship Event',
    fullContent: 'Gordon College College of Computer Studies announces the grand launch of CCS Week 2026 under the banner "Code the Future: Shaping Intelligent Communities." The 4-day festival kicks off with a keynote by industry leaders from DICT and regional tech incubators. Over 1,000 students across BSCS, BSIT, BSEMC, and ACT will compete in high-stakes hackathons, algorithmic coding battles, digital art expositions, and an esports showdown. Registration is now open via the student portal.'
  },
  {
    id: 'news-2',
    title: 'Gordon College CCS Triumphs at Central Luzon Coding Olympics 2026',
    date: 'Oct 28, 2026',
    category: 'Competitions',
    summary: 'Team "ByteForge" from BS Computer Science bagged 1st Place in the Algorithmic Problem Solving track against 24 universities across Region III.',
    readTime: '4 min read',
    author: 'CCS Research & Competitions Committee',
    highlightBadge: 'Championship',
    fullContent: 'Proving our computational rigor and algorithmic excellence, BSCS 3rd-year students Mark Rivera, Chloe Santos, and Dave Gomez clinched the championship at the 2026 Regional Coding Olympics. Mentored by Prof. Mary Ann Delos Santos, the team solved 9 complex dynamic programming and graph algorithm challenges in record time, setting a new tournament scoring benchmark.'
  },
  {
    id: 'news-3',
    title: 'DICT and Gordon College Partner for Free Cloud & Cyber Defense Sandbox',
    date: 'Oct 15, 2026',
    category: 'Academics',
    summary: 'New state-of-the-art cyber range and cloud computing curriculum granted to CCS students, including 500 subsidized certification vouchers.',
    readTime: '2 min read',
    author: 'Office of the Dean',
    highlightBadge: 'Industry Grant',
    fullContent: 'In a landmark memorandum of agreement, the Department of Information and Communications Technology (DICT) Region III formally inaugurated the Gordon College Cyber Defense Laboratory. The facility grants our students 24/7 access to live simulated threat detection sandboxes, penetration testing tools, and direct exam sponsorship for international certifications.'
  },
  {
    id: 'news-4',
    title: 'BSEMC Student Studio "PixelHaven" Premieres Indie Game on Steam',
    date: 'Sep 30, 2026',
    category: 'Student Life',
    summary: 'Senior EMC capstone game project "Anito: Shadows of the Sierra" receives glowing community praise and verified Steam indie catalog launch.',
    readTime: '3 min read',
    author: 'EMC Game Guild',
    highlightBadge: 'Student Showcase',
    fullContent: 'Developed as part of their 3rd-year capstone production pipeline under Prof. Carlo Reyes, five BSEMC students successfully launched their folklore-inspired 2.5D action adventure title "Anito: Shadows of the Sierra." Featuring original hand-sculpted 3D assets, custom HLSL shaders, and Filipino cultural mythology, the game achieved over 2,500 downloads in its opening week.'
  },
  {
    id: 'news-5',
    title: 'Oracle Academy & AWS Academy Integration for AY 2026-2027',
    date: 'Sep 10, 2026',
    category: 'Announcements',
    summary: 'All BSIT and BSCS curriculums updated to embed certified cloud architect and database professional modules directly into course syllabi.',
    readTime: '2 min read',
    author: 'Curriculum Development Board',
    highlightBadge: 'Curriculum Update',
    fullContent: 'Gordon College CCS continues to guarantee industry-first readiness. Beginning this academic year, enterprise database design courses now officially incorporate Oracle Academy curriculum, while Cloud Infrastructure courses transition to official AWS Academy modules, giving graduates recognized international badges alongside their college diplomas.'
  },
  {
    id: 'news-6',
    title: 'Call for Papers: 8th Annual CCS Computing Research Colloquium (CCSRC)',
    date: 'Aug 22, 2026',
    category: 'Academics',
    summary: 'Submissions now open for undergraduate thesis papers, applied AI prototypes, and intelligent systems papers with scopus-indexed publication support.',
    readTime: '3 min read',
    author: 'CCS Research Department',
    highlightBadge: 'Call For Papers',
    fullContent: 'The CCS Research Department invites all senior computer studies students and regional researchers to submit their original work for the 8th Annual Computing Research Colloquium. Tracks include: Artificial Intelligence & Machine Learning, Cyber-Physical Systems, Human-Computer Interaction, Serious Games & XR, and Distributed Ledger Architectures.'
  }
];

export interface IndustryPartner {
  name: string;
  category: string;
  badge: string;
  description: string;
  color: string;
}

export const INDUSTRY_PARTNERS: IndustryPartner[] = [
  { name: 'DICT', category: 'Government & Digital Governance', badge: 'National Partner', description: 'Department of Information and Communications Technology', color: '#FF5E14' },
  { name: 'PSITE', category: 'Accreditation & Academic Excellence', badge: 'Academic Alliance', description: 'Philippine Society of Information Technology Educators', color: '#EA580C' },
  { name: 'Google Cloud & GDSC', category: 'Cloud Infrastructure & Developer Community', badge: 'Global Tech', description: 'Google Developer Student Clubs & Cloud Academy', color: '#4285F4' },
  { name: 'Acer Academy', category: 'Hardware & University Excellence', badge: 'Premier Member', description: 'Acer Philippines Higher Education Program', color: '#83B81A' },
  { name: 'Oracle Academy', category: 'Enterprise Database & Java Systems', badge: 'Global Partner', description: 'Global Database & Cloud Architecture curriculum', color: '#F80000' },
  { name: 'AWS Academy', category: 'Cloud Solutions & Serverless Computing', badge: 'Cloud Leader', description: 'Amazon Web Services Cloud Certification Program', color: '#FF9900' },
  { name: 'Cisco Networking Academy', category: 'Cyber Defense & Enterprise Networks', badge: 'Networking Standard', description: 'CCNA & Network Security Training Facility', color: '#049FD9' }
];

// Utility pure functions
export function calculateTotalEnrollment(stats: StudentStats = STUDENT_STATISTICS): number {
  return stats.bsit + stats.bscs + stats.bsemc + stats.act;
}

export function getProgramById(id: string): ProgramInfo | undefined {
  return PROGRAMS_DATA.find(p => p.id === id);
}

export function filterFaculty(
  faculty: FacultyMember[],
  query: string,
  department: string
): FacultyMember[] {
  return faculty.filter(f => {
    const matchesDept = department === 'All' || f.department === department;
    const q = query.toLowerCase().trim();
    if (!q) return matchesDept;
    const matchesQuery =
      f.name.toLowerCase().includes(q) ||
      f.specialization.toLowerCase().includes(q) ||
      f.credentials.toLowerCase().includes(q) ||
      f.featuredSubjects.some(s => s.toLowerCase().includes(q));
    return matchesDept && matchesQuery;
  });
}

export function filterNews(
  news: NewsArticle[],
  query: string,
  category: string
): NewsArticle[] {
  return news.filter(n => {
    const matchesCategory = category === 'All' || n.category === category;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery =
      n.title.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q) ||
      n.author.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  programInterest: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required (minimum 2 characters)';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (data.phone && data.phone.trim().length > 0) {
    const phoneClean = data.phone.replace(/[\s()-]/g, '');
    if (!/^\+?[0-9]{7,15}$/.test(phoneClean)) {
      errors.phone = 'Please enter a valid phone number (e.g. +63 912 345 6789)';
    }
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Inquiry message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
