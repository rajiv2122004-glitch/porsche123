import React from 'react';
import { Shield, Info, ArrowUpRight, ArrowLeftRight } from 'lucide-react';
import { PORSCHE_MODELS, INDIAN_PORSCHE_CENTRES } from '../data/porscheModels';
import { PorscheModel } from '../types/porsche';

interface IndiaPricingProps {
  onSelectModel: (model: PorscheModel) => void;
  onBookModel: (model: PorscheModel) => void;
  onCompare: (model: PorscheModel) => void;
}

export const IndiaPricing: React.FC<IndiaPricingProps> = ({
  onSelectModel,
  onBookModel,
  onCompare,
}) => {
  return (
    <section id="india-prices" className="py-28 px-6 sm:px-8 bg-[#090a0d] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#d50000] mb-3">
              OFFICIAL INDIAN EX-SHOWROOM INDICATIVE PRICING
            </div>
            <h2
              className="text-3xl sm:text-5xl font-black text-white tracking-[-0.02em] uppercase leading-none"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              THE PORSCHE COLLECTION – INDIA
            </h2>
          </div>

          <div className="text-xs text-neutral-400 bg-white/5 border border-white/10 px-4 py-2.5 flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span>Last verified with Porsche India records: <strong>October 2026</strong></span>
          </div>
        </div>

        {/* Pricing Table Card Container */}
        <div className="bg-[#121319] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/15 bg-black/40 text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                  <th className="py-4 px-6">MODEL</th>
                  <th className="py-4 px-6">STARTING PRICE</th>
                  <th className="py-4 px-6">VEHICLE TYPE</th>
                  <th className="py-4 px-6">POWERTRAIN</th>
                  <th className="py-4 px-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                {PORSCHE_MODELS.map((model) => (
                  <tr
                    key={model.id}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    {/* Model Cell */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-10 overflow-hidden bg-black/50 shrink-0 border border-white/10">
                          <img
                            src={model.image}
                            alt={model.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-[#e0e0e0] transition-colors">
                            {model.name}
                          </div>
                          <div className="text-[11px] text-neutral-400 mt-0.5">
                            {model.isAvailableInIndia ? 'Available to configure' : 'Allocation status: Limited'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price Cell */}
                    <td className="py-5 px-6">
                      {model.isAvailableInIndia ? (
                        <div>
                          <span className="font-extrabold text-white text-base tabular-nums">
                            {model.priceInr}
                          </span>
                          <span className="text-[11px] text-neutral-400 block mt-0.5">
                            {model.isEstimate ? 'Estimated Ex-Showroom' : 'Official Base Ex-Showroom'}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-amber-400 text-xs uppercase tracking-wide">
                            Contact Porsche India for availability
                          </span>
                          <span className="text-[11px] text-neutral-400 block mt-0.5">
                            Collector Edition (2,500 units globally)
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Vehicle Type */}
                    <td className="py-5 px-6 text-neutral-300">
                      <span>{model.vehicleType}</span>
                    </td>

                    {/* Powertrain */}
                    <td className="py-5 px-6">
                      <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase bg-black/50 border border-white/10 text-neutral-300">
                        {model.powertrainType}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => onCompare(model)}
                          className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                          title="Compare with another model"
                        >
                          <ArrowLeftRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelectModel(model)}
                          className="px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-neutral-200 border border-white/20 hover:border-white hover:text-white transition-all flex items-center gap-1"
                        >
                          <span>DETAILS</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onBookModel(model)}
                          className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-white bg-[#d50000] hover:bg-[#b00000] transition-colors"
                        >
                          BOOK
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mandatory Disclaimer Box */}
          <div className="p-6 bg-black/60 border-t border-white/10 flex items-start gap-4">
            <Info className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-400 leading-relaxed">
              <span className="text-white font-semibold">Important Pricing Disclaimer: </span>
              "Prices shown are indicative ex-showroom prices in India and may vary depending on model variant, optional equipment, location, taxes and availability. Confirm the final quotation with an authorised Porsche Centre."
            </div>
          </div>
        </div>

        {/* Authorized Porsche Centres across India Strip */}
        <div className="mt-12 p-8 bg-[#101116] border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-white/10 gap-4">
            <div>
              <h3
                className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Shield className="w-4 h-4 text-[#d50000]" />
                AUTHORIZED PORSCHE CENTRES IN INDIA
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Official sales, bespoke Exclusive Manufaktur consultations, and factory certified servicing
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              India Toll-Free: 1800 102 9911
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {INDIAN_PORSCHE_CENTRES.filter(c => c.city !== 'Other').map((centre) => (
              <div
                key={centre.city}
                className="p-3 bg-black/30 border border-white/5 hover:border-white/20 transition-all text-left"
              >
                <div className="text-xs font-bold text-white uppercase tracking-wider">{centre.city}</div>
                <div className="text-[11px] text-neutral-400 mt-1 truncate">{centre.name}</div>
                <div className="text-[11px] text-[#d50000] font-mono mt-1">{centre.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
