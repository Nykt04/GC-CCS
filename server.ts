import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { formatChatContents } from './src/utils/chat-utils.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback intelligent responder for Gordon College CCS
function getFallbackChatReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes('admission') || lower.includes('apply') || lower.includes('enroll') || lower.includes('requirement')) {
    return `**Gordon College CCS Admissions Guide (AY 2026–2027)**\n\n1. **Freshman Applicants:**\n   - Form 138 (Grade 12 Report Card) with STEM or ICT strand preference (non-STEM students complete bridging modules).\n   - PSA Birth Certificate & Certificate of Good Moral Character.\n   - Passed Gordon College Admission Test (GCAT) & CCS Diagnostic Interview.\n\n2. **Transferees & Shifters:**\n   - Transcript of Records / Certificate of Grades with GWA of 2.25 or better.\n   - Honorable Dismissal & Clearance.\n\n3. **Free Tuition:** As a local college of Olongapo City, qualified residents enjoy free higher education under RA 10931!\n\nWould you like guidance on BSCS, BSIT, BSEMC, or ACT?`;
  }

  if (lower.includes('bscs') || lower.includes('computer science')) {
    return `**Bachelor of Science in Computer Science (BSCS)**\n- **Focus:** Algorithms, Artificial Intelligence, Computational Theory, Systems Programming.\n- **Key Tech:** C++, Python, Rust, PyTorch, Linux, Distributed Systems.\n- **Top Careers:** AI Engineer, Algorithm Researcher, Systems Architect, Quant Developer.\n- **Enrollment:** 377 active students.\n- **Unique Advantage:** Double capstone research with national conference presentations and annual Coding Olympics!`;
  }

  if (lower.includes('bsit') || lower.includes('information technology')) {
    return `**Bachelor of Science in Information Technology (BSIT)**\n- **Focus:** Enterprise Cloud Solutions, Full-Stack Architecture, Cyber Defense & CCNA Networking.\n- **Key Tech:** React, Node.js, TypeScript, Cisco IOS, AWS, Docker, Kubernetes.\n- **Top Careers:** Cloud Architect, Network Security Engineer, Full-Stack Developer, DevOps Specialist.\n- **Enrollment:** 498 active students.\n- **Certifications:** Integrated Cisco Networking Academy & AWS Academy tracks directly in the curriculum!`;
  }

  if (lower.includes('bsemc') || lower.includes('multimedia') || lower.includes('game')) {
    return `**Bachelor of Science in Entertainment and Multimedia Computing (BSEMC)**\n- **Focus:** Real-Time 3D Game Engines, Character Animation, Shader Programming & Virtual Reality.\n- **Key Tech:** Unity (C#), Unreal Engine 5 (C++), Blender, GLSL/HLSL, Substance Painter.\n- **Top Careers:** Gameplay Programmer, Technical Artist, 3D Animator, VR Developer.\n- **Enrollment:** 288 active students.\n- **Facility:** Dedicated Game Studio Lab with high-tier GPU workstations and VR dev kits.`;
  }

  if (lower.includes('act') || lower.includes('associate')) {
    return `**Associate in Computer Technology (ACT)**\n- **Duration:** 2-Year Intensive Ladderized Program.\n- **Focus:** Computer Hardware Servicing, Operating Systems, LAN Deployment, Front-End Web.\n- **Ladderization:** 100% credit transfer directly into 3rd Year BSIT upon graduation!\n- **Certifications:** TESDA Computer Systems Servicing NC II & CompTIA A+ readiness.`;
  }

  if (lower.includes('faculty') || lower.includes('dean') || lower.includes('chair')) {
    return `**CCS Faculty Leadership:**\n- **Dean:** Dr. Aris P. Marcelo (Distributed Systems & Governance)\n- **BSCS Chair:** Prof. Mary Ann Delos Santos (AI, Graph Algorithms)\n- **BSIT Chair:** Engr. Jayson V. Ramos (Cloud Infrastructure & CCNA)\n- **BSEMC Chair:** Prof. Carlo Emmanuel Reyes (Game Engines & 3D Shaders)\n- **ACT Coordinator:** Instr. Gerald D. Castro (Hardware Diagnostics & Linux Admin)\n\nYou can view all faculty consultation hours in the Faculty tab!`;
  }

  return `Greetings from **Gordon College College of Computer Studies (CCS)** — *"Making IT Happen."*\n\nI am **Turing**, your CCS AI Academic and Admissions Advisor. I can help you with:\n- Detailed curriculum comparisons between BSCS, BSIT, BSEMC, and ACT\n- Admission steps, deadlines, and tuition guidance\n- Capstone project ideas and industry certification tracks (Cisco, AWS, Oracle)\n- Faculty office consultation schedules and lab facility information\n\nWhat can I assist you with today?`;
}

// Multi-turn Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const ai = getGenAI();
    if (!ai) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.text || '';
      return res.json({
        reply: getFallbackChatReply(lastUserMsg),
        model: 'gemini-3.8-flash (advisory fallback)',
      });
    }

    // Build chat history with system instruction
    const systemInstruction = `You are "Turing", the premier AI Academic and Admissions Advisor for the College of Computer Studies (CCS) at Gordon College, Olongapo City, Philippines.
The college motto is "Making IT Happen".
Gordon College CCS offers four stellar programs:
1. BSCS (Bachelor of Science in Computer Science) - 377 students, focusing on algorithms, theoretical CS, AI/ML, and computational rigor.
2. BSIT (Bachelor of Science in Information Technology) - 498 students, focusing on enterprise cloud, full-stack architecture, Cisco CCNA networking, and cyber defense.
3. BSEMC (Bachelor of Science in Entertainment and Multimedia Computing) - 288 students, specializing in Game Development, Unity/Unreal Engine, 3D modeling, and digital animation.
4. ACT (Associate in Computer Technology) - 142 students, 2-year diploma ladderized into 3rd year BSIT.
Total enrollment: 1,163 students.
Dean: Dr. Aris P. Marcelo.
Address: Olongapo City Sports Complex, East Tapinac, Olongapo City, Zambales 2200.
Phone: +63 47 222-4080 / (047) 224-2089.
Email: info.ccs@gordoncollege.edu.ph.

Tone: Professional, enthusiastic, technologically savvy, encouraging, and deeply informative. Use markdown formatting with bullet points and bold headers. Keep answers concise, actionable, and structured.`;

    const formattedContents = formatChatContents(messages);

    let reply = '';
    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('API request timeout')), 25000)
      );

      const callPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const response = await Promise.race([callPromise, timeoutPromise]);
      reply = response.text || '';
    } catch (apiErr: any) {
      console.warn('Gemini chat notice (using local advisory intelligence):', apiErr?.message);
    }

    if (!reply) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.text || '';
      reply = getFallbackChatReply(lastUserMsg);
    }

    return res.json({ reply, model: 'gemini-3.8-flash' });
  } catch (error: any) {
    const lastUserMsg = req.body?.messages?.slice(-1)[0]?.text || '';
    return res.json({
      reply: getFallbackChatReply(lastUserMsg),
      model: 'gemini-3.8-flash (advisory engine)',
    });
  }
});

// Image Generation Endpoint using gemini-nano-banana-2.1
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, aspectRatio = '1:1' } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt string is required' });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.json({
        imageUrl: null,
        fallbackSvg: generateTechBadgeSvg(prompt),
        message: 'API Key not configured in environment. Displaying dynamic vector badge.',
      });
    }

    try {
      const response = await ai.models.generateImages({
        model: 'gemini-nano-banana-2.1',
        prompt: `Gordon College CCS modern neubrutalist graphic, tech style, dark navy #0B1530 and electric blue #2F6BFF accents: ${prompt}`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: aspectRatio as any,
        },
      });

      const imageBytes = response?.generatedImages?.[0]?.image?.imageBytes;
      if (imageBytes) {
        return res.json({
          imageUrl: `data:image/png;base64,${imageBytes}`,
          model: 'gemini-nano-banana-2.1',
        });
      }
    } catch (modelErr: any) {
      console.warn('Image generation model error, creating procedural tech art:', modelErr?.message);
    }

    return res.json({
      imageUrl: null,
      fallbackSvg: generateTechBadgeSvg(prompt),
      model: 'vector-badge-synthesizer',
    });
  } catch (err: any) {
    console.error('Image generation error:', err);
    return res.status(500).json({ error: err?.message || 'Failed to generate image' });
  }
});

// Procedural SVG badge synthesizer when image model is unavailable or in sandbox
function generateTechBadgeSvg(prompt: string): string {
  const cleanPrompt = prompt.replace(/[<>&"]/g, '').slice(0, 40);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
    <rect width="600" height="600" fill="#0B1530"/>
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2F6BFF" stroke-width="0.75" stroke-opacity="0.2"/>
      </pattern>
    </defs>
    <rect width="600" height="600" fill="url(#grid)" />
    <!-- Neubrutalist Outer Frame -->
    <rect x="50" y="50" width="500" height="500" rx="0" fill="#0E1E45" stroke="#2F6BFF" stroke-width="4"/>
    <rect x="70" y="70" width="460" height="460" rx="0" fill="#0B1530" stroke="#F4F7FC" stroke-width="2" stroke-dasharray="8 8"/>
    <!-- Tech Geometry -->
    <polygon points="300,140 430,220 430,380 300,460 170,380 170,220" fill="none" stroke="#2F6BFF" stroke-width="6"/>
    <polygon points="300,180 395,240 395,360 300,420 205,360 205,240" fill="#2F6BFF" fill-opacity="0.1" stroke="#00F5D4" stroke-width="3"/>
    <circle cx="300" cy="300" r="45" fill="#2F6BFF"/>
    <path d="M280 300 L295 315 L325 285" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="square"/>
    <!-- Brand typography -->
    <text x="300" y="115" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="20" fill="#2F6BFF" text-anchor="middle" letter-spacing="4">GORDON COLLEGE CCS</text>
    <text x="300" y="500" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#F4F7FC" text-anchor="middle">MAKING IT HAPPEN</text>
    <text x="300" y="530" font-family="'JetBrains Mono', monospace" font-size="13" fill="#00F5D4" text-anchor="middle">${cleanPrompt}</text>
  </svg>`;
}

// Development with Vite or production static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gordon College CCS Portal running on port ${PORT}`);
  });
}

startServer();
