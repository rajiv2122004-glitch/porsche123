import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { PorscheModel } from '../types/porsche';
import { PORSCHE_MODELS } from '../data/porscheModels';

interface CompareModalProps {
  initialModel: PorscheModel | null;
  onClose: () => void;
  onBookTestDrive: (model: PorscheModel) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  initialModel,
  onClose,
  onBookTestDrive,
}) => {
  const [selectedModel1Id, setSelectedModel1Id] = useState<string>(
    initialModel ? initialModel.id : PORSCHE_MODELS[0].id
  );
  const [selectedModel2Id, setSelectedModel2Id] = useState<string>(
    initialModel && initialModel.id === PORSCHE_MODELS[3].id
      ? PORSCHE_MODELS[0].id
      : PORSCHE_MODELS[3].id // Taycan Turbo GT
  );

  const model1 = PORSCHE_MODELS.find((m) => m.id === selectedModel1Id) || PORSCHE_MODELS[0];
  const model2 = PORSCHE_MODELS.find((m) => m.id === selectedModel2Id) || PORSCHE_MODELS[1];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#101116] border border-white/20 shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c0d11]">
          <div>
            <h3
              className="text-lg font-bold text-white uppercase tracking-wider"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              PORSCHE COMPARATIVE ANALYSIS
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Side-by-side technical benchmarks and Indian pricing comparison
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close comparison modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comparison Selectors */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/10">
            {/* Model 1 Selector */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                Primary Model
              </label>
              <select
                value={selectedModel1Id}
                onChange={(e) => setSelectedModel1Id(e.target.value)}
                className="w-full bg-[#181920] border border-white/20 text-white text-xs sm:text-sm font-semibold p-2.5 focus:outline-none focus:border-[#d50000]"
              >
                {PORSCHE_MODELS.map((m) => (
                  <option key={m.id} value={m.id} disabled={m.id === selectedModel2Id}>
                    {m.name} ({m.priceInr})
                  </option>
                ))}
              </select>
              <div className="mt-4 aspect-[16/9] overflow-hidden bg-black/40 border border-white/10">
                <img
                  src={model1.image}
                  alt={model1.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Model 2 Selector */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                Comparative Model
              </label>
              <select
                value={selectedModel2Id}
                onChange={(e) => setSelectedModel2Id(e.target.value)}
                className="w-full bg-[#181920] border border-white/20 text-white text-xs sm:text-sm font-semibold p-2.5 focus:outline-none focus:border-[#d50000]"
              >
                {PORSCHE_MODELS.map((m) => (
                  <option key={m.id} value={m.id} disabled={m.id === selectedModel1Id}>
                    {m.name} ({m.priceInr})
                  </option>
                ))}
              </select>
              <div className="mt-4 aspect-[16/9] overflow-hidden bg-black/40 border border-white/10">
                <img
                  src={model2.image}
                  alt={model2.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Metric Comparison Rows */}
          <div className="mt-6 space-y-5">
            {/* Price INR */}
            <div className="p-4 bg-black/20 border border-white/5">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 text-center mb-2">
                Indicative Ex-Showroom Price (INR)
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="text-xl sm:text-2xl font-black text-white tabular-nums">
                  {model1.priceInr}
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tabular-nums">
                  {model2.priceInr}
                </div>
              </div>
            </div>

            {/* Acceleration 0-100 km/h */}
            <div className="p-4 bg-black/20 border border-white/5">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 text-center mb-2">
                Acceleration 0–100 km/h (Lower is faster)
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-white tabular-nums">
                    {model1.acceleration0to100} s
                  </div>
                  <div className="w-full bg-neutral-800 h-2 mt-2">
                    <div
                      className="bg-[#d50000] h-2 transition-all"
                      style={{ width: `${Math.min(100, (4.5 - model1.acceleration0to100) * 35)}%` }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white tabular-nums">
                    {model2.acceleration0to100} s
                  </div>
                  <div className="w-full bg-neutral-800 h-2 mt-2">
                    <div
                      className="bg-[#d50000] h-2 transition-all"
                      style={{ width: `${Math.min(100, (4.5 - model2.acceleration0to100) * 35)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Peak Power */}
            <div className="p-4 bg-black/20 border border-white/5">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 text-center mb-2">
                Maximum Power Output
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-white tabular-nums">{model1.powerHp} PS</div>
                  <div className="text-xs text-neutral-400">{model1.powerKw} kW</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white tabular-nums">{model2.powerHp} PS</div>
                  <div className="text-xs text-neutral-400">{model2.powerKw} kW</div>
                </div>
              </div>
            </div>

            {/* Top Speed */}
            <div className="p-4 bg-black/20 border border-white/5">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 text-center mb-2">
                Maximum Track Speed
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="text-lg font-bold text-white tabular-nums">{model1.topSpeedKmH} km/h</div>
                <div className="text-lg font-bold text-white tabular-nums">{model2.topSpeedKmH} km/h</div>
              </div>
            </div>

            {/* Powertrain Concept */}
            <div className="p-4 bg-black/20 border border-white/5">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 text-center mb-2">
                Engine & Propulsion Architecture
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="text-neutral-300 p-2 bg-black/30 border border-white/5">
                  <span className="font-bold text-white block mb-1">{model1.powertrainType}</span>
                  {model1.engine}
                </div>
                <div className="text-neutral-300 p-2 bg-black/30 border border-white/5">
                  <span className="font-bold text-white block mb-1">{model2.powertrainType}</span>
                  {model2.engine}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-5 border-t border-white/10 bg-[#0c0d11] grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              onClose();
              onBookTestDrive(model1);
            }}
            className="py-3 px-4 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors"
          >
            TEST DRIVE {model1.badge}
          </button>
          <button
            onClick={() => {
              onClose();
              onBookTestDrive(model2);
            }}
            className="py-3 px-4 text-xs font-bold uppercase tracking-wider bg-[#d50000] text-white hover:bg-[#b00000] transition-colors"
          >
            TEST DRIVE {model2.badge}
          </button>
        </div>
      </div>
    </div>
  );
};
