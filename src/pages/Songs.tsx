import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, SkipForward, SkipBack, Music, Volume2, FileText, X, Maximize2, Minimize2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { SONGS } from '../constants';

export default function Songs() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'official' | 'new'>('official');
  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredSongs = SONGS.filter(song => (song.category || 'new') === activeTab);
  
  // Ensure index is within bounds of filtered list
  const safeIndex = Math.min(currentSongIndex, Math.max(0, filteredSongs.length - 1));
  const currentSong = filteredSongs[safeIndex] || filteredSongs[0];

  useEffect(() => {
    // Reset index when switching tabs
    setCurrentSongIndex(0);
    setIsPlaying(false);
    setError(null);
  }, [activeTab]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    setError(null);
    
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      nextSong();
    };
    const handleError = (e: any) => {
      console.error("Audio error:", e);
      let message = "Failed to load audio source.";
      if (audio.error) {
        switch (audio.error.code) {
          case 1: message = "Playback aborted by user."; break;
          case 2: message = "Network error while loading audio."; break;
          case 3: message = "Audio decoding failed."; break;
          case 4: message = "Audio source not supported or file missing."; break;
        }
      }
      setError(message);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleDurationChange);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Load management
    const absoluteUrl = new URL(currentSong.audioUrl, window.location.origin).href;
    if (audio.src !== absoluteUrl) {
      audio.pause();
      audio.src = currentSong.audioUrl;
      audio.load();
      
      if (isPlaying) {
        audio.play().catch(e => {
          console.warn("Autoplay failed on source change:", e);
        });
      }
    } else {
      if (isPlaying && audio.paused) {
        audio.play().catch(e => {
          console.warn("Delayed play failed:", e);
        });
      } else if (!isPlaying && !audio.paused) {
        audio.pause();
      }
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleDurationChange);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentSong.id, currentSong.audioUrl, isPlaying]);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % filteredSongs.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + filteredSongs.length) % filteredSongs.length);
    setIsPlaying(true);
  };

  const stopSong = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    audioRef.current.currentTime = percentage * duration;
  };

  return (
    <PageTransition>
      <section className="py-24 bg-eg-deep min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <audio 
            ref={audioRef} 
            src={currentSong.audioUrl} 
            preload="auto"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 italic tracking-tight text-eg-sand">Ember Instrumentals & Ember Voices </h1>
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab('official')}
                className={`px-8 py-2.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] transition-all border ${
                  activeTab === 'official' 
                    ? 'bg-eg-amber text-eg-deep border-eg-amber shadow-[0_0_20px_rgba(255,183,77,0.3)] font-bold' 
                    : 'bg-eg-sand/5 text-eg-sand/50 border-border-primary hover:bg-eg-sand/10'
                }`}
              >
                Caravan Echoes
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`px-8 py-2.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] transition-all border ${
                  activeTab === 'new' 
                    ? 'bg-eg-amber text-eg-deep border-eg-amber shadow-[0_0_20px_rgba(255,183,77,0.3)] font-bold' 
                    : 'bg-eg-sand/5 text-eg-sand/50 border-border-primary hover:bg-eg-sand/10'
                }`}
              >
                Camel Chants
              </button>
            </div>
            <p className="text-xl text-eg-sand/40 font-light h-8">
              {activeTab === 'official' && 'Original atmospheric themes from the Emberglow Saga.'}
              {activeTab === 'new' && 'Newly discovered echoes and anthems of the fireborn.'}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Jukebox Display - Futuristic Echo Core */}
            <motion.div 
               layoutId="jukebox-container"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className={`relative aspect-[10/12] max-w-lg mx-auto w-full group transition-all duration-500 z-10 ${isFullScreen ? 'hidden' : 'block'}`}
            >
              {/* Complex Energy Field Background */}
              <div className="absolute -inset-8 bg-eg-amber/5 blur-[100px] rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-eg-amber/10 blur-[40px] group-hover:bg-eg-amber/20 transition-all duration-1000 rounded-full" />
              
              {/* Main Jukebox Body - Futuristic Obsidian Console */}
              <div className="relative h-full w-full bg-eg-charcoal/90 rounded-[3rem] border-[1px] border-border-primary shadow-2xl overflow-hidden flex flex-col items-center justify-between p-1">
                {/* Glass Overlay Effect */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-eg-sand/5 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,183,77,0.15),transparent_70%)] pointer-events-none" />
                
                {/* HUD Tech Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                   <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-eg-amber/40 rounded-tl-2xl" />
                   <div className="absolute top-12 right-12 w-24 h-24 border-t border-r border-eg-amber/40 rounded-tr-2xl" />
                   <div className="absolute bottom-12 left-12 w-24 h-24 border-b border-l border-eg-amber/40 rounded-bl-2xl" />
                   <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-eg-amber/40 rounded-br-2xl" />
                   <div className="absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-eg-amber/10 to-transparent" />
                </div>

                {/* Inner Content Area */}
                <div className="relative h-full w-full rounded-[2.8rem] flex flex-col items-center justify-between p-8 z-10">
                  {/* Brand Logo/Header */}
                  <div className="absolute top-6 left-12 flex flex-col gap-0.5 opacity-40">
                     <span className="text-[10px] font-mono tracking-[0.4em] text-eg-amber uppercase font-black">EMB-CORE // V.02</span>
                     <span className="text-[8px] font-mono tracking-[0.2em] text-eg-sand/40 uppercase">CELESTIAL AUDIO UNIT</span>
                  </div>

                  {/* Lyrics toggle button */}
                  {currentSong.lyrics && (
                    <button 
                      onClick={() => setShowLyrics(true)}
                      className="absolute top-6 right-8 p-3 text-eg-sand/20 hover:text-eg-amber transition-all hover:scale-110 z-30 bg-eg-sand/5 rounded-xl backdrop-blur-md border border-border-primary"
                      title="View Lyrics"
                    >
                      <FileText size={18} />
                    </button>
                  )}

                  {/* Futuristic Echo Core Stage */}
                  <div className="relative w-52 h-52 mt-0 flex items-center justify-center">
                    {/* Spinning Energy Rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="absolute w-full h-full border border-dashed border-eg-amber/20 rounded-full"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                        className="absolute w-[85%] h-[85%] border border-eg-amber/10 rounded-full"
                      />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        className="absolute w-[110%] h-[110%] border-t border-eg-amber/5 rounded-full"
                      />
                    </div>

                    {/* Scanning Laser Loop */}
                    {isPlaying && (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="absolute inset-[-20%] z-30 pointer-events-none"
                      >
                        <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-eg-amber/60 to-eg-amber shadow-[0_0_15px_rgba(255,183,77,0.8)] origin-left" />
                      </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSong.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="relative z-20 flex items-center justify-center"
                      >
                        {/* The Harmonic Sphere */}
                        <motion.div 
                          animate={isPlaying ? { 
                            scale: [1, 1.02, 1],
                            boxShadow: [
                              '0 0 20px rgba(255,183,77,0.2)',
                              '0 0 40px rgba(255,183,77,0.4)',
                              '0 0 20px rgba(255,183,77,0.2)'
                            ]
                          } : {
                            scale: 1,
                            boxShadow: '0 0 20px rgba(255,183,77,0.1)'
                          }}
                          transition={{ 
                            scale: { repeat: Infinity, duration: 2 },
                            boxShadow: { repeat: Infinity, duration: 2 }
                          }}
                          className="w-44 h-44 rounded-full relative overflow-hidden group-hover:border-eg-amber/50 transition-all duration-700 bg-eg-deep border-2 border-border-primary p-1"
                        >
                           <img 
                            src={currentSong.thumbnail} 
                            alt={currentSong.title} 
                            className="w-full h-full object-cover rounded-full opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                          {/* Inner Holographic HUD on image */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-eg-amber/20 via-transparent to-transparent opacity-40" />
                          <div className="absolute inset-0 border-[10px] border-eg-deep/40 rounded-full" />
                          
                          {/* Playback Progress Ring */}
                          <svg className="absolute inset-0 -rotate-90 w-full h-full pointer-events-none pr-4 pl-4 pt-4 pb-4">
                            <circle 
                              cx="50%" 
                              cy="50%" 
                              r="48%" 
                              fill="none" 
                              stroke="rgba(255,255,255,0.05)" 
                              strokeWidth="2" 
                            />
                            <motion.circle 
                              cx="50%" 
                              cy="50%" 
                              r="48%" 
                              fill="none" 
                              stroke="var(--color-eg-amber)" 
                              strokeWidth="2"
                              strokeDasharray="100 100"
                              initial={{ strokeDashoffset: 100 }}
                              animate={{ strokeDashoffset: duration > 0 ? 100 - (currentTime / duration) * 100 : 100 }}
                              transition={{ duration: 0.1 }}
                              className="opacity-40"
                            />
                          </svg>
                        </motion.div>

                        {/* Center Core */}
                        <div className="absolute w-12 h-12 bg-eg-charcoal rounded-full z-10 border border-eg-sand/20 shadow-inner flex items-center justify-center">
                           <motion.div 
                             animate={{ scale: isPlaying ? [1, 1.2, 1] : 1, opacity: isPlaying ? [0.6, 1, 0.6] : 0.6 }}
                             transition={{ repeat: Infinity, duration: 1 }}
                             className="w-4 h-4 bg-eg-amber rounded-full shadow-[0_0_10px_rgba(255,183,77,0.8)]" 
                           />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="text-center z-10 w-full mt-1">
                    <motion.div 
                      key={currentSong.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-0.5"
                    >
                      <h2 className="text-xl font-bold tracking-tight truncate px-4">{currentSong.title}</h2>
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-6 bg-eg-amber/20" />
                        <p className="text-eg-amber text-[9px] font-mono uppercase tracking-[0.3em] font-bold">
                          {currentSong.artist}
                        </p>
                        <div className="h-px w-6 bg-eg-amber/20" />
                      </div>
                    </motion.div>
                    
                    <div className="h-6 flex flex-col items-center justify-center mt-2">
                       {isPlaying ? (
                         <div className="flex items-end gap-1 h-4">
                            {[1, 2, 3, 4, 3, 2, 1, 2, 3].map((h, i) => (
                              <motion.div 
                                key={i}
                                animate={{ height: [ `${h*15}%`, `${(h+2)*20}%`, `${h*15}%`] }}
                                transition={{ repeat: Infinity, duration: 0.4 + i * 0.03, ease: "linear" }}
                                className="w-0.5 bg-eg-amber/60 rounded-full"
                              />
                            ))}
                         </div>
                       ) : (
                         <span className="text-[10px] font-mono uppercase tracking-widest text-eg-sand/20">System Idle</span>
                       )}
                    </div>
                  </div>

                  <div className="w-full space-y-3 pt-1 relative z-10">
                    {/* Progress Visual */}
                    <div className="relative space-y-1.5">
                       <div 
                         className="relative h-1 bg-eg-sand/5 rounded-full w-full cursor-pointer group"
                         onClick={handleProgressClick}
                       >
                          <motion.div 
                            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                            className="absolute h-full bg-eg-amber shadow-[0_0_15px_rgba(255,183,77,0.5)]"
                          />
                       </div>
                       <div className="flex justify-between items-center text-[8px] font-mono text-eg-sand/20 tracking-[0.2em] font-bold">
                          <span>{formatTime(currentTime)}</span>
                          <span className="text-eg-amber/40">FREQ_RES_STABLE</span>
                          <span>{formatTime(duration || 0)}</span>
                       </div>
                    </div>

                    {/* Futuristic Controls Grid */}
                    <div className="flex items-center justify-between gap-2 px-2 pb-1 w-full max-w-[280px] mx-auto">
                       <button 
                          onClick={prevSong}
                          className="text-eg-sand/30 hover:text-eg-amber transition-all p-2 hover:bg-eg-sand/5 rounded-xl border border-border-primary/20 hover:border-eg-amber/30"
                          title="Previous Track"
                        >
                          <SkipBack size={18} />
                        </button>

                        <div className="flex items-center gap-4">
                          <button 
                            onClick={stopSong}
                            className="text-eg-sand/30 hover:text-red-500 transition-all p-3 hover:bg-eg-sand/5 rounded-xl border border-border-primary/20 hover:border-red-500/30"
                            title="Stop Frequency"
                          >
                            <Square size={20} fill="currentColor" />
                          </button>

                          <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative overflow-hidden group/btn ${
                              isPlaying 
                                ? 'bg-neutral-900 border-2 border-eg-amber shadow-[0_0_20px_rgba(255,183,77,0.2)] text-eg-amber' 
                                : 'bg-eg-amber text-eg-deep shadow-[0_0_40px_rgba(255,183,77,0.4)]'
                            }`}
                          >
                            <div className={`absolute inset-0 bg-eg-sand/5 opacity-0 group-hover/btn:opacity-100 transition-opacity`} />
                            {isPlaying ? <Pause size={24} className="relative z-10" /> : <Play size={24} fill="currentColor" className="ml-1 relative z-10" />}
                          </button>
                        </div>

                        <button 
                          onClick={nextSong}
                          className="text-eg-sand/30 hover:text-eg-amber transition-all p-2 hover:bg-eg-sand/5 rounded-xl border border-border-primary/20 hover:border-eg-amber/30"
                          title="Next Track"
                        >
                          <SkipForward size={18} />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Playlist */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-eg-amber uppercase tracking-widest flex items-center gap-2">
                  <Music size={14} /> 
                  {activeTab === 'official' ? 'Official Discography' : 'Recent Anthems'}
                </h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {filteredSongs.map((song, index) => (
                    <div
                      key={song.id}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                        currentSongIndex === index 
                          ? 'bg-eg-amber/10 border border-eg-amber/30 shadow-lg shadow-eg-amber/5' 
                          : 'hover:bg-eg-sand/5 border border-transparent'
                      }`}
                    >
                      <button 
                        onClick={() => {
                          setCurrentSongIndex(index);
                          setIsPlaying(true);
                        }}
                        className="relative w-12 h-12 flex-shrink-0 cursor-pointer"
                      >
                        <img 
                          src={song.thumbnail} 
                          alt={song.title} 
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        {currentSongIndex === index && isPlaying && (
                          <div className="absolute inset-0 bg-eg-deep/60 flex items-center justify-center rounded-lg">
                            <div className="flex gap-1">
                              <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-eg-amber" />
                              <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-eg-amber" />
                              <motion.div animate={{ height: [6, 10, 6] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-eg-amber" />
                            </div>
                          </div>
                        )}
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentSongIndex(index);
                          setIsPlaying(true);
                        }}
                        className="flex-1 min-w-0 text-left cursor-pointer"
                      >
                        <h4 className={`font-bold truncate ${currentSongIndex === index ? 'text-eg-amber' : 'text-eg-sand'}`}>{song.title}</h4>
                        <p className="text-sm text-eg-sand/40">{song.artist}</p>
                      </button>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {currentSongIndex === index && isPlaying ? (
                            <>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }}
                                className="p-2 hover:text-eg-amber text-eg-sand/40 transition-colors"
                              >
                                <Pause size={14} />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); stopSong(); }}
                                className="p-2 hover:text-red-500 text-eg-sand/40 transition-colors"
                              >
                                <Square size={14} fill="currentColor" />
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={(e) => { e.stopPropagation(); setCurrentSongIndex(index); setIsPlaying(true); }}
                              className="p-2 hover:text-eg-amber text-eg-sand/40 transition-colors"
                            >
                              <Play size={14} fill="currentColor" />
                            </button>
                          )}
                        </div>
                        <div className="text-xs font-mono opacity-20 group-hover:opacity-40 transition-opacity whitespace-nowrap">
                          {song.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volume Control */}
              <div className="pt-8 border-t border-border-primary space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-eg-amber uppercase tracking-widest px-1">
                  <span>Volume</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <Volume2 size={24} className="text-eg-amber" />
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume}
                    onChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      setVolume(newVolume);
                      if (audioRef.current) {
                        audioRef.current.volume = newVolume;
                      }
                    }}
                    className="h-1.5 flex-1 bg-eg-sand/10 rounded-full appearance-none cursor-pointer accent-eg-amber"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Screen Mode - Holographic HUD */}
        <AnimatePresence>
          {isFullScreen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-eg-deep flex items-center justify-center overflow-hidden"
            >
              {/* Complex Holographic Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,183,77,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,183,77,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
              </div>

              {/* Close/Minimize Button */}
              <button 
                onClick={() => setIsFullScreen(false)}
                className="absolute top-8 right-8 z-[110] p-4 text-eg-sand/40 hover:text-eg-amber hover:bg-eg-sand/5 rounded-2xl transition-all border border-border-primary backdrop-blur-md group"
                title="Disconnect HUD"
              >
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">RETRACT_INTERFACE</span>
                   <Minimize2 size={24} />
                </div>
              </button>

              {/* Ambient Glows */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ repeat: Infinity, duration: 8 }}
                  className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-eg-amber/20 blur-[120px] rounded-full" 
                />
                <motion.div 
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.05, 0.1, 0.05]
                  }}
                  transition={{ repeat: Infinity, duration: 10 }}
                  className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-red-500/10 blur-[150px] rounded-full" 
                />
              </div>

              <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">
                <div className="flex flex-col md:flex-row items-center gap-16 md:items-center w-full mb-20">
                   {/* Giant Holographic Core */}
                   <div className="relative shrink-0">
                      {/* Rotating HUD Rings */}
                      <div className="absolute inset-[-40px] pointer-events-none">
                         {[...Array(3)].map((_, i) => (
                           <motion.div
                             key={i}
                             animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                             transition={{ repeat: Infinity, duration: 10 + i * 5, ease: "linear" }}
                             className="absolute inset-0 border border-eg-amber/10 rounded-full border-dashed"
                             style={{ scale: 1 + i * 0.1 }}
                           />
                         ))}
                      </div>

                      <motion.div 
                        animate={{ 
                          scale: isPlaying ? [1, 1.05, 1] : 1,
                          boxShadow: isPlaying ? '0 0 100px rgba(255,183,77,0.2)' : '0 0 40px rgba(0,0,0,0.5)'
                        }}
                        transition={{ 
                          scale: { repeat: Infinity, duration: 4 }
                        }}
                        className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-full bg-eg-charcoal/80 backdrop-blur-md relative p-1 overflow-hidden border border-border-primary/20"
                      >
                         {/* Scanning Effects */}
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,183,77,0.1),transparent_70%)]" />
                         
                         {/* Thumbnail in Core */}
                         <div className="w-full h-full rounded-full overflow-hidden p-20 md:p-32 opacity-20 grayscale scale-125">
                            <img 
                              src={currentSong.thumbnail} 
                              alt="" 
                              className="w-full h-full object-cover rounded-full"
                              referrerPolicy="no-referrer"
                            />
                         </div>
                         
                         {/* Rotating Technical Data Ring */}
                         <svg className="absolute inset-0 w-full h-full p-4 animate-[spin_20s_linear_infinite]">
                            <path 
                              id="tech-text"
                              fill="none"
                              d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                              className="opacity-0"
                            />
                            <text className="fill-eg-amber/20 font-mono text-[4px] uppercase tracking-[0.5em]">
                               <textPath href="#tech-text">
                                 CELESTIAL_ECHO_CORE_SYSTEM_ACCESS_GRANTED_ENCRYPTED_STREAM_DECODING
                               </textPath>
                            </text>
                         </svg>
                      </motion.div>
                      
                      {/* Floating album art */}
                      <motion.div 
                        animate={{ 
                          y: [0, -10, 0],
                          rotateY: isPlaying ? [0, 5, -5, 0] : 0
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-border-primary/20 shadow-[0_0_60px_rgba(0,0,0,0.8)] z-20"
                      >
                        <img 
                          src={currentSong.thumbnail} 
                          alt="" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-eg-deep/60 via-transparent to-transparent" />
                        
                        {/* Status Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                           <div className="text-[10px] font-mono text-eg-amber bg-eg-deep/80 px-2 py-1 rounded">
                             LIVE_DECODE
                           </div>
                           <div className="flex gap-1 h-4">
                             {[1, 2, 3].map(i => (
                               <motion.div 
                                 key={i}
                                 animate={{ height: isPlaying ? [4, 16, 4] : 4 }}
                                 transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
                                 className="w-1 bg-eg-amber rounded-full"
                               />
                             ))}
                           </div>
                        </div>
                      </motion.div>
                   </div>

                   {/* Song Info - Technical HUD Style */}
                   <div className="flex-1 text-center md:text-left space-y-8">
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                           <span className="w-12 h-px bg-eg-amber/40" />
                           <span className="text-eg-amber font-mono text-xs uppercase tracking-[0.5em] font-black">STREAMING_CELL</span>
                        </div>
                        
                        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-eg-sand leading-[0.8] mix-blend-plus-lighter">
                          {currentSong.title}
                        </h2>
                        
                        <p className="text-3xl md:text-5xl text-eg-amber/60 font-thin italic -mt-2">
                          {currentSong.artist}
                        </p>

                        <div className="flex flex-col gap-4 mt-8 md:pl-2 border-l border-border-primary/20">
                           <p className="text-eg-sand/40 max-w-xl text-lg font-light leading-relaxed">
                             {currentSong.description}
                           </p>
                           <div className="flex gap-8 text-[10px] font-mono text-eg-sand/20 uppercase tracking-widest">
                              <div>GENRE / CELESTIAL</div>
                              <div>BITS / 24-96KHZ</div>
                              <div>TYPE / HI-RES_ECHO</div>
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-8">
                           {currentSong.lyrics && (
                              <button 
                                onClick={() => setShowLyrics(true)}
                                className="group relative overflow-hidden px-8 py-4 rounded-xl border border-eg-amber/30 text-eg-amber font-mono text-sm uppercase tracking-widest transition-all hover:bg-eg-amber hover:text-eg-deep"
                              >
                                <div className="flex items-center gap-3 relative z-10">
                                  <FileText size={18} /> OPEN_LYRIC_MODULE
                                </div>
                              </button>
                           )}
                        </div>
                      </motion.div>
                   </div>
                </div>

                {/* Progress & Controls - Bottom HUD Pane */}
                <div className="w-full mt-auto bg-eg-sand/5 backdrop-blur-xl rounded-[2.5rem] border border-border-primary p-10 md:p-14 mb-10 shadow-2xl">
                   <div className="relative space-y-6">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-eg-sand/20 uppercase tracking-widest">Temporal_Reference</span>
                          <div className="text-2xl font-mono font-bold text-eg-sand tabular-nums tracking-widest">
                            {formatTime(currentTime)} <span className="opacity-20">/ {formatTime(duration)}</span>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <span className="text-[10px] font-mono text-eg-sand/20 uppercase tracking-widest">Energy_Output</span>
                          <div className="text-eg-amber font-mono text-sm">STABLE_RESONANCE</div>
                        </div>
                      </div>

                      <div 
                        className="relative h-3 bg-eg-sand/5 rounded-full w-full cursor-pointer group"
                        onClick={handleProgressClick}
                      >
                        <motion.div 
                          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                          className="absolute h-full bg-gradient-to-r from-eg-amber/40 to-eg-amber rounded-full shadow-[0_0_30px_rgba(255,183,77,0.6)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-eg-sand/5 to-transparent pointer-events-none mt-4" />
                      </div>
                   </div>

                   <div className="flex items-center justify-between mt-12">
                      <div className="hidden md:block w-32 h-px bg-border-primary" />
                      
                      <div className="flex items-center gap-10 md:gap-20">
                        <button 
                          onClick={prevSong}
                          className="text-eg-sand/20 hover:text-eg-amber transition-all hover:scale-110 border border-border-primary p-4 rounded-2xl hover:bg-eg-sand/5"
                        >
                          <SkipBack size={32} />
                        </button>

                        <button 
                          onClick={stopSong}
                          className="text-eg-sand/20 hover:text-red-500 transition-all hover:scale-110 border border-border-primary p-5 rounded-2xl hover:bg-eg-sand/5"
                          title="Kill Signal"
                        >
                          <Square size={32} fill="currentColor" />
                        </button>
                        
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className={`w-32 h-32 rounded-3xl flex items-center justify-center transition-all bg-eg-sand text-eg-deep shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 group relative`}
                        >
                          <div className="absolute inset-1 rounded-[1.4rem] border-2 border-eg-deep/10" />
                          {isPlaying ? <Pause size={56} /> : <Play size={56} fill="currentColor" className="ml-3" />}
                        </button>
                        
                        <button 
                          onClick={nextSong}
                          className="text-eg-sand/20 hover:text-eg-amber transition-all hover:scale-110 border border-border-primary p-4 rounded-2xl hover:bg-eg-sand/5"
                        >
                          <SkipForward size={32} />
                        </button>
                      </div>

                      <div className="hidden md:block w-32 h-px bg-border-primary" />
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lyrics Modal */}
        <AnimatePresence>
          {showLyrics && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-eg-deep/95 backdrop-blur-xl"
            >
              <div className="max-w-2xl w-full max-h-[80vh] flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-eg-amber">{currentSong.title}</h2>
                    <p className="text-eg-sand/40">{currentSong.artist}</p>
                  </div>
                  <button 
                    onClick={() => setShowLyrics(false)}
                    className="p-3 bg-eg-sand/5 rounded-full hover:bg-eg-sand/10 transition-colors text-eg-sand"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-6 custom-scrollbar text-eg-sand">
                  <pre className="font-sans text-lg text-eg-sand/80 leading-relaxed whitespace-pre-wrap pb-12">
                    {currentSong.lyrics}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageTransition>
  );
}
