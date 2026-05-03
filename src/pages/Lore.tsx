import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Map, Sparkles, Feather, ChevronDown } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { LORE } from '../constants';
import { LoreEntry } from '../types';

function LoreCard({ entry, index }: { entry: LoreEntry, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className={`group relative p-10 eg-glass rounded-[2rem] transition-all duration-500 border border-border-primary hover:border-eg-amber/30 overflow-hidden ${isExpanded ? 'bg-eg-sand/10' : 'hover:bg-eg-sand/5'}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-eg-amber/5 blur-3xl group-hover:bg-eg-amber/20 transition-colors" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-eg-gold/40 text-xs font-mono mb-4 tracking-[0.3em] font-bold uppercase">Archive Entry_{entry.id.substring(0, 4)}</div>
        <h3 className="text-3xl font-bold mb-6 group-hover:text-eg-gold transition-colors italic">{entry.title}</h3>
        <p className="text-lg text-eg-sand/60 leading-relaxed font-light mb-6">
          {entry.description}
        </p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-border-primary mt-auto">
                <p className="text-eg-gold/80 italic text-xl leading-relaxed font-light mb-4 text-balance">
                  " {entry.expandedDescription} "
                </p>
                <div className="flex gap-2">
                  <div className="h-1 w-12 bg-eg-gold/50 rounded-full" />
                  <div className="h-1 w-4 bg-eg-gold/20 rounded-full" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 flex items-center gap-2 text-eg-gold text-xs font-bold uppercase tracking-widest hover:text-eg-amber transition-colors w-fit"
        >
          {isExpanded ? 'Seal Archive' : 'Expand Transmission'}
          <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Subtle decorative "glyph" or corner ornament */}
      <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
        <Sparkles className="w-12 h-12 text-eg-gold" />
      </div>
    </motion.div>
  );
}

export default function Lore() {
  const categories = [
    { id: 'origins', name: 'Cosmic Origins', icon: <Sparkles className="w-8 h-8 text-eg-amber" /> },
    { id: 'guardians', name: 'Ancient Guardians', icon: <Feather className="w-8 h-8 text-eg-amber" /> },
    { id: 'realms', name: 'Sacred Realms', icon: <Map className="w-8 h-8 text-eg-amber" /> },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-gradient-to-b from-eg-charcoal via-eg-deep to-eg-deep overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-eg-amber rounded-full blur-[120px] animate-pulse" />
        </div>

        <section className="relative z-10 py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-7xl md:text-9xl font-bold mb-10 italic tracking-tighter text-eg-sand">
                  Sacred <span className="text-eg-gold">Archives</span>
                </h1>
                <p className="text-2xl text-eg-sand/50 max-w-4xl mx-auto leading-relaxed font-light">
                  Decipher the ancient manuscripts of the Emberglow Universe. From the primordial vibration of the First Light to the light-locked echoes of the Understar, every legend is a thread in the eternal tapestry.
                </p>
              </motion.div>
            </div>

            <div className="space-y-40">
              {categories.map((cat, catIndex) => (
                <div key={cat.id} className="relative">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 mb-16 border-b border-border-primary pb-8"
                  >
                    <div className="p-4 bg-eg-sand/5 rounded-2xl backdrop-blur-sm border border-border-primary">
                      {cat.icon}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight italic">{cat.name}</h2>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {LORE.filter(entry => entry.category === cat.id).map((entry, index) => (
                      <LoreCard key={entry.id} entry={entry} index={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
