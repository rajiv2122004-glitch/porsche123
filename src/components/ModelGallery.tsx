import React, { useState } from 'react';
import { ArrowUpRight, Gauge, Zap, Volume2 } from 'lucide-react';
import { PORSCHE_MODELS } from '../data/porscheModels';
import { PorscheModel } from '../types/porsche';
import { playEngineRev } from '../utils/audio';

interface ModelGalleryProps {
  onSelectModel: (model: PorscheModel) => void;
  onBookModel: (model: PorscheModel) => void;
}

export const ModelGallery: React.FC<ModelGalleryProps> = ({ onSelectModel, onBookModel }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All 7 Models' },
    { id: 'sports-track', label: 'GT & Motorsport' },
    { id: 'coupe', label: '911 Carrera' },
    { id: 'electric', label: 'E-Performance' },
    { id: 'suv', label: 'SUV' },
    { id: 'sedan', label: 'Panamera' },
    { id: 'rally', label: 'Rally & All-Terrain' },
  ];

  const filteredModels = activeCategory === 'all'
    ? PORSCHE_MODELS
    : PORSCHE_MODELS.filter((m) => m.category === activeCategory);

  const handlePlaySound = (e: React.MouseEvent, model: PorscheModel) => {
    e.stopPropagation();
    setPlayingAudioId(model.id);
    playEngineRev(model.soundType);
    setTimeout(() => {
      setPlayingAudioId(null);
    }, 2500);
  };

  return (
    <section id="models" className="py-28 px-6 sm:px-8 bg-[#0b0c10] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#d50000] mb-3">
              THE COLLECTION
            </div>
            <h2
              className="text-3xl sm:text-5xl font-black text-white tracking-[-0.02em] uppercase leading-none"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              ICONIC PORSCHE LINEUP
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-normal leading-relaxed">
            Seven legendary expressions of speed, engineering precision, and German motorsport heritage available through authorized Porsche Centres in India.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-white text-black border-white shadow-lg'
                  : 'bg-black/40 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 7 Models Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="group relative bg-[#121319] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-black/70"
            >
              {/* Card Image Container with Zoom Effect */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                <img
                  src={model.image}
                  alt={model.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121319] via-transparent to-transparent opacity-80" />

                {/* Sound Button */}
                <button
                  onClick={(e) => handlePlaySound(e, model)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/60 text-white transition-all shadow-md group/snd"
                  title="Play powertrain sound"
                  aria-label={`Play ${model.name} engine sound`}
                >
                  <Volume2 className={`w-4 h-4 ${playingAudioId === model.id ? 'text-[#d50000] animate-pulse' : 'text-neutral-300 group-hover/snd:text-white'}`} />
                </button>

                {/* Powertrain Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase bg-black/70 backdrop-blur-md text-neutral-300 border border-white/15">
                    {model.powertrainType}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      {model.vehicleType}
                    </span>
                    <span className="text-sm font-bold text-white tracking-tight">
                      {model.priceInr}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-[#e0e0e0] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {model.name}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 mb-6">
                    {model.tagline}
                  </p>
                </div>

                {/* Performance Key Specs Grid */}
                <div>
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center mb-6 bg-black/20">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-400 flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 text-[#d50000]" /> Power
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5 tabular-nums">
                        {model.powerHp} PS
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-400 flex items-center justify-center gap-1">
                        <Gauge className="w-3 h-3 text-neutral-400" /> 0–100
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5 tabular-nums">
                        {model.acceleration0to100}s
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-400">
                        Top Speed
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5 tabular-nums">
                        {model.topSpeedKmH} km/h
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onSelectModel(model)}
                      className="flex-1 py-2.5 px-4 text-xs font-bold tracking-[0.15em] uppercase text-white bg-transparent border border-white/20 hover:border-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookModel(model);
                      }}
                      className="py-2.5 px-3 text-xs font-bold tracking-[0.15em] uppercase text-white bg-[#d50000] hover:bg-[#b00000] transition-colors"
                      title="Request a test drive for this model"
                    >
                      BOOK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
