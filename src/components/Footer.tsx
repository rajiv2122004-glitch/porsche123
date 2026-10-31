import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  const legalContent = {
    privacy: {
      title: 'PRIVACY NOTICE',
      body: 'This concept application respects visitor privacy. Any personal information entered into the demonstration test-drive inquiry form is stored locally within browser session memory for verification and user preview purposes. No marketing profiles are built, and no data is shared with third-party advertisers.',
    },
    terms: {
      title: 'TERMS & CONDITIONS',
      body: 'This digital portfolio experience is developed as an interactive architectural demonstration titled "PORSCHE – THE ART OF PERFORMANCE". All trademarks, model names, badges, and designs (including 911, GT3 RS, Carrera, Cayman, Taycan, Panamera, Cayenne, Dakar, and PDK) are intellectual property of Dr. Ing. h.c. F. Porsche AG. All rights reserved.',
    },
    disclaimer: {
      title: 'INDEPENDENT CONCEPT DISCLAIMER',
      body: 'This website is an independent digital concept presentation and automotive design showcase. It is NOT an official website of Dr. Ing. h.c. F. Porsche AG or Porsche India, nor does it represent an authorized automotive dealership or sales outlet. Vehicle specifications, acceleration metrics, downforce calculations, and Indian ex-showroom prices are compiled from verified public manufacturer records for informational demonstration.',
    },
  };

  return (
    <>
      <footer className="bg-[#050608] text-white border-t border-white/10 pt-20 pb-12 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
            {/* Col 1 & 2: Brand Identity */}
            <div className="lg:col-span-2 space-y-4">
              <span
                className="text-2xl sm:text-3xl font-black tracking-[0.25em] text-white uppercase block"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                PORSCHE
              </span>
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 font-semibold">
                THE ART OF PERFORMANCE
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                Where sixty-plus years of motorsport heritage meets cutting-edge aerodynamic engineering, high-revving boxer acoustics, and next-generation electric innovation.
              </p>
              <div className="pt-2 text-[11px] text-neutral-500 font-mono">
                Concept Architecture by Elite Automotive Digital Experience
              </div>
            </div>

            {/* Col 3: Quick Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d50000] mb-4">
                EXPLORE
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li>
                  <a href="#models" className="hover:text-white transition-colors">
                    The 7 Flagship Models
                  </a>
                </li>
                <li>
                  <a href="#india-prices" className="hover:text-white transition-colors">
                    Indian Pricing (₹ INR)
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-white transition-colors">
                    Interactive 3D Studio
                  </a>
                </li>
                <li>
                  <a href="#performance" className="hover:text-white transition-colors">
                    Motorsport Engineering
                  </a>
                </li>
                <li>
                  <a href="#heritage" className="hover:text-white transition-colors">
                    Heritage & 1948 Legacy
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Indian Centres */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d50000] mb-4">
                PORSCHE INDIA CENTRES
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>Bengaluru · Electronic City</li>
                <li>Mumbai · Andheri East</li>
                <li>Delhi NCR · Gurugram</li>
                <li>Chennai · Nandambakkam</li>
                <li>Hyderabad · Jubilee Hills</li>
                <li>Pune · Shivajinagar</li>
                <li>Kochi · Maradu</li>
              </ul>
            </div>

            {/* Col 5: Concierge Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d50000] mb-4">
                CONCIERGE & TEST DRIVE
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Authorized factory test-drive coordination and bespoke Exclusive Manufaktur assistance.
              </p>
              <a
                href="#test-drive"
                className="inline-block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#d50000] hover:bg-[#b00000] transition-colors"
              >
                BOOK TEST DRIVE
              </a>
              <div className="mt-4 text-xs font-mono text-neutral-400">
                Toll Free: 1800 102 9911
              </div>
            </div>
          </div>

          {/* Independent Concept Disclaimer Callout Banner */}
          <div className="py-8 my-6 px-6 bg-black/50 border border-white/10 flex items-start gap-4">
            <Shield className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-400 leading-relaxed">
              <span className="text-white font-semibold">Independent Concept Presentation: </span>
              This website is an independent digital concept study and enthusiast design showcase created for demonstration purposes. It is not affiliated with, endorsed by, or operated by Dr. Ing. h.c. F. Porsche AG or Porsche India. All official purchase inquiries and vehicle allocations must be finalized through official authorized Porsche Centres.
            </div>
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 pt-6 gap-4">
            <div>
              © 2026 PORSCHE – THE ART OF PERFORMANCE. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setLegalModal('disclaimer')}
                className="hover:text-white transition-colors"
              >
                Disclaimer
              </button>
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-white transition-colors"
              >
                Terms of Use
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Information Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#111217] border border-white/20 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {legalContent[legalModal].title}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {legalContent[legalModal].body}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
