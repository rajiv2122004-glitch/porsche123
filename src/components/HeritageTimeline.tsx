import React, { useState } from 'react';
import { Trophy, Calendar } from 'lucide-react';
import { HERITAGE_TIMELINE } from '../data/porscheModels';
import heritageClassicImg from '../assets/images/porsche_heritage_classic_1793441590161.jpg';

export const HeritageTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  return (
    <section id="heritage" className="py-28 px-6 sm:px-8 bg-[#07080a] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#d50000] mb-3">
              SINCE 1948
            </div>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[-0.02em] uppercase leading-none"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              MORE THAN A CAR. A LEGACY.
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-normal leading-relaxed">
            From the hand-hammered aluminum 356 Roadster in Gmünd to 19 outright Le Mans victories and the electric revolution, explore the milestones that forged Porsche.
          </p>
        </div>

        {/* Feature Hero Card with 1948 356 Archival Photograph */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-black border border-white/15 overflow-hidden mb-16 shadow-2xl">
          <img
            src={heritageClassicImg}
            alt="1948 Porsche 356 No. 1 Roadster in historic Gmünd setting"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter grayscale-[30%] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-black/40 to-transparent" />

          {/* Text Overlay on Archival Image */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#d50000] uppercase block mb-1">
              THE GENESIS OF PORSCHE · JUNE 8, 1948
            </span>
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              356 "NO. 1" ROADSTER
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 italic leading-relaxed">
              "In the beginning, I looked around and could not find quite the car I dreamed of. So I decided to build it myself."
              <span className="block not-italic text-neutral-400 mt-1 font-semibold text-xs">
                — Ferry Porsche, Founder
              </span>
            </p>
          </div>
        </div>

        {/* Interactive Timeline Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {HERITAGE_TIMELINE.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMilestone(idx)}
              className={`p-4 text-left transition-all border ${
                selectedMilestone === idx
                  ? 'bg-[#15161d] border-white/40 shadow-lg'
                  : 'bg-black/40 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-xs font-mono text-[#d50000] font-bold">{item.year}</div>
              <div className="text-xs font-bold text-white mt-1 line-clamp-1">{item.title}</div>
              <div className="text-[10px] text-neutral-400 mt-0.5">{item.stat}</div>
            </button>
          ))}
        </div>

        {/* Selected Milestone Deep-Dive Card */}
        <div className="p-8 sm:p-10 bg-[#101116] border border-white/10 relative">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d50000] uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>YEAR {HERITAGE_TIMELINE[selectedMilestone].year}</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {HERITAGE_TIMELINE[selectedMilestone].title}
              </h3>
              <h4 className="text-sm font-semibold text-neutral-300 mb-4">
                {HERITAGE_TIMELINE[selectedMilestone].subtitle}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {HERITAGE_TIMELINE[selectedMilestone].description}
              </p>
            </div>

            {/* Motorsport Trophy Badge */}
            <div className="p-6 bg-black/40 border border-white/10 text-center shrink-0 min-w-[200px]">
              <Trophy className="w-8 h-8 text-[#d50000] mx-auto mb-2" />
              <div className="text-lg font-bold text-white tracking-tight">
                {HERITAGE_TIMELINE[selectedMilestone].stat}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 uppercase tracking-wider">
                Historic Porsche Landmark
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
