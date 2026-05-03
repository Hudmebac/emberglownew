import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { name: 'Books', path: '/books' },
  { name: 'Characters', path: '/characters' },
  { name: 'Lore', path: '/lore' },
  { name: 'Galleries', path: '/galleries' },
  { name: 'Original', path: '/original' },
  { name: 'Songs', path: '/songs' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-eg-deep/80 backdrop-blur-md border-b border-border-primary">
      <div className="max-w-7xl mx-auto px-12 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-eg-gold to-eg-amber rounded-md shadow-[0_0_15px_rgba(230,138,69,0.4)] group-hover:scale-110 transition-transform"></div>
          <span className="text-xl font-bold tracking-tight uppercase group-hover:text-eg-gold transition-colors text-eg-sand">
            EMBERGLOW
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`eg-nav-link ${location.pathname === link.path ? 'eg-nav-link-active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 bg-eg-sand/5 border border-border-primary rounded-full hover:bg-eg-sand/10 transition-colors group relative"
            aria-label="Toggle Theme"
          >
            <div className="relative w-14 h-6 rounded-full bg-eg-deep/40 border border-border-primary flex items-center p-1">
              <motion.div 
                animate={{ x: theme === 'light' ? 0 : 32 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-4 h-4 bg-eg-gold rounded-full shadow-[0_0_8px_rgba(230,138,69,0.5)]"
              />
              <Sun className={`absolute left-1.5 w-3 h-3 text-eg-sand transition-opacity ${theme === 'light' ? 'opacity-100' : 'opacity-20'}`} />
              <Moon className={`absolute right-1.5 w-3 h-3 text-eg-sand transition-opacity ${theme === 'shadow' ? 'opacity-100' : 'opacity-20'}`} />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-eg-sand/50 group-hover:text-eg-gold transition-colors">
              {theme === 'light' ? 'Light' : 'Shadow'}
            </span>
          </button>

          <Link to="/contact" className="px-6 py-2 border border-eg-gold/30 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-eg-gold hover:text-white transition-colors text-eg-sand">
            Inquiry
          </Link>
        </div>
      </div>
    </nav>
  );
}
