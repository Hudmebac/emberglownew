import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { CHARACTERS } from '../constants';
import { Character } from '../types';

function CharacterCard({ char, index }: { char: Character; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      viewport={{ once: true }}
      className={`group flex flex-col gap-8 p-10 eg-glass rounded-[2.5rem] hover:bg-eg-sand/5 transition-all duration-700 border border-border-primary hover:border-eg-amber/20 overflow-hidden ${
        isExpanded ? 'ring-2 ring-eg-amber/30' : ''
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 aspect-square rounded-[1.8rem] overflow-hidden border border-border-primary/20 relative">
          <img 
            src={char.image} 
            alt={char.name}
            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="text-eg-gold/30 text-[10px] font-mono tracking-[0.4em] mb-4 uppercase">Entity_Record: {char.id}</div>
          <h3 className="text-4xl font-bold mb-4 italic group-hover:text-eg-gold transition-colors">{char.name}</h3>
          <div className="inline-block px-3 py-1 bg-eg-amber/10 border border-eg-amber/20 rounded-full text-eg-amber text-xs font-bold uppercase tracking-widest mb-6 w-fit">
            {char.role}
          </div>
          <p className="text-lg text-eg-sand/50 leading-relaxed font-light group-hover:text-eg-sand/70 transition-colors mb-6">
            {char.description}
          </p>

          {char.expandedDetails && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-eg-amber hover:text-eg-gold transition-colors text-sm font-bold uppercase tracking-widest mt-auto group/btn"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={16} />
                  Collapse Details
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  Expanded Details
                </>
              )}
              <div className="h-px flex-grow bg-eg-amber/20 group-hover/btn:bg-eg-gold/40 transition-colors ml-2" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && char.expandedDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="mt-8 pt-8 border-t border-border-primary/20"
          >
            <div className="markdown-body max-w-none">
              <ReactMarkdown>{char.expandedDetails}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Characters() {
  const categories = [
    { id: 'main', name: 'Legendary Guardians' },
    { id: 'cosmic', name: 'Ancient & Cosmic Beings' },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-eg-deep overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[20%] left-[-5%] w-[40%] h-[40%] bg-eg-gold opacity-[0.03] rounded-full blur-[150px]" />
          <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-eg-amber opacity-[0.03] rounded-full blur-[150px]" />
        </div>

        <section className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-7xl md:text-9xl font-bold mb-8 italic tracking-tighter text-eg-sand">
                  Character <span className="text-eg-gold">Compendium</span>
                </h1>
                <p className="text-2xl text-eg-sand/40 max-w-3xl mx-auto font-light leading-relaxed">
                  The architecture of the Emberglow Universe is built upon the souls of the brave, the wise, and the ancient. Discover the entities who define the balance.
                </p>
              </motion.div>
            </div>

            <div className="space-y-48 text-eg-sand">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 mb-20"
                  >
                    <div className="h-0.5 w-12 bg-eg-amber/50" />
                    <h2 className="text-4xl md:text-5xl font-bold italic tracking-tight">{cat.name}</h2>
                    <div className="h-0.5 flex-grow bg-border-primary/5" />
                  </motion.div>

                  <div className="grid grid-cols-1 gap-12 lg:gap-16">
                    {CHARACTERS.filter(char => char.category === cat.id).map((char, index) => (
                      <CharacterCard key={char.id} char={char} index={index} />
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
