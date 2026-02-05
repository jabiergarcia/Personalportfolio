import { useEffect } from 'react';

// Microsoft Clarity tracking hook
export const useClarity = (projectId: string) => {
  useEffect(() => {
    // Check if Clarity is already loaded
    if (window.clarity) {
      console.log('✅ [Clarity] Already loaded');
      return;
    }

    // Load Clarity script
    (function(c: any, l: Document, a: string, r: string, i: string, t: any, y: any) {
      c[a] = c[a] || function() { 
        (c[a].q = c[a].q || []).push(arguments); 
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
      
      // Log when script loads
      t.onload = () => {
        console.log('✅ [Clarity] Script loaded successfully');
      };
      
      t.onerror = () => {
        console.error('❌ [Clarity] Failed to load script');
      };
    })(window, document, "clarity", "script", projectId);

    console.log('📊 [Clarity] Initializing with project:', projectId);
  }, [projectId]);
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}
