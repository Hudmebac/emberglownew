import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { BOOKS } from '../constants';

export default function Home() {
  const mainBook = BOOKS[0];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center px-12 z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="md:col-span-7"
          >
            <h1 className="text-4xl md:text-5xl font-light leading-[0.9] mb-8 tracking-tighter">
  Emberglow: <br/>
  <span className="text-eg-gold font-normal">A Mythic Universe </span>
</h1>

<div className="space-y-6 mb-12 max-w-2xl">
  <p className="text-2xl text-eg-gold font-medium italic">
    Born from Light and Desert Fire,
Cinematic, expansive, and built for a world‑spanning saga.
  </p>

  <p className="text-xl text-eg-sand/60 leading-relaxed font-light">
    Emberglow is a sweeping cinematic fantasy universe about Ralph — an ordinary desert camel who transforms into a mythical guardian forged from starlight and destiny. Blending ancient myth with bold, modern storytelling, the saga spans deserts that remember, skies that fracture, and guardians shaped from elemental wonder. Every tale delivers emotional depth, visual imagination, and the timeless heart of a legend rediscovered.
  </p>
</div>
            <div className="flex items-center gap-10">
              <Link to={`/book/${mainBook.id}`} className="eg-btn eg-btn-primary">
                Explore Collection
              </Link>
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-eg-gold mb-1 font-bold">Featured Saga</span>
                <span className="text-sm italic opacity-50 font-light">{mainBook.title}, 2026</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="md:col-span-5"
          >
            <div className="eg-book-presentation mx-auto max-w-[420px] group">
              <div className="eg-book-cover aspect-[2/3] bg-eg-charcoal">
                <img 
                  src={mainBook.coverImage} 
                  alt={mainBook.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="eg-book-spine-effect" />
                
                <div className="absolute bottom-8 left-8 right-8 z-30 flex justify-between items-end text-[10px] font-mono uppercase tracking-widest opacity-40">
                  <div>SAGA // 01</div>
                  <div className="text-right">DESERT // ECHOES</div>
                </div>
              </div>
              <div className="eg-book-edge" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-32 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col gap-4">
              <span className="text-eg-gold text-xs font-bold uppercase tracking-[0.2em]">The Saga</span>
              <p className="text-lg opacity-50 font-light leading-relaxed">
                Five volumes of cinematic prose merged with epic celestial worldbuilding.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-eg-gold text-xs font-bold uppercase tracking-[0.2em]">The Archive</span>
              <p className="text-lg opacity-50 font-light leading-relaxed">
                Definitive guidebooks detailing the mythology and origins of every spark.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-eg-gold text-xs font-bold uppercase tracking-[0.2em]">The Atlas</span>
              <p className="text-lg opacity-50 font-light leading-relaxed">
                A geography of memory, mapping the desert's shifting dunes and celestial reaches.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
