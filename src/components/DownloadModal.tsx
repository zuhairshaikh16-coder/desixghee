import React from 'react';
import { Download, Code2, Globe, FileCode, CheckCircle, Terminal, ExternalLink } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#18110a] border border-amber-600/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#302112] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-xl text-white">
                Download Website Package
              </h3>
              <p className="text-xs text-[#a89582]">
                Choose your preferred package to run locally or host online
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#a89582] hover:text-white text-sm font-semibold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Download Options */}
        <div className="space-y-4">
          
          {/* Option 1: Full Source Code */}
          <div className="p-5 rounded-xl bg-[#120d07] border border-[#3b2715] hover:border-amber-500/50 transition-all space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Complete Source Code (ZIP)</h4>
                  <p className="text-[11px] text-[#baa792]">
                    Includes all React 19 components, TypeScript, Tailwind CSS, Express server, and raw images.
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#24170d] text-amber-300 font-mono font-semibold border border-[#442c17] shrink-0">
                ~7 MB
              </span>
            </div>

            <div className="bg-[#0b0805] p-2.5 rounded-lg text-[11px] font-mono text-[#c4b3a1] flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>npm install &amp;&amp; npm run dev</span>
            </div>

            <a
              href="/website.zip"
              download="website.zip"
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Editable Website (website.zip)</span>
            </a>
          </div>

          {/* Option 2: Standalone Production Build */}
          <div className="p-5 rounded-xl bg-[#120d07] border border-[#3b2715] hover:border-emerald-500/50 transition-all space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Production Web Build (Ready to Deploy)</h4>
                  <p className="text-[11px] text-[#baa792]">
                    Pre-compiled standalone static website. Drop onto Vercel, Netlify, Cloudflare, or cPanel.
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#0d2216] text-emerald-300 font-mono font-semibold border border-[#1b3d28] shrink-0">
                ~30 MB
              </span>
            </div>

            <div className="text-[11px] text-[#8c7866] flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>No Node.js needed · Ready for any web server or static hosting</span>
            </div>

            <a
              href="/api/download/build"
              download="desi-ghee-panjiri-production-build.zip"
              className="w-full py-2.5 px-4 rounded-lg bg-[#1a2d1f] hover:bg-[#233d2a] text-emerald-200 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Production Build (ZIP)</span>
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 text-center text-xs text-[#8c7866]">
          The ZIP archives include all your high-res assets, posters, audio, and styling.
        </div>
      </div>
    </div>
  );
};
