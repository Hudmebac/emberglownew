import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Book, 
  Users, 
  Sparkles, 
  History, 
  Image as ImageIcon, 
  Scroll, 
  Music, 
  Info,
  Mail,
  BookOpen,
  Heart,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { name: 'Books', path: '/books', icon: Book },
  { name: 'Characters', path: '/characters', icon: Users },
  { name: 'Elements', path: '/elements', icon: Sparkles },
  { name: 'Lore', path: '/lore', icon: History },
  { name: 'Galleries', path: '/galleries', icon: ImageIcon },
  { name: 'Original', path: '/original', icon: Scroll },
  { name: 'Cartoon', path: '/cartoon', icon: BookOpen },
  { name: 'Songs', path: '/songs', icon: Music },
  { name: 'Support', path: '/support', icon: Heart },
  { name: 'About', path: '/about', icon: Info },
];

const DESKTOP_GROUPS = [
  { name: 'Books', path: '/books', icon: Book },
  { 
    name: 'The World', 
    icon: Users,
    items: [
      { name: 'Characters', path: '/characters', icon: Users, desc: 'Meet the legends' },
      { name: 'Elements', path: '/elements', icon: Sparkles, desc: 'Primal forces' },
      { name: 'Lore', path: '/lore', icon: History, desc: 'Ancient history' },
    ]
  },
  {
    name: 'Concept',
    icon: ImageIcon,
    items: [
      { name: 'Original', path: '/original', icon: Scroll, desc: 'The first sparks' },
      { name: 'Galleries', path: '/galleries', icon: ImageIcon, desc: 'Visual journey' },
      { name: 'Cartoons', path: '/cartoon', icon: BookOpen, desc: 'Animated visions' },
    ]
  },
  {
    name: 'Creative',
    icon: Music,
    items: [
      { name: 'Original', path: '/original', icon: Scroll, desc: 'Legacy works' },
      { name: 'Cartoon', path: '/cartoon', icon: BookOpen, desc: 'Visual stories' },
      { name: 'Songs', path: '/songs', icon: Music, desc: 'Melodies of dust' },
    ]
  },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Support', path: '/support', icon: Heart },
];

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-eg-deep/80 backdrop-blur-md border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img 
              src="/assets/images/earlyconcept2.png" 
              alt="Emberglow" 
              className="w-10 h-10 object-cover rounded-full shadow-[0_0_15px_rgba(230,138,69,0.3)] group-hover:scale-110 transition-transform"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-bold tracking-[0.3em] uppercase group-hover:text-eg-gold transition-colors text-eg-sand hidden xl:block">
              EMBERGLOW
            </span>
          </Link>

          {/* Desktop Links - Grouped & Clean */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {DESKTOP_GROUPS.map((group) => (
              <div 
                key={group.name}
                className="relative"
                onMouseEnter={() => group.items && setActiveDropdown(group.name)}
                onMouseLeave={() => group.items && setActiveDropdown(null)}
              >
                {group.path ? (
                  <Link
                    to={group.path}
                    className={`eg-nav-link text-[10px] tracking-[0.2em] whitespace-nowrap py-4 flex items-center gap-2 ${location.pathname === group.path ? 'eg-nav-link-active' : ''}`}
                  >
                    {group.name}
                  </Link>
                ) : (
                  <button className={`eg-nav-link text-[10px] tracking-[0.2em] whitespace-nowrap py-4 flex items-center gap-1.5 transition-colors ${activeDropdown === group.name ? 'text-eg-gold' : ''}`}>
                    {group.name}
                    <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === group.name ? 'rotate-180' : ''}`} />
                  </button>
                )}

                {/* Dropdown menu */}
                <AnimatePresence>
                  {group.items && activeDropdown === group.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    >
                      <div className="bg-eg-deep/95 border border-border-primary rounded-2xl p-3 min-w-[240px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                        <div className="grid gap-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={`flex items-center gap-4 p-3 rounded-xl transition-all group/item ${
                                location.pathname === item.path 
                                  ? 'bg-eg-gold/10 text-eg-gold' 
                                  : 'hover:bg-eg-sand/5 text-eg-sand/70 hover:text-eg-sand'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center p-1.5 transition-colors ${
                                location.pathname === item.path ? 'bg-eg-gold/20 text-eg-gold' : 'bg-eg-sand/5 text-eg-gold'
                              }`}>
                                <item.icon size={16} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-bold tracking-[0.1em] uppercase">
                                  {item.name}
                                </span>
                                {item.desc && (
                                  <span className="text-[9px] text-eg-sand/30 font-medium tracking-wide">
                                    {item.desc}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={toggleTheme}
              className="hidden md:flex items-center gap-2 px-2 py-1 bg-eg-sand/5 border border-border-primary rounded-full hover:bg-eg-sand/10 transition-colors group relative"
              aria-label="Toggle Theme"
            >
              <div className="relative w-12 h-5 rounded-full bg-eg-deep/40 border border-border-primary flex items-center p-0.5">
                <motion.div 
                  animate={{ x: theme === 'light' ? 0 : 28 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-3.5 h-3.5 bg-eg-gold rounded-full shadow-[0_0_8px_rgba(230,138,69,0.5)]"
                />
                <Sun className={`absolute left-1.5 w-2.5 h-2.5 text-eg-sand transition-opacity ${theme === 'light' ? 'opacity-100' : 'opacity-20'}`} />
                <Moon className={`absolute right-1.5 w-2.5 h-2.5 text-eg-sand transition-opacity ${theme === 'shadow' ? 'opacity-100' : 'opacity-20'}`} />
              </div>
            </button>

            <Link to="/contact" className="hidden sm:block px-5 py-2 border border-eg-gold/30 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-eg-gold hover:text-white transition-colors text-eg-sand whitespace-nowrap">
              Inquiry
            </Link>

            {/* Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-eg-sand/5 border border-border-primary text-eg-sand hover:text-eg-gold hover:border-eg-gold/30 transition-all z-[60]"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Grid Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-eg-deep/95 backdrop-blur-xl flex items-center justify-center pt-20"
          >
            <div className="w-full max-w-4xl mx-auto px-6 h-full overflow-y-auto pt-10 pb-20 no-scrollbar">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
              >
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`group flex flex-col items-center justify-center aspect-square p-6 rounded-3xl border transition-all duration-500 ${
                        location.pathname === link.path 
                          ? 'bg-eg-gold border-eg-gold text-eg-deep shadow-[0_0_40px_rgba(230,138,69,0.3)]' 
                          : 'bg-eg-sand/5 border-border-primary text-eg-sand hover:border-eg-gold/30 hover:bg-eg-sand/10'
                      }`}
                    >
                      <link.icon 
                        size={32} 
                        className={`mb-4 transition-transform duration-500 group-hover:scale-110 ${
                          location.pathname === link.path ? 'text-eg-deep' : 'text-eg-gold'
                        }`} 
                      />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-center">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16 flex flex-col items-center gap-8"
              >
                <div className="h-px w-20 bg-border-primary" />
                <div className="flex items-center gap-12">
                  <button 
                    onClick={toggleTheme}
                    className="flex flex-col items-center gap-3 text-eg-sand/40 hover:text-eg-gold transition-colors"
                  >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    <span className="text-[8px] font-bold uppercase tracking-widest">Switch to {theme === 'light' ? 'Shadow' : 'Light'}</span>
                  </button>
                  <Link 
                    to="/contact" 
                    className="flex flex-col items-center gap-3 text-eg-sand/40 hover:text-eg-gold transition-colors"
                  >
                    <Mail size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Get in Touch</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
