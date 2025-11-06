import { useState, useEffect, useCallback } from 'react';

// Helper function to get initial theme - executed before component mounts to avoid FOUC
function getInitialTheme(): boolean {
  // Check if running in browser
  if (typeof window === 'undefined') return false;
  
  // First priority: Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') return true;
  if (savedTheme === 'light') return false;
  
  // Second priority: Check system preference if no saved theme
  if (window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark;
  }
  
  // Fallback: default to light theme
  return false;
}

export function useTheme() {
  // Initialize with the correct theme immediately to avoid flash
  const [isDark, setIsDark] = useState<boolean>(() => getInitialTheme());

  useEffect(() => {
    // Apply theme to document on mount and when isDark changes
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Only set up listener if matchMedia is supported
    if (!window.matchMedia) return;
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        const matches = 'matches' in e ? e.matches : e.matches;
        setIsDark(matches);
      }
    };

    // Add listener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newIsDark = !prev;
      
      // Save to localStorage
      if (newIsDark) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
      
      return newIsDark;
    });
  }, []);
  
  // Function to reset to system preference
  const resetToSystemTheme = useCallback(() => {
    // Remove saved preference
    localStorage.removeItem('theme');
    
    // Set to system preference
    if (window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  return { isDark, toggleTheme, resetToSystemTheme };
}