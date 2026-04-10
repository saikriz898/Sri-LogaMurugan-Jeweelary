"use client";

import { useRef } from "react";
import {
  Upload, Sparkles, Download, MessageSquare,
  RefreshCw, Loader2, Calendar, CheckCircle2
} from "lucide-react";

interface PriceEditorProps {
  rates: { gold1g: string; gold8g: string; silver1g: string };
  setGoldPrice: (val: string) => void;
  setGold8Price: (val: string) => void;
  setSilverPrice: (val: string) => void;
  date: string;
  setDate: (val: string) => void;
  priceDropNote: string;
  setPriceDropNote: (val: string) => void;
  activeMetal: 'gold' | 'silver';
  setActiveMetal: (val: 'gold' | 'silver') => void;
  storedImages: string[];
  currentIndex: number;
  totalImages: number;
  isGenerating: boolean;
  isUploading: boolean;
  isSyncing: boolean;
  isDownloading: boolean;
  isSharing: boolean;
  isConnected: boolean;
  isLoadingImages: boolean;
  imageError: string | null;
  notification: { message: string; type: 'success' | 'error' | 'warning' } | null;
  // Pagination
  currentPage: number;
  totalPages: number;
  imagesPerPage: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  // Upload progress
  uploadProgress: { completed: number; total: number; message: string } | null;
  onGenerate: () => void;
  onExport: () => void;
  onShare: () => void;
  onSyncDB: () => void;
  onRefreshData: () => void;
  onSelectImage: (index: number) => void;
  onDeleteImage: (src: string) => void;
  onUploadFiles: (files: FileList) => void;
}

export default function PriceEditor({
  rates, setGoldPrice, setGold8Price, setSilverPrice,
  date, setDate,
  activeMetal, setActiveMetal,
  storedImages, currentIndex, totalImages,
  isGenerating, isUploading, isSyncing, isDownloading, isSharing, isConnected,
  isLoadingImages, imageError,
  notification,
  currentPage, totalPages, imagesPerPage, goToPage, nextPage, prevPage,
  uploadProgress,
  onGenerate, onExport, onShare, onSyncDB, onRefreshData,
  onSelectImage, onDeleteImage, onUploadFiles,
}: PriceEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const safeIndex = currentIndex >= 0 ? currentIndex % totalImages : -1;
  const cycleLabel = totalImages === 0
    ? 'No Images'
    : safeIndex === -1
    ? `0 / ${totalImages}`
    : `${safeIndex + 1} / ${totalImages}`;

  return (
    <>
      {/* Toast */}
      {notification && (
        <div className="fixed top-24 right-8 z-[200] animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="px-8 py-5 rounded-[22px] flex items-center gap-5 bg-black/80 backdrop-blur-3xl border border-white/5 shadow-[0_30px_70px_-15px_rgba(0,0,0,1)] relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 h-[2px] bg-[#b8860b]/40 w-full animate-progress" />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center relative ${
              notification.type === 'error' ? 'bg-red-500/10 text-red-400' :
              notification.type === 'warning' ? 'bg-amber-400/10 text-amber-300' :
              'bg-[#b8860b]/10 text-[#b8860b]'
            }`}>
              {notification.type === 'success' ? <CheckCircle2 size={18} /> : <RefreshCw size={18} />}
              <div className={`absolute inset-0 blur-lg opacity-40 rounded-full ${
                notification.type === 'error' ? 'bg-red-500' :
                notification.type === 'warning' ? 'bg-amber-400' :
                'bg-[#b8860b]'
              }`} />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-black uppercase tracking-[0.25em] text-white">{notification.message}</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/30">System Notification</span>
            </div>
          </div>
        </div>
      )}


      <aside className="w-[440px] h-screen flex flex-col bg-[#050402] border-r border-[#1a150f] relative overflow-hidden shadow-[10px_0_40px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#b8860b]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#b8860b]/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="px-8 pt-10 pb-4 flex flex-col gap-6 relative z-10">
          <div className="flex items-center justify-between">
            <img src="/Main-logo.png" alt="Sri Lokamurugan" className="w-36 h-auto drop-shadow-[0_0_15px_rgba(184,134,11,0.2)]" />
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5 shadow-inner">
              <button
                onClick={() => setActiveMetal('gold')}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${activeMetal === 'gold' ? 'bg-[#b8860b] text-black shadow-[0_0_15px_rgba(184,134,11,0.3)]' : 'text-white/30 hover:text-white/60'}`}
              >Gold</button>
              <button
                onClick={() => setActiveMetal('silver')}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${activeMetal === 'silver' ? 'bg-white/60 text-black' : 'text-white/30 hover:text-white/60'}`}
              >Silver</button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-40 space-y-10 custom-scrollbar relative z-10 scroll-smooth pt-8">

          {/* Rates */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b]" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Today&apos;s Ledger</h2>
              </div>
              <span className="text-[8px] font-bold text-[#b8860b]/40 uppercase tracking-widest">Live Rates</span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-[24px] p-6 space-y-6 backdrop-blur-md shadow-inner">
              <div className="space-y-2 group">
                <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 group-focus-within:text-[#b8860b] transition-colors pl-1">Posting Schedule</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10" size={14} />
                  <input
                    type="text" value={date} onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/5 px-11 py-3 text-white text-xs rounded-xl focus:outline-none focus:border-[#b8860b]/30 focus:bg-white/[0.04] transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 group-focus-within:text-[#b8860b] pl-1">Gold 1G</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b8860b] font-bold text-[10px]">₹</span>
                    <input
                      type="number" value={rates.gold1g} onChange={(e) => setGoldPrice(e.target.value)} placeholder="00"
                      className="w-full bg-white/[0.02] border border-white/5 pl-8 pr-4 py-3 text-white font-mono text-sm rounded-xl focus:outline-none focus:border-[#b8860b]/30 focus:bg-white/[0.04] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 group-focus-within:text-[#b8860b] pl-1">Gold 8G</label>
                  <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b8860b] font-bold text-[10px]">₹</span>
                  <input
                    type="text"
                    value={rates.gold8g}
                    onChange={(e) => setGold8Price(e.target.value)}
                    placeholder="00"
                    className="w-full bg-white/[0.02] border border-white/5 pl-8 pr-4 py-3 text-white font-mono text-sm rounded-xl focus:outline-none focus:border-[#b8860b]/30 focus:bg-white/[0.04] transition-all"
                  />
                </div>
                </div>
              </div>
              <div className="space-y-2 group">
                <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 group-focus-within:text-[#b8860b] pl-1">Silver Rate 1G</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b8860b] font-bold text-[10px]">₹</span>
                  <input
                    type="number" value={rates.silver1g} onChange={(e) => setSilverPrice(e.target.value)} placeholder="00"
                    className="w-full bg-white/[0.02] border border-white/5 pl-8 pr-4 py-3 text-white font-mono text-sm rounded-xl focus:outline-none focus:border-[#b8860b]/30 focus:bg-white/[0.04] transition-all"
                  />
                </div>
              </div>
            </div>
          </section>



          {/* Upload */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b]" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Upload Piece</h2>
            </div>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files?.length) onUploadFiles(e.dataTransfer.files); }}
              className="group relative h-32 bg-[#b8860b]/5 border border-dashed border-[#b8860b]/20 rounded-[28px] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#b8860b]/10 hover:border-[#b8860b]/40 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#b8860b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-10 h-10 rounded-full bg-[#b8860b]/20 flex items-center justify-center text-[#b8860b] group-hover:scale-110 transition-transform">
                {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#b8860b]/80">
                {isUploading ? 'Uploading...' : 'Drop Masterpiece or Click'}
              </span>
              <input
                type="file" multiple className="hidden" ref={fileInputRef} accept="image/*"
                onChange={(e) => { if (e.target.files?.length) onUploadFiles(e.target.files); }}
              />
            </div>
          </section>

          {/* Upload Progress */}
          {uploadProgress && (
            <section className="space-y-3">
              <div className="flex items-center gap-3 px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Upload Progress</h2>
              </div>
              <div className="bg-black/20 border border-green-500/20 rounded-[20px] p-4 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">
                    {uploadProgress.completed}/{uploadProgress.total} Images
                  </span>
                  <span className="text-[8px] text-green-300/60">
                    {uploadProgress.total > 0 ? Math.round((uploadProgress.completed / uploadProgress.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-green-500/10 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress.total > 0 ? (uploadProgress.completed / uploadProgress.total) * 100 : 0}%` }}
                  />
                </div>
                <p className="text-[9px] text-green-300/80 font-medium">{uploadProgress.message}</p>
              </div>
            </section>
          )}

          {/* Asset Library */}
          <section className="space-y-6">
            <div className="flex flex-col gap-3 px-2">
              {/* Row 1: Label */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b]" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Asset Sequence</h2>
              </div>
              {/* Row 2: Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onRefreshData}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 rounded-full transition-all"
                >
                  <RefreshCw size={9} className="text-blue-400 shrink-0" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-blue-400">Refresh</span>
                </button>
                <button
                  onClick={onSyncDB} disabled={isSyncing}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#b8860b]/5 hover:bg-[#b8860b]/10 border border-[#b8860b]/10 rounded-full transition-all disabled:opacity-40"
                >
                  <RefreshCw size={9} className={`${isSyncing ? 'animate-spin' : ''} text-[#b8860b] shrink-0`} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#b8860b]">Sync DB</span>
                </button>
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1.5 bg-[#b8860b]/5 rounded-full border border-[#b8860b]/10">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${currentIndex === -1 ? 'bg-white/20' : 'bg-[#b8860b] animate-pulse'}`} />
                  <span className="text-[8px] font-bold text-[#b8860b]/80 uppercase tracking-widest">{cycleLabel}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {isLoadingImages ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="aspect-[4/5] rounded-[20px] overflow-hidden bg-white/5 border border-white/10 animate-pulse" />
                ))
              ) : imageError ? (
                <div className="col-span-2 rounded-[24px] border border-red-500/20 bg-red-500/10 p-6 text-center text-sm text-red-200">
                  {imageError}
                </div>
              ) : storedImages.length === 0 ? (
                <div className="col-span-2 rounded-[24px] border border-white/10 bg-white/5 p-6 text-center text-sm text-white/70">
                  No artwork is available. Upload photos or sync the gallery to start.
                </div>
              ) : (
                storedImages.map((src, idx) => {
                  const isActive = totalImages > 0 && safeIndex === idx;
                  return (
                    <div
                      key={`${src}-${idx}`}
                      onClick={() => onSelectImage(idx)}
                      className={`aspect-[4/5] rounded-[20px] overflow-hidden bg-white/5 border transition-all duration-500 relative group cursor-pointer ${isActive ? 'border-[#b8860b] ring-2 ring-[#b8860b]/20 scale-95' : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'}`}
                    >
                      <img
                        src={src}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        alt="product"
                        onError={(e) => {
                          const img = e.currentTarget;
                          img.src = '/Main-logo.png';
                          img.className = 'w-full h-full object-cover opacity-50';
                        }}
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                        <span className="text-[8px] font-black text-[#b8860b]">#{idx + 1}</span>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button
                          onClick={(e) => { e.stopPropagation(); onDeleteImage(src); }}
                          className="p-1.5 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all backdrop-blur-md cursor-pointer"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        </button>
                      </div>
                      {isActive && (
                        <div className="absolute inset-x-0 bottom-0 py-2 bg-[#b8860b]/90 text-center">
                          <span className="text-[7px] font-black uppercase tracking-[0.2em] text-black">Active in Studio</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-[#b8860b]/5 hover:bg-[#b8860b]/10 border border-[#b8860b]/10 rounded-lg text-[8px] font-bold text-[#b8860b] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    if (pageNum > totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-2 py-1 rounded text-[8px] font-bold transition-all ${
                          pageNum === currentPage
                            ? 'bg-[#b8860b] text-black'
                            : 'bg-[#b8860b]/5 hover:bg-[#b8860b]/10 text-[#b8860b]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 bg-[#b8860b]/5 hover:bg-[#b8860b]/10 border border-[#b8860b]/10 rounded-lg text-[8px] font-bold text-[#b8860b] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 w-full px-8 pb-8 pt-4 bg-gradient-to-t from-[#050402] via-[#050402]/90 to-transparent z-30">
          <div className="space-y-3">
            <button
              disabled={isGenerating}
              onClick={onGenerate}
              className="group relative w-full h-14 bg-gradient-to-br from-[#b8860b] via-[#d4af37] to-[#7a5a07] rounded-[18px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all overflow-hidden disabled:opacity-60"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-45deg]" />
              {isGenerating ? <Loader2 className="animate-spin text-black" size={18} /> : <Sparkles className="text-black" size={18} />}
              <span className="text-black font-black uppercase tracking-[0.2em] text-[10px]">
                {isGenerating ? 'Generating...' : 'Generate Masterpiece'}
              </span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onExport} disabled={isDownloading || isGenerating}
                className="h-12 bg-white/5 border border-white/10 text-[#f3e5ab] text-[9px] font-black uppercase tracking-widest rounded-[18px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all disabled:opacity-40"
              >
                {isDownloading ? <Loader2 className="animate-spin text-[#b8860b]" size={14} /> : <Download size={14} className="text-[#b8860b]" />}
                {isDownloading ? 'Saving...' : 'Export'}
              </button>
              <button
                onClick={onShare} disabled={isSharing || isGenerating}
                className="h-12 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-[9px] font-black uppercase tracking-widest rounded-[18px] flex items-center justify-center gap-2 hover:bg-[#25D366]/20 transition-all disabled:opacity-40"
              >
                {isSharing ? <Loader2 className="animate-spin text-[#25D366]" size={14} /> : <MessageSquare size={14} />}
                {isSharing ? 'Sending...' : 'Share'}
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes progress { 0% { width: 100%; } 100% { width: 0%; } }
          .animate-progress { animation: progress 3s linear forwards; }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(184,134,11,0.1); border-radius: 20px; }
          .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(184,134,11,0.25); }
        `}</style>
      </aside>
    </>
  );
}
