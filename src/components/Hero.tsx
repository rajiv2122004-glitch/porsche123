import React, { useState } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { playEngineRev } from '../utils/audio';
import heroGt3rsImg from '../assets/images/hero_porsche_gt3rs_1793441551570.jpg';

interface HeroProps {
  onExploreModels: () => void;
  onBookTestDrive: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreModels, onBookTestDrive }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSoundToggle = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const stopSound = playEngineRev('boxer-na');
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 2500);
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070708]">
      {/* Background Cinematic Image with Subtle Ambient Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroGt3rsImg}
          alt="Porsche 911 GT3 RS in cinematic showroom lighting"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-[zoom-slow_24s_ease-in-out_infinite_alternate]"
          style={{
            filter: 'brightness(0.85) contrast(1.15)',
          }}
        />

        {/* Cinematic Vignette & Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/80 pointer-events-none" />
      </div>

      {/* Floating Audio Rev Trigger */}
      <div className="absolute top-24 right-6 sm:right-10 z-20">
        <button
          onClick={handleSoundToggle}
          className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 hover:border-white/50 backdrop-blur-md text-white transition-all text-xs tracking-wider cursor-pointer"
          title="Synthesize 911 GT3 RS 9,000 RPM boxer exhaust sound"
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-4 h-4 text-[#d50000] animate-bounce" />
              <span className="text-[#d50000] font-semibold text-[11px] uppercase tracking-[0.14em]">REV SOUND PLAYING</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-neutral-400 group-hover:text-white" />
              <span className="text-neutral-300 group-hover:text-white text-[11px] uppercase tracking-[0.14em]">START ENGINE</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-20 pb-16">
        {/* Subtle Brand Tagline */}
        <div className="inline-flex items-center gap-3 text-neutral-400 text-xs sm:text-sm tracking-[0.35em] uppercase font-semibold mb-6">
          <span>THE ART OF PERFORMANCE</span>
          <span aria-hidden="true" className="w-1.5 h-1.5 bg-[#d50000] inline-block" />
          <span>MOTORSPORT DNA</span>
        </div>

        {/* Main Heading */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-[-0.03em] uppercase leading-[0.95] mb-6 drop-shadow-2xl"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          ENGINEERED <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
            TO THRILL.
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed mb-10 text-balance drop-shadow-md">
          Experience the extraordinary world of Porsche. Where precision engineering meets timeless design.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={onExploreModels}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-black bg-white hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-xl cursor-pointer"
          >
            EXPLORE MODELS
          </button>
          <button
            onClick={onBookTestDrive}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white bg-[#d50000] hover:bg-[#b00000] active:scale-[0.98] transition-all shadow-xl cursor-pointer"
          >
            BOOK A TEST DRIVE
          </button>
        </div>

        {/* Quick Model Flagship Banner */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-left w-full max-w-3xl">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">Flagship</div>
            <div className="text-sm font-bold text-white tracking-wider mt-0.5">911 GT3 RS</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">Acceleration</div>
            <div className="text-sm font-bold text-white tracking-wider mt-0.5 tabular-nums">0-100 km/h: 3.2s</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">Top Speed</div>
            <div className="text-sm font-bold text-white tracking-wider mt-0.5 tabular-nums">296 km/h</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">Peak Downforce</div>
            <div className="text-sm font-bold text-white tracking-wider mt-0.5 tabular-nums">860 kg @ 285 km/h</div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <a
        href="#models"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
        aria-label="Scroll down to explore Porsche models"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-neutral-400 group-hover:text-white" />
      </a>
    </section>
  );
};
