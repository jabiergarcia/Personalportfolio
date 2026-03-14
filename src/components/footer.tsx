import { ScrollReveal } from './scroll-reveal';
import { Mail, Phone, Coffee, Linkedin, Download, Palette } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../utils/constants';
import { useLanguage } from '../hooks/use-language';
import { useCV } from '../hooks/use-cv';

interface FooterProps {
  onOpenContact?: () => void;
  profileImageUrl?: string;
  onNavigateToDesignSystem?: () => void;
}

export function Footer({ onOpenContact, profileImageUrl, onNavigateToDesignSystem }: FooterProps) {
  const { t } = useLanguage();
  const { cvUrl, cvFileName } = useCV();
  
  return (
    <footer className="w-full bg-primary text-primary-foreground py-8 md:py-10 rounded-t-[28px] mt-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        
        <ScrollReveal direction="up" delay={0.1}>
          {/* Brand Identity */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="flex items-center gap-3 mb-3">
              {profileImageUrl ? (
                <div className="w-14 h-14 bg-accent rounded-full overflow-hidden ring-2 ring-primary-foreground/10">
                  <img 
                    src={profileImageUrl} 
                    alt="Jabier García Sanz" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center ring-2 ring-primary-foreground/10">
                  <span className="text-accent-foreground text-lg">JG</span>
                </div>
              )}
              <div className="flex flex-col items-start">
                <h3 className="text-xl text-primary-foreground">{CONTACT_INFO.name}</h3>
                <p className="text-sm text-primary-foreground/70">{CONTACT_INFO.jobTitle}</p>
              </div>
            </div>
            
            {/* Tagline */}
            <p className="text-primary-foreground/90 max-w-md">
              {t.footer.tagline}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          {/* Contact Section */}
          <div className="flex flex-col items-center gap-2.5 mb-6">
            <button
              onClick={onOpenContact}
              className="group flex items-center gap-2.5 text-primary-foreground/80 hover:text-primary-foreground transition-all duration-200"
              aria-label={t.footer.labels.openContactForm}
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="underline decoration-primary-foreground/30 group-hover:decoration-primary-foreground transition-all">
                {CONTACT_INFO.email}
              </span>
            </button>
            
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="group flex items-center gap-2.5 text-primary-foreground/80 hover:text-primary-foreground transition-all duration-200"
              aria-label={t.footer.labels.callPhone}
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="underline decoration-primary-foreground/30 group-hover:decoration-primary-foreground transition-all">
                {CONTACT_INFO.phoneFormatted}
              </span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          {/* Social & CV Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all"
              aria-label={t.footer.labels.viewLinkedIn}
            >
              <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm">LinkedIn</span>
            </a>
            
            <a
              href={SOCIAL_LINKS.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all"
              aria-label={t.footer.labels.viewBehance}
            >
              <span className="text-sm group-hover:scale-110 transition-transform inline-block">Be</span>
              <span className="text-sm">Behance</span>
            </a>
            
            <a
              href={cvUrl}
              download={cvFileName}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-accent/90 hover:bg-accent text-accent-foreground transition-all"
              aria-label={t.footer.labels.downloadCV}
            >
              <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm">{t.footer.downloadCV}</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal 
          direction="up" 
          delay={0.4}
          scrollOptions={{
            once: true,
            margin: "0px 0px 0px 0px", // Sin margen negativo para activarse más fácilmente
            amount: 0.01 // Solo requiere 1% de visibilidad
          }}
        >
          {/* Copyright + Design System Link */}
          <div className="pt-6 border-t border-primary-foreground/20">
            <div className="flex items-center justify-center gap-4 relative">
              {/* Design System Link - a la izquierda */}
              <button
                onClick={onNavigateToDesignSystem}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-primary-foreground/50 hover:text-primary-foreground/90 hover:bg-primary-foreground/10 transition-all absolute left-0 cursor-pointer bg-transparent border-0"
                aria-label="Ver Design System"
              >
                <Palette className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">DS</span>
              </button>
              
              {/* Copyright - centrado */}
              <p className="flex items-center justify-center gap-2 text-sm text-primary-foreground/60">
                <span>&copy; 2025 {t.footer.copyright}</span>
                <Coffee className="w-4 h-4" />
              </p>
            </div>
          </div>
        </ScrollReveal>
        
      </div>
    </footer>
  );
}