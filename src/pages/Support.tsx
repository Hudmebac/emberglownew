import { motion } from 'motion/react';
import { Heart, ShoppingBag, Coffee, ExternalLink, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Support() {
  const stripeLink = "https://buy.stripe.com/4gM4gyaov9KYavo2lK9sk00";
  const amazonLink = "https://www.amazon.com/dp/B0DJLYT5G8"; // Representative link for the collection

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-eg-deep overflow-hidden">
        {/* Ambient Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-eg-amber opacity-[0.05] rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-eg-gold opacity-[0.05] rounded-full blur-[150px]" />
        </div>

        <section className="relative z-10 py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-eg-amber/10 border border-eg-amber/20 rounded-full mb-8">
                <Heart className="w-4 h-4 text-eg-gold" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-eg-gold font-bold">Fuel the Flame</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 italic tracking-tighter text-eg-sand">
                Support the <span className="text-eg-gold">Saga</span>
              </h1>
              <p className="text-2xl text-eg-sand/50 font-light leading-relaxed max-w-2xl mx-auto">
                The Emberglow Universe is built on a simple spark. Your support helps expand the lore, create new art, and bring the legends of the desert to life.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Donation Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="eg-glass p-10 rounded-[3rem] border border-eg-gold/20 flex flex-col items-center text-center group hover:bg-eg-sand/5 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-eg-amber/10 flex items-center justify-center text-eg-gold mb-8 group-hover:scale-110 transition-transform">
                  <Coffee size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-4 italic text-eg-sand">Donation</h2>
                <p className="text-eg-sand/50 mb-8 font-light lg:min-h-[60px]">
                  Contribute a small £5 spark to help maintain the archives and support the creative journey.
                </p>
                <a
                  href={stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eg-btn eg-btn-primary w-full flex items-center justify-center gap-2"
                >
                  Donate £5 <ExternalLink size={14} />
                </a>
              </motion.div>

              {/* Amazon / Books Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="eg-glass p-10 rounded-[3rem] border border-border-primary flex flex-col items-center text-center group hover:bg-eg-sand/5 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-eg-sand/5 flex items-center justify-center text-eg-sand/50 mb-8 group-hover:scale-110 transition-transform">
                  <ShoppingBag size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-4 italic text-eg-sand">Lore Artifacts</h2>
                <p className="text-eg-sand/50 mb-8 font-light lg:min-h-[60px]">
                  Own a piece of the history. Visit the Amazon store to purchase the core volumes and guidebooks.
                </p>
                <a
                  href={amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eg-btn eg-btn-ghost w-full flex items-center justify-center gap-2"
                >
                  Shop on Amazon <ExternalLink size={14} />
                </a>
              </motion.div>
            </div>

            {/* Bottom Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 text-eg-sand/20 text-xs font-mono uppercase tracking-widest">
                <Sparkles size={12} /> Every spark matters in the desert night.
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
