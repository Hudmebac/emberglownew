import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { CARTOON_CHAPTERS } from '../constants';
import { Chapter } from '../types';
import { ChevronLeft, ChevronRight, BookOpen, LayoutGrid, Maximize2, X } from 'lucide-react';

export default function CartoonReader() {
  const location = useLocation();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'reader' | 'grid'>('reader');
  const [selectedPanel, setSelectedPanel] = useState<any>(null);

  // Handle initial chapter from navigation state
  useEffect(() => {
    if (location.state?.chapterId) {
      const index = CARTOON_CHAPTERS.findIndex(ch => ch.id === location.state.chapterId);
      if (index !== -1) {
        setActiveChapterIndex(index);
      }
    }
  }, [location.state]);

  const activeChapter = CARTOON_CHAPTERS[activeChapterIndex];
  const allPanels = CARTOON_CHAPTERS.flatMap(ch => 
    (ch.cartoonPanels || []).map(p => ({ ...p, chapterTitle: ch.title, chapterId: ch.id }))
  );

  const nextChapter = () => {
    if (activeChapterIndex < CARTOON_CHAPTERS.length - 1) {
      setActiveChapterIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevChapter = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-eg-charcoal pt-24 pb-12 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-eg-amber mb-2"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-black uppercase tracking-widest text-sm">Concept Cartoon</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter"
          >
            The Saga in <span className="text-eg-amber">Panels</span>
          </motion.h1>
        </div>

        <div className="flex items-center gap-4 bg-black/40 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setViewMode('reader')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              viewMode === 'reader' ? 'bg-eg-amber text-black' : 'text-eg-sand hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="font-bold text-sm uppercase">Reader</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              viewMode === 'grid' ? 'bg-eg-amber text-black' : 'text-eg-sand hover:bg-white/5'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="font-bold text-sm uppercase">Archive</span>
          </button>
        </div>
      </div>

      {/* Reader View */}
      <AnimatePresence mode="wait">
        {viewMode === 'reader' ? (
          <motion.div
            key="reader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-5xl mx-auto"
          >
            {/* Chapter Navigation */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={prevChapter}
                disabled={activeChapterIndex === 0}
                className="group flex items-center gap-3 text-eg-sand disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <div className="w-10 h-10 rounded-full border-2 border-eg-sand/20 flex items-center justify-center group-hover:border-eg-amber group-hover:text-eg-amber transition-all">
                  <ChevronLeft className="w-6 h-6" />
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block text-[10px] uppercase font-black opacity-50">Previous</span>
                  <span className="block font-bold text-sm line-clamp-1">
                    {activeChapterIndex > 0 ? CARTOON_CHAPTERS[activeChapterIndex - 1].title : 'Start'}
                  </span>
                </div>
              </button>

              <div className="text-center px-4">
                <span className="block text-eg-amber font-black italic uppercase text-xs mb-1">
                  Chapter {activeChapter.id}
                </span>
                <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight">
                  {activeChapter.title}
                </h2>
              </div>

              <button
                onClick={nextChapter}
                disabled={activeChapterIndex === CARTOON_CHAPTERS.length - 1}
                className="group flex items-center flex-row-reverse gap-3 text-eg-sand disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <div className="w-10 h-10 rounded-full border-2 border-eg-sand/20 flex items-center justify-center group-hover:border-eg-amber group-hover:text-eg-amber transition-all">
                  <ChevronRight className="w-6 h-6" />
                </div>
                <div className="hidden sm:block text-right">
                  <span className="block text-[10px] uppercase font-black opacity-50">Next</span>
                  <span className="block font-bold text-sm line-clamp-1">
                    {activeChapterIndex < CARTOON_CHAPTERS.length - 1 ? CARTOON_CHAPTERS[activeChapterIndex + 1].title : 'End'}
                  </span>
                </div>
              </button>
            </div>

            {/* Panels Container */}
            <div className="bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] p-8 md:p-12 rounded-[2rem] border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {activeChapter.cartoonPanels?.map((panel, idx) => (
                  <motion.div
                    key={panel.id}
                    initial={{ opacity: 0, rotate: idx % 2 === 0 ? -2 : 2 }}
                    animate={{ opacity: 1, rotate: idx % 2 === 0 ? 1 : -1 }}
                    className="group relative"
                  >
                    <div className="bg-white p-4 pb-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-4 border-black transform transition-transform group-hover:scale-[1.02] group-hover:rotate-0 duration-300">
                      <div className="absolute -top-4 -left-4 z-20 bg-eg-amber border-4 border-black px-4 py-1 font-black transform -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-black text-sm uppercase italic">Panel_{panel.id.toString().padStart(2, '0')}</span>
                      </div>
                      
                      <div 
                        className="aspect-[4/3] relative overflow-hidden border-4 border-black bg-eg-charcoal mb-6 cursor-zoom-in"
                        onClick={() => setSelectedPanel(panel)}
                      >
                        <img 
                          src={panel.image} 
                          alt={panel.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] contrast-[1.1]"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a1a1a/f59e0b?text=Panel+${panel.id}`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <div className="relative bg-[#f5e6d3] border-t-4 border-black -mx-4 -mb-8 px-6 py-6 min-h-[140px] flex flex-col items-center justify-center gap-2">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-4 border-l-4 border-black rotate-45 transform -translate-y-1/2" />
                        <p className="text-black font-black text-center leading-tight tracking-tight uppercase text-sm md:text-lg">
                          {panel.caption}
                        </p>
                        <p className="text-black/60 font-medium text-center italic text-[10px] md:text-xs leading-tight max-w-[90%]">
                          {panel.alt}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chapter Content Hint */}
              <div className="mt-16 p-8 bg-black/40 rounded-3xl border border-white/10 backdrop-blur-sm">
                <p className="text-eg-sand font-light leading-relaxed italic text-center max-w-2xl mx-auto">
                  {activeChapter.content.substring(0, 300)}...
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {allPanels.map((panel: any, idx) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  const chIndex = CARTOON_CHAPTERS.findIndex(c => c.id === panel.chapterId);
                  setActiveChapterIndex(chIndex);
                  setViewMode('reader');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white p-2 pb-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] border-2 border-black transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 duration-200">
                  <div className="aspect-square relative overflow-hidden border-2 border-black mb-3">
                    <img 
                      src={panel.image} 
                      alt={panel.alt}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/200x200/1a1a1a/f59e0b?text=P${panel.id}`;
                      }}
                    />
                  </div>
                  <div className="px-1">
                    <span className="block text-[8px] font-black uppercase text-eg-amber mb-0.5">CH {panel.chapterId}</span>
                    <p className="text-[10px] font-bold text-black uppercase line-clamp-1">{panel.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedPanel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPanel(null)}
                className="absolute -top-12 right-0 text-white hover:text-eg-amber transition-colors flex items-center gap-2 font-black uppercase text-sm"
              >
                <span>Close</span>
                <X className="w-6 h-6" />
              </button>

              <div className="bg-white p-6 md:p-8 shadow-[20px_20px_0px_0px_rgba(239,68,68,0.5)] border-8 border-black">
                <img 
                  src={selectedPanel.image} 
                  alt={selectedPanel.alt}
                  className="w-full h-auto border-4 border-black"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x600/1a1a1a/f59e0b?text=Panel+${selectedPanel.id}`;
                  }}
                />
                <div className="mt-8 bg-black p-6">
                  <p className="text-white font-black text-xl md:text-3xl text-center uppercase leading-tight italic">
                    "{selectedPanel.caption}"
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center text-black/40 font-black uppercase text-[10px] tracking-widest">
                  <span>Concept Art Panel {selectedPanel.id}</span>
                  <span>Emberglow Universe</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
