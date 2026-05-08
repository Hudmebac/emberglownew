import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import MeteorShower from '../components/MeteorShower';
import { BOOKS } from '../constants';

export default function Home() {
  const mainBook = BOOKS[0];

  return (
    <PageTransition>
      <MeteorShower />

      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0.03 }}
          animate={{ opacity: [0.03, 0.05, 0.03] }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-[url('/assets/images/starfall2.png')] bg-cover bg-center" 
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center px-12 z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="md:col-span-7"
          >
            <h1 className="text-4xl md:text-5xl font-light leading-[0.9] mb-8 tracking-tighter">
              Welcome to <span className="text-eg-gold font-normal">Emberglow</span><br/>
              <span className="text-eg-sand/80">A Universe Waiting for You</span>
            </h1>

            {/* Animated Taglines */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.6, duration: 1 }}
  className="h-10 overflow-hidden mb-6 relative"
>
  <motion.div
    animate={{ y: ["0%", "-100%"] }}
    transition={{
      repeat: Infinity,
      duration: 200, // adjust speed here (higher = slower)
      ease: "linear"
    }}
    className="space-y-2 absolute top-0 left-0 w-full"
  >
    {/* ORIGINAL LIST */}
    <div className="space-y-2">
      <p className="text-2xl text-eg-gold font-medium italic">Magic begins with a spark.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Every desert hides a secret.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Heroes can come from anywhere.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Starlight chooses the brave.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Even camels can be heroes.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The desert never forgets.</p>
      <p className="text-2xl text-eg-gold font-medium italic">A spark can change everything.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Every grain holds a memory.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Light finds those who seek it.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The stars are watching.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Ralph was never ordinary.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Adventure begins with courage.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The dunes are alive.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Hope glows in every shadow.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Dreams shape the universe.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Wonders hide in plain sight.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Night skies whisper truth.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Big heart. Bigger destiny.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The sand remembers everything.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Light always finds a way.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Every legend starts small.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The stars guide the brave.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Courage glows brighter than fire.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Even shadows hold secrets.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Adventure waits beyond the dunes.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Destiny whispers to those who listen.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Heroes rise from unexpected places.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The desert sky never sleeps.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Magic hides in every footprint.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The wind carries ancient stories.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Great journeys start with one step.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Starlight never forgets its chosen.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Every hero begins as a dreamer.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The night glows with hidden wonders.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Bravery shines brighter than fear.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Legends are written in the sand.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The universe is full of surprises.</p>
      <p className="text-2xl text-eg-gold font-medium italic">A spark can start a legend.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Stories live forever.</p>
    </div>

    {/* DUPLICATE LIST FOR LOOP */}
    <div className="space-y-2">
      <p className="text-2xl text-eg-gold font-medium italic">Magic begins with a spark.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Every desert hides a secret.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Heroes can come from anywhere.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Starlight chooses the brave.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Even camels can be heroes.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The desert never forgets.</p>
      <p className="text-2xl text-eg-gold font-medium italic">A spark can change everything.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Every grain holds a memory.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Light finds those who seek it.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The stars are watching.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Ralph was never ordinary.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Adventure begins with courage.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The dunes are alive.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Hope glows in every shadow.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Dreams shape the universe.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Wonders hide in plain sight.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Night skies whisper truth.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Big heart. Bigger destiny.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The sand remembers everything.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Light always finds a way.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Every legend starts small.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The stars guide the brave.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Courage glows brighter than fire.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Even shadows hold secrets.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Adventure waits beyond the dunes.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Destiny whispers to those who listen.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Heroes rise from unexpected places.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The desert sky never sleeps.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Magic hides in every footprint.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The wind carries ancient stories.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Great journeys start with one step.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Starlight never forgets its chosen.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Every hero begins as a dreamer.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The night glows with hidden wonders.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Bravery shines brighter than fear.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Legends are written in the sand.</p>
      <p className="text-2xl text-eg-gold font-medium italic">The universe is full of surprises.</p>
      <p className="text-2xl text-eg-gold font-medium italic">A spark can start a legend.</p>
      <p className="text-2xl text-eg-gold font-medium italic">Stories live forever.</p>
    </div>
  </motion.div>
</motion.div>
            <p className="text-xl text-eg-sand/60 leading-relaxed font-light max-w-2xl mb-12">
              Emberglow is a huge, exciting fantasy world where Ralph - a normal camel -
              discovers he’s meant for something incredible. He’s chosen by starlight,
              shaped by ancient magic, and thrown into adventures across glowing deserts,
              stormy skies, and places full of mystery.
              <br/><br/>
              If you love big stories, cool creatures, and worlds that feel alive,
              you’re in the right place.
            </p>

            <div className="flex items-center gap-10">
              <Link to={`/book/${mainBook.id}`} className="eg-btn eg-btn-primary">
                Start the Adventure
              </Link>
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-eg-gold mb-1 font-bold">
                  Featured Book
                </span>
                <span className="text-sm italic opacity-50 font-light">
                  {mainBook.title}, 2026
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Image Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="md:col-span-5 relative"
          >
            <div className="relative group">
              {/* Overlay Text */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -top-12 left-0 right-0 text-center z-20 pointer-events-none"
              >
                <h2 className="text-2xl md:text-3xl font-bold italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-eg-gold via-white to-eg-amber drop-shadow-sm">
                  Emberglow - The Mythical Camel
                </h2>
              </motion.div>

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

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-1 h-6 bg-eg-gold/40 rounded-full animate-bounce" />
          <span className="text-[10px] tracking-[0.2em] text-eg-sand/40 mt-2">SCROLL</span>
        </motion.div>
      </section>

      {/* Meet Ralph Section */}
      <section className="px-12 py-24 bg-eg-deep/40 backdrop-blur-sm border-t border-eg-gold/10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Meet <span className="text-eg-gold font-normal">Ralph</span>
          </h2>
          <p className="text-lg text-eg-sand/60 leading-relaxed max-w-3xl mx-auto">
            Ralph isn’t your usual camel. He’s curious, brave, and always getting into trouble.
            One night, something strange happens - a burst of starlight chooses him,
            changing his life forever.
            <br/><br/>
            Now he’s on a journey across magical deserts, ancient ruins, and glowing skies,
            discovering powers he never knew he had.
          </p>

          <Link to="/about" className="eg-btn eg-btn-secondary mt-4">
            Learn More 
          </Link>
        </div>
      </section>

    </PageTransition>
  );
}
