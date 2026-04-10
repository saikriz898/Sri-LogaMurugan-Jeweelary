import React from 'react';

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 px-1">
      <label className="text-[10px] font-cinzel tracking-[0.15em] uppercase text-yellow-700/60 font-bold">{label}</label>
      {children}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-1 mb-4">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-yellow-900/30" />
      <span className="text-[11px] font-cinzel tracking-[0.2em] uppercase text-yellow-600/80 font-bold whitespace-nowrap">{label}</span>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-yellow-900/30" />
    </div>
  );
}

interface MobilePriceEditorProps {
  rates: { gold1g: string; gold8g: string; silver1g: string };
  setGoldPrice: (val: string) => void;
  setGold8Price: (val: string) => void;
  setSilverPrice: (val: string) => void;
  date: string;
  setDate: (date: string) => void;
  priceDropNote: string;
  setPriceDropNote: (note: string) => void;
}

export default function MobilePriceEditor({
  rates, setGoldPrice, setGold8Price, setSilverPrice, date, setDate
}: MobilePriceEditorProps) {
  return (
    <div className="flex flex-col gap-6">
      <SectionLabel label="Gold & Silver Rates" />
      
      <div className="grid grid-cols-1 gap-5 px-1">
        <FieldRow label="Date of Rate">
          <input 
            type="text" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="input-gold w-full rounded-xl px-4 py-3.5 text-base font-bold text-yellow-300 shadow-lg shadow-black/20"
            placeholder="e.g. 4 – APRIL – 2026" 
          />
        </FieldRow>

        <div className="grid grid-cols-2 gap-4">
          <FieldRow label="1G 22K GOLD ₹">
            <input 
              type="text" 
              value={rates.gold1g} 
              onChange={(e) => setGoldPrice(e.target.value)}
              className="input-gold w-full rounded-xl px-4 py-3.5 text-base" 
              placeholder="13,620" 
            />
          </FieldRow>
          <FieldRow label="8G 22K GOLD ₹">
            <input 
              type="text" 
              value={rates.gold8g} 
              onChange={(e) => setGold8Price(e.target.value)}
              className="input-gold w-full rounded-xl px-4 py-3.5 text-base" 
              placeholder="108,960" 
            />
          </FieldRow>
        </div>

        <FieldRow label="1G SILVER ₹">
          <input 
            type="text" 
            value={rates.silver1g} 
            onChange={(e) => setSilverPrice(e.target.value)}
            className="input-gold w-full rounded-xl px-4 py-3.5 text-base" 
            placeholder="90" 
          />
        </FieldRow>
      </div>
    </div>
  );
}
