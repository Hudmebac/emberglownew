import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'shadow';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('eg-theme');
    return (saved as Theme) || 'shadow';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'shadow');
    root.classList.add(theme);
    localStorage.setItem('eg-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'shadow' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
