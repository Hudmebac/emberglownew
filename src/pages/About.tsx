import { motion } from 'motion/react';
import { Sparkles, Eye, Zap, Flame, Globe, Compass, Book } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function About() {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-eg-deep overflow-hidden selection:bg-eg-amber/30">
        {/* Background Atmospheric Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[80%] h-[60%] bg-eg-gold opacity-[0.03] rounded-full blur-[180px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-eg-amber opacity-[0.02] rounded-full blur-[150px]" />
          <div className="absolute top-[30%] left-[20%] w-[1px] h-[60%] bg-gradient-to-b from-transparent via-eg-sand/10 to-transparent" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-32"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-eg-sand/5 border border-border-primary rounded-full mb-10">
                <Sparkles className="w-4 h-4 text-eg-gold" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-eg-sand/50">The Eternal Record</span>
              </div>
              <h1 className="text-8xl md:text-[12rem] font-light italic tracking-tighter leading-[0.8] mb-12 text-eg-sand">
                The Mythic <span className="text-eg-gold">Tapestry</span>
              </h1>
              <p className="text-2xl md:text-3xl text-eg-sand/40 max-w-4xl mx-auto font-light leading-relaxed text-balance">
                The Emberglow Universe is not just a story—it is a cosmic vibration. A cinematic saga where every spark carries the weight of a thousand worlds, and every memory shapes the fabric of reality.
              </p>
            </motion.div>

            {/* The Origin / Vision Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-48">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 eg-glass p-12 lg:p-20 rounded-[3rem] border border-border-primary relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h2 className="text-5xl font-bold mb-10 italic tracking-tight text-eg-sand">The Genesis of the Spark</h2>
                  <div className="space-y-8 text-xl text-eg-sand/60 leading-relaxed font-light">
                    <p>
                      It began with a single question that echoed through the void: 
                      <span className="text-eg-sand font-medium italic block mt-4">"What if the smallest light was destined to be the greatest guardian?"</span>
                    </p>
                    <p>
                      From that vibration emerged a sprawling, cinematic universe. A journey spanning the shifting sands of ancient memory, celestial reaches beyond the limits of time, and the elemental fire that defines what it means to be a hero in an age of cosmic giants.
                    </p>
                    <p>
                      Our vision is to build a franchise-ready multiverse that resonates with emotional truth. We don't just create lore; we forge experiences that invite the audience to carry the flame.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
                  <Flame className="w-80 h-80 text-eg-gold" />
                </div>
              </motion.div>

              <div className="lg:col-span-5 grid grid-cols-1 gap-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-eg-deep/40 backdrop-blur-xl p-12 rounded-[3rem] border border-border-primary flex flex-col justify-center"
                >
                  <Eye className="w-12 h-12 text-eg-gold mb-8 opacity-50" />
                  <h3 className="text-3xl font-bold mb-4 italic text-eg-sand">Cinematic Scale</h3>
                  <p className="text-lg text-eg-sand/40 font-light">
                    Every frame is composed with atmospheric depth, ensuring the visual language of the dunes and the stars feels as vast as the heavens themselves.
                  </p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-eg-deep/40 backdrop-blur-xl p-12 rounded-[3rem] border border-border-primary flex flex-col justify-center"
                >
                  <Zap className="w-12 h-12 text-eg-gold mb-8 opacity-50" />
                  <h3 className="text-3xl font-bold mb-4 italic text-eg-sand">Elemental Heart</h3>
                  <p className="text-lg text-eg-sand/40 font-light">
                    Beneath the fire and starlight lies a raw, beating heart of character-driven drama. We believe the grandest myths are rooted in the simplest emotions.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Core Pillars Section */}
            <div className="mb-48">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-border-primary pb-12">
                <div className="max-w-2xl">
                  <h2 className="text-6xl font-bold italic tracking-tighter mb-6 text-eg-sand">Cosmic <span className="text-eg-gold">Pillars</span></h2>
                  <p className="text-xl text-eg-sand/50 font-light">The fundamental forces that govern the Emberglow Universe.</p>
                </div>
                <Globe className="w-16 h-16 text-eg-sand/10 hidden md:block" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Memory', icon: <Book className="w-6 h-6" />, desc: 'Reality is not fixed; it is shaped by what we choose to remember and what we fight to forget.' },
                  { title: 'Balance', icon: <Compass className="w-6 h-6" />, desc: 'The eternal dance between the First Light and the Echoing Deep. One cannot exist without the other.' },
                  { title: 'Identity', icon: <Sparkles className="w-6 h-6" />, desc: 'A timid spark discovering its purpose. Every character is more than the world expects of them.' },
                  { title: 'Possibility', icon: <Zap className="w-6 h-6" />, desc: 'Every path chosen creates a new horizon. The universe is a canvas of infinite potential.' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="group p-10 eg-glass rounded-[2rem] hover:bg-eg-sand/10 transition-all duration-700 border border-border-primary hover:border-eg-amber/30 h-full"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-eg-sand/5 flex items-center justify-center mb-8 border border-border-primary text-eg-gold group-hover:scale-110 group-hover:bg-eg-gold/10 transition-all duration-500">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 italic group-hover:text-eg-gold transition-colors text-eg-sand">{item.title}</h3>
                    <p className="text-eg-sand/40 leading-relaxed font-light group-hover:text-eg-sand/60 transition-colors">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* The Architect Section */}
            <div className="relative p-12 lg:p-24 bg-gradient-to-br from-eg-deep/40 to-eg-deep rounded-[4rem] border border-border-primary overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                  <div className="text-eg-gold text-[10px] font-mono uppercase tracking-[0.5em] mb-6 font-bold">The Creative Nexus</div>
                  <h2 className="text-6xl font-bold mb-10 italic tracking-tighter text-eg-sand">The <span className="text-eg-gold">Architect</span></h2>
                  <div className="space-y-8 text-2xl text-eg-sand/50 leading-relaxed font-light italic">
                    <p>
                    Zac Heggie is the visionary architect behind the Emberglow Universe. A storyteller dedicated to world-class visual imagination and deep emotional resonance.
                    </p>
                    <p>
                    His work blends celestial fantasy with the raw, beating heart of character-driven drama—creating universes that don't just tell a story, but invite you to inhabit them.
                    </p>
                    <div className="flex items-center gap-6 pt-6">
                      <div className="h-0.5 w-20 bg-eg-amber" />
                      <p className="text-xl text-eg-amber font-bold uppercase tracking-widest not-italic">“Every spark matters”</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="eg-glass p-12 rounded-[2.5rem] border border-border-primary">
                    <h3 className="text-3xl font-bold mb-8 italic tracking-tight underline underline-offset-8 decoration-eg-gold/30 text-eg-sand">The Alchemy of Creation</h3>
                    <div className="space-y-6 text-lg text-eg-sand/50 font-light">
                      <p>
                        We employ "Layered Worldbuilding"—a process that begins with emotional resonance and expands into complex mythology, geography, and cosmic physics.
                      </p>
                      <p>
                        Every character, from the timid Emberglow to the ancient Emberion, is designed to be a living key to a specific quadrant of the universe, ensuring that the saga feels vast yet intimately connected.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 bg-eg-sand/5 rounded-3xl border border-border-primary">
                      <div className="text-4xl font-bold text-eg-gold mb-2">5+</div>
                      <div className="text-xs uppercase tracking-widest text-eg-sand/30">Volumes Planned</div>
                    </div>
                    <div className="p-8 bg-eg-sand/5 rounded-3xl border border-border-primary">
                      <div className="text-4xl font-bold text-eg-gold mb-2">Infinite</div>
                      <div className="text-xs uppercase tracking-widest text-eg-sand/30">Possibilities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

