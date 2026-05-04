import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, Info } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { BOOKS } from '../constants';

export default function BookDetail() {
  const { id } = useParams();
  const book = BOOKS.find(b => b.id === id);

  if (!book) {
    return (
      <PageTransition>
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-8">Book Not Found</h1>
          <Link to="/books" className="eg-btn eg-btn-primary">Return to Library</Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Book Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-eg-amber/5" />
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/books" className="inline-flex items-center gap-2 text-eg-sand/50 hover:text-eg-amber transition-colors mb-12 uppercase tracking-widest text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Books
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 space-y-8 order-1 lg:order-1 w-full"
            >
              <div>
                <p className="text-eg-amber font-display font-bold uppercase tracking-[0.2em] mb-4">{book.subtitle}</p>
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">{book.title}</h1>
              </div>

              <p className="text-lg md:text-xl text-eg-sand/70 leading-relaxed max-w-2xl">
                {book.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {book.buyLinks.map((link) => (
                  <a 
                    key={link.platform}
                    href={link.url}
                    className="eg-btn eg-btn-primary flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> {link.platform}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[450px] flex-shrink-0 order-2 lg:order-2"
            >
              <div className={`eg-book-presentation mx-auto ${book.id === 'complete-collection' ? 'max-w-[400px]' : 'max-w-[340px]'}`}>
                <div className={`eg-book-cover bg-eg-charcoal ${book.id === 'complete-collection' ? 'aspect-[21/13]' : 'aspect-[2/3]'}`}>
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="eg-book-spine-effect" />
                </div>
                <div className="eg-book-edge" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Excerpts & Teasers */}
      <section className="py-24 border-t border-border-primary bg-eg-deep/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold flex items-center gap-4">
                <Info className="w-8 h-8 text-eg-amber" /> The Journey Continues
              </h2>
              <div className="markdown-body">
                <p>
                  In this volume, the Emberglow Universe expands into deeper mysteries. 
                  Every chapter is crafted to bridge the gap between the desert sands 
                  and the eternal light beyond.
                </p>
                <p>
                  Follow as the characters face impossible choices that will define 
                  the very fabric of memory and destiny.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-2xl font-display font-medium uppercase tracking-widest text-eg-amber/60">Teaser Excerpts</h2>
              <div className="space-y-8">
                {book.teaser.map((quote, idx) => (
                  <motion.blockquote 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="border-l-4 border-eg-amber pl-8 py-4 italic text-2xl text-eg-sand/80 leading-relaxed font-serif"
                  >
                    {quote}
                  </motion.blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Promo Section for Bundle (only if not viewing the bundle itself) */}
      {book.id !== 'complete-collection' && (
        <section className="py-24 bg-eg-deep">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative group overflow-hidden rounded-[3rem] border border-eg-gold/30 p-12 lg:p-20 bg-gradient-to-br from-eg-deep to-eg-charcoal">
              <div className="absolute inset-0 bg-[url('/assets/images/emberglowbundle.png')] opacity-[0.07] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000" />
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">The <span className="text-eg-gold">Full</span> Saga</h2>
                  <p className="text-xl text-eg-sand/60 mb-10 leading-relaxed">
                    Own the entire journey. The Emberglow Complete Collection includes all five core volumes 
                    and the definitive Universe Guidebook in one stunning edition.
                  </p>
                  <Link 
                    to="/book/complete-collection" 
                    className="eg-btn eg-btn-primary inline-flex items-center gap-3"
                  >
                    View Complete Collection <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
                
                <div className="hidden lg:block">
                  <img 
                    src="/assets/images/emberglowbundle.png" 
                    alt="Complete Collection Bundle" 
                    className="w-full max-w-[300px] ml-auto rounded-2xl shadow-[0_0_50px_rgba(230,138,69,0.2)] group-hover:shadow-[0_0_80px_rgba(230,138,69,0.3)] transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Suggested Books */}
      <section className="py-24 border-t border-border-primary bg-eg-deep/20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 italic">More from the Universe</h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${id === 'complete-collection' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-8`}>
            {BOOKS.filter(b => b.id !== id).slice(0, id === 'complete-collection' ? 6 : 4).map((suggested) => (
              <Link 
                key={suggested.id} 
                to={`/book/${suggested.id}`} 
                className="group p-6 rounded-2xl bg-eg-sand/5 border border-border-primary hover:border-eg-gold/30 transition-all"
              >
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-6 shadow-xl">
                  <img 
                    src={suggested.coverImage} 
                    alt={suggested.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-bold text-sm text-eg-sand group-hover:text-eg-gold transition-colors truncate">{suggested.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
