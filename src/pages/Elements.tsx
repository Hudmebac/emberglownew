import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Droplets, Wind, Mountain, Layers, ChevronRight, Info } from 'lucide-react';
import PageTransition from '../components/PageTransition';

type ElementType = 'fire' | 'water' | 'air' | 'earth' | 'fusion';

interface ElementInfo {
  id: ElementType;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string[];
  lore: string;
  phenomena: { name: string; desc: string }[];
}

const ELEMENTS: Record<ElementType, ElementInfo> = {
  fire: {
    id: 'fire',
    title: 'Fire: The Heart\'s Spark',
    icon: <Flame size={40} />,
    color: 'text-eg-amber',
    lore: 'Fire is the primordial source of the Emberglow-a fundamental principle of change and transformation. In the ancient desert myths, it was Heraclitus who whispered that all things are an interchange for fire. In our world, fire is not merely destruction; it is the "Fire Within" that ignites a timid soul, turning a camel into a legend.',
    description: [
      'Characterized by heat, ambition, and the radiant energy of the First Light.',
      'Symbolizes the transformative power of a hero\'s journey.',
      'Linked to the Sun and the Celestial Reaches, providing warmth and visual knowledge.'
    ],
    phenomena: [
      { name: 'Aurora Sands', desc: 'When starlight hits the dunes at the perfect angle, creating a flickering heat-glow.' },
      { name: 'Emberion Pulse', desc: 'The rhythmic warming of a guardian\'s heart before a transformation.' }
    ]
  },
  water: {
    id: 'water',
    title: 'Water: The Liquid Memory',
    icon: <Droplets size={40} />,
    color: 'text-blue-400',
    lore: 'In the heart of the Oasis of Echoes resides the Liquid Memory. Water in the Emberglow universe is cold, wet, and deeply intuitive. It is the fundamental substance of reflection, where the desert doesn\'t just show your face, but your history and your possible futures.',
    description: [
      'Associated with emotional depth, healing, and the preservation of ancient history.',
      'Considered the "Blood of the Sands" that feeds the hidden Understar.',
      'Essential for the biological rhythm of caravans and desert life.'
    ],
    phenomena: [
      { name: 'Echo Mists', desc: 'Vapors rising from the Oasis that carry whispers of previous guardians.' },
      { name: 'Starlight Wells', desc: 'Deep reservoirs that capture and store the energy of fallen stars.' }
    ]
  },
  air: {
    id: 'air',
    title: 'Air: The Whispering Winds',
    icon: <Wind size={40} />,
    color: 'text-cyan-300',
    lore: 'Air is the medium of sound and the carrier of "The Question." In the Celestial Reaches, the air is hot and wet, a life-sustaining breath linked to the concept of the Psyche. It is the freedom to roam and the intellect to understand the patterns of the stars.',
    description: [
      'The currents that carry the calls of the "Shadow of Tomorrow."',
      'Symbolizes communication between the physical desert and the mythic heavens.',
      'Crucial for the social interactions and songs of the Emberglow Ensemble.'
    ],
    phenomena: [
      { name: 'Celestial Drafts', desc: 'High-altitude currents that allow winged guardians to glide between dimensions.' },
      { name: 'Wind Scribes', desc: 'Patterned dust clouds that briefly form legible symbols of warning.' }
    ]
  },
  earth: {
    id: 'earth',
    title: 'Earth: The Eternal Sands',
    icon: <Mountain size={40} />,
    color: 'text-eg-gold',
    lore: 'The heaviest and most stable of elements, Earth is the foundation of the Desert of Echoes. It represents the material world, heaviness, and the physical stability required to anchor the floating mythic realms. It is the "Mother Dust" from which all physical forms arise.',
    description: [
      'Provides the nourishment and grounding for the Memory Trees.',
      'Linked to the feminine, nurturing aspects of the desert\'s hidden cycle.',
      'Contains the alchemical "Salt" that preserves artifacts and footprints for millennia.'
    ],
    phenomena: [
      { name: 'Singing Dunes', desc: 'Vibrations of the sand that mimic the low frequencies of the Understar.' },
      { name: 'Crystal Veins', desc: 'Geometric paths of hardened light buried beneath the sand.' }
    ]
  },
  fusion: {
    id: 'fusion',
    title: 'The Celestial Convergence',
    icon: <Layers size={40} />,
    color: 'text-white',
    lore: 'When the Four Elements interweave, the "Great Weaving" occurs. This is more than just a mixture; it is the balance that sustains the Emberglow universe. Understanding how fire meets water or air meets earth is the key to mastering the Guardian\'s path.',
    description: [
      'Fire + Water = Steam of Revelation (Transformation & Power).',
      'Earth + Water = Soil of Remembrance (Fertility & Growth).',
      'Air + Water = Clouds of Prophecy (The Water Cycle & Fate).',
      'Fire + Earth = Molten Memory (New land and geological rebirth).'
    ],
    phenomena: [
      { name: 'Prism Haze', desc: 'A rare atmospheric condition where all four elements align to reveal a hidden path.' },
      { name: 'The Balance Point', desc: 'A state of mind where a guardian can access all elemental powers simultaneously.' }
    ]
  }
};

export default function Elements() {
  const [activeElement, setActiveElement] = useState<ElementType>('fire');

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight italic">
              The <span className="text-eg-gold font-normal">Celestial</span> Balance
            </h1>
            <p className="text-xl text-eg-sand/60 max-w-2xl mx-auto font-light leading-relaxed">
              Explore the four fundamental forces that shape the Emberglow universe-where ancient alchemical truths meet the magic of the desert.
            </p>
          </motion.div>

          {/* Navigation Instructions */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="bg-eg-sand/5 border border-border-primary rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="bg-eg-amber/10 p-3 rounded-full text-eg-amber">
              <Info size={24} />
            </div>
            <div className="flex-1 text-sm text-eg-sand/60">
              <p className="font-medium text-eg-sand mb-1">Navigation Instructions:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-eg-amber rounded-full"></span> Fire for energy & transformation</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-blue-400 rounded-full"></span> Water for emotion & intuition</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-cyan-300 rounded-full"></span> Air for freedom & communication</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-eg-gold rounded-full"></span> Earth for stability & grounding</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span> Fusion for the ultimate balance</li>
              </ul>
            </div>
          </motion.div>

          {/* Selector Menu */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-20">
            {(Object.keys(ELEMENTS) as ElementType[]).map((key) => {
              const el = ELEMENTS[key];
              const isActive = activeElement === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveElement(key)}
                  className={`relative p-6 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-4 group ${
                    isActive 
                      ? 'bg-eg-sand/10 border-eg-gold shadow-[0_0_30px_rgba(230,138,69,0.2)]' 
                      : 'bg-eg-sand/5 border-border-primary hover:border-eg-gold/50'
                  }`}
                >
                  <motion.div
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className={`${isActive ? el.color : 'text-eg-sand/40 group-hover:text-eg-sand'}`}
                  >
                    {el.icon}
                  </motion.div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    isActive ? 'text-eg-gold' : 'text-eg-sand/40 group-hover:text-eg-sand'
                  }`}>
                    {key}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="active-element-pill"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-eg-gold rounded-full shadow-[0_0_10px_rgba(230,138,69,0.8)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeElement}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-16 items-start"
            >
              <div className="space-y-8">
                <div>
                  <h2 className={`text-4xl md:text-5xl font-bold mb-6 italic ${ELEMENTS[activeElement].color}`}>
                    {ELEMENTS[activeElement].title}
                  </h2>
                  <p className="text-xl text-eg-sand/80 leading-relaxed font-light">
                    {ELEMENTS[activeElement].lore}
                  </p>
                </div>

                <ul className="space-y-4">
                  {ELEMENTS[activeElement].description.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-eg-sand/60">
                      <ChevronRight size={18} className="mt-1 text-eg-gold flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-8">
                  <a 
                    href={`https://en.wikipedia.org/wiki/${activeElement.charAt(0).toUpperCase() + activeElement.slice(1)}_(classical_element)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-eg-gold hover:text-eg-amber transition-colors text-sm font-bold uppercase tracking-widest"
                  >
                    Legacy Wisdom <ChevronRight size={14} />
                  </a>
                </div>
              </div>

              <div className="bg-eg-charcoal border border-border-primary rounded-3xl p-10 shadow-2xl relative overflow-hidden group">
                {/* Decorative background icon */}
                <div className={`absolute -right-10 -bottom-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000 ${ELEMENTS[activeElement].color}`}>
                  {React.cloneElement(ELEMENTS[activeElement].icon as React.ReactElement<{ size?: number }>, { size: 400 })}
                </div>

                <div className="relative z-10 space-y-12">
                  <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-eg-sand/40 border-b border-border-primary pb-4">
                    Elemental Phenomena
                  </h3>

                  <div className="space-y-10">
                    {ELEMENTS[activeElement].phenomena.map((p, i) => (
                      <div key={i} className="space-y-3">
                        <h4 className="text-xl font-bold text-eg-sand italic flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-eg-gold"></span>
                          {p.name}
                        </h4>
                        <p className="text-eg-sand/50 leading-relaxed font-light pl-5 border-l border-eg-gold/20">
                          {p.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <div className="bg-eg-sand/5 rounded-2xl p-6 border border-eg-gold/10">
                      <p className="text-xs italic text-eg-sand/40 leading-relaxed">
                        "In the confluence of {activeElement}, the guardian finds not just power, but a path carved by starlight."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
