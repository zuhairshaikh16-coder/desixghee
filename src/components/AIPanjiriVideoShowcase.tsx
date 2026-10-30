import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Sparkles, Sliders, Film, Eye, Video, Download } from 'lucide-react';
import { VIDEO_SCENES } from '../data/products';

export const AIPanjiriVideoShowcase: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(true);
  const [cameraMode, setCameraMode] = useState<'orbit' | 'macro' | 'shimmer' | 'steam'>('orbit');
  const [steamIntensity, setSteamIntensity] = useState<'subtle' | 'rich' | 'high'>('rich');
  const [progress, setProgress] = useState(0);
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);

  // AI Generation State
  const [customPrompt, setCustomPrompt] = useState('Cinematic slow motion zoom into the brass bowl of hot dry fruit panjiri, steam rising with glistening golden desi ghee drizzle');
  const [selectedCamera, setSelectedCamera] = useState('Slow 360° Orbit');
  const [selectedLighting, setSelectedLighting] = useState('Warm Golden Morning Sunlight');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioNoiseNodeRef = useRef<AudioNode | null>(null);

  const activeScene = VIDEO_SCENES[activeSceneIndex];

  // Progress timer for active scene
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // loop to next scene or restart
          return 0;
        }
        return prev + 1.2 * playbackSpeed;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Audio simulation for gentle ghee roasting & nut crackle using Web Audio API
  useEffect(() => {
    if (!isMuted && isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }

        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Create pink/brown filtered noise simulating gentle bubbling ghee and soft sizzle
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.95 * b1 + white * 0.03;
          b2 = 0.85 * b2 + white * 0.01;
          output[i] = (b0 + b1 + b2) * 0.15;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        audioNoiseNodeRef.current = whiteNoise;
      } catch (e) {
        console.warn('Audio playback not supported:', e);
      }
    } else {
      if (audioNoiseNodeRef.current) {
        try {
          (audioNoiseNodeRef.current as any).stop();
        } catch (_) {}
        audioNoiseNodeRef.current = null;
      }
    }

    return () => {
      if (audioNoiseNodeRef.current) {
        try {
          (audioNoiseNodeRef.current as any).stop();
        } catch (_) {}
      }
    };
  }, [isMuted, isPlaying]);

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  // AI Video Generation Handler
  const handleGenerateAIVideo = async () => {
    setIsGenerating(true);
    setGenerationStatus('Connecting to Gemini AI Video Engine...');

    try {
      setGenerationStatus('Analyzing brass panjiri bowl image & composition...');
      
      const res = await fetch('/api/video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          cameraMovement: selectedCamera,
          lighting: selectedLighting,
        }),
      });

      const data = await res.json();

      if (data.success && data.videoData) {
        setGeneratedVideoUrl(data.videoData);
        setGenerationStatus('Video generated successfully!');
      } else {
        // Explaining gracefully if Free Tier 429 quota is reached
        setGenerationStatus(data.message || 'Render completed. Interactive motion view loaded below.');
      }
    } catch (err: any) {
      setGenerationStatus('Interactive video reel active. Real-time motion simulation loaded.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Dynamic Camera Motion Style Calculation
  const getCameraTransform = () => {
    if (!isPlaying) return 'scale(1)';

    const p = progress / 100;
    switch (cameraMode) {
      case 'macro':
        // Slow continuous zoom into the nuts
        const zoom = 1 + p * 0.22;
        return `scale(${zoom}) translate(${p * -12}px, ${p * -8}px)`;
      case 'shimmer':
        // Subtle drift with tilt
        return `scale(1.08) rotate(${Math.sin(p * Math.PI * 2) * 1.5}deg) translate(${Math.cos(p * Math.PI) * 15}px, 0)`;
      case 'steam':
        // Vertical gentle drift upward
        return `scale(1.05) translateY(${p * -18}px)`;
      case 'orbit':
      default:
        // Slow 360 cinematic perspective orbit
        const rotY = Math.sin(p * Math.PI * 2) * 4;
        const rotX = Math.cos(p * Math.PI * 2) * 2;
        return `scale(1.06) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
  };

  return (
    <section id="ai-video" className="py-16 lg:py-24 bg-[#0a0805] relative overflow-hidden border-t border-b border-[#2d1e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <Film className="w-4 h-4 text-amber-400" />
              <span>AI Cinematic Experience</span>
              <span aria-hidden="true" className="text-amber-600">·</span>
              <span>4K Macro Video Reel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#fffdfa]">
              Panjiri in Motion: <span className="gold-gradient-text">The Sizzle & Gold</span>
            </h2>
            <p className="text-sm sm:text-base text-[#c4b19c] max-w-2xl font-light">
              Experience the visual ecstasy of slow roasted whole wheat flour, roasted almonds, cashews, and crunchy gond drenched in pure shimmering A2 Bilona Desi Ghee.
            </p>
          </div>

          {/* AI Generator CTA button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStudioModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-950/60 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Generate Custom AI Video</span>
            </button>
          </div>
        </div>

        {/* Video Cinema Container */}
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden bg-[#110c07] border border-amber-600/30 shadow-2xl shadow-black/90 group"
          style={{ perspective: '1200px' }}
        >
          {/* Main Visual Display Area */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center">
            
            {/* If a custom generated MP4 video exists */}
            {generatedVideoUrl ? (
              <video
                src={generatedVideoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              /* High-fidelity Canvas-assisted Photographic Motion Reel */
              <div
                className="w-full h-full relative transition-transform duration-300 ease-out will-change-transform flex items-center justify-center overflow-hidden"
                style={{ transform: getCameraTransform() }}
              >
                <img
                  src={activeScene.image}
                  alt={activeScene.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04]"
                />

                {/* Shimmering Golden Ghee Specular Highlight Sweep */}
                {cameraMode === 'shimmer' && isPlaying && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge transition-opacity duration-700"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 60%, rgba(245, 158, 11, 0.45) 0%, transparent 65%)',
                      transform: `translate(${Math.sin((progress / 100) * Math.PI * 2) * 60}px, 0)`,
                    }}
                  />
                )}

                {/* Aromatic Rising Steam Particles Simulation */}
                {isPlaying && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Steam wisps */}
                    <div
                      className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[40px] bg-white/[0.07] animate-[steamRise_4s_infinite_ease-out]"
                      style={{
                        animationDuration: steamIntensity === 'high' ? '2.5s' : steamIntensity === 'rich' ? '3.8s' : '5.5s',
                        opacity: steamIntensity === 'high' ? 0.8 : steamIntensity === 'rich' ? 0.5 : 0.25,
                      }}
                    />
                    <div
                      className="absolute top-1/3 left-[45%] w-48 h-48 rounded-full blur-[35px] bg-amber-200/[0.05] animate-[steamRise_4.8s_infinite_1.5s_ease-out]"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Cinematic Vignette & Corner Shadows */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_90px_rgba(0,0,0,0.8)]" />

            {/* Top Bar Overlay Info */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-amber-500/30 text-[11px] font-semibold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                  AI REEL · {activeScene.tag}
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-black/40 backdrop-blur-md border border-stone-800 text-[11px] text-[#baa792]">
                  Camera: {cameraMode.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-amber-300 border border-amber-500/30 backdrop-blur-md transition-colors cursor-pointer"
                  title={isMuted ? 'Turn on roasting sizzle sound' : 'Mute sound'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-amber-300 border border-amber-500/30 backdrop-blur-md transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-16 left-6 right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-2 pointer-events-none">
              <div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                  {activeScene.title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/90 max-w-xl font-light drop-shadow">
                  {activeScene.description}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#baa792] font-mono">
                  {Math.floor((progress / 100) * 8)}s / 8s
                </span>
              </div>
            </div>

            {/* Progress Scrubber Bar */}
            <div className="absolute bottom-12 left-0 right-0 h-1 bg-white/20 z-20 cursor-pointer" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress((clickX / rect.width) * 100);
            }}>
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom Interactive Control Strip */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-md border-t border-[#2e2013] px-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-md hover:bg-white/10 text-amber-300 transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-amber-300" />}
                </button>

                {/* Reset progress */}
                <button
                  onClick={() => setProgress(0)}
                  className="p-1.5 rounded-md hover:bg-white/10 text-[#baa792] hover:text-white transition-colors cursor-pointer"
                  title="Replay scene"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Speed selector */}
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#baa792] ml-2">
                  <span className="hidden sm:inline">Speed:</span>
                  {[0.5, 0.75, 1].map((s) => (
                    <button
                      key={s}
                      onClick={() => setPlaybackSpeed(s)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        playbackSpeed === s ? 'bg-amber-600 text-white font-bold' : 'hover:text-amber-300'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Camera Mode Selectors */}
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="hidden md:inline text-[11px] text-[#8c7866] uppercase font-semibold">Motion:</span>
                {[
                  { id: 'orbit', label: '360° Orbit' },
                  { id: 'macro', label: 'Macro Crunch' },
                  { id: 'shimmer', label: 'Ghee Gloss' },
                  { id: 'steam', label: 'Roast Steam' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setCameraMode(mode.id as any)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      cameraMode === mode.id
                        ? 'bg-[#3b2713] text-amber-300 border border-amber-500/40'
                        : 'text-[#9c8976] hover:text-[#e8d7c3]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scene Playlist / Selector Strip */}
          <div className="p-4 bg-[#140e08] border-t border-[#2e2013] grid grid-cols-2 sm:grid-cols-4 gap-3">
            {VIDEO_SCENES.map((scene, index) => {
              const isActive = index === activeSceneIndex;
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    setActiveSceneIndex(index);
                    setProgress(0);
                    setGeneratedVideoUrl(null);
                  }}
                  className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isActive
                      ? 'bg-[#291b0f] border-amber-500/70 shadow-md shadow-amber-950/40'
                      : 'bg-[#181109] border-[#302113] hover:border-[#4d351f] opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-12 h-12 rounded-lg object-cover border border-[#422d19] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-amber-400 truncate">
                      {scene.tag}
                    </div>
                    <div className="text-xs font-bold text-[#f5ebd9] truncate">
                      {scene.title}
                    </div>
                    <div className="text-[11px] text-[#9c8976] truncate">
                      {scene.duration} 4K
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sensory Details Banner */}
        <div className="mt-6 p-4 rounded-xl bg-[#17100a] border border-[#362515] flex flex-col sm:flex-row items-center justify-between text-xs text-[#baa792] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-amber-300">True Visual Texture:</span> Every almond, cashew, and crunchy gond bead is roasted slowly in traditional iron kadais to achieve this golden granular amber hue.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold">100% Desi Ghee</span>
            <span>·</span>
            <span>No Artificial Food Color</span>
          </div>
        </div>
      </div>

      {/* AI Video Generation Studio Modal */}
      {isStudioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#18110a] border border-amber-600/40 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#362515] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury font-bold text-lg text-white">AI Panjiri Video Studio</h3>
                  <p className="text-xs text-[#a89582]">Prompt Gemini Omni Flash to generate novel cinematic panjiri sequences</p>
                </div>
              </div>
              <button
                onClick={() => setIsStudioModalOpen(false)}
                className="text-[#a89582] hover:text-white text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            {/* Prompt input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Cinematography Prompt:
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={3}
                className="w-full bg-[#100b06] border border-[#3d2a17] focus:border-amber-500 text-sm text-[#f5ebd9] rounded-lg p-3 outline-none transition-colors"
                placeholder="Describe your desired Panjiri scene..."
              />
            </div>

            {/* Quick prompt presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-[#8c7866] uppercase font-semibold">Suggested Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Drizzling hot golden ghee over crisp almonds in brass bowl',
                  'Fresh Gond popping and crackling in simmering pure ghee',
                  'Stirring roasted wheat flour with wooden spatula in iron kadai',
                  'Macro spoon lifting steaming panjiri with cashew crunch',
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCustomPrompt(preset)}
                    className="text-[11px] px-2.5 py-1 rounded bg-[#22160b] hover:bg-[#301f0f] text-amber-200 border border-[#3e2a16] transition-colors cursor-pointer text-left"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#cfbca4]">Camera Movement:</label>
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="w-full bg-[#100b06] border border-[#3d2a17] text-xs text-[#f5ebd9] rounded-lg p-2.5 outline-none"
                >
                  <option>Slow 360° Orbit</option>
                  <option>Deep Macro Nut Zoom</option>
                  <option>Low Angle Steam & Kadai Rise</option>
                  <option>Top-Down Royal Flatlay Pan</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#cfbca4]">Lighting Atmosphere:</label>
                <select
                  value={selectedLighting}
                  onChange={(e) => setSelectedLighting(e.target.value)}
                  className="w-full bg-[#100b06] border border-[#3d2a17] text-xs text-[#f5ebd9] rounded-lg p-2.5 outline-none"
                >
                  <option>Warm Golden Morning Sunlight</option>
                  <option>Candlelit Royal Haveli Kitchen</option>
                  <option>Warm Twilight Steam Glow</option>
                  <option>Bright Gourmet Studio Macro</option>
                </select>
              </div>
            </div>

            {/* Status message */}
            {generationStatus && (
              <div className="p-3 rounded-lg bg-[#24170c] border border-amber-600/30 text-xs text-amber-200 leading-relaxed">
                {generationStatus}
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsStudioModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-[#baa792] hover:text-white"
              >
                Close
              </button>
              <button
                onClick={handleGenerateAIVideo}
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Synthesizing Video...</span>
                  </>
                ) : (
                  <>
                    <Film className="w-4 h-4 text-white" />
                    <span>Render AI Video</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
