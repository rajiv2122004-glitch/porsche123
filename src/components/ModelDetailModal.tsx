import React, { useState } from 'react';
import { X, Volume2, ShieldCheck, Zap, Gauge, Flame, ArrowRight, Share2, Check } from 'lucide-react';
import { PorscheModel } from '../types/porsche';
import { playEngineRev } from '../utils/audio';

interface ModelDetailModalProps {
  model: PorscheModel | null;
  onClose: () => void;
  onBookTestDrive: (model: PorscheModel) => void;
  onCompare: (model: PorscheModel) => void;
}

export const ModelDetailModal: React.FC<ModelDetailModalProps> = ({
  model,
  onClose,
  onBookTestDrive,
  onCompare,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!model) return null;

  const handlePlaySound = () => {
    setIsPlayingAudio(true);
    playEngineRev(model.soundType);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#111217] border border-white/20 shadow-2xl overflow-hidden my-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d0e12]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-[0.25em] text-[#d50000] uppercase">
              PORSCHE SPECIFICATION SHEET
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-xs text-neutral-400 font-medium">
              Verified India Ex-Showroom
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              title="Share model link"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="max-h-[80vh] overflow-y-auto">
          {/* Hero Image & Primary Overview */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-black overflow-hidden">
            <img
              src={model.image}
              alt={model.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111217] via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#d50000] text-white mb-2">
                  {model.powertrainType}
                </span>
                <h2
                  className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {model.name}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl">
                  {model.tagline}
                </p>
              </div>

              {/* Price & Audio Button */}
              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <div className="text-xs uppercase tracking-wider text-neutral-400">Starting Price India</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
                  {model.priceInr}
                </div>
                <button
                  onClick={handlePlaySound}
                  className="mt-1 flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-black/60 hover:bg-black border border-white/20 text-white rounded-full transition-all"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'text-[#d50000] animate-spin' : 'text-neutral-300'}`} />
                  <span>{isPlayingAudio ? 'REVING...' : 'HEAR ENGINE'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* 4 Essential Benchmarks */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#0d0e12] border border-white/10">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#d50000]" /> Max Power
                </div>
                <div className="text-xl font-bold text-white mt-1 tabular-nums">
                  {model.powerHp} PS <span className="text-xs font-normal text-neutral-400">({model.powerKw} kW)</span>
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-neutral-400" /> Acceleration 0-100
                </div>
                <div className="text-xl font-bold text-white mt-1 tabular-nums">
                  {model.acceleration0to100} seconds
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-neutral-400" /> Top Track Speed
                </div>
                <div className="text-xl font-bold text-white mt-1 tabular-nums">
                  {model.topSpeedKmH} km/h
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                  Peak Torque
                </div>
                <div className="text-xl font-bold text-white mt-1 tabular-nums">
                  {model.torqueNm} Nm
                </div>
              </div>
            </div>

            {/* Powertrain & Transmission Detailed Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-black/30 border border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d50000] mb-3">
                  POWERTRAIN & PERFORMANCE
                </h4>
                <dl className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <dt className="text-neutral-400">Engine Concept</dt>
                    <dd className="font-medium text-white text-right max-w-xs">{model.engine}</dd>
                  </div>
                  {model.displacement && (
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <dt className="text-neutral-400">Displacement</dt>
                      <dd className="font-medium text-white">{model.displacement}</dd>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <dt className="text-neutral-400">Transmission</dt>
                    <dd className="font-medium text-white text-right max-w-xs">{model.transmission}</dd>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <dt className="text-neutral-400">Efficiency / Range</dt>
                    <dd className="font-medium text-white text-right">{model.fuelEconomyOrRange}</dd>
                  </div>
                </dl>
              </div>

              {/* Dimensions & Weight */}
              <div className="p-5 bg-black/30 border border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d50000] mb-3">
                  DIMENSIONS & WEIGHT
                </h4>
                <dl className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <dt className="text-neutral-400">Length</dt>
                    <dd className="font-medium text-white">{model.dimensions.length}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <dt className="text-neutral-400">Width</dt>
                    <dd className="font-medium text-white">{model.dimensions.width}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <dt className="text-neutral-400">Height</dt>
                    <dd className="font-medium text-white">{model.dimensions.height}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <dt className="text-neutral-400">Wheelbase</dt>
                    <dd className="font-medium text-white">{model.dimensions.wheelbase}</dd>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <dt className="text-neutral-400">Unladen Weight (DIN)</dt>
                    <dd className="font-medium text-white">{model.dimensions.unladenWeight}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Engineering Highlights */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-3">
                KEY ENGINEERING HIGHLIGHTS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {model.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-black/20 border border-white/5 text-xs text-neutral-300 flex items-start gap-3"
                  >
                    <span className="text-[#d50000] font-bold">0{idx + 1}.</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* India Official Price Disclaimer */}
            <div className="p-4 bg-[#1a1313] border border-[#d50000]/30 text-xs text-neutral-300 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#d50000] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Official Indian Market Note: </span>
                <span>{model.statusNote || 'Ex-showroom price is indicative and excludes road tax, insurance, registration charges, and customer-specified options.'} </span>
                <span className="text-neutral-400 mt-1 block">{model.officialLinkNotice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-5 border-t border-white/10 bg-[#0d0e12] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400 text-center sm:text-left">
            Ready to experience the {model.badge}?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onCompare(model)}
              className="flex-1 sm:flex-none py-3 px-5 text-xs font-bold tracking-wider uppercase text-neutral-300 bg-transparent border border-white/20 hover:border-white hover:text-white transition-colors"
            >
              COMPARE MODEL
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTestDrive(model);
              }}
              className="flex-1 sm:flex-none py-3 px-6 text-xs font-bold tracking-[0.16em] uppercase text-white bg-[#d50000] hover:bg-[#b00000] transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <span>REQUEST TEST DRIVE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
