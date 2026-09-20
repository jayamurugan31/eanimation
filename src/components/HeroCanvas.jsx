import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const TOTAL_FRAMES = 300;

export default function HeroCanvas({ onOpenEnquire }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Store loaded Image objects & animation refs
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const currentRenderedFrameRef = useRef(0);
  const lastFrameIndexRef = useRef(-1);
  const animFrameIdRef = useRef(null);

  // Helper to format frame filename
  const getFrameUrl = (index) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/frames/ezgif-frame-${frameNum}.jpg`;
  };

  // Calculate scroll position progress -> target frame index
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const scrollableDistance = rect.height - window.innerHeight;

    if (scrollableDistance <= 0) return;

    // Calculate exact scroll progress within container [0.0 to 1.0]
    const currentScroll = window.scrollY - containerTop;
    const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));

    const targetFrame = Math.round(progress * (TOTAL_FRAMES - 1));
    targetFrameRef.current = targetFrame;
  }, []);

  // Parallel Batch Preloading Strategy for all 300 frames
  useEffect(() => {
    let loadedCount = 0;
    const imageCache = new Array(TOTAL_FRAMES);

    const loadSingleFrame = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          imageCache[index] = img;
          loadedCount++;
          setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // 1. Load initial frame 0 immediately for instant display
    loadSingleFrame(0).then(() => {
      imagesRef.current = imageCache;
      setIsLoaded(true);
      handleScroll();
    });

    // 2. Load all 300 frames in parallel batches of 25 for rapid population
    const loadAllFramesParallel = async () => {
      const BATCH_SIZE = 25;
      for (let i = 0; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        const batchPromises = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_FRAMES); j++) {
          batchPromises.push(loadSingleFrame(j));
        }
        await Promise.all(batchPromises);
      }
      imagesRef.current = imageCache;
    };

    loadAllFramesParallel();
  }, [handleScroll]);

  // Attach window scroll & resize listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Canvas drawing & RequestAnimationFrame loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateCanvasDimensions = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Set explicit transform to prevent cumulative scaling bugs on resize
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);

    // Fallback search to find nearest loaded image if targeted frame is still loading
    const getBestAvailableFrame = (requestedIndex) => {
      const cache = imagesRef.current;
      if (!cache || cache.length === 0) return null;

      // Direct match
      if (cache[requestedIndex] && cache[requestedIndex].complete) {
        return cache[requestedIndex];
      }

      // Search backwards for nearest loaded frame
      for (let i = requestedIndex - 1; i >= 0; i--) {
        if (cache[i] && cache[i].complete) {
          return cache[i];
        }
      }

      // Search forwards if no previous frame is available
      for (let i = requestedIndex + 1; i < TOTAL_FRAMES; i++) {
        if (cache[i] && cache[i].complete) {
          return cache[i];
        }
      }

      return null;
    };

    // Draw frame onto canvas using optimal layout math so the full building is visible
    const drawFrame = (frameIdx) => {
      const img = getBestAvailableFrame(frameIdx);
      if (!img) return;

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      const imgAspect = img.width / img.height;
      const canvasAspect = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        // Desktop / Wide Viewports: Fit height 100% so full elevation & roof structure is visible
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgAspect;
        // Position building to the right so text sits on clean backdrop on left
        offsetX = Math.max(0, canvasWidth - drawWidth);
        offsetY = 0;
      } else {
        // Mobile / Tablet: Fit width so full horizontal breadth is visible
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgAspect;
        offsetX = 0;
        offsetY = Math.max(0, (canvasHeight - drawHeight) / 2);
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Smooth LERP render loop
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentRenderedFrameRef.current;

      const diff = target - current;
      if (Math.abs(diff) > 0.01) {
        currentRenderedFrameRef.current = current + diff * 0.35;
      } else {
        currentRenderedFrameRef.current = target;
      }

      const frameToDraw = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentRenderedFrameRef.current))
      );

      drawFrame(frameToDraw);

      // Only trigger React state update when frame index integer changes
      if (lastFrameIndexRef.current !== frameToDraw) {
        lastFrameIndexRef.current = frameToDraw;
        setCurrentFrameIndex(frameToDraw);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isLoaded]);

  // Determine current construction phase text & completion label
  const getPhaseDetails = () => {
    const pct = Math.round((currentFrameIndex / (TOTAL_FRAMES - 1)) * 100);
    if (pct < 25) {
      return {
        stage: '01 — DISCOVER',
        phaseName: 'SITE PREPARATION',
        heading: 'FROM EMPTY SITE',
        subheading: 'Greenwood Estates begins with a vision of harmony between nature and stone.',
        detail: `${pct}% Groundwork & Preservation`
      };
    } else if (pct < 55) {
      return {
        stage: '02 — FOUNDATION',
        phaseName: 'STRUCTURAL ASSEMBLY',
        heading: 'TO PRECISION BUILD',
        subheading: 'Engineered with sustainable concrete, warm timber, and seismic endurance.',
        detail: `${pct}% Structural Framework`
      };
    } else if (pct < 85) {
      return {
        stage: '03 — ARCHITECTURE',
        phaseName: 'CRAFTING ELEVATIONS',
        heading: 'FACADE & GLASS UNVEILING',
        subheading: 'Double-glazed panoramic glass panels integrated into natural foliage.',
        detail: `${pct}% Architectural Finishing`
      };
    } else {
      return {
        stage: '04 — RESIDENCE',
        phaseName: 'COMPLETED HARMONY',
        heading: 'TO COMPLETED RESIDENCE',
        subheading: 'A sanctuary designed for modern family legacy, quiet privacy, and holistic living.',
        detail: `100% Completed Residence`
      };
    }
  };

  const phase = getPhaseDetails();
  const completionPercentage = Math.round((currentFrameIndex / (TOTAL_FRAMES - 1)) * 100);

  return (
    <section
      ref={containerRef}
      className="relative h-[350vh] bg-brand-charcoal text-white"
    >
      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />

        {/* Crisp Editorial Gradient Overlay (Subtle dark left gradient for text readability, clear right side for full building view) */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-transparent to-brand-charcoal/30 pointer-events-none" />

        {/* Initial Loading Screen indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-brand-charcoal z-30 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-brand-bronze/40 border-t-brand-bronze animate-spin mb-6"></div>
            <p className="font-serif text-2xl tracking-widest text-brand-cream uppercase mb-2">
              GREENWOOD ESTATES
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-brand-bronze font-light">
              Preparing Interactive Cinematic Animation ({loadProgress}%)
            </p>
          </div>
        )}

        {/* Overlaid Editorial Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-between py-24 md:py-28 pointer-events-none">
          {/* Top Stage Indicator & Phase Badge */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-bronze animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-bronze-light">
                {phase.stage}
              </span>
              <span className="text-white/30 text-xs">|</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-light text-white/80">
                {phase.phaseName}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase text-white/80 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className="font-mono text-brand-bronze">{completionPercentage}%</span>
              <span>Built</span>
            </div>
          </div>

          {/* Central Hero Editorial Typography */}
          <div className="max-w-xl my-auto space-y-6 pointer-events-auto">
            <div className="space-y-2">
              <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-brand-bronze font-medium">
                {phase.heading}
              </p>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide text-brand-cream leading-[1.08]">
                A Better Tomorrow <br />
                <span className="italic font-normal text-white/95">Begins Here</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base font-light text-white/85 leading-relaxed max-w-lg">
              {phase.subheading}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#residences"
                className="group inline-flex items-center gap-3 bg-brand-bronze text-brand-charcoal hover:bg-white text-xs uppercase tracking-[0.2em] font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-glow-bronze"
              >
                <span>Explore Residences</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#intro"
                className="group inline-flex items-center gap-3 bg-white/10 text-white hover:bg-white/20 border border-white/25 backdrop-blur-md text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 rounded-full transition-all duration-300"
              >
                <span>Discover Community</span>
              </a>
            </div>
          </div>

          {/* Bottom Progress Bar & Scroll Indicator */}
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
            {/* Timeline Progress Bar */}
            <div className="w-full md:max-w-md space-y-2 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/70">
                <span>01 Empty Site</span>
                <span>02 Structure</span>
                <span>03 Facade</span>
                <span>04 Residence</span>
              </div>
              <div className="w-full h-[3px] bg-white/20 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-brand-bronze-dark via-brand-bronze to-white transition-all duration-150"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Scroll Down Prompt */}
            <div className="flex items-center gap-3 text-white/80 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center animate-bounce">
                <ChevronDown className="w-3.5 h-3.5 text-brand-bronze" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
                Scroll To Explore Build
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
