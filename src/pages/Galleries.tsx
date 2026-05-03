import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { GALLERIES } from '../constants';

export default function Galleries() {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-eg-deep overflow-hidden">
        {/* Cinematic Background Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-eg-gold opacity-[0.05] rounded-full blur-[180px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-eg-amber opacity-[0.05] rounded-full blur-[150px]" />
        </div>

        <section className="relative z-10 py-32 px-6 text-eg-sand">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
              >
                <h1 className="text-7xl md:text-9xl font-bold mb-8 italic tracking-tighter">
                  Visions of the <span className="text-eg-gold">Void</span>
                </h1>
                <p className="text-2xl text-eg-sand/40 max-w-4xl mx-auto font-light leading-relaxed">
                  Behold the visual manifestations of a universe in flux. From the radiant glow of the First Light to the obsidian shadows of the Understar, witness the cinematic beauty of the Emberglow Universe.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
              {GALLERIES.map((gallery, index) => (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={`/galleries/${gallery.id}`}
                    className="group relative block aspect-[3/4] rounded-[3rem] overflow-hidden cursor-pointer border border-border-primary hover:border-eg-amber/30 transition-all duration-700 bg-eg-deep/40 backdrop-blur-sm"
                  >
                    {/* Image Layer */}
                    <img 
                      src={gallery.coverImage} 
                      alt={gallery.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-eg-deep via-eg-deep/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Content Layer */}
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <div className="space-y-4">
                        <div className="text-eg-gold/40 text-[10px] font-mono tracking-[0.4em] mb-2 uppercase font-bold">Collection_Ref_0{index + 1}</div>
                        <h3 className="text-4xl font-bold italic group-hover:text-eg-gold transition-colors duration-500 text-eg-sand">{gallery.title}</h3>
                        
                        <div className="relative">
                          <p className="text-lg text-eg-sand/50 leading-relaxed font-light line-clamp-2 md:line-clamp-none md:max-h-0 md:opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                            {gallery.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 pt-6">
                           <span className="text-xs font-bold text-eg-amber uppercase tracking-[0.2em]">Enter Gallery</span>
                           <div className="h-px w-0 group-hover:w-full bg-eg-amber transition-all duration-700 opacity-50" />
                        </div>
                      </div>
                    </div>

                    {/* Subtle Internal Border Glow */}
                    <div className="absolute inset-0 rounded-[3rem] border border-border-primary/20 pointer-events-none group-hover:border-eg-gold/20 transition-colors duration-700" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
