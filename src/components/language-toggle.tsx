import { useLanguage } from '../hooks/use-language';
import { motion, AnimatePresence } from 'motion/react';
import type { Language } from '../translations';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: Language = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="h-12 w-12 rounded-2xl bg-[#ffccb6]/10 hover:bg-[#ffccb6]/20 flex items-center justify-center transition-colors relative overflow-hidden"
      aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {language === 'es' ? (
          <motion.div
            key="es"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-base font-medium text-foreground">ES</span>
          </motion.div>
        ) : (
          <motion.div
            key="en"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-base font-medium text-foreground">EN</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}