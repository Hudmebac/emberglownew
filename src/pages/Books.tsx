import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import PageTransition from '../components/PageTransition';
import { BOOKS } from '../constants';

export default function Books() {
  const bundle = BOOKS.find(b => b.id === 'complete-collection');
  const individualBooks = BOOKS.filter(b => b.id !== 'complete-collection');

  return (
    <PageTransition>
      <section className="py-24 bg-gradient-to-b from-eg-deep to-eg-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 italic tracking-tight">The <span className="text-eg-gold">Eternal</span> Cycle</h1>
            <p className="text-xl text-eg-sand/60 max-w-3xl mx-auto">
              Witness the descent of the First Light and the trials that forged a mythic legend. 
              Explore the full saga in our <span className="text-eg-amber font-medium">Complete Collection</span>, or dive into the core volumes.
            </p>
          </motion.div>

          {/* Single Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 max-w-6xl mx-auto">
            {/* Featured Bundle - Spans 3 columns on LG, 2 on MD */}
            {bundle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="col-span-1 md:col-span-2 lg:col-span-3 mb-8"
              >
                <div className="relative group overflow-hidden rounded-[3rem] border border-eg-gold/30 p-8 md:p-12 bg-gradient-to-br from-eg-deep to-eg-charcoal shadow-2xl">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-[0.05] group-hover:scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: `url(${bundle.coverImage})` }}
                  />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left space-y-6">
                      <div className="space-y-3">
                        <p className="text-eg-amber font-bold uppercase tracking-[0.3em] text-[10px]">Featured Collection</p>
                        <h2 className="text-3xl md:text-5xl font-bold italic tracking-tighter">{bundle.title}</h2>
                        <p className="text-eg-sand/50 italic text-sm">{bundle.subtitle}</p>
                      </div>
                      
                      <p className="text-base text-eg-sand/70 leading-relaxed max-w-xl line-clamp-3">
                        {bundle.description}
                      </p>

                      <div className="flex flex-wrap gap-4 pt-2">
                        <Link 
                          to={`/book/${bundle.id}`} 
                          className="eg-btn eg-btn-primary px-8 py-3 text-sm"
                        >
                          Explore Lore
                        </Link>
                        <a 
                          href={bundle.buyLinks[0].url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="eg-btn eg-btn-ghost border-eg-gold/30 px-8 py-3 text-sm"
                        >
                          Amazon
                        </a>
                      </div>
                    </div>

                    <div className="relative justify-self-center lg:justify-self-end">
                      <div className="eg-book-presentation w-full max-w-[400px]">
                        <div className="eg-book-cover aspect-[21/13] bg-eg-charcoal shadow-2xl overflow-hidden rounded-xl border border-eg-gold/20">
                          <img 
                            src={bundle.coverImage} 
                            alt={bundle.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="eg-book-spine-effect" />
                        </div>
                        <div className="eg-book-edge" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Individual Books */}
            {individualBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center"
              >
                <div className="eg-book-presentation w-full max-w-[240px]">
                  <div className="eg-book-cover aspect-[2/3] bg-eg-charcoal shadow-xl">
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="eg-book-spine-effect" />
                    <Link 
                      to={`/book/${book.id}`}
                      className="absolute inset-0 z-30"
                    />
                  </div>
                  <div className="eg-book-edge" />
                </div>

                <div className="mt-10 space-y-3 w-full px-4">
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-eg-amber transition-colors line-clamp-1">{book.title}</h3>
                  <p className="text-eg-sand/40 text-xs font-medium italic tracking-wide uppercase line-clamp-1">{book.subtitle}</p>
                  
                  <div className="pt-6 flex justify-center gap-6 border-t border-eg-sand/5">
                    <Link to={`/book/${book.id}`} className="text-[10px] font-bold uppercase tracking-widest text-eg-gold hover:text-eg-amber transition-colors">
                      Lore / Info
                    </Link>
                    <span className="text-eg-sand/10">|</span>
                    <a href={book.buyLinks[0].url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-eg-sand/50 hover:text-eg-sand transition-colors">
                      Amazon
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
