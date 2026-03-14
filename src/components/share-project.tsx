import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Linkedin, Mail, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { EASING, SPRING, DURATION, getDuration } from '../utils/animation-constants';
import { useLanguage } from '../hooks/use-language';

interface ShareProjectProps {
  projectTitle: string;
  projectDescription: string;
  projectShortDescription?: string;
  projectUrl?: string;
  className?: string;
  iconOnly?: boolean;
}

export const ShareProject: React.FC<ShareProjectProps> = ({
  projectTitle,
  projectDescription,
  projectShortDescription,
  projectUrl,
  className = "",
  iconOnly = false
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCopiedLinkedIn(false);
    }
  }, [isOpen]);

  // Handle ESC key to close modal and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open using class
      document.body.classList.add('modal-open');
      
      // Focus trap
      const modal = document.querySelector('[data-share-modal]');
      const focusableElements = modal?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      setTimeout(() => firstElement?.focus(), 100);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleTab);
        document.body.classList.remove('modal-open');
      };
    }
  }, [isOpen]);
  
  // Get current URL
  const shareUrl = (() => {
    if (projectUrl) {
      return projectUrl;
    }
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  })();
  
  const displayDescription = projectShortDescription || projectDescription;

  // Robust copy function - prioritizes legacy method for iframe compatibility
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      // Try legacy method first (works in iframes)
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      
      let successful = false;
      try {
        successful = document.execCommand('copy');
        console.log(successful ? '✅ Copied to clipboard using execCommand' : '❌ execCommand failed');
      } catch (err) {
        console.error('❌ execCommand error:', err);
      }
      
      document.body.removeChild(textarea);
      
      // If legacy method worked, return success
      if (successful) {
        return true;
      }
      
      // If legacy method failed, try modern API as fallback
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          console.log('✅ Copied to clipboard using Clipboard API');
          return true;
        } catch (clipboardError) {
          console.error('❌ Clipboard API error:', clipboardError);
        }
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error copying to clipboard:', error);
      return false;
    }
  };

  // Copy LinkedIn post
  const handleCopyLinkedIn = async () => {
    const linkedInPost = `🎯 ${projectTitle}\n\n${projectDescription}\n\n${t.projectLayout.share.linkedInPost.authorCredit}\n\n👉 ${t.projectLayout.share.linkedInPost.viewMore} ${shareUrl}\n\n#UXDesign #UIDesign #ProductDesign #Portfolio`;

    const success = await copyToClipboard(linkedInPost);
    if (success) {
      setCopiedLinkedIn(true);
      toast.success(t.projectLayout.share.toast.textCopied, {
        description: t.projectLayout.share.toast.readyToPublish
      });
    } else {
      toast.error(t.projectLayout.share.toast.errorCopying);
    }
  };

  // Open LinkedIn
  const handleOpenLinkedIn = () => {
    window.open('https://www.linkedin.com/feed/', '_blank');
    setTimeout(() => setIsOpen(false), 300);
  };

  // Share via email
  const handleEmailShare = async () => {
    const subject = `${t.projectLayout.share.email.subject}: ${projectTitle}`;
    const body = 
      `${t.projectLayout.share.email.intro}\n\n` +
      `${t.projectLayout.share.email.body}\n\n` +
      `${projectTitle}\n\n` +
      `${projectDescription}\n\n` +
      `${t.projectLayout.share.email.viewProject}\n` +
      `${shareUrl}\n\n` +
      `${t.projectLayout.share.email.outro}`;
    
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    console.log('📧 Attempting to share via email...');
    
    // Detect if user is on mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // On mobile: Close modal then try to open email client
      setIsOpen(false);
      setTimeout(() => {
        console.log('📱 Mobile detected - opening email client');
        try {
          window.location.href = mailtoUrl;
        } catch (error) {
          console.error('Error opening email client:', error);
          // Fallback to clipboard on mobile if mailto fails
          const emailContent = `${subject}\n\n${body}`;
          copyToClipboard(emailContent).then(copied => {
            if (copied) {
              toast.success(t.projectLayout.share.toast.emailContentCopied, {
                description: t.projectLayout.share.toast.openEmailManually,
                duration: 5000
              });
            } else {
              toast.error(t.projectLayout.share.toast.errorCopying);
            }
          });
        }
      }, 150);
    } else {
      // On desktop: Copy to clipboard then show toast AFTER modal closes
      console.log('💻 Desktop detected - copying email content to clipboard');
      const emailContent = `${subject}\n\n${body}`;
      
      // Copy to clipboard first
      const copied = await copyToClipboard(emailContent);
      console.log('📋 Copy result:', copied);
      
      // Show toast IMMEDIATELY before closing modal
      if (copied) {
        console.log('✅ Showing success toast IMMEDIATELY');
        const toastId = toast.success(t.projectLayout.share.toast.emailContentCopied, {
          description: t.projectLayout.share.toast.openEmailManually,
          duration: 5000
        });
        console.log('🆔 Toast ID:', toastId);
      } else {
        console.log('❌ Showing error toast IMMEDIATELY');
        const toastId = toast.error(t.projectLayout.share.toast.errorCopying);
        console.log('🆔 Toast ID:', toastId);
      }
      
      // Close modal AFTER showing toast
      setTimeout(() => {
        setIsOpen(false);
      }, 100);
    }
  };

  // Modal content
  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: getDuration(DURATION.instant) }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 9999 }}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div 
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 10000 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="share-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={SPRING.modal}
              className="bg-card border-2 border-border rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
              data-share-modal
            >
              {/* Header */}
              <div className="relative border-b border-border/50 p-6 pb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors z-10"
                  aria-label={t.projectLayout.share.ariaLabels.closeModal}
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
                <h2 id="share-modal-title" className="text-foreground pr-8 font-bold">{t.projectLayout.share.shareProject}</h2>
                <div className="mt-3 space-y-2">
                  <h3 className="text-foreground">{projectTitle}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {displayDescription}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Live region for screen readers */}
                <div 
                  role="status" 
                  aria-live="polite" 
                  aria-atomic="true"
                  className="sr-only"
                >
                  {copiedLinkedIn && t.projectLayout.share.linkCopiedFull}
                </div>

                {/* Share Options */}
                <div className="space-y-3">
                  <label className="text-sm text-foreground block">
                    {t.projectLayout.share.shareOn}
                  </label>

                  {/* LinkedIn Button */}
                  <Button
                    onClick={handleCopyLinkedIn}
                    variant="outline"
                    className="w-full gap-3 border-border hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-900 dark:hover:text-blue-100 transition-all duration-200 h-12 justify-start"
                    aria-label={copiedLinkedIn ? t.projectLayout.share.linkCopied : t.projectLayout.share.copyLinkedInPost}
                  >
                    <Linkedin size={20} className="text-blue-600 dark:text-blue-400" />
                    <span className="flex-1 text-left">
                      {copiedLinkedIn ? t.projectLayout.share.linkCopied : t.projectLayout.share.copyLinkedInPost}
                    </span>
                    {copiedLinkedIn && (
                      <Check size={18} className="text-blue-600 dark:text-blue-400" />
                    )}
                  </Button>

                  {/* LinkedIn Instructions Panel */}
                  <AnimatePresence mode="wait">
                    {copiedLinkedIn && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-4 space-y-3">
                          <div className="flex items-start gap-2 text-sm text-blue-900 dark:text-blue-100">
                            <div className="mt-0.5 bg-blue-600 dark:bg-blue-500 rounded-full p-1 flex-shrink-0">
                              <Check size={12} className="text-white" />
                            </div>
                            <p>
                              <strong>{t.projectLayout.share.linkedInInstructions.title}</strong> {t.projectLayout.share.linkedInInstructions.description}
                            </p>
                          </div>
                          <Button
                            onClick={handleOpenLinkedIn}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 h-11"
                          >
                            <Linkedin size={18} />
                            {t.projectLayout.share.linkedInInstructions.openButton}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email Button */}
                  <Button
                    onClick={handleEmailShare}
                    variant="outline"
                    className="w-full gap-3 border-border hover:bg-secondary/10 dark:hover:bg-secondary/30 hover:border-secondary/30 dark:hover:border-secondary/50 hover:text-foreground dark:hover:text-secondary-foreground transition-all duration-200 h-12 justify-start"
                  >
                    <Mail size={20} className="text-secondary" />
                    <span className="flex-1 text-left">{t.projectLayout.share.shareByEmail}</span>
                  </Button>

                  {/* Native Share (if available) */}
                  {typeof navigator !== 'undefined' && navigator.share && (
                    <Button
                      onClick={async () => {
                        try {
                          await navigator.share({
                            title: projectTitle,
                            text: projectDescription,
                            url: shareUrl
                          });
                          setIsOpen(false);
                        } catch (error) {
                          // User cancelled or error - silently handle
                        }
                      }}
                      variant="outline"
                      className="w-full gap-3 border-border hover:bg-accent/10 dark:hover:bg-accent/25 hover:border-accent/30 dark:hover:border-accent/50 hover:text-accent-foreground dark:hover:text-accent-foreground transition-all duration-200 h-12 justify-start"
                    >
                      <Share2 size={20} className="text-accent-foreground" />
                      <span className="flex-1 text-left">{t.projectLayout.share.moreOptions}</span>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Trigger Button */}
      <Button 
        variant="outline" 
        size={iconOnly ? "icon" : "sm"}
        onClick={() => setIsOpen(true)}
        className={`${iconOnly ? '' : 'gap-2'} border-border hover:bg-secondary/10 hover:border-secondary/30 hover:text-secondary transition-all duration-300 ${className}`}
        aria-label={`${t.projectLayout.share.ariaLabels.shareProject} ${projectTitle}`}
      >
        <Share2 size={16} />
        {!iconOnly && <span>{t.projectLayout.share.shareButton}</span>}
      </Button>

      {/* Portal Modal - Renders at document.body level */}
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
};