"use client";

import React, { forwardRef } from 'react';

const CINZEL_STACK = "'Cinzel', serif";
const PLAYFAIR_STACK = "'Playfair Display', serif";
const TAMIL_STACK = "'Noto Serif Tamil', serif";

const rateColumns = [
  { tamil: 'வெள்ளி (1G)', sub: '1G SILVER', key: 'silver1g' },
  { tamil: '22K தங்கம் (1G)', sub: '1G GOLD', key: 'gold1g' },
  { tamil: '22K தங்கம் (8G)', sub: '8G GOLD', key: 'gold8g' },
];

interface PosterCanvasProps {
  rates: { gold1g: string; gold8g: string; silver1g: string; };
  imageUrl?: string;
  date?: string;
  isExporting?: boolean;
}

const PosterCanvas = forwardRef<HTMLDivElement, PosterCanvasProps>(function PosterCanvas({ rates, imageUrl, date, isExporting }, ref) {
  const displayDate = date || (() => {
    const d = new Date();
    return `${d.getDate()} - ${d.toLocaleString('en-US', { month: 'long' }).toUpperCase()} - ${d.getFullYear()}`;
  })();

  const logoImg = "/Main-logo.png";

  return (
    <div
      ref={ref}
      id="poster-canvas-area"
      className={`relative overflow-hidden bg-[#050402] text-[#f5e6c8] transition-all duration-700 ${isExporting ? 'rounded-none' : 'rounded-2xl shadow-2xl'}`}
      style={{ fontFamily: PLAYFAIR_STACK, zIndex: 1, height: '85vh', width: 'calc(85vh * 9 / 16)', aspectRatio: '9/16' }}
    >
      {/* 🖼️ BACKGROUND IMAGE CANVAS - REFRAMED FOR FOCUS */}
      <div className="absolute top-0 left-0 right-0 h-[72%] z-0 overflow-hidden">
        {imageUrl ? (
          <img
            key={imageUrl}
            src={imageUrl}
            className="w-full h-full object-cover object-top animate-in fade-in scale-in-95 duration-1000"
            alt="Jewellery"
            loading="eager"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget;
              img.src = '/Main-logo.png';
              img.className = 'w-full h-full object-cover opacity-50';
            }}
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_40%,_#1c1408_0%,_#050402_100%)] flex items-center justify-center">
            <span className="text-[1vh] font-black uppercase tracking-[0.5em] text-[#b8860b]/30">Studio Standby</span>
          </div>
        )}
        {/* Soft edge transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050402] pointer-events-none" />
      </div>

      {/* 🏷️ TOP BRAND HEADER: Mark + Logo stacked */}
      <header className="absolute top-[2vh] left-0 right-0 flex flex-col items-center z-20 gap-[0.8vh] animate-in slide-in-from-top-8 duration-1000">
        <img
          src="/Logo_Top.png"
          className="w-[12%] h-auto object-contain drop-shadow-[0_0_18px_rgba(184,134,11,0.55)]"
          alt="Murugan Mark"
        />
        <img
          src={logoImg}
          className="w-[46%] h-auto object-contain drop-shadow-[0_0_32px_rgba(184,134,11,0.36)]"
          alt="Sri Lokamurugan"
        />
      </header>

      {/* 📊 UNIFIED DATA CONSOLE: Date + Rates in Same Box */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="w-full bg-black/70 backdrop-blur-3xl border-t border-white/10 overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">

          {/* Top Row: The Date (Primary focus) */}
          <div className="px-6 py-4 bg-white/5 border-b border-white/5 text-center">
            <p className="text-[1.4vh] font-black text-[#FBD71E] uppercase tracking-[0.3em]" style={{ fontFamily: CINZEL_STACK }}>
              {displayDate}
            </p>
          </div>

          {/* Matrix Divider */}
          <div className="flex items-center justify-center gap-3 py-4 opacity-40">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b8860b]" />
            <span className="text-[0.7vh] font-black tracking-[0.4em] text-[#b8860b] uppercase">Daily Matrix</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b8860b]" />
          </div>

          {/* Bottom Row: The Rates Matrix */}
          <div className="flex justify-between items-stretch px-6 pb-6">
            {rateColumns.map((col, idx) => (
              <React.Fragment key={col.key}>
                <div className="flex-1 flex flex-col items-center">
                  <div className="text-[0.9vh] font-bold text-white/50 mb-1.5" style={{ fontFamily: TAMIL_STACK }}>{col.tamil}</div>
                  <div className="flex items-baseline gap-1 drop-shadow-halo text-white">
                    <span className="text-[0.9vh] font-black text-[#FBD71E] opacity-50">₹</span>
                    <span className="text-[2.2vh] font-black tracking-tighter" style={{ fontFamily: CINZEL_STACK }}>
                      {rates[col.key as keyof typeof rates]
                        ? Number(rates[col.key as keyof typeof rates]).toLocaleString('en-IN')
                        : '--,---'}
                    </span>
                  </div>
                </div>
                {idx < rateColumns.length - 1 && (
                  <div className="w-px h-8 bg-white/10 self-center mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ELEGANT SEPARATOR LINE */}
        <div className="flex justify-center mt-2 mb-1">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#b8860b]/40 to-transparent" />
        </div>

        {/* FOOTER */}
        <footer className="px-5 flex justify-between items-center bg-black/30 py-2.5 border-t border-white/5">
          <div className="flex flex-col gap-0.5">
            <p className="text-[1vh] font-bold text-[#FBD71E] drop-shadow-md leading-snug" style={{ fontFamily: TAMIL_STACK }}>156, S.S. கோயில் வீதி, சுப்பிரமணியசுவாமி</p>
            <p className="text-[1vh] font-bold text-[#FBD71E] drop-shadow-md leading-snug" style={{ fontFamily: TAMIL_STACK }}>கோவில் அருகில், பொள்ளாச்சி.</p>
            <span className="text-[0.65vh] uppercase text-white/50 tracking-[0.2em] font-black mt-0.5">Quality Assured • Est. 1994</span>
          </div>
          <div className="h-10 w-px bg-white/10 mx-2" />
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[0.65vh] uppercase text-white/50 tracking-[0.2em] font-black">Cell</span>
            <span className="text-[1.2vh] font-black tracking-widest text-[#FBD71E] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">+91 90804 86081</span>
            <span className="text-[1.2vh] font-black tracking-widest text-[#FBD71E] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">+91 99657 30815</span>
          </div>
        </footer>
      </div>
    </div>
  );
});

export default PosterCanvas;
