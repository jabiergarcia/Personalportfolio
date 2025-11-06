import { useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AnalyticsEvent {
  event_type: 'page_view' | 'project_view' | 'contact_open' | 'cv_download' | 'prototype_interaction';
  page?: string;
  project?: string;
  timestamp: string;
  user_agent: string;
  viewport: string;
  session_id: string;
}

// Generate session ID based on timestamp and random
const getSessionId = () => {
  const stored = sessionStorage.getItem('portfolio_session');
  if (stored) return stored;
  
  const sessionId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('portfolio_session', sessionId);
  return sessionId;
};

const trackEvent = async (eventData: Omit<AnalyticsEvent, 'timestamp' | 'user_agent' | 'viewport' | 'session_id'>) => {
  // Don't wait for analytics - fire and forget
  setTimeout(async () => {
    try {
      const event: AnalyticsEvent = {
        ...eventData,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        session_id: getSessionId()
      };

      console.log('📊 [Analytics] Tracking event:', event.event_type, event.page || event.project);

      // Use AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-df6fcedb/analytics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(event),
          signal: controller.signal,
          keepalive: true // Allow request to complete even if page unloads
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          console.log('✅ [Analytics] Event tracked successfully:', event.event_type);
        } else {
          const errorText = await response.text();
          console.error('❌ [Analytics] Failed to track event:', response.status, errorText);
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        
        // Don't log abort errors - they're expected when timeout occurs
        if (fetchError.name === 'AbortError') {
          console.log('⏱️ [Analytics] Event tracking timed out (expected behavior)');
        } else {
          // Log other errors but don't break the app
          console.warn('⚠️ [Analytics] Tracking failed:', fetchError);
        }
      }
    } catch (error) {
      // Outer catch for any other errors in the event construction
      console.warn('⚠️ [Analytics] Event preparation failed:', error);
    }
  }, 0);
};

export const useAnalytics = () => {
  return {
    trackPageView: (page: string) => void trackEvent({ event_type: 'page_view', page }),
    trackProjectView: (project: string) => void trackEvent({ event_type: 'project_view', project }),
    trackContactOpen: () => void trackEvent({ event_type: 'contact_open' }),
    trackCVDownload: () => void trackEvent({ event_type: 'cv_download' }),
    trackPrototypeInteraction: (project: string) => void trackEvent({ event_type: 'prototype_interaction', project })
  };
};