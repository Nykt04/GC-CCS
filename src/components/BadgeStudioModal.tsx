import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Sparkles,
  Download,
  Copy,
  Check,
  RefreshCw,
  Palette,
  Image as ImageIcon,
  Layers,
  Wand2
} from 'lucide-react';

interface BadgeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PROMPTS = [
  'Gordon College CCS Cyber Defense Taskforce Seal',
  'BS Computer Science Algorithmic Champion Gold Emblem',
  'BSEMC Pixel Game Jam Trophy with 8-bit sword',
  'Gordon College College of Computer Studies Futuristic Neon Crest',
  'Women in Computing Gordon College Chapter Shield'
];

export default function BadgeStudioModal({ isOpen, onClose }: BadgeStudioModalProps) {
  const [prompt, setPrompt] = useState('Gordon College CCS Cyber Defense Taskforce Seal');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [fallbackSvg, setFallbackSvg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (targetPrompt?: string) => {
    const textPrompt = targetPrompt || prompt;
    if (!textPrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textPrompt, aspectRatio }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setFallbackSvg(null);
      } else if (data.fallbackSvg) {
        setFallbackSvg(data.fallbackSvg);
        setGeneratedImage(null);
      } else {
        throw new Error(data.message || 'Could not synthesize image');
      }
    } catch (err: any) {
      console.warn('Image synthesis notice:', err?.message);
      // Generate immediate procedural vector collegiate badge in official Orange and White
      setFallbackSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
          <defs>
            <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#EA580C"/>
              <stop offset="100%" stop-color="#C2410C"/>
            </linearGradient>
          </defs>
          <rect width="600" height="600" fill="#FFFFFF"/>
          <circle cx="300" cy="300" r="240" fill="none" stroke="#EA580C" stroke-width="4" stroke-dasharray="6,6"/>
          <circle cx="300" cy="300" r="220" fill="#FFF7ED" stroke="#EA580C" stroke-width="3"/>
          <circle cx="300" cy="300" r="180" fill="#FFFFFF" stroke="#EA580C" stroke-width="2"/>
          <polygon points="300,160 410,230 410,360 300,430 190,360 190,230" fill="#FFF7ED" stroke="#EA580C" stroke-width="3"/>
          <circle cx="300" cy="300" r="45" fill="url(#sealGrad)"/>
          <text x="300" y="306" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="20" fill="#FFFFFF" text-anchor="middle">CCS</text>
          <text x="300" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#0F172A" text-anchor="middle" letter-spacing="3">GORDON COLLEGE</text>
          <text x="300" y="460" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#EA580C" text-anchor="middle" letter-spacing="2">MAKING IT HAPPEN</text>
          <text x="300" y="485" font-family="'JetBrains Mono', monospace" font-weight="600" font-size="12" fill="#475569" text-anchor="middle">${textPrompt.slice(0, 36)}</text>
        </svg>
      `);
      setGeneratedImage(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const a = document.createElement('a');
      a.href = generatedImage;
      a.download = `gc-ccs-badge-${Date.now()}.png`;
      a.click();
    } else if (fallbackSvg) {
      const blob = new Blob([fallbackSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gc-ccs-badge-${Date.now()}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        className="bg-white border border-slate-200 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-900"
      >
        {/* Header */}
        <div className="bg-orange-600 px-5 py-4 flex items-center justify-between shrink-0 text-white shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white text-orange-600 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-white text-base">
                  CCS Digital Crest & Emblem Studio
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  Gemini Nano Banana 2.1
                </span>
              </div>
              <p className="text-xs text-orange-100 mt-0.5">
                Generate high-resolution institutional seals, society insignia, and collegiate honor emblems
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close studio"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Studio Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Institutional Insignia Prompt:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Gordon College BSCS Quantum Algorithms Guild Crest..."
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-600 placeholder:text-slate-400 shadow-2xs"
              />
              <button
                onClick={() => handleGenerate()}
                disabled={isGenerating || !prompt.trim()}
                className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center space-x-2 shrink-0 transition-all"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Rendering...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Generate Seal</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preset Prompts Chips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-600">
              Institutional Templates:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_PROMPTS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(preset);
                    handleGenerate(preset);
                  }}
                  className="text-xs bg-white hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-left transition-colors shadow-2xs font-medium"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Preview Canvas Area */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
            {isGenerating ? (
              <div className="text-center space-y-3 p-8">
                <RefreshCw className="w-10 h-10 text-orange-600 animate-spin mx-auto" />
                <div className="font-heading font-extrabold text-slate-900 text-base">
                  Synthesizing Collegiate Crest...
                </div>
                <div className="text-xs text-slate-500">
                  Executing Gemini Nano Banana 2.1 creative synthesis
                </div>
              </div>
            ) : generatedImage ? (
              <div className="space-y-3 w-full flex flex-col items-center">
                <img
                  src={generatedImage}
                  alt={prompt}
                  className="max-h-72 w-auto rounded-lg shadow-md border border-slate-200"
                />
                <div className="text-xs text-orange-600 font-semibold">
                  Generated via gemini-nano-banana-2.1
                </div>
              </div>
            ) : fallbackSvg ? (
              <div className="space-y-3 w-full flex flex-col items-center">
                <div
                  className="w-64 h-64 rounded-lg shadow-md border border-slate-200 overflow-hidden bg-white"
                  dangerouslySetInnerHTML={{ __html: fallbackSvg }}
                />
                <div className="text-xs text-orange-600 font-bold">
                  Official Gordon College CCS Vector Seal
                </div>
              </div>
            ) : (
              <div className="text-center p-8 space-y-3">
                <ImageIcon className="w-12 h-12 text-orange-600 mx-auto opacity-70" />
                <div className="font-heading font-extrabold text-slate-900 text-base">
                  Ready to Render Insignia
                </div>
                <div className="text-xs text-slate-500 max-w-sm">
                  Select a collegiate preset above or describe your student guild, honor society, or hackathon badge to synthesize an official crest.
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          {(generatedImage || fallbackSvg) && (
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center space-x-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download High-Resolution Seal</span>
              </button>

              <button
                onClick={() => handleGenerate()}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm border border-slate-200 transition-colors font-medium"
              >
                Regenerate
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
