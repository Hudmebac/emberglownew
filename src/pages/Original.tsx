import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect, useMemo } from 'react';
import PageTransition from '../components/PageTransition';
import { CHAPTERS } from '../constants';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Minus, 
  Plus, 
  Type, 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Volume2, 
  Settings, 
  Info,
  X,
  Languages
} from 'lucide-react';

export default function Original() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState<'sans' | 'display' | 'serif' | 'futuristic'>('sans');
  
  const [viewMode, setViewMode] = useState<'reading' | 'audio'>('audio');
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const playStateRef = useRef({ playing: false, paused: false });
  const [speechRate, setSpeechRate] = useState(1);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('narrator');
  const [showChapterPrompt, setShowChapterPrompt] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechSupported, setSpeechSupported] = useState(true);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync ref with state for use in closures
  useEffect(() => {
    playStateRef.current = { playing: isPlaying, paused: isPaused };
  }, [isPlaying, isPaused]);

  // Simple Voice Profiles: Narrator, Male, Female
  const availableVoices = useMemo(() => {
    if (voices.length === 0) return [];

    const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    const source = englishVoices.length > 0 ? englishVoices : voices;

    const findVoiceByTerms = (include: string[], exclude: string[] = []) => {
      let filtered = source;
      if (include.length > 0) {
        filtered = source.filter(v => {
          const name = v.name.toLowerCase();
          return include.some(t => name.includes(t.toLowerCase()));
        });
      }
      if (exclude.length > 0) {
        filtered = filtered.filter(v => {
          const name = v.name.toLowerCase();
          return !exclude.some(t => name.includes(t.toLowerCase()));
        });
      }

      if (filtered.length === 0) return null;

      // Quality sorting: Neural > Natural > Google > Online > Local
      const sorted = [...filtered].sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        const getScore = (name: string) => {
          let score = 0;
          if (name.includes('neural')) score += 50;
          if (name.includes('natural')) score += 40;
          if (name.includes('google')) score += 30;
          if (name.includes('online')) score += 20;
          if (name.includes('multilingual')) score += 10;
          return score;
        };
        return getScore(bName) - getScore(aName);
      });

      return sorted[0];
    };

    // Narrator: Authoritative (Prefer Google US/Microsoft)
    const narrator = findVoiceByTerms(['google us', 'en-us', 'guy', 'andrew', 'microsoft'], ['female', 'zira', 'samantha']) || 
                    findVoiceByTerms(['google', 'natural', 'neural', 'online']) || source[0];
    
    // Male: Specifically male identified
    const male = findVoiceByTerms(['google us male', 'google us', 'en-us male', 'guy', 'andrew', 'david', 'mark', 'james', 'paul'], ['female', 'zira', 'samantha']) || 
                 findVoiceByTerms(['male', 'en-gb', 'online'], ['female', 'zira', 'samantha']) || source[0];
    
    // Female: Specifically female identified
    const female = findVoiceByTerms(['google us female', 'google us', 'en-us female', 'zira', 'samantha', 'victoria', 'hazel', 'linda', 'saira'], ['male', 'david', 'guy', 'andrew']) || 
                   findVoiceByTerms(['female', 'en-gb', 'en-us', 'online'], ['male', 'david', 'guy']) || source[source.length - 1];

    return [
      { id: 'narrator', voice: narrator, label: 'The Narrator' },
      { id: 'male', voice: male, label: 'Male Voice' },
      { id: 'female', voice: female, label: 'Female Voice' }
    ].filter(v => v.voice);
  }, [voices]);

  const selectedVoice = useMemo(() => {
    return availableVoices.find(v => v.id === selectedVoiceId)?.voice || voices[0] || null;
  }, [availableVoices, selectedVoiceId, voices]);

  // Support Check
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    playStateRef.current.playing = false;
    setIsPlaying(false);
    setIsPaused(false);
    setActiveWordIndex(-1);
    setShowChapterPrompt(false);
  };

  const nextChapter = () => {
    if (activeChapter < CHAPTERS.length - 1) {
      const wasPlaying = isPlaying;
      const nextIdx = activeChapter + 1;
      stopSpeech();
      setActiveChapter(nextIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (wasPlaying || viewMode === 'audio') {
        setTimeout(() => startSpeech(nextIdx), 600);
      }
    }
  };

  const prevChapter = () => {
    if (activeChapter > 0) {
      stopSpeech();
      setActiveChapter(activeChapter - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const chapterContent = useMemo(() => CHAPTERS[activeChapter].content.replace(/\r\n/g, '\n'), [activeChapter]);

  // Initialize voices
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        // Find English voices
        const en = v.filter(voice => voice.lang.toLowerCase().includes('en'));
        setVoices(en.length > 0 ? en : v);
      }
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Robust word mapping
  const words = useMemo(() => {
    const list: { text: string; start: number; end: number; isWord: boolean }[] = [];
    const regex = /(\s+)|(\S+)/g;
    let match;
    while ((match = regex.exec(chapterContent)) !== null) {
      list.push({
        text: match[0],
        start: match.index,
        end: match.index + match[0].length,
        isWord: !!match[2]
      });
    }
    return list;
  }, [chapterContent]);

  const startSpeech = (forceIndex?: number, startWordIdx?: number) => {
    if (!speechSupported) return;
    
    window.speechSynthesis.cancel();
    
    const targetIdx = forceIndex !== undefined ? forceIndex : activeChapter;
    const content = forceIndex !== undefined ? CHAPTERS[forceIndex].content.replace(/\r\n/g, '\n') : chapterContent;
    
    // UI Reset/State
    setIsPlaying(true);
    setIsPaused(false);
    setShowChapterPrompt(false);
    setViewMode('audio');
    
    // Split into manageable chunks
    const chunks = content.split(/(\n\n+)/);
    
    // Calculate which chunk to start from if startWordIdx is provided
    let currentChunkIdx = 0;
    let charOffset = 0;

    if (startWordIdx && startWordIdx > 0 && startWordIdx < words.length) {
      const targetCharPos = words[startWordIdx].start;
      let runningOffset = 0;
      for (let i = 0; i < chunks.length; i++) {
        if (runningOffset + chunks[i].length > targetCharPos) {
          currentChunkIdx = i;
          charOffset = runningOffset;
          break;
        }
        runningOffset += chunks[i].length;
      }
    }

    const streamNext = () => {
      if (currentChunkIdx >= chunks.length || !playStateRef.current.playing) {
        if (currentChunkIdx >= chunks.length) {
          setIsPlaying(false);
          setActiveWordIndex(-1);
          if (targetIdx < CHAPTERS.length - 1) setShowChapterPrompt(true);
        }
        return;
      }

      const text = chunks[currentChunkIdx];
      const safeStart = charOffset;

      // Skip whitespace chunks
      if (!text.trim()) {
        charOffset += text.length;
        currentChunkIdx++;
        streamNext();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      }
      utterance.rate = speechRate;

      utterance.onboundary = (event) => {
        // Find position relative to the whole text
        const absolutePos = safeStart + event.charIndex;
        
        // Greedily find the best matching word
        let candidateIdx = -1;
        let minDistance = 20; // Allow a 20 char window for offset engines

        for (let i = 0; i < words.length; i++) {
          const w = words[i];
          if (!w.isWord) continue;

          // Check if charIndex is within word boundaries
          if (absolutePos >= w.start && absolutePos < w.end) {
            candidateIdx = i;
            break;
          }

          // Some engines fire boundary slightly before or after
          const distance = Math.abs(absolutePos - w.start);
          if (distance < minDistance) {
            minDistance = distance;
            candidateIdx = i;
          }
        }

        if (candidateIdx !== -1) {
          setActiveWordIndex(candidateIdx);
        }
      };

      utterance.onstart = () => {
        // Explicitly set playing ref to true (double check)
        playStateRef.current.playing = true;
        
        // Highlight first word immediately
        const firstWordIdxInChunk = words.findIndex((w, i) => w.isWord && w.start >= safeStart);
        if (firstWordIdxInChunk !== -1 && firstWordIdxInChunk < (words.findIndex((w, i) => w.start >= safeStart + text.length) || words.length)) {
           setActiveWordIndex(firstWordIdxInChunk);
        }
      };

      utterance.onend = () => {
        charOffset += text.length;
        currentChunkIdx++;
        if (playStateRef.current.playing) {
          setTimeout(streamNext, 30);
        }
      };

      utterance.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') return;
        charOffset += text.length;
        currentChunkIdx++;
        streamNext();
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    playStateRef.current.playing = true;
    setTimeout(streamNext, 100);
  };

  // Handle voice change during playback
  useEffect(() => {
    if (isPlaying && !isPaused && selectedVoiceId) {
      // Resume from current word if possible
      const currentWordIdx = activeWordIndex !== -1 ? activeWordIndex : 0;
      startSpeech(activeChapter, currentWordIdx);
    }
  }, [selectedVoiceId]);

  const pauseSpeech = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeSpeech = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  // Improved Auto-scroll: Only scroll if needed and more centered
  useEffect(() => {
    if (activeWordIndex !== -1 && contentRef.current && isPlaying && !isPaused) {
      const activeWord = contentRef.current.querySelector('[data-active="true"]');
      if (activeWord) {
        const rect = activeWord.getBoundingClientRect();
        const isInViewport = (
          rect.top >= 200 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 200
        );

        if (!isInViewport) {
          activeWord.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    }
  }, [activeWordIndex, isPlaying, isPaused]);

  // Split content into chunks for the rendered view (removed previous paragraphs logic)

  return (
    <PageTransition>
      <section className="py-24 bg-eg-charcoal min-h-screen relative">
        {/* Floating Controls Overlay */}
        <AnimatePresence>
          {showControls && viewMode === 'audio' && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="fixed bottom-6 left-6 z-[60] flex flex-col gap-2"
            >
              <div className="eg-glass rounded-xl p-2 shadow-2xl flex flex-col gap-2 min-w-[170px] max-w-[180px] border-eg-amber/20">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[7px] font-mono font-black text-eg-amber uppercase tracking-[0.2em]">
                    Link_Audio
                  </span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setShowInfo(!showInfo)}
                      className="p-1 hover:bg-eg-sand/10 rounded transition-colors text-eg-sand/30 hover:text-eg-amber"
                    >
                      <Info size={9} />
                    </button>
                    <button 
                      onClick={() => setShowControls(false)}
                      className="p-1 hover:bg-eg-sand/10 rounded transition-colors text-eg-sand/30"
                    >
                      <Minus size={9} />
                    </button>
                  </div>
                </div>

                {/* Info Tooltip */}
                {showInfo && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-eg-amber/5 border border-eg-amber/10 rounded-lg p-1.5 text-[8px] text-eg-sand/60 leading-tight italic"
                  >
                    Auto-highlights & scrolls as the legend is spoken.
                  </motion.div>
                )}

                {!speechSupported && (
                  <div className="text-[8px] text-red-500/70 p-1 text-center font-mono">
                    SPEECH_NOT_SUPPORTED
                  </div>
                )}

                <div className="flex items-center justify-center gap-1.5 py-1 border-y border-border-primary/20">
                  <button 
                    onClick={() => {
                      if (isPlaying) {
                        isPaused ? resumeSpeech() : pauseSpeech();
                      } else {
                        startSpeech();
                      }
                    }}
                    disabled={!speechSupported}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isPlaying 
                        ? (isPaused ? 'bg-eg-amber text-eg-deep' : 'bg-eg-sand/10 text-eg-sand active:scale-95')
                        : 'bg-eg-amber text-eg-deep shadow-lg shadow-eg-amber/20'
                    }`}
                  >
                    {isPlaying && !isPaused ? <Pause size={14} /> : <Play size={14} fill={!isPlaying || isPaused ? 'currentColor' : 'none'} />}
                  </button>
                  
                  <button 
                    onClick={stopSpeech}
                    disabled={!isPlaying || !speechSupported}
                    className="w-6 h-6 rounded flex items-center justify-center bg-eg-sand/5 text-eg-sand/20 hover:text-red-500 hover:bg-red-500/10 disabled:opacity-10 transition-all"
                  >
                    <Square size={10} fill="currentColor" />
                  </button>

                  <button 
                    onClick={() => startSpeech()}
                    disabled={!isPlaying || !speechSupported}
                    className="w-6 h-6 rounded flex items-center justify-center bg-eg-sand/5 text-eg-sand/20 hover:text-eg-amber hover:bg-eg-amber/10 disabled:opacity-10 transition-all"
                  >
                    <RotateCcw size={10} />
                  </button>
                </div>

                <div className="space-y-1.5 px-1">
                    <div className="flex items-center justify-between text-[7px] font-mono text-eg-sand/30 uppercase font-black">
                      <span>Voice Setting</span>
                      <Volume2 size={8} className="text-eg-amber" />
                    </div>
                  <select 
                    value={selectedVoiceId}
                    onChange={(e) => {
                      setSelectedVoiceId(e.target.value);
                    }}
                    disabled={!speechSupported}
                    className="w-full bg-eg-sand/5 border border-eg-sand/10 rounded px-1.5 py-1 text-[8px] text-eg-sand/70 font-mono outline-none focus:border-eg-amber/40 appearance-none cursor-pointer hover:bg-eg-sand/10 transition-colors"
                  >
                    {availableVoices.map((cv) => (
                      <option key={cv.id} value={cv.id} className="bg-eg-charcoal text-eg-sand text-xs">
                        {cv.label}
                      </option>
                    ))}
                  </select>
                </div>

                <AnimatePresence>
                  {showChapterPrompt && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3 bg-eg-amber/20 border-2 border-eg-amber/50 rounded-xl flex flex-col gap-2 shadow-[0_0_30px_rgba(255,183,77,0.2)]"
                    >
                      <span className="text-[8px] font-mono text-eg-gold font-black text-center tracking-widest">CHAPTER_FRAGMENT_SYNCED</span>
                      <button 
                        onClick={() => {
                          nextChapter();
                        }}
                        className="w-full py-2 bg-eg-amber text-eg-deep rounded-lg text-[9px] font-black uppercase hover:bg-white transition-all shadow-lg active:scale-95"
                      >
                        Access Next Fragment
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1 px-1">
                  <div className="flex items-center justify-between text-[7px] font-mono text-eg-sand/30 uppercase font-black">
                    <span>Speed</span>
                    <span className="text-eg-amber">{speechRate.toFixed(1)}x</span>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => {
                        const newRate = Math.max(0.5, speechRate - 0.1);
                        setSpeechRate(newRate);
                        if (isPlaying && !isPaused) startSpeech();
                      }}
                      className="flex-1 py-1 bg-eg-sand/5 border border-eg-sand/10 rounded hover:bg-eg-sand/10 text-eg-sand/50 hover:text-eg-amber transition-all"
                    >
                      <Minus size={8} className="mx-auto" />
                    </button>
                    <button 
                      onClick={() => {
                        const newRate = Math.min(2.0, speechRate + 0.1);
                        setSpeechRate(newRate);
                        if (isPlaying && !isPaused) startSpeech();
                      }}
                      className="flex-1 py-1 bg-eg-sand/5 border border-eg-sand/10 rounded hover:bg-eg-sand/10 text-eg-sand/50 hover:text-eg-amber transition-all"
                    >
                      <Plus size={8} className="mx-auto" />
                    </button>
                  </div>
                </div>
                
                <div className="pt-1 border-t border-border-primary/20 grid grid-cols-4 gap-0.5">
                   {(['sans', 'display', 'serif', 'futuristic'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFontFamily(f)}
                        className={`py-1 rounded text-[6px] font-mono uppercase tracking-tighter transition-all ${
                          fontFamily === f ? 'bg-eg-amber text-eg-deep font-bold' : 'bg-eg-sand/5 text-eg-sand/20 hover:bg-eg-sand/5'
                        }`}
                      >
                        {f.substring(0, 3)}
                      </button>
                   ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Restore Toggle */}
        {!showControls && (
          <button 
            onClick={() => setShowControls(true)}
            className="fixed bottom-8 left-8 z-[60] w-12 h-12 rounded-full bg-eg-amber text-eg-deep shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          >
             <Settings size={20} />
          </button>
        )}

        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 italic tracking-tight">The Spark of <span className="text-eg-gold">Creation</span></h1>
            <p className="text-2xl text-eg-sand/50 font-light max-w-3xl mx-auto">
              The legendary records of the timid desert camel who was destined to carry the primordial fire.
            </p>
          </motion.div>

          {/* Table of Contents for Mobile */}
          <div className="lg:hidden mb-12 overflow-x-auto pb-4 flex gap-4 no-scrollbar">
            {CHAPTERS.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => {
                  stopSpeech();
                  setActiveChapter(index);
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm transition-all ${
                  activeChapter === index 
                    ? 'bg-eg-amber border-eg-amber text-eg-deep font-bold' 
                    : 'border-border-primary hover:border-eg-amber/50 text-eg-sand/60'
                }`}
              >
                Ch {chapter.id}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Desktop Side Navigation */}
            <aside className="hidden lg:block w-64 space-y-2 sticky top-32 h-fit">
              <h2 className="text-eg-amber font-mono text-xs uppercase tracking-widest mb-4 px-4 font-bold">Chapters</h2>
              {CHAPTERS.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    stopSpeech();
                    setActiveChapter(index);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-xl transition-all group flex items-center gap-3 ${
                    activeChapter === index 
                      ? 'bg-eg-sand/5 text-eg-amber' 
                      : 'text-eg-sand/40 hover:text-eg-sand hover:bg-eg-sand/5'
                  }`}
                >
                  <BookOpen size={16} className={activeChapter === index ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} />
                  <span className="text-sm truncate font-medium">{chapter.title.split(': ')[1]}</span>
                </button>
              ))}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-eg-sand/5 border border-border-primary rounded-3xl p-8 md:p-12 relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-eg-amber/5 rounded-full blur-3xl -mr-16 -mt-16" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-eg-amber font-mono text-[10px] uppercase tracking-[0.3em] font-black">
                      DATA_FRAGMENT // CH_{CHAPTERS[activeChapter].id.toString().padStart(2, '0')}
                    </span>
                    <div className="h-px flex-1 bg-border-primary" />
                  </div>
                  
                  {/* Mode & Scale HUD */}
                  <div className="flex items-center gap-3">
                    {/* View mode toggle */}
                    <div className="flex bg-eg-sand/5 rounded-lg p-0.5 border border-border-primary">
                      <button 
                        onClick={() => {
                          setViewMode('reading');
                          stopSpeech();
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${
                          viewMode === 'reading' 
                            ? 'bg-eg-sand/10 text-eg-sand' 
                            : 'text-eg-sand/30 hover:text-eg-sand/60'
                        }`}
                      >
                        <BookOpen size={10} /> Reading
                      </button>
                      <button 
                        onClick={() => {
                          setViewMode('audio');
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${
                          viewMode === 'audio' 
                            ? 'bg-eg-amber text-eg-deep' 
                            : 'text-eg-sand/30 hover:text-eg-sand/60'
                        }`}
                      >
                        <Volume2 size={10} /> Audio
                      </button>
                    </div>

                    <div className="flex items-center gap-1 bg-eg-sand/5 rounded-lg px-3 py-1 border border-border-primary">
                      <button 
                        onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                        className="p-1 hover:text-eg-amber transition-colors text-eg-sand/40"
                        title="Zoom Out"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-[10px] font-mono w-10 text-center text-eg-sand/40 font-bold">{fontSize}PX</span>
                      <button 
                        onClick={() => setFontSize(prev => Math.min(36, prev + 2))}
                        className="p-1 hover:text-eg-amber transition-colors text-eg-sand/40"
                        title="Zoom In"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-black mb-12 leading-[0.9] tracking-tighter text-eg-sand italic uppercase">
                  {CHAPTERS[activeChapter].title.split(': ')[1]}
                </h2>

                <div 
                  ref={contentRef}
                  className={`space-y-8 text-eg-sand/80 leading-relaxed font-light first-letter:text-5xl first-letter:font-bold first-letter:text-eg-gold first-letter:mr-3 first-letter:float-left transition-all duration-300 ${
                    fontFamily === 'display' ? 'font-display tracking-tight' :
                    fontFamily === 'serif' ? 'font-serif' :
                    fontFamily === 'futuristic' ? 'font-mono' :
                    'font-sans'
                  }`}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {viewMode === 'reading' ? (
                    <div className="space-y-6">
                      {chapterContent.split('\n\n').map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  ) : (
                    words.map((item, idx) => {
                      if (!item.isWord) return <span key={idx} className="text-eg-sand/30">{item.text}</span>;
                      
                      const isSpeaking = idx === activeWordIndex;
                      
                      return (
                        <span 
                          key={idx} 
                          data-active={isSpeaking}
                          className={`transition-all duration-100 rounded-sm px-0.5 relative inline-block ${
                          isSpeaking 
                            ? 'bg-eg-amber/90 text-eg-charcoal font-bold scale-105 shadow-xl z-10' 
                            : 'text-eg-sand/80'
                        }`}
                        >
                          {item.text}
                        </span>
                      );
                    })
                  )}
                </div>

                <div className="mt-20 pt-10 border-t border-border-primary flex items-center justify-between">
                  <button
                    onClick={prevChapter}
                    disabled={activeChapter === 0}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all font-mono text-xs uppercase tracking-widest ${
                      activeChapter === 0 
                        ? 'opacity-0 pointer-events-none' 
                        : 'bg-eg-sand/5 hover:bg-eg-sand/10 text-eg-sand border border-border-primary'
                    }`}
                  >
                    <ChevronLeft size={18} /> Previous Link
                  </button>
                  <button
                    onClick={nextChapter}
                    disabled={activeChapter === CHAPTERS.length - 1}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all font-mono text-xs uppercase tracking-widest ${
                      activeChapter === CHAPTERS.length - 1 
                        ? 'opacity-0 pointer-events-none' 
                        : 'bg-eg-amber hover:bg-eg-gold text-eg-deep font-black shadow-xl shadow-eg-amber/20'
                    }`}
                  >
                    Sync Next <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
