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
            className="md:col-span-5 relative"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-eg-gold opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity" />
              <img 
                src="/assets/images/emberglow.png" 
                alt="Emberglow"
                className="w-full h-auto relative z-10 drop-shadow-[0_0_50px_rgba(230,138,69,0.3)] group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
