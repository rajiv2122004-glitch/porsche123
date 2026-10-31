import React, { useState } from 'react';
import { Gauge, Compass, Cpu, Sliders, Shield, Zap } from 'lucide-react';
import interiorCockpitImg from '../assets/images/porsche_interior_cockpit_1793441573320.jpg';

export const PerformanceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'performance' | 'design' | 'technology'>('performance');

  const content = {
    performance: {
      tag: 'TRACK SUPREMACY',
      title: 'Engineered Acceleration & Purity',
      subtitle: 'Motorsport-derived physics developed on the Nürburgring Nordschleife.',
      pillars: [
        {
          icon: Gauge,
          title: 'Naturally Aspirated & T-Hybrid Fury',
          desc: 'High-revving Flat-6 engines reaching 9,000 RPM, paired with revolutionary 400V performance hybrid systems delivering instant torque before turbo spool.',
        },
        {
          icon: Zap,
          title: 'Porsche Doppelkupplung (PDK)',
          desc: 'Millisecond gear shifts with zero interruption of tractive force, pre-selecting the next gear mechanically while maintaining relentless acceleration.',
        },
        {
          icon: Sliders,
          title: 'Rear-Axle Steering & PAA',
          desc: 'Porsche Active Aerodynamics adjusting wings and diffuser flaps in fractions of a second, while active rear-axle steering virtually shortens the wheelbase.',
        },
        {
          icon: Compass,
          title: 'Porsche Active Ride (PAR)',
          desc: 'Active hydraulic pump suspension that eliminates pitch and body roll entirely under maximum deceleration and lateral 1.5g cornering loads.',
        },
      ],
      stats: [
        { label: '0-100 km/h', value: '2.2s', detail: 'Taycan Turbo GT' },
        { label: 'Max RPM', value: '9,000', detail: '911 GT3 RS / GT4 RS' },
        { label: 'Peak Downforce', value: '860 kg', detail: 'at 285 km/h' },
        { label: 'Top Speed', value: '315 km/h', detail: '718 Cayman GT4 RS' },
      ],
    },
    design: {
      tag: 'ICONIC SILHOUETTE',
      title: 'Form Follows Function, Perfected',
      subtitle: 'The timeless flyline sculpted over six decades of aerodynamic obsession.',
      pillars: [
        {
          icon: Shield,
          title: 'Unmistakable Porsche Flyline',
          desc: 'The sloping rear roofline introduced in 1963 remains untouched in principle, engineered to slice through air with optimal boundary layer stability.',
        },
        {
          icon: Zap,
          title: 'Functional Active Aerodynamics',
          desc: 'From swan-neck wing pylons to active underbody cooling louvres, every crease and duct channels high-velocity air for cooling and downforce.',
        },
        {
          icon: Sliders,
          title: 'Driver-Centric Cockpit Architecture',
          desc: 'Race-Tex microfiber upholstery, carbon fiber bucket seats, and physical analog tachometer placement prioritizing pure tactile driver engagement.',
        },
        {
          icon: Compass,
          title: 'Four-Point LED Matrix Illumination',
          desc: 'Signature quad-element matrix headlights providing daylight-quality track visibility without blinding oncoming traffic across 600 meters.',
        },
      ],
      stats: [
        { label: 'Drag Coeff (Cd)', value: '0.22', detail: 'Taycan Aerodynamics' },
        { label: 'Weight Saving', value: '-75 kg', detail: 'Weissach Package' },
        { label: 'Carbon Content', value: 'CFRP', detail: 'Roof, Hood, Wings' },
        { label: 'Brake Disc Diam', value: '420 mm', detail: 'Ceramic Composite' },
      ],
    },
    technology: {
      tag: 'INTELLIGENT INNOVATION',
      title: 'Digital Precision Meets Mechanical Soul',
      subtitle: 'State-of-the-art telemetry, 800V fast charging, and driver assistance.',
      pillars: [
        {
          icon: Cpu,
          title: 'Porsche Communication Management (PCM)',
          desc: 'High-resolution curved OLED instrument cluster with customized track displays, tire temperature telemetry, and seamless smartphone mirroring.',
        },
        {
          icon: Zap,
          title: '800-Volt Charging Architecture',
          desc: 'High-power DC fast charging up to 320 kW, replenishing 10% to 80% battery capacity in approximately 18 minutes on compatible hyperchargers.',
        },
        {
          icon: Sliders,
          title: 'Porsche Track Precision App',
          desc: 'Automatic lap timing with sector comparison, video overlay analysis, steering angle telemetry, and lateral g-force vector recording.',
        },
        {
          icon: Shield,
          title: 'Porsche InnoDrive & Night Vision',
          desc: 'Predictive cruise control calculating optimal acceleration and gear shifts up to 3 km in advance, assisted by thermal infrared cameras.',
        },
      ],
      stats: [
        { label: 'Architecture', value: '800V', detail: 'Ultra-fast EV Platform' },
        { label: 'Max Charge Rate', value: '320 kW', detail: '10-80% in 18 min' },
        { label: 'Attack Mode Boost', value: '+120 kW', detail: 'Formula E Derived' },
        { label: 'Display Resolution', value: 'HD OLED', detail: 'Curved Driver Cockpit' },
      ],
    },
  };

  const cur = content[activeTab];

  return (
    <section id="performance" className="py-28 px-6 sm:px-8 bg-[#0b0c10] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#d50000] mb-3">
            ENGINEERING PHILOSOPHY
          </div>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[-0.02em] uppercase leading-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            BUILT FOR THOSE WHO DEMAND MORE.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed">
            Every Porsche is engineered to survive the 24 Hours of Le Mans and thrill on everyday roads. Explore the three pillars of Porsche performance.
          </p>

          {/* Tab Controls */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {(['performance', 'design', 'technology'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-xs font-bold tracking-[0.16em] uppercase transition-all border ${
                  activeTab === tab
                    ? 'bg-white text-black border-white shadow-xl'
                    : 'bg-black/40 text-neutral-400 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Chapter Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Interactive Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#d50000] uppercase block mb-2">
                {cur.tag}
              </span>
              <h3
                className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {cur.title}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-8">
                {cur.subtitle}
              </p>

              {/* 4 Pillars Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cur.pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 bg-[#121319] border border-white/10 hover:border-white/25 transition-all"
                    >
                      <div className="w-8 h-8 rounded bg-black/50 border border-white/10 flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4 text-[#d50000]" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2">{pillar.title}</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick KPI Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {cur.stats.map((stat, idx) => (
                <div key={idx} className="p-3 bg-black/30 border border-white/5">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">{stat.label}</div>
                  <div className="text-xl font-bold text-white mt-0.5 tabular-nums">{stat.value}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Resolution Interior Cockpit Photography */}
          <div className="lg:col-span-5 relative overflow-hidden bg-black border border-white/10 flex flex-col justify-end min-h-[380px] lg:min-h-full">
            <img
              src={interiorCockpitImg}
              alt="Porsche driver cockpit and GT steering wheel"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-black/30 to-transparent" />

            <div className="relative z-10 p-6 sm:p-8">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d50000] block mb-1">
                PORSCHE DRIVER EXPERIENCE
              </span>
              <h4
                className="text-xl font-bold text-white tracking-tight uppercase"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                TACTILE DRIVER PURITY
              </h4>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Physical rotary drive-mode switches, analog rev dials, and micro-fiber Race-Tex tactile surfaces connect the driver directly to the road.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
