import { useState, useCallback } from 'react';

interface TouchPosition {
  x: number;
  y: number;
}

interface UseTouchSwipeOptions {
  /**
   * Minimum distance in pixels to consider a swipe (default: 50)
   */
  swipeThreshold?: number;
  /**
   * Maximum distance in pixels to still consider a tap (default: 10)
   */
  tapThreshold?: number;
  /**
   * Called when a swipe left is detected
   */
  onSwipeLeft?: () => void;
  /**
   * Called when a swipe right is detected
   */
  onSwipeRight?: () => void;
  /**
   * Called when a swipe up is detected
   */
  onSwipeUp?: () => void;
  /**
   * Called when a swipe down is detected
   */
  onSwipeDown?: () => void;
  /**
   * Called when a tap is detected (touch duration < 200ms and movement < tapThreshold)
   */
  onTap?: () => void;
}

interface UseTouchSwipeReturn {
  /**
   * Whether the user is currently dragging/swiping
   */
  isDragging: boolean;
  /**
   * Handler for touchstart event
   */
  handleTouchStart: (e: React.TouchEvent) => void;
  /**
   * Handler for touchmove event
   */
  handleTouchMove: (e: React.TouchEvent) => void;
  /**
   * Handler for touchend event
   */
  handleTouchEnd: () => void;
}

/**
 * Custom hook for handling touch gestures (swipe and tap)
 * Provides consistent touch/swipe detection across components
 * 
 * @example
 * ```tsx
 * const { isDragging, handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSwipe({
 *   onSwipeLeft: () => console.log('Swiped left'),
 *   onSwipeRight: () => console.log('Swiped right'),
 *   onTap: () => console.log('Tapped'),
 *   swipeThreshold: 50,
 *   tapThreshold: 10
 * });
 * 
 * <div
 *   onTouchStart={handleTouchStart}
 *   onTouchMove={handleTouchMove}
 *   onTouchEnd={handleTouchEnd}
 * >
 *   Content
 * </div>
 * ```
 */
export function useTouchSwipe({
  swipeThreshold = 50,
  tapThreshold = 10,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap
}: UseTouchSwipeOptions = {}): UseTouchSwipeReturn {
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);
  const [touchEnd, setTouchEnd] = useState<TouchPosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd(null);
    setIsDragging(false);
    setTouchStartTime(Date.now());
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.targetTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    
    // Calculate distance
    const deltaX = Math.abs(touch.clientX - touchStart.x);
    const deltaY = Math.abs(touch.clientY - touchStart.y);
    
    // If moved more than tapThreshold, consider it dragging
    if (deltaX > tapThreshold || deltaY > tapThreshold) {
      setIsDragging(true);
    }
  }, [touchStart, tapThreshold]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart) {
      setTouchStart(null);
      setTouchEnd(null);
      setIsDragging(false);
      return;
    }

    const touchDuration = Date.now() - touchStartTime;
    
    // Check for tap (quick touch with minimal movement)
    if (touchEnd) {
      const deltaX = touchEnd.x - touchStart.x;
      const deltaY = touchEnd.y - touchStart.y;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      
      // If very small movement and quick touch, it's a tap
      if (absDeltaX < tapThreshold && absDeltaY < tapThreshold && touchDuration < 200) {
        if (onTap) {
          onTap();
        }
      }
      // Check for horizontal swipe
      else if (absDeltaX > swipeThreshold && absDeltaX > absDeltaY) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
      // Check for vertical swipe
      else if (absDeltaY > swipeThreshold && absDeltaY > absDeltaX) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    } else if (touchDuration < 200 && onTap) {
      // No movement detected, but quick touch - consider it a tap
      onTap();
    }
    
    // Reset state
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
    setTouchStartTime(0);
  }, [touchStart, touchEnd, touchStartTime, tapThreshold, swipeThreshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap]);

  return {
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}
